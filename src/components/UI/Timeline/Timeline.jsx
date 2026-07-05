import { FaBriefcase } from 'react-icons/fa';
import { Heading, Text } from '@ui';
import { getColors } from '@theme/colors';
import { useTheme } from '@theme/ThemeContext';
import './Timeline.css';

const iconMap = {
  FaBriefcase: FaBriefcase,
};

export function Timeline({ items = [] }) {
  const { theme } = useTheme();
  const colors = getColors();

  return (
    <div id="timeline-container" className="timeline-container">
      <div className="timeline-main">
        {items.map((item, index) => {
          const isDesktop = window.innerWidth > 767;
          const iconSize = isDesktop ? 20 : 15;

          return (
            <div key={item.id} className="timeline-item">
              <div
                className="timeline-marker"
                style={{
                  backgroundColor: colors.accent.primary,
                  borderColor: colors.navbar.primary,
                }}
              >
                {iconMap[item.icon] &&
                  (() => {
                    const IconComponent = iconMap[item.icon];
                    return <IconComponent size={iconSize} style={{ color: '#ffffff' }} />;
                  })()
                }
              </div>

              <div className="timeline-content">
                <div
                  className="timeline-card"
                  style={{
                    borderLeftColor: colors.accent.primary,
                    backgroundColor: colors.background.secondary,
                  }}
                >
                  <Heading
                    id={`timeline-date-${index}`}
                    level="h4"
                    className="timeline-date"
                    style={{ color: colors.accent.primary }}
                  >
                    {item.date}
                  </Heading>
                  <Heading
                    id={`timeline-title-${index}`}
                    level="h3"
                    className="timeline-title"
                    style={{ color: colors.font.primary }}
                  >
                    {item.title}
                  </Heading>
                  <Text
                    id={`timeline-company-${index}`}
                    className="timeline-company"
                    style={{ color: colors.accent.secondary }}
                  >
                    {item.company}
                  </Text>
                  <Text
                    id={`timeline-description-${index}`}
                    className="timeline-description"
                    style={{ color: colors.font.secondary }}
                  >
                    {item.description}
                  </Text>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;
