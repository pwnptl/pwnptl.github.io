import { Container, Row, Col } from 'react-bootstrap';
import { Heading, Section, Gallery } from '@ui';
import { getColors } from '@theme/colors';
import { useTheme } from '@theme/ThemeContext';
import galleryData from '@data/gallery.json';
import './GallerySection.ARCHIVED.css';

export default function GallerySectionArchived() {
  const { theme } = useTheme();
  const colors = getColors();

  return (
    <Section id="gallery-section" className="gallery-section">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Heading
              id="gallery-heading"
              level="h2"
              className="gallery-heading"
              style={{ color: colors.font.primary }}
            >
              {galleryData.title} (v1 - ARCHIVED)
            </Heading>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Gallery items={galleryData.photos} />
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
