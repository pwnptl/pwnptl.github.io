import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { getColors } from '@theme/colors';
import './Gallery3.css';

export function Gallery3({ items = [] }) {
  const colors = getColors();
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [zoomItem, setZoomItem] = useState(null);
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Close zoom on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setZoomItem(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Check scroll position for button visibility
  const checkScrollPosition = () => {
    if (scrollerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        scroller.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (scrollerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const goToPrevious = () => {
    scroll('left');
  };

  const goToNext = () => {
    scroll('right');
  };

  // Swipe handlers
  const handleMouseDown = (e) => {
    setDragStart(e.clientX);
    setDragEnd(null);
  };

  const handleMouseMove = (e) => {
    if (dragStart !== null) {
      setDragEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (dragStart !== null && dragEnd !== null) {
      const diff = dragStart - dragEnd;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToNext();
        } else {
          goToPrevious();
        }
      }
    }
    setDragStart(null);
    setDragEnd(null);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setDragEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (dragStart !== null && dragEnd !== null) {
      const diff = dragStart - dragEnd;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToNext();
        } else {
          goToPrevious();
        }
      }
    }
    setDragStart(null);
    setDragEnd(null);
  };

  return (
    <>
      <div
        id="gallery3-container"
        className="gallery3-container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Row with Previous Button, Items, and Next Button */}
        <div className="gallery3-nav-row">
          {/* Previous Button */}
          {canScrollLeft && (
            <button
              id="gallery3-prev-btn"
              className="gallery3-nav-btn gallery3-prev-btn"
              onClick={goToPrevious}
              aria-label="Previous photos"
              style={{
                backgroundColor: colors.button.background,
                borderColor: colors.button.border,
              }}
            >
              <FaChevronLeft size={20} style={{ color: '#ffffff' }} />
            </button>
          )}

          {/* Gallery Items */}
          <div className="gallery3-items-wrapper">
            <div className="gallery3-items" ref={scrollerRef}>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="gallery3-item"
                  style={{
                    backgroundColor: colors.background.secondary,
                    borderColor: colors.accent.primary,
                  }}
                  onClick={() => setZoomItem(item)}
                >
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="gallery3-image"
                  />
                  {item.caption && (
                    <div
                      className="gallery3-caption"
                      style={{
                        color: colors.font.primary,
                      }}
                    >
                      {item.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          {canScrollRight && (
            <button
              id="gallery3-next-btn"
              className="gallery3-nav-btn gallery3-next-btn"
              onClick={goToNext}
              aria-label="Next photos"
              style={{
                backgroundColor: colors.button.background,
                borderColor: colors.button.border,
              }}
            >
              <FaChevronRight size={20} style={{ color: '#ffffff' }} />
            </button>
          )}
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomItem && (
        <div
          className="gallery3-zoom-overlay"
          onClick={() => setZoomItem(null)}
          style={{
            backgroundColor: `${colors.navbar.primary}cc`,
          }}
        >
          <div className="gallery3-zoom-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="gallery3-zoom-close"
              onClick={() => setZoomItem(null)}
              style={{
                backgroundColor: colors.button.background,
                borderColor: colors.button.border,
                color: '#ffffff',
              }}
              aria-label="Close zoom"
            >
              <FaTimes size={24} />
            </button>
            <img
              src={zoomItem.url}
              alt={zoomItem.alt}
              className="gallery3-zoom-image"
            />
            {zoomItem.caption && (
              <p
                className="gallery3-zoom-caption"
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
