import { Section, Heading } from '@ui';
import { ProjectCard } from './ProjectCard';
import { getColors } from '@theme/colors';
import projectsData from '@data/projects.json';
import './ProjectsSection.css';

export default function ProjectsSection() {
  const colors = getColors();

  return (
    <Section id="projects-section" className="projects-section">
      <Heading
        id="projects-heading"
        level="h2"
        className="projects-heading"
        style={{ color: colors.font.primary }}
      >
        Projects
      </Heading>
      <div className="projects-grid">
        {projectsData.projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            image={project.image}
            description={project.description}
            url={project.url}
          />
        ))}
      </div>
    </Section>
  );
}
