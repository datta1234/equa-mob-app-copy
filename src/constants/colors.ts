// import { lighten } from 'polished';

const COLORS = {
  // Delta Colors
  WHITE: '#fff',
  BLACK: '#000',
  NAVY: '#1D3347',

  ACCENT: '#50CB99',
  GREEN: '#50CB99',
  GREEN2: '#81EFC3',
  GREEN3: '#A7E5CC',
  GREEN4: '#9BC741',
  GREEN5: '#17BF5F',
  GREEN6: '#D3F2E6',

  RED: '#FF9696',
  RED2: '#F14040',
  PINK: '#F24D81',
  YELLOW: '#FFD831',
  ORANGE: '#F87C2A',
  ORANGE2: '#FFB890',
  ORANGE3: '#F48242',
  BLUE: '#93C4FF',
  BLUE2: '#C6E8E9',
  BLUE3: '#3C8CEB',
  TEAL: '#1BA3A6',
  TEAL2: '#8DD1D3',

  GRAY: '#3F5263',
  GRAY1: '#73808C',
  GRAY2: '#8D98A2',
  GRAY3: '#C9CDD1',
  GRAY4: '#E9EBED',
  GRAY5: '#F4F4F4', // use for #F1F1F1
  GRAY6: '#F6F7F8',

  // JR Colors
  LIGHT_GRAY: '#F4F4F4',
  LIGHT_GRAY1: '#E0E0E0',
  DARK: 'rgb(45, 45, 45)',
  DARK_ACCENT: 'rgb(30, 30, 30)',
  DARK_SECONDARY: '#212121',
};

export const text = {
  primary: COLORS.NAVY,
  secondary: COLORS.GRAY,
  tertiary: COLORS.GRAY3,
  info: COLORS.GRAY1,
  label: COLORS.GRAY2,
  light: COLORS.WHITE,
  lightSecondary: COLORS.GRAY5,
  accent: COLORS.GREEN,
  highlight: COLORS.TEAL,
  error: COLORS.RED2,
};
export const background = {
  primary: COLORS.GRAY6,
  secondary: COLORS.WHITE,
  tertiary: COLORS.GRAY5,
  contrast: COLORS.GRAY4,
  dark: COLORS.NAVY,
  accent: COLORS.GREEN,
  warning: COLORS.RED2,
  clear: 'transparent',
  linear: [COLORS.ACCENT, COLORS.TEAL],
};
export const buttons = {
  primary: COLORS.GREEN,
  primaryDisabled: COLORS.GREEN3,
  secondary: COLORS.TEAL,
  secondaryDisabled: COLORS.TEAL2,
  secondaryOutlined: COLORS.TEAL2,
  warning: COLORS.RED2,
  clear: 'transparent',
  dark: COLORS.NAVY,
  light: COLORS.WHITE,
  linear: [COLORS.ACCENT, COLORS.TEAL],
};

export const icons = {
  primary: COLORS.GREEN,
  secondary: COLORS.TEAL,
  tertiary: COLORS.GRAY2,
  dark: COLORS.NAVY,
  light: COLORS.WHITE,
  clear: 'transparent',
};
export const toggle = {
  active: COLORS.GREEN,
  inactive: COLORS.GRAY3,
  disabled: COLORS.GRAY4,
  thumbActive: COLORS.WHITE,
  thumbInactive: COLORS.WHITE,
};

export const checkbox = {
  border: COLORS.GRAY2,
  borderDisabled: COLORS.GRAY3,
  borderSelected: COLORS.GREEN,
  borderSelectedDisabled: COLORS.GRAY3,
  background: COLORS.WHITE,
  backgroundDisabled: COLORS.WHITE,
  backgroundSelected: COLORS.GREEN,
  backgroundSelectedDisabled: COLORS.GRAY3,
  tick: COLORS.WHITE,
  tickDisabled: COLORS.WHITE,
};
export const status = {
  info: COLORS.BLUE3,
  warning: COLORS.ORANGE3,
  error: COLORS.RED2,
  success: COLORS.GREEN5,
};

export const indicator = {
  primary: COLORS.GREEN,
  secondary: COLORS.TEAL,
  tertiary: COLORS.GRAY2,
  dark: COLORS.NAVY,
  light: COLORS.WHITE,
};

export const progressBar = {
  accent: COLORS.ACCENT,
  active: COLORS.WHITE,
  inActive: COLORS.GRAY1,
};

export const activity = {
  travel: COLORS.YELLOW,
  food: COLORS.ORANGE,
  purchase: COLORS.GREEN4,
  home: COLORS.PINK,
  activityOverAverage: COLORS.NAVY,
  noAverageActivity: COLORS.GRAY4,
  locationAverage: COLORS.GRAY3,
  locationAverageBorder: COLORS.GRAY3,
  activityLabel: COLORS.NAVY,
  activityEmptyLabel: COLORS.GRAY,
  default: COLORS.TEAL2,
  light: COLORS.WHITE,
};

const colors = {
  //New
  ...COLORS,
  buttons,
  text,
  background,
  icons,
  toggle,
  activity,
  progressBar,
  indicator,
  status,
  withAlpha(name = 'WHITE', opacity = 1, type) {
    if (!colors[name]) {
      colors.prop = 'WHITE';
    }

    const color = type ? colors[type][name] : COLORS[name];

    return color.split(', 1)').join(`, ${opacity})`);
  },

  // new colors

  FONTS: {
    PRIMARY: '#1D3347',
    SECONDARY: '#73808C',
    TERTIARY: '#fff',
    ACCENT: '#50CB99',

    LIGHT_PRIMARY: '#fff',
    LIGHT_SECONDARY: '#8D98A2',
    LIGHT_TERTIARY: '#fff',
    LIGHT_ACCENT: '#50CB99',
  },

  //OLD

  // LIGHT_GRAY: lighten(0.37, 'rgb(150, 150, 150)'),
  // GRAY2: 'rgba(150, 150, 150, 0.85)',
  SUCCESS: '#66BB6A',
  FAILURE: '#dc3545',
  DASHBOARD: {
    BACKGROUND: 'rgb(45, 45, 45)',
    DARK_BACKGROUND: 'rgb(30, 30, 30)',
    TEXT: 'rgb(255, 255, 255)',
    ADDITIONAL_TEXT: 'rgba(255, 255, 255, 0.35)',
  },
  SIGN_IN_SCREEN: {
    BACKGROUND: '#1D3347',
  },
};

export default colors;
