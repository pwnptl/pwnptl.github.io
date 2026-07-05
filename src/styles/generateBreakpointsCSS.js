import { breakpoints, mediaQueries } from '../theme/breakpoints.js';

const generateBreakpointsCSS = () => {
  return `
:root {
  --breakpoint-xs: ${breakpoints.xs}px;
  --breakpoint-sm: ${breakpoints.sm}px;
  --breakpoint-md: ${breakpoints.md}px;
  --breakpoint-lg: ${breakpoints.lg}px;
  --breakpoint-xl: ${breakpoints.xl}px;
  --breakpoint-xxl: ${breakpoints.xxl}px;
}

/* Desktop styles (default) */
.main-content {
  margin-left: 250px;
}

.mobile-nav-toggle {
  display: none;
}

/* Mobile view - from breakpoints.mediaQueries.mobile */
@media ${mediaQueries.mobile} {
  .main-content {
    margin-left: 0;
  }

  .mobile-nav-toggle {
    display: block !important;
  }

  .navbar-sidebar {
    width: 100%;
    max-width: 250px;
  }
}
  `.trim();
};

export default generateBreakpointsCSS;
