export function Heading({ level = 'h1', children, className = '', style = {}, ...props }) {
  const sizes = {
    h1: 'text-4xl md:text-5xl lg:text-6xl',
    h2: 'text-3xl md:text-4xl lg:text-5xl',
    h3: 'text-2xl md:text-3xl',
    h4: 'text-xl md:text-2xl',
  };

  const baseStyles = 'font-bold text-slate-900 dark:text-white';
  const classes = `${baseStyles} ${sizes[level]} ${className}`;

  const Component = level;
  return <Component className={classes} style={style} {...props}>{children}</Component>;
}

