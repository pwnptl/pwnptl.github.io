import { Container, Row, Col } from 'react-bootstrap';
import { Heading, Section, Gallery3 } from '@ui';
import { getColors } from '@theme/colors';
import { loadGalleryItems, galleryTitle } from '@ui/Gallery3/loadGalleryItems';
import './Gallery3Section.css';

export default function Gallery3Section() {
  const colors = getColors();
  const items = loadGalleryItems();

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
              {galleryTitle}
            </Heading>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Gallery3
              items={items}
              showScrollbar={true}
              autoScrollSec={3}
              isRandomArrangement={false}
              showChevrons={{ mobile: false, tablet: true, desktop: true }}
            />
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
