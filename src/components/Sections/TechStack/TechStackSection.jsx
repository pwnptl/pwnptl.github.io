import { Container, Row, Col } from 'react-bootstrap';
import { Section, Heading, Badge } from '@ui';
import { getColors } from '@theme/colors';
import techstackData from '@data/techstack.json';
import './TechStackSection.css';

export default function TechStackSection() {
  const colors = getColors();

  const getLevelColor = (level) => {
    const levelColors = {
      Expert: '#10b981',
      Advanced: '#3b82f6',
      Intermediate: '#f59e0b',
      Beginner: '#6b7280',
    };
    return levelColors[level] || '#6b7280';
  };

  return (
    <Section id="techstack-section" className="techstack-section">
      <Container fluid>
        <Row className="mb-5">
          <Col lg={12}>
            <Heading
              id="techstack-heading"
              level="h2"
              className="techstack-heading text-center"
              style={{ color: colors.font.primary }}
            >
              Tech Stack
            </Heading>
          </Col>
        </Row>

        <Row className="g-4">
          {techstackData.categories.map((category) => (
            <Col key={category.id} lg={6} md={6} xs={12}>
              <div className="techstack-category p-4 h-100 rounded border" style={{ borderColor: colors.accent.primary, backgroundColor: colors.background.secondary }}>
                <h3 className="category-name mb-3" style={{ color: colors.accent.primary }}>
                  {category.name}
                </h3>
                <div className="skills-list d-flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={`${category.id}-${skill.name}`}
                      className="skill-badge"
                      style={{
                        backgroundColor: getLevelColor(skill.level),
                        color: '#ffffff',
                        fontSize: '0.875rem',
                        padding: '0.5rem 0.75rem',
                      }}
                    >
                      {skill.name} <span className="skill-level">({skill.level})</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Section>
  );
}
