export function AppWrapper({ children, id, className = '' }) {
  return (
    <div id={id} className={`app-wrapper ${className}`}>
      {children}
    </div>
  );
}
