import { Container, Row, Col } from 'react-bootstrap';
import { Heading, Section, Gallery3 } from '@ui';
import { getColors } from '@theme/colors';
import { useTheme } from '@theme/ThemeContext';
import galleryData from '@data/gallery.json';
import './Gallery3Section.css';

export default function Gallery3Section() {
  const { theme } = useTheme();
  const colors = getColors();

  return (
    <Section id="gallery3-section" className="gallery3-section">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Heading
              id="gallery3-heading"
              level="h2"
              className="gallery3-heading"
              style={{ color: colors.font.primary }}
            >
              {galleryData.title}
            </Heading>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Gallery3 items={galleryData.photos} />
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
