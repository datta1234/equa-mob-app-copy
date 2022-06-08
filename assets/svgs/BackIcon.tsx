import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ color = colors.NAVY, ...props }: Props) {
  return (
    <Svg
      width={6}
      height={10}
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6 1.438l-3.703 3.71L6 8.86 4.86 10 .009 5.149 4.86.298 6 1.438z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
