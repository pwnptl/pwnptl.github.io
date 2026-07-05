import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { getColors } from '@theme/colors';
import { useTheme } from '@theme/ThemeContext';
import './Gallery2.ARCHIVED.css';

export function Gallery2({ items = [] }) {
  const { theme } = useTheme();
  const colors = getColors();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [zoomItem, setZoomItem] = useState(null);
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  // Calculate items to display based on screen width
  useEffect(() => {
    const calculateItemsPerView = () => {
      const width = window.innerWidth;
      if (width > 1200) return 4;
      if (width > 768) return 3;
      if (width > 480) return 2;
      return 1;
    };

    setItemsPerView(calculateItemsPerView());

    const handleResize = () => {
      setItemsPerView(calculateItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Calculate total slides needed for circular gallery
  const totalSlides = Math.ceil(items.length / itemsPerView);

  const goToSlide = (index) => {
    const newIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    setCurrentIndex(newIndex);

    // Smooth scroll to slide
    if (scrollerRef.current) {
      const scrollPosition = newIndex * itemsPerView;
      const itemWidth = scrollerRef.current.children[0]?.offsetWidth || 0;
      const gap = 16; // 1rem gap
      const targetScroll = scrollPosition * (itemWidth + gap);

      scrollerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  const goToPrevious = () => {
    goToSlide(currentIndex - 1);
  };

  const goToNext = () => {
    goToSlide(currentIndex + 1);
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

  const getVisibleItems = () => {
    const startIndex = currentIndex * itemsPerView;
    const endIndex = startIndex + itemsPerView;
    const visible = [];

    for (let i = 0; i < itemsPerView; i++) {
      const itemIndex = (startIndex + i) % items.length;
      visible.push(items[itemIndex]);
    }

    return visible;
  };

  const visibleItems = getVisibleItems();

  return (
    <>
      <div
        id="gallery2-container"
        className="gallery2-container"
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
        <div className="gallery2-nav-row">
          {/* Previous Button */}
          <button
            id="gallery2-prev-btn"
            className="gallery2-nav-btn gallery2-prev-btn"
            onClick={goToPrevious}
            aria-label="Previous photos"
            style={{
              backgroundColor: colors.button.background,
              borderColor: colors.button.border,
            }}
          >
            <FaChevronLeft size={20} style={{ color: '#ffffff' }} />
          </button>

          {/* Gallery Items */}
          <div className="gallery2-items-wrapper">
            <div className="gallery2-items" ref={scrollerRef}>
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="gallery2-item"
                  style={{
                    backgroundColor: colors.background.secondary,
                    borderColor: colors.accent.primary,
                  }}
                  onClick={() => setZoomItem(item)}
                >
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="gallery2-image"
                  />
                  {item.caption && (
                    <div
                      className="gallery2-caption"
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
          <button
            id="gallery2-next-btn"
            className="gallery2-nav-btn gallery2-next-btn"
            onClick={goToNext}
            aria-label="Next photos"
            style={{
              backgroundColor: colors.button.background,
              borderColor: colors.button.border,
            }}
          >
            <FaChevronRight size={20} style={{ color: '#ffffff' }} />
          </button>
        </div>

        {/* Indicators - Below items and centered */}
        <div className="gallery2-indicators">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`gallery2-indicator ${
                index === currentIndex ? 'active' : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                backgroundColor:
                  index === currentIndex
                    ? colors.accent.primary
                    : colors.background.tertiary,
              }}
            />
          ))}
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomItem && (
        <div
          className="gallery2-zoom-overlay"
          onClick={() => setZoomItem(null)}
          style={{
            backgroundColor: `${colors.navbar.primary}cc`,
          }}
        >
          <div className="gallery2-zoom-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="gallery2-zoom-close"
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
              className="gallery2-zoom-image"
            />
            {zoomItem.caption && (
              <p
                className="gallery2-zoom-caption"
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

export default Gallery2;
