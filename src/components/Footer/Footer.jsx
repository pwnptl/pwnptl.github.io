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

  return (
    <footer id="footer" className="footer" style={{ backgroundColor: colors.background.secondary }}>
      <Container>
        <Row>
          <Col xs={12}>
            <Contact />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

