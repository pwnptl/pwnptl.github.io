export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`py-16 md:py-24 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
