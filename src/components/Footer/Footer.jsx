import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Contact from '@sections/Contact/Contact';
import { getColors } from '@theme/colors';
import { useTheme } from '@theme/ThemeContext';
import './Footer.css';

export default function Footer() {
  const { theme } = useTheme();
  const colors = getColors();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="footer" style={{ backgroundColor: colors.background.secondary }}>
      <Container>
        <Row>
          <Col xs={12}>
            <Contact />
          </Col>
        </Row>
        <Row className="footer-bottom">
          <Col xs={12} className="text-center">
            <p
              className="footer-copyright"
              style={{ color: colors.font.tertiary }}
            >
              &copy; {currentYear} All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

