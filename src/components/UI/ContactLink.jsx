import {getColors} from '@theme/colors';


export function ContactLink({icon: Icon, label, url, id, size = 28, ...props}) {
  const colors = getColors();
  return (
    <a
      id={id}
      href={url}
      className="contact-link"
      style={{
        backgroundColor: colors.background.primary,
        borderColor: colors.background.border
      }}
      target={url.startsWith('mailto:') || url.startsWith('tel:') ? '_self' : '_blank'}
      rel={url.startsWith('mailto:') || url.startsWith('tel:') ? '' : 'noopener noreferrer'}
      title={label}
      {...props}
    >
      <Icon size={size}/>
    </a>
  );
}
