export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  id,
  style = {},
  ...props
}) {
  const baseStyles = 'font-medium rounded-lg transition inline-flex items-center justify-center border border-solid';

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600',
    secondary: 'border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-50 hover:bg-slate-50 dark:hover:bg-slate-900',
    ghost: 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 border-transparent',
  };

  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a id={id} href={href} className={classes} style={style} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button id={id} className={classes} style={style} {...props}>
      {children}
    </button>
  );
}
