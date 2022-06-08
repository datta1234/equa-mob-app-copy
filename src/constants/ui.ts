import colors from './colors';

export const shadow = {
  primary: {
    shadowColor: colors.NAVY,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  secondary: {
    shadowColor: colors.NAVY,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  portfolioCard: {
    shadowColor: colors.NAVY,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 5,
  },
};

export type FontSize = keyof typeof _fontSize
export type FontSizeLevel = keyof typeof fontSize.title
export type FontSizeSize = keyof typeof fontSize.text

const _fontSize = {
  h1: 40,
  h2: 34,
  h3: 28,
  h4: 24,
  h5: 20,
  h6: 16,
  h7: 14,
  h8: 12,
  h9: 10,
}
export const fontSize = {
  ..._fontSize,
  title: {
    1: 24,
    2: 20,
    3: 18,
    4: 16,
    5: 14,
    6: 12,
    7: 10,
  },
  text: {
    big: 20,
    normal: 16,
    small: 14,
    tiny: 12,
  },
};

export const elementSize = {
  TEXT: {
    BIG: 18,
    NORMAL: 16,
    SMALL: 12,
  },
  INPUT: {
    LABEL: fontSize.h9,
    TEXT: fontSize.h6,
  },
  DROPDOWN: {
    LIST: fontSize.h8,
    LABEL: fontSize.h6,
  },
};

//default font
export const font = {
  fontFamily: 'JosefinSans-Regular',
  fontSize: fontSize.h6,
  fontWeight: '400',
  color: colors.text.primary,
};

export default {
  colors,
  ...elementSize,
  fontSize,
  shadow,
};
