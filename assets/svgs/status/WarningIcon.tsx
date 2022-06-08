import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}
function SvgComponent({ color = colors.WHITE, ...props }: Props) {
  return (
    <Svg
      width={28}
      height={25}
      viewBox="0 0 28 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M14.194 5.487l9.412 16.263H4.781l9.413-16.262zm0-4.987L.444 24.25h27.5L14.194.5zm1.25 17.5h-2.5v2.5h2.5V18zm0-7.5h-2.5v5h2.5v-5z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
