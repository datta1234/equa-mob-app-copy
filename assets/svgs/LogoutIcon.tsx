import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}
function SvgComponent({ color = colors.WHITE, ...props }: Props) {
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M14.483 5.51l-1.398 1.397 1.566 1.577H6.55v1.983h8.102l-1.567 1.567 1.398 1.408 3.967-3.966-3.967-3.967zm-11.9-2.976h6.942V.551H2.583A1.99 1.99 0 00.6 2.534v13.883a1.99 1.99 0 001.983 1.984h6.942v-1.984H2.583V2.534z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
