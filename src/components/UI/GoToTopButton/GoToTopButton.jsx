import { useState, useEffect } from 'react';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import './GoToTopButton.css';

export function GoToTopButton({ isEnabled = true }) {
  const [pointsDown, setPointsDown] = useState(true);

  useEffect(() => {
    const mainContent = document.getElementById('app-main-content');
    if (!mainContent) return;

    const handleScroll = () => {
      const scrollTop = mainContent.scrollTop;
      const scrollableHeight = mainContent.scrollHeight - mainContent.clientHeight;

      const isAtTop = scrollTop < 10;
      const isAtBottom = scrollTop >= scrollableHeight - 10;

      if (isAtBottom) {
        setPointsDown(false);
      } else if (isAtTop) {
        setPointsDown(true);
      }
    };

    mainContent.addEventListener('scroll', handleScroll);
    return () => mainContent.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isEnabled) return null;

  const scrollToSection = () => {
    const mainContent = document.getElementById('app-main-content');
    if (!mainContent) return;

    const sections = Array.from(mainContent.querySelectorAll('section, [id*="section"]'));
    if (sections.length === 0) return;

    const scrollTop = mainContent.scrollTop;

    if (pointsDown) {
      // Find next section below current position
      const nextSection = sections.find(
        (section) => section.offsetTop > scrollTop + 1
      );
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Find immediate previous section - find the one closest to current scroll but above it
      let prevSection = null;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop < scrollTop - 1) {
          prevSection = sections[i];
          break;
        }
      }
      if (prevSection) {
        prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <button
      id="go-to-next-section-btn"
      className="go-to-section-btn"
      onClick={scrollToSection}
      title={pointsDown ? 'Go to next section' : 'Go to previous section'}
      aria-label={pointsDown ? 'Go to next section' : 'Go to previous section'}
    >
      {pointsDown ? (
        <MdArrowDownward size={24} />
      ) : (
        <MdArrowUpward size={24} />
      )}
    </button>
  );
}

export default GoToTopButton;
