import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}
function SvgComponent({ color = colors.WHITE, ...props }: Props) {
  return (
    <Svg
      width={11}
      height={11}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11 6.286H6.286V11H4.714V6.286H0V4.714h4.714V0h1.572v4.714H11v1.572z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
