export default function Container({ children, className = '', id = '' }) {
  return (
    <div id={id} className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
