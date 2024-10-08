import { pxToRem } from '~/logic/utils/styles/pxToRem';

const breakpointValues = {
  xxs: 479,
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1200,
  xl: 1440,
};

type ColorHash = `#${string}`;
type ColorRgba = `rgba(${number},${number},${number},${number})`;

interface SharedColors {
  darken: ColorRgba;
  lighten: ColorRgba;
}
interface ColorModeColors {
  primary: ColorHash;
  background: ColorHash;
  text: ColorHash;
  textAccent: ColorHash;
  success: ColorHash;
  danger: ColorHash;
  warning: ColorHash;
  accentHeavy: ColorHash;
  accentLight: ColorHash;
  smudge: ColorRgba;
}

export type ColorMode = 'light' | 'dark';

const sharedColors: SharedColors = {
  darken: 'rgba(0,0,0,0.5)',
  lighten: 'rgba(255,255,255,0.5)',
};

const darkModeColors: ColorModeColors = {
  primary: '#4392F1',
  background: '#1d1f21',
  text: '#c5c8c6',
  textAccent: '#969896',
  success: '#6fbd68',
  warning: '#e9c47e',
  danger: '#9a4d4d',
  accentHeavy: '#2a3c3e',
  accentLight: '#505253',
  smudge: 'rgba(255,255,255,0.1)',
};

const darkModeFilters = {
  brightnessMod: 1.2,
  ...sharedColors,
};

const lightModeColors: ColorModeColors = {
  primary: '#3C91E6',
  background: '#fafafa',
  text: '#41413e',
  textAccent: '#4d4d4c',
  success: '#00784e',
  warning: '#c29e3b',
  danger: '#db0033',
  accentHeavy: '#adadad',
  accentLight: '#e8e8e8',
  smudge: 'rgba(0,0,0,0.05)',
};

const lightModeFilters = {
  brightnessMod: 0.8,
  ...sharedColors,
};

const theme = {
  breakpointValues,
  breakpoints: {
    xxs: `@media only screen and (max-width: ${breakpointValues.xxs}px)`,
    xs: `@media only screen and (min-width: ${breakpointValues.xs}px)`,
    sm: `@media only screen and (min-width: ${breakpointValues.sm}px)`,
    md: `@media only screen and (min-width: ${breakpointValues.md}px)`,
    lg: `@media only screen and (min-width: ${breakpointValues.lg}px)`,
    xl: `@media only screen and (min-width: ${breakpointValues.xl}px)`,
  },
  spacing: {
    0: pxToRem(0),
    2: pxToRem(2),
    4: pxToRem(4),
    8: pxToRem(8),
    10: pxToRem(10),
    12: pxToRem(12),
    16: pxToRem(16),
    20: pxToRem(20),
    24: pxToRem(24),
    32: pxToRem(32),
    40: pxToRem(40),
    48: pxToRem(48),
    64: pxToRem(64),
    80: pxToRem(80),
    96: pxToRem(96),
    128: pxToRem(128),
  },
  borderWidth: {
    1: pxToRem(1),
    3: pxToRem(3),
  },
  borderRadius: {
    2: pxToRem(2),
    4: pxToRem(4),
    round: '50%',
    200: pxToRem(200),
  },
  fontSize: {
    caption: pxToRem(10),
    subBody: pxToRem(14),
    body: pxToRem(18),
    title: pxToRem(36),
    10: pxToRem(10),
    14: pxToRem(14),
    16: pxToRem(16),
    18: pxToRem(18),
    20: pxToRem(20),
    24: pxToRem(24),
    32: pxToRem(32),
    40: pxToRem(40),
    56: pxToRem(56),
    64: pxToRem(64),
  },
  fontFamily: {
    normal: '"Inconsolata", sans-serif',
    decorative: "'Uchen', garamond",
  },
  lineHeight: {
    normal: 1.2,
  },
  fontWeight: {
    light: 200,
    regular: 400,
    bold: 700,
    black: 800,
  },
};

export const lightTheme = {
  ...theme,
  colors: lightModeColors,
  filters: lightModeFilters,
  mode: 'light' as ColorMode,
};
export const darkTheme = {
  ...theme,
  colors: darkModeColors,
  filters: darkModeFilters,
  mode: 'dark' as ColorMode,
};

// All keys should be the same, so we can just type the theme obj as any of the themes
export type ThemeShape = typeof lightTheme;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Theme extends ThemeShape {}

export const themes: Record<ColorMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};
