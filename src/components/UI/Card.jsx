export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-lg transition p-6 ${className}`}>
      {children}
    </div>
  );
}
