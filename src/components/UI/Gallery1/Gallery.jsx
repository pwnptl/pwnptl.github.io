import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { getColors } from '@theme/colors';
import { useTheme } from '@theme/ThemeContext';
import './Gallery.css';

export function Gallery({ items = [] }) {
  const { theme } = useTheme();
  const colors = getColors();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [zoomItem, setZoomItem] = useState(null);
  const containerRef = useRef(null);

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
        id="gallery-container"
        className="gallery-container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation and Items Row */}
        <div className="gallery-nav-row">
          {/* Previous Button */}
          <button
            id="gallery-prev-btn"
            className="gallery-nav-btn gallery-prev-btn"
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
          <div className="gallery-items-wrapper">
            <div className="gallery-items">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="gallery-item"
                  style={{
                    backgroundColor: colors.background.secondary,
                    borderColor: colors.accent.primary,
                  }}
                  onClick={() => setZoomItem(item)}
                >
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="gallery-image"
                  />
                  {item.caption && (
                    <div
                      className="gallery-caption"
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
            id="gallery-next-btn"
            className="gallery-nav-btn gallery-next-btn"
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
        <div className="gallery-indicators">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`gallery-indicator ${
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
          className="gallery-zoom-overlay"
          onClick={() => setZoomItem(null)}
          style={{
            backgroundColor: `${colors.navbar.primary}cc`,
          }}
        >
          <div className="gallery-zoom-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="gallery-zoom-close"
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
              className="gallery-zoom-image"
            />
            {zoomItem.caption && (
              <p
                className="gallery-zoom-caption"
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

export default Gallery;
