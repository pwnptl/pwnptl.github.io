import { MdEmail, MdPhone } from 'react-icons/md';
import { FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Heading, Text, ContactLink } from '@ui';
import { getColors } from '@theme/colors';
import { useTheme } from '@theme/ThemeContext';
import contactData from '@data/contact.json';
import './Contact.css';

const iconMap = {
  MdEmail,
  MdPhone,
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
};

export default function Contact() {
  const { theme } = useTheme();
  const colors = getColors();

  return (
    <section id="contact-section" className="contact-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10} xs={12} className="contact-content">
            <Heading
              id="contact-heading"
              level="h2"
              style={{ color: colors.font.primary }}
              className="contact-heading"
            >
              Hey, connect with me 👋
            </Heading>
            <Text
              id="contact-subtitle"
              style={{ color: colors.font.secondary }}
              className="contact-subtitle"
            >
              Reach out and let's collaborate
            </Text>
            <div id="contact-links-container" className="contact-links-container">
              {contactData.contactInfo.map((contact) => {
                const IconComponent = iconMap[contact.icon];
                return (
                  <ContactLink
                    key={contact.id}
                    id={contact.id}
                    icon={IconComponent}
                    label={contact.label}
                    url={contact.url}
                    size={28}
                    style={{ backgroundColor: colors.background.primary, borderColor: colors.background.border}}
                  />
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}




