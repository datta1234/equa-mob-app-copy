import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ color = colors.NAVY, ...props }: Props) {
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M18.045 10.311H10.31v7.734H7.734V10.31H0V7.734h7.734V0h2.577v7.734h7.734v2.577z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
