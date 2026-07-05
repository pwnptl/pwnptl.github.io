export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white',
    primary: 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100',
    success: 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100',
    warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
