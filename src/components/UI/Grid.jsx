export function Grid({ cols = 3, children, className = '' }) {
  const colsMap = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  };

  return (
    <div className={`grid ${colsMap[cols]} gap-6 ${className}`}>
      {children}
    </div>
  );
}
