import Card from 'react-bootstrap/Card';
import './CardItem.css';

export function CardItem({
  id,
  image,
  imageAlt = '',
  imageHeight = '240px',
  title,
  subtitle,
  body,
  footer,
  className = '',
  style = {},
  children,
  ...props
}) {
  return (
    <Card
      id={id}
      className={`card-item ${className}`}
      style={style}
      {...props}
    >
      {image && (
        <Card.Img
          variant="top"
          src={image}
          alt={imageAlt || title}
          className="card-item-img"
          style={{ height: imageHeight, objectFit: 'cover' }}
        />
      )}
      <Card.Body className="card-item-body">
        {title && (
          <Card.Title className="card-item-title">
            {title}
          </Card.Title>
        )}
        {subtitle && (
          <Card.Subtitle className="card-item-subtitle">
            {subtitle}
          </Card.Subtitle>
        )}
        {body && (
          <Card.Text className="card-item-text">
            {body}
          </Card.Text>
        )}
        {children}
      </Card.Body>
      {footer && (
        <Card.Footer className="card-item-footer">
          {footer}
        </Card.Footer>
      )}
    </Card>
  );
}

export default CardItem;
