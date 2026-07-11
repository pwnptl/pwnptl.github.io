import { Section, Heading } from '@ui';
import { getColors } from '@theme/colors';
import statsDashboardData from '@data/stats-dashboard.json';
import './StatsDashboardSection.css';

export default function StatsDashboardSection() {
  const colors = getColors();

  return (
    <Section id="stats-dashboard-section" className="stats-dashboard-section">
      <Heading
        id="stats-heading"
        level="h2"
        className="stats-heading"
        style={{ color: colors.font.primary }}
      >
        Coding Stats & Achievements
      </Heading>

      <div className="stats-grid">
        {statsDashboardData.stats.map((platform) => (
          <a
            key={platform.id}
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
            className="stats-card"
            style={{
              borderColor: colors.accent.primary,
              backgroundColor: colors.background.secondary,
            }}
          >
            <div className="platform-header">
              <span className="platform-icon">{platform.icon}</span>
              <h3 className="platform-name" style={{ color: colors.font.primary }}>
                {platform.platform}
              </h3>
            </div>

            <div className="stats-items">
              {platform.stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div
                    className="stat-value"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="stat-label"
                    style={{ color: colors.font.secondary }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
