export function ContactLink({ icon: Icon, label, url, id, size = 28, ...props }) {
  return (
    <a
      id={id}
      href={url}
      className="contact-link"
      target={url.startsWith('mailto:') || url.startsWith('tel:') ? '_self' : '_blank'}
      rel={url.startsWith('mailto:') || url.startsWith('tel:') ? '' : 'noopener noreferrer'}
      title={label}
      {...props}
    >
      <Icon size={size} />
    </a>
  );
}
