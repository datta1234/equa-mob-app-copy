import styled, { DefaultTheme } from 'styled-components/native';

import { FontSizeSize, FontSizeLevel, FontSize } from 'constants/ui';

type StyledText = {
  uppercase?: boolean
  bold?: boolean
  center?: boolean
  left?: boolean
  right?: boolean
  underline?: boolean
  lineHeightRatio?: number
  fontSize?: FontSize
  size?: FontSizeSize
  level?: FontSizeLevel
  mode?: DefaultTheme['mode']
  type?: keyof DefaultTheme['light']['colors']['fonts']
  color?: keyof DefaultTheme[DefaultTheme['mode']]['text']
}
type StyledTitle = StyledText

export const StyledText = styled.Text<StyledText>`
  font-family: 'JosefinSans-Regular';
  font-size: ${({ level, fontSize, size = 'normal', theme }) =>
    fontSize
      ? theme.fontSize[fontSize] + 'px'
      : level
      ? theme.fontSize.title[level] + 'px'
      : theme.fontSize.text[size] + 'px'};
  color: ${({ color, mode = 'light', theme, type = 'secondary' }) =>
    color ? theme[mode].text[color] : theme[mode].colors.fonts[type]};

  text-transform: ${({ uppercase }) => {
    if (uppercase) {
      return 'uppercase';
    }

    return 'none';
  }};

  text-decoration-line: ${({ underline }) => {
    if (underline) {
      return 'underline';
    }

    return 'none';
  }};

  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};

  line-height: ${({
    fontSize,
    lineHeightRatio = 1.2,
    level,
    size = 'normal',
    theme,
  }) => {
    if (lineHeightRatio) {
      return fontSize
        ? Math.round(theme.fontSize[fontSize] * lineHeightRatio) + 'px'
        : level
        ? Math.round(theme.fontSize.title[level] * lineHeightRatio) + 'px' //remove !level from above if you want lineHeight to work with level
        : Math.round(theme.fontSize.text[size] * lineHeightRatio) + 'px';
    }
    return 0 + 'px';
  }};
  text-align: ${({ center, left, right }) =>
    center ? 'center' : right ? 'right' : left ? 'left' : 'auto'};
`;


export const StyledTitle = styled(StyledText).attrs<StyledTitle>(
  ({ level = 1, color = 'primary' }) => ({
    level: level,
    color: color,
  })
)`
  font-family: 'JosefinSans-Medium';
`;

