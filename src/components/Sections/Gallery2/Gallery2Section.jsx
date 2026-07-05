import { Container, Row, Col } from 'react-bootstrap';
import { Heading, Section, Gallery2 } from '@ui';
import { getColors } from '@theme/colors';
import { useTheme } from '@theme/ThemeContext';
import galleryData from '@data/gallery.json';
import './Gallery2Section.ARCHIVED.css';

export default function Gallery2SectionArchived() {
  const { theme } = useTheme();
  const colors = getColors();

  return (
    <Section id="gallery2-section" className="gallery2-section">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Heading
              id="gallery2-heading"
              level="h2"
              className="gallery2-heading"
              style={{ color: colors.font.primary }}
            >
              {galleryData.title} (v2 - ARCHIVED)
            </Heading>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Gallery2 items={galleryData.photos} />
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
