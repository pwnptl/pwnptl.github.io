import { useState, useRef, useCallback, useEffect } from 'react';

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const DOUBLE_TAP_SCALE = 2.5;
const WHEEL_STEP = 0.0015; // scale delta per wheel unit
const DOUBLE_TAP_MS = 300;

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

/**
 * An image that supports zoom + pan.
 * - Desktop: mouse-wheel to zoom, click-drag to pan, double-click to toggle.
 * - Touch: pinch to zoom, one-finger drag to pan, double-tap to toggle.
 *
 * Uses Pointer Events so mouse and touch share one code path. Transform
 * state is a single object so zoom math stays atomic (no stale closures).
 */
export default function ZoomableImage({ src, alt, className }) {
  const containerRef = useRef(null);
  // { scale, x, y } — x/y are translation in px, applied before scale.
  const [t, setT] = useState({ scale: 1, x: 0, y: 0 });

  const pointersRef = useRef(new Map()); // pointerId -> {x,y}
  const pinchRef = useRef(null);         // { startDist, startScale }
  const lastPanRef = useRef(null);       // {x,y} of last single-pointer pos
  const lastTapRef = useRef(0);
  const activeRef = useRef(false);       // true mid-gesture (disables transition)
  const tRef = useRef(t);                // latest transform for native handlers
  tRef.current = t;

  const isZoomed = t.scale > 1;

  useEffect(() => {
    setT({ scale: 1, x: 0, y: 0 });
    pointersRef.current.clear();
    pinchRef.current = null;
    lastPanRef.current = null;
  }, [src]);

  // Keep the enlarged image from being panned entirely out of the viewport.
  // Bound is based on how far the scaled image extends past the viewport,
  // so you can pan across the whole enlarged image but not lose it off-screen.
  const clampXY = useCallback((scale, x, y) => {
    const el = containerRef.current;
    if (!el) return { x, y };
    const img = el.querySelector('img') || el;
    // Layout (unscaled) size of the fitted image at scale 1.
    const fittedW = img.offsetWidth;
    const fittedH = img.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Half the overflow beyond the viewport, plus a small margin so an edge
    // can be brought comfortably into view.
    const maxX = Math.max(0, (fittedW * scale - vw) / 2 + vw * 0.1);
    const maxY = Math.max(0, (fittedH * scale - vh) / 2 + vh * 0.1);
    return { x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY) };
  }, []);

  // Zoom to `nextScaleRaw` keeping the focal client-point visually fixed.
  const applyZoom = useCallback((nextScaleRaw, focalClientX, focalClientY) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const focalX = focalClientX - cx;
    const focalY = focalClientY - cy;

    setT((prev) => {
      const nextScale = clamp(nextScaleRaw, MIN_SCALE, MAX_SCALE);
      if (nextScale === 1) return { scale: 1, x: 0, y: 0 };
      const ratio = nextScale / prev.scale;
      const rawX = focalX - (focalX - prev.x) * ratio;
      const rawY = focalY - (focalY - prev.y) * ratio;
      const { x, y } = clampXY(nextScale, rawX, rawY);
      return { scale: nextScale, x, y };
    });
  }, [clampXY]);

  const toggleZoom = useCallback((clientX, clientY) => {
    applyZoom(isZoomed ? 1 : DOUBLE_TAP_SCALE, clientX, clientY);
  }, [applyZoom, isZoomed]);

  // Wheel zoom via a NON-passive native listener so preventDefault works
  // (React attaches onWheel as passive, which blocks preventDefault).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let resetTimer;
    const onWheel = (e) => {
      e.preventDefault();
      activeRef.current = true;
      const cur = tRef.current.scale;
      applyZoom(cur + -e.deltaY * WHEEL_STEP * cur, e.clientX, e.clientY);
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { activeRef.current = false; }, 120);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      clearTimeout(resetTimer);
    };
  }, [applyZoom]);

  const handlePointerDown = (e) => {
    containerRef.current?.setPointerCapture?.(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    activeRef.current = true;

    const pts = [...pointersRef.current.values()];
    if (pts.length === 2) {
      pinchRef.current = { startDist: distance(pts[0], pts[1]), startScale: t.scale };
      lastPanRef.current = null;
    } else if (pts.length === 1) {
      lastPanRef.current = { x: e.clientX, y: e.clientY };
      const now = e.timeStamp;
      if (now - lastTapRef.current < DOUBLE_TAP_MS) {
        toggleZoom(e.clientX, e.clientY);
        lastTapRef.current = 0;
      } else {
        lastTapRef.current = now;
      }
    }
  };

  const handlePointerMove = (e) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointersRef.current.values()];

    if (pts.length === 2 && pinchRef.current) {
      const dist = distance(pts[0], pts[1]);
      const mid = midpoint(pts[0], pts[1]);
      applyZoom(pinchRef.current.startScale * (dist / pinchRef.current.startDist), mid.x, mid.y);
    } else if (pts.length === 1 && lastPanRef.current && isZoomed) {
      const dx = e.clientX - lastPanRef.current.x;
      const dy = e.clientY - lastPanRef.current.y;
      lastPanRef.current = { x: e.clientX, y: e.clientY };
      setT((prev) => {
        const { x, y } = clampXY(prev.scale, prev.x + dx, prev.y + dy);
        return { ...prev, x, y };
      });
    }
  };

  const handlePointerUp = (e) => {
    pointersRef.current.delete(e.pointerId);
    const pts = [...pointersRef.current.values()];
    if (pts.length < 2) pinchRef.current = null;
    if (pts.length === 1) {
      lastPanRef.current = { x: pts[0].x, y: pts[0].y };
    } else if (pts.length === 0) {
      lastPanRef.current = null;
      activeRef.current = false;
    }
  };

  return (
    <div
      ref={containerRef}
      className="gallery3-zoomable"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={(e) => toggleZoom(e.clientX, e.clientY)}
      style={{
        cursor: isZoomed ? 'grab' : 'zoom-in',
        touchAction: 'none',
      }}
    >
      <img
        src={src}
        alt={alt}
        className={className}
        draggable={false}
        style={{
          transform: `translate(${t.x}px, ${t.y}px) scale(${t.scale})`,
          transformOrigin: 'center center',
          transition: activeRef.current ? 'none' : 'transform 0.15s ease-out',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
