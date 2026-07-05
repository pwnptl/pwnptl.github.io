import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Heading, Text, Button } from '@ui';
import { getColors } from '@theme/colors';
import { useTheme } from '@theme/ThemeContext';
import heroData from '@data/hero.json';
import './HeroSection.css';

export default function HeroSection() {
  const { theme } = useTheme();
  const colors = getColors();

  return (
    <section id="hero-section" className="hero-section">
      <Container fluid>
        <Row className="align-items-center h-100">
          <Col lg={8} md={10} xs={12} className="hero-content">
            <Heading
              id="hero-title"
              level="h1"
              style={{ color: colors.font.primary }}
              className="hero-title"
            >
              {heroData.hero.title}
            </Heading>
            <Heading
              id="hero-subtitle"
              level="h2"
              style={{ color: colors.accent.primary }}
              className="hero-subtitle"
            >
              {heroData.hero.subtitle}
            </Heading>
            <Text
              id="hero-description"
              style={{ color: colors.font.secondary }}
              className="hero-description"
            >
              {heroData.hero.description}
            </Text>
            <Button
              id="hero-cta-btn"
              href={heroData.hero.cta.url}
              style={{
                backgroundColor: colors.accent.primary,
                color: colors.navbar.text,
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = colors.accent.hover)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = colors.accent.primary)}
              className="hero-cta-btn"
            >
              {heroData.hero.cta.label}
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
