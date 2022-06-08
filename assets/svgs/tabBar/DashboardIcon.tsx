import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
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
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13.27 2.749l2.748 2.749-2.749 2.749-2.749-2.749 2.75-2.749zm-7.442.466v3.886H1.943V3.215h3.885zm9.714 9.714v3.886h-3.885v-3.886h3.885zm-9.714 0v3.886H1.943v-3.886h3.885zM13.27 0L7.771 5.488l5.498 5.498 5.498-5.498L13.27 0zM7.771 1.273H0v7.77h7.771v-7.77zm9.714 9.713H9.714v7.771h7.77v-7.77zm-9.714 0H0v7.771h7.771v-7.77z"
        fill={isActive ? activeColor : color}
      />
    </Svg>
  );
}

export default SvgComponent;
