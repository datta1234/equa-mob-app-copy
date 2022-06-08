import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ color = colors.NAVY, ...props }: Props) {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11.276 3.105L3.07 11.311a2.084 2.084 0 00-.546.958l-.813 3.188 3.187-.814c.362-.093.693-.281.958-.546l8.206-8.206"
        stroke={color}
        strokeWidth={1.628}
      />
      <Path stroke={color} strokeWidth={0.521} d="M11.461 3.293l2.414 2.414" />
      <Path stroke={color} strokeWidth={1.085} d="M3.302 11.451l2.415 2.415" />
      <Path
        d="M14.062 5.891l1.021-1.021a1.97 1.97 0 10-2.786-2.786l-1.021 1.021 2.786 2.786z"
        stroke={color}
        strokeWidth={1.628}
      />
    </Svg>
  );
}

export default SvgComponent;
