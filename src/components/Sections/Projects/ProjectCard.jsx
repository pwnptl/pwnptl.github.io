import { CardContainer, CardItem } from '@ui';
import { getColors } from '@theme/colors';

export function ProjectCard({ id, title, image, description, url }) {
  const colors = getColors();

  return (
    <CardContainer>
      <CardItem
        id={id}
        image={image}
        imageAlt={title}
        imageHeight="240px"
        title={title}
        body={description}
        style={{
          backgroundColor: colors.background.secondary,
          borderColor: colors.background.border || '#e0e0e0',
          border: '1px solid',
        }}
        footer={
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm"
            style={{
              backgroundColor: colors.accent.primary,
              borderColor: colors.accent.primary,
              color: colors.navbar.text,
            }}
          >
            Click to View
          </a>
        }
      />
    </CardContainer>
  );
}

export default ProjectCard;
