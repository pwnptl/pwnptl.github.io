import { Container, Row, Col } from 'react-bootstrap';
import { Heading, Section, Timeline } from '@ui';
import { getColors } from '@theme/colors';
import { useTheme } from '@theme/ThemeContext';
import experienceData from '@data/experience.json';
import './ExperienceSection.css';

export default function ExperienceSection() {
  const { theme } = useTheme();
  const colors = getColors();

  return (
    <Section id="experience-section" className="experience-section">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Heading
              id="experience-heading"
              level="h2"
              className="experience-heading"
              style={{ color: colors.font.primary }}
            >
              Experience
            </Heading>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Timeline items={experienceData} />
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
