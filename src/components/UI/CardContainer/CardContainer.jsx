import './CardContainer.css';

export function CardContainer({ children, className = '' }) {
  return (
    <div className={`card-container ${className}`}>
      {children}
    </div>
  );
}

export default CardContainer;
