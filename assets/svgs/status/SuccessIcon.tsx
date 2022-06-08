import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ size = 21, color = colors.WHITE, ...props }: Props) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M7.874 14.148L4.224 10.5l-1.242 1.234 4.892 4.891 10.5-10.5-1.234-1.233-9.266 9.257z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
