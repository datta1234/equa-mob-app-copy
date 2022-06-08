import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ color = colors.NAVY, ...props }: Props) {
  return (
    <Svg
      width={15}
      height={10}
      viewBox="0 0 15 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9.41.799l4.1 4.1L9.41 9M13.514 4.9H.626"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  );
}

export default SvgComponent;
