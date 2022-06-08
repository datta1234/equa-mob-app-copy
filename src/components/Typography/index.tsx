import React from 'react'
import { TouchableOpacity, Text as RNText, View } from 'react-native'
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native'

import PropTypes from 'prop-types'
import { mergeDeepLeft, mergeAll, __, map } from 'ramda'

import colors from 'constants/colors'
import { getInOr } from 'utils/ramda'

import { StyledTitle, StyledText } from './style'

interface TypographyBaseProps {
  text?: string
  children?: React.ReactNode
}
type StyledTextProps = typeof StyledTitle.defaultProps;
type StyledTitleProps = typeof StyledTitle.defaultProps;

export type TextProps = StyledTextProps & TypographyBaseProps
export type TitleProps = StyledTitleProps & TypographyBaseProps
export type ClickableTextProps = TextProps & {
  text?: string
  children?: React.ReactNode
  disabled?: boolean
  containerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<TextStyle>
  activeOpacity?: number
  onPress?: (event: GestureResponderEvent) => void
  onLongPress?: (event: GestureResponderEvent) => void
  onPressIn?: (event: GestureResponderEvent) => void
  onPressOut?: (event: GestureResponderEvent) => void
  make?: (keyof typeof styles)[]
}

const Text = ({ text, children, ...rest }: TextProps) => (
  <StyledText {...rest}>{children ?? text}</StyledText>
)
const Title = ({ text, children, ...rest }: TitleProps) => (
  <StyledTitle {...rest}>{children ?? text}</StyledTitle>
)

const defaultProps = {
  type: 'h1',
  theme: 'light',
}

function Typography({ type, children, theme, style }) {
  const internalStyle = mergeDeepLeft(
    getInOr({}, theme, themeStyles),
    getInOr({}, type, styles),
  )

  return <RNText style={[internalStyle, style]}>{children}</RNText>
}

Typography.defaultProps = defaultProps

const ClickableText = ({
  text,
  children,
  disabled,
  containerStyle,
  style,
  activeOpacity = 0.5,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  make = [],
  ...other
}: ClickableTextProps) => {
  const internalStyle = mergeAll(map(getInOr({}, __, styles), make))
  return (
    <View>
      <TouchableOpacity
        style={containerStyle}
        {...{
          activeOpacity,
          onPress,
          onLongPress,
          onPressIn,
          onPressOut,
          disabled,
        }}
        delayPressIn={0}>
        <StyledText style={[internalStyle, style]} {...other}>
          {children ?? text}
        </StyledText>
      </TouchableOpacity>
    </View>
  )
}

Typography.Title = Title
Typography.Text = Text
Typography.ClickableText = ClickableText
export default Typography

export { Text, Title, ClickableText }

// styles
const themeStyles = {
  light: {
    color: colors.DARK_ACCENT,
  },
  dark: {
    color: colors.WHITE,
  },
}

const defaultStyles = {
  h1: {
    fontSize: 26,
    marginVertical: 12,
    fontWeight: '600',
  },
  h2: {
    fontSize: 22,
    marginVertical: 8,
    fontWeight: '500',
  },
  h3: {
    fontSize: 18,
    marginVertical: 8,
    fontWeight: '500',
  },
  h5: {
    fontSize: 14,
    marginVertical: 2,
    fontWeight: '500',
  },
  h6: {
    fontSize: 12,
    marginVertical: 2,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    opacity: 0.85,
    lineHeight: 21,
  },
  subtitle: {
    fontSize: 14,
    opacity: 1,
    lineHeight: 20,
    fontWeight: '500',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  bold: {
    fontWeight: 'bold',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
}

const styles = {
  ...defaultStyles,
}
