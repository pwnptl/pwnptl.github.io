import { Section, Heading, Timeline } from '@ui';
import { getColors } from '@theme/colors';
import educationData from '@data/education.json';
import './EducationSection.css';

export default function EducationSection() {
  const colors = getColors();

  return (
    <Section id="education-section" className="education-section">
      <Heading
        id="education-heading"
        level="h2"
        className="education-heading"
        style={{ color: colors.font.primary }}
      >
        Education
      </Heading>
      <Timeline items={educationData} />
    </Section>
  );
}
