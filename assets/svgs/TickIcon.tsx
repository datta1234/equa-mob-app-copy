import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ color = colors.GREEN, ...props }: Props) {
  return (
    <Svg
      width={13}
      height={11}
      viewBox="0 0 13 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path d="M12 1L4.437 9 1 5.363" stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export default SvgComponent;
