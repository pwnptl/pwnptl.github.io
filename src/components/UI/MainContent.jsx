export function MainContent({ children, id, className = '' }) {
  return (
    <main id={id} className={`app-main ${className}`}>
      {children}
    </main>
  );
}
