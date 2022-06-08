import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ color = colors.WHITE, ...props }: Props) {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12.02 6.75h2.5v2.5h-2.5v-2.5zm0 5h2.5v7.5h-2.5v-7.5zM13.27.5C6.37.5.77 6.1.77 13s5.6 12.5 12.5 12.5 12.5-5.6 12.5-12.5S20.17.5 13.27.5zm0 22.5c-5.513 0-10-4.488-10-10 0-5.513 4.487-10 10-10 5.512 0 10 4.487 10 10 0 5.512-4.488 10-10 10z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
