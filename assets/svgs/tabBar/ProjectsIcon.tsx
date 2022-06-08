import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color: Color;
  activeColor?: Color;
  isActive?: boolean;
}

function SvgComponent({
  color = colors.WHITE,
  activeColor = colors.GREEN,
  isActive,
  ...props
}: Props) {
  return (
    <Svg
      width={16}
      height={21}
      viewBox="0 0 16 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        //opacity={0.5}
        d="M2.25.916A1.93 1.93 0 00.333 2.833v15.333a1.93 1.93 0 001.917 1.917h11.5a1.93 1.93 0 001.916-1.917v-11.5L9.916.916H2.25zm0 1.917h6.708v4.791h4.792v10.542H2.25V2.833zm1.916 7.666v1.917h7.667v-1.917H4.166zm0 3.834v1.916h7.667v-1.916H4.166z"
        fill={isActive ? activeColor : color}
      />
    </Svg>
  );
}

export default SvgComponent;
