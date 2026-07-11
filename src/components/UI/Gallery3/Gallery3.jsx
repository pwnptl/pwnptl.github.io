import { useState, useRef, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { getColors } from '@theme/colors';
import { useTheme } from '@theme/ThemeContext';
import ZoomableImage from './ZoomableImage';
import './Gallery3.scss';

export function Gallery3({
  items = [],
  showScrollbar = true,
  autoScrollSec = 4,
  isRandomArrangement = false,
  showChevrons = { mobile: true, tablet: true, desktop: true },
}) {
  // Subscribe to the theme context so the gallery re-renders (and re-reads
  // colors) the moment the theme changes, not only on local interaction.
  useTheme();
  const colors = getColors();
  const scrollerRef = useRef(null);
  const autoIntervalRef = useRef(null);
  // Holds the latest start/stop timer controls so manual handlers
  // (chevron / drag / swipe) can reset the countdown.
  const autoCtrlRef = useRef({ start: () => {}, stop: () => {} });
  // True while the user is actively dragging/swiping — auto-scroll stays paused.
  const interactingRef = useRef(false);

  // Per-device chevron visibility. Merge with defaults so a partial
  // object like { mobile: false } still enables tablet/desktop.
  const chevrons = { mobile: true, tablet: true, desktop: true, ...showChevrons };
  // Build the responsive-hide class list from the enabled devices.
  const chevronVisibilityClass = [
    chevrons.mobile ? '' : 'gallery3-nav-btn--hide-mobile',
    chevrons.tablet ? '' : 'gallery3-nav-btn--hide-tablet',
    chevrons.desktop ? '' : 'gallery3-nav-btn--hide-desktop',
  ]
    .filter(Boolean)
    .join(' ');

  const [zoomItem, setZoomItem] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  // Direction auto-scroll advances in; flipped by chevron clicks.
  const [autoDirection, setAutoDirection] = useState(autoScrollSec >= 0 ? 'right' : 'left');

  const displayItems = isRandomArrangement
    ? [...items].sort(() => Math.random() - 0.5)
    : items;

  // Tolerance in px for float rounding on scroll edges.
  const EDGE_TOLERANCE = 2;

  const updateScrollButtons = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const { scrollLeft, scrollWidth, clientWidth } = scroller;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > EDGE_TOLERANCE);
    setCanScrollRight(scrollLeft < maxScroll - EDGE_TOLERANCE);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    // Recompute after images load, since card widths change layout.
    const imgs = scroller.querySelectorAll('img');
    imgs.forEach((img) => img.addEventListener('load', updateScrollButtons));
    updateScrollButtons();

    return () => {
      scroller.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
      imgs.forEach((img) => img.removeEventListener('load', updateScrollButtons));
    };
  }, [updateScrollButtons, displayItems.length]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setZoomItem(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Scroll to the next/previous card edge. Measures real card geometry so
  // it never lands mid-card or skips an image, regardless of card width.
  const scrollByCard = useCallback((direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const { scrollLeft, scrollWidth, clientWidth } = scroller;
    const maxScroll = scrollWidth - clientWidth;
    const cards = Array.from(scroller.children);
    if (cards.length === 0) return;

    const scrollerLeft = scroller.getBoundingClientRect().left;
    // Each card's offset relative to the scroll container's content origin.
    const offsets = cards.map(
      (card) => card.getBoundingClientRect().left - scrollerLeft + scrollLeft
    );

    let target;
    if (direction === 'right') {
      // First card that starts beyond the current position.
      const next = offsets.find((offset) => offset > scrollLeft + EDGE_TOLERANCE);
      // Wrap to start if already at the end or no further card.
      target = next === undefined || scrollLeft >= maxScroll - EDGE_TOLERANCE ? 0 : next;
    } else {
      // Last card that starts before the current position.
      const prevs = offsets.filter((offset) => offset < scrollLeft - EDGE_TOLERANCE);
      const prev = prevs.length ? prevs[prevs.length - 1] : undefined;
      // Wrap to end if already at the start or no earlier card.
      target = prev === undefined || scrollLeft <= EDGE_TOLERANCE ? maxScroll : prev;
    }

    target = Math.max(0, Math.min(target, maxScroll));
    scroller.scrollTo({ left: target, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    // No auto-scroll when disabled or while an image is open in the modal.
    if (autoScrollSec === 0 || zoomItem || !scrollerRef.current) return;

    const stopAuto = () => {
      if (autoIntervalRef.current) {
        clearInterval(autoIntervalRef.current);
        autoIntervalRef.current = null;
      }
    };

    // (Re)start the countdown from a full X seconds. Called on mount and on
    // every manual action so the next auto-advance is always a full interval
    // away — never firing mid-gesture or right after a manual move.
    const startAuto = () => {
      stopAuto();
      if (interactingRef.current) return; // don't run mid-drag/swipe
      autoIntervalRef.current = setInterval(() => {
        scrollByCard(autoDirection);
      }, Math.abs(autoScrollSec) * 1000);
    };

    // Publish controls so manual handlers can reset the timer.
    autoCtrlRef.current = { start: startAuto, stop: stopAuto };

    startAuto();
    const scroller = scrollerRef.current;

    // Pause on hover; resume (fresh countdown) when the pointer leaves.
    scroller.addEventListener('mouseenter', stopAuto);
    scroller.addEventListener('mouseleave', startAuto);

    return () => {
      stopAuto();
      autoCtrlRef.current = { start: () => {}, stop: () => {} };
      scroller.removeEventListener('mouseenter', stopAuto);
      scroller.removeEventListener('mouseleave', startAuto);
    };
  }, [autoScrollSec, autoDirection, zoomItem, scrollByCard]);

  // Chevron click: scroll one card, steer auto-scroll that way, and reset
  // the countdown so the next auto-advance is a full X seconds later.
  const handleChevron = (direction) => {
    setAutoDirection(direction);
    scrollByCard(direction);
    autoCtrlRef.current.start(); // restart timer from zero
  };

  const handleMouseDown = (e) => {
    interactingRef.current = true;
    autoCtrlRef.current.stop(); // pause during drag
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseUp = (e) => {
    interactingRef.current = false;
    if (!isDragging) {
      autoCtrlRef.current.start();
      return;
    }
    setIsDragging(false);
    const diff = dragStart - e.clientX;
    if (Math.abs(diff) > 50) {
      const dir = diff > 0 ? 'right' : 'left';
      setAutoDirection(dir);
      scrollByCard(dir);
    }
    autoCtrlRef.current.start(); // resume with a full fresh interval
  };

  const handleTouchStart = (e) => {
    interactingRef.current = true;
    autoCtrlRef.current.stop(); // pause during swipe
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    interactingRef.current = false;
    if (!isDragging) {
      autoCtrlRef.current.start();
      return;
    }
    setIsDragging(false);
    const diff = dragStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      const dir = diff > 0 ? 'right' : 'left';
      setAutoDirection(dir);
      scrollByCard(dir);
    }
    autoCtrlRef.current.start(); // resume with a full fresh interval
  };

  return (
    <>
      <div className="gallery3-container">
        <div
          className="gallery3-nav-row"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            setIsDragging(false);
            interactingRef.current = false;
            autoCtrlRef.current.start();
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className={`gallery3-nav-btn ${canScrollLeft ? '' : 'gallery3-nav-btn--faded'} ${chevronVisibilityClass}`}
            onClick={() => handleChevron('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            style={{
              backgroundColor: colors.button.background,
              borderColor: colors.button.border,
            }}
          >
            <FaChevronLeft size={20} color="#ffffff" />
          </button>

          <div className="gallery3-wrapper">
            <div
              className={`gallery3-scroller ${showScrollbar ? 'show-scrollbar' : ''}`}
              ref={scrollerRef}
              style={showScrollbar ? {
                '--scrollbar-color': colors.accent.primary,
                '--scrollbar-track': colors.background.secondary,
              } : {}}
            >
              {displayItems.map((item) => (
                <div
                  key={item.id}
                  className="gallery3-card"
                  style={{
                    backgroundColor: colors.background.secondary,
                    borderColor: colors.accent.primary,
                  }}
                  onClick={() => setZoomItem(item)}
                  onKeyDown={(e) => e.key === 'Enter' && setZoomItem(item)}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="gallery3-card-img"
                    loading="lazy"
                  />
                  {item.caption && (
                    <div
                      className="gallery3-card-caption"
                      style={{ color: colors.font.primary }}
                    >
                      {item.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            className={`gallery3-nav-btn ${canScrollRight ? '' : 'gallery3-nav-btn--faded'} ${chevronVisibilityClass}`}
            onClick={() => handleChevron('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            style={{
              backgroundColor: colors.button.background,
              borderColor: colors.button.border,
            }}
          >
            <FaChevronRight size={20} color="#ffffff" />
          </button>
        </div>
      </div>

      {zoomItem && (
        <div
          className="gallery3-modal-overlay"
          onClick={() => setZoomItem(null)}
          style={{ backgroundColor: `${colors.navbar.primary}cc` }}
        >
          <div
            className="gallery3-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gallery3-modal-close"
              onClick={() => setZoomItem(null)}
              aria-label="Close modal"
              style={{
                backgroundColor: colors.button.background,
                borderColor: colors.button.border,
              }}
            >
              <FaTimes size={24} color="#ffffff" />
            </button>
            <ZoomableImage
              src={zoomItem.url}
              alt={zoomItem.alt}
              className="gallery3-modal-img"
            />
            {zoomItem.caption && (
              <p
                className="gallery3-modal-caption"
                style={{ color: colors.font.primary }}
              >
                {zoomItem.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery3;
