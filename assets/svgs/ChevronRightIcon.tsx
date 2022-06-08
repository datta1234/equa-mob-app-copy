import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}
function SvgComponent({ color = colors.GRAY1, ...props }: Props) {
  return (
    <Svg
      width={6}
      height={10}
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M0 1.14l3.703 3.711L0 8.562l1.14 1.14 4.851-4.85L1.14 0 0 1.14z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
