import { Section, Heading, Badge } from '@ui';
import { getColors } from '@theme/colors';
import articlesData from '@data/articles.json';
import './ArticlesSection.css';

export default function ArticlesSection() {
  const colors = getColors();

  const getCategoryColor = (category) => {
    const categoryColors = {
      React: '#61DAFB',
      'System Design': '#FF6B6B',
      Backend: '#68A063',
      Database: '#336791',
      DevOps: '#FF9900',
      Frontend: '#F7DF1E',
    };
    return categoryColors[category] || colors.accent.primary;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Section id="articles-section" className="articles-section">
      <Heading
        id="articles-heading"
        level="h2"
        className="articles-heading"
        style={{ color: colors.font.primary }}
      >
        Articles & Blog Posts
      </Heading>

      <div className="articles-list">
        {articlesData.map((article) => (
          <a
            key={article.id}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="article-card"
            style={{
              borderLeftColor: getCategoryColor(article.category),
              backgroundColor: colors.background.secondary,
            }}
          >
            <div className="article-header">
              <h3 className="article-title" style={{ color: colors.font.primary }}>
                {article.title}
              </h3>
              <Badge
                style={{
                  backgroundColor: getCategoryColor(article.category),
                  color: '#ffffff',
                }}
              >
                {article.category}
              </Badge>
            </div>

            <p className="article-excerpt" style={{ color: colors.font.secondary }}>
              {article.excerpt}
            </p>

            <div className="article-footer">
              <span className="article-date" style={{ color: colors.font.secondary }}>
                {formatDate(article.date)}
              </span>
              <span className="article-read-time" style={{ color: colors.accent.secondary }}>
                {article.readTime}
              </span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

