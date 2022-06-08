import React from 'react'
import { Pressable } from 'react-native'

import styled, { DefaultTheme } from 'styled-components/native'

import { svgs } from 'assets'
import { isNotDefined } from 'utils/ramda'

type IconContainerProps = {
  color?: keyof DefaultTheme[DefaultTheme['mode']]['icons']
  size?: number
}

const IconContainer = styled.View<IconContainerProps>`
  background-color: ${({ theme, color }) =>
    color ? theme[theme.mode].icons[color] : 'transparent'};
  height: ${({ size = 35 }) => size + 'px'};
  width: ${({ size = 35 }) => size + 'px'};
  align-items: center;
  justify-content: center;
  border-radius: ${({ size = 35 }) => size + 'px'};
  border-width: 2px;
  border-color: ${({ theme, color }) =>
    color ? theme[theme.mode].icons[color] : 'transparent'};
`

const Icon = ({ size, color, iconColor, type, style }) => {
  const IconSVG = svgs.icons[type]
  return (
    <IconContainer style={style} color={color} size={size}>
      {IconSVG ? <IconSVG color={iconColor} /> : null}
    </IconContainer>
  )
}

const withPressable =
  (WrappedComponent) =>
  ({ onPress, hitSlop, ...props }) => {
    if (isNotDefined(onPress)) {
      return <WrappedComponent {...props} />
    }

    const _hitSlop = {
      bottom: 20,
      left: 20,
      right: 20,
      top: 20,
    }

    return (
      <Pressable hitSlop={hitSlop ?? _hitSlop} onPress={onPress}>
        <WrappedComponent {...props} />
      </Pressable>
    )
  }

const PressableIcon = withPressable(Icon)

export default PressableIcon
