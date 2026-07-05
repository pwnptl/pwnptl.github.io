export const breakpoints = {
  xs: 320,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export const isMobileView = (width = window.innerWidth) => width <= breakpoints.md;
export const isTabletView = (width = window.innerWidth) => width > breakpoints.md && width <= breakpoints.lg;
export const isDesktopView = (width = window.innerWidth) => width > breakpoints.lg;

export const mediaQueries = {
  mobile: `(max-width: ${breakpoints.md - 1}px)`,
  tablet: `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
  desktop: `(min-width: ${breakpoints.lg}px)`,
  tabletUp: `(min-width: ${breakpoints.md}px)`,
  desktopUp: `(min-width: ${breakpoints.lg}px)`,
};

