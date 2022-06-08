import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
  size?: number;
}

function SvgComponent({ size = 18, color = colors.WHITE, ...props }: Props) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11.917 16.75h2.5v2.5h-2.5v-2.5zm0-10h2.5v7.5h-2.5v-7.5zM13.155.5C6.255.5.667 6.1.667 13s5.587 12.5 12.488 12.5c6.912 0 12.512-5.6 12.512-12.5S20.067.5 13.154.5zm.012 22.5c-5.525 0-10-4.475-10-10s4.475-10 10-10 10 4.475 10 10-4.475 10-10 10z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
