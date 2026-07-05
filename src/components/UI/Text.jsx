export function Text({ variant = 'body', children, className = '' }) {
  const variants = {
    body: 'text-slate-700 dark:text-slate-300',
    muted: 'text-slate-600 dark:text-slate-400',
    light: 'text-slate-500 dark:text-slate-500',
    accent: 'text-blue-600 dark:text-blue-400',
  };

  return (
    <p className={`${variants[variant]} ${className}`}>
      {children}
    </p>
  );
}
