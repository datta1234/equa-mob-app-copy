import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';
interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ color = colors.WHITE, ...props }: Props) {
  return (
    <Svg
      width={14}
      height={11}
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6.973.001A.242.242 0 006.83.07L.653 6.088a.23.23 0 00.001.33.244.244 0 00.168.068h1.305v4.28c0 .13.108.233.24.234h9.266a.237.237 0 00.24-.233v-4.28h1.304c.133-.001.24-.106.24-.236a.23.23 0 00-.07-.163L11.84 4.62V2.612a.237.237 0 00-.24-.233h-1.018a.237.237 0 00-.24.233v.55L7.17.068a.244.244 0 00-.197-.068z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
