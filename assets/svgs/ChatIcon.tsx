import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ color = colors.WHITE, ...props }: Props) {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13.428.781H1.653A1.573 1.573 0 00.082 2.353v7.533a1.573 1.573 0 001.571 1.573h.17v2.528a.257.257 0 00.424.195l3.194-2.723h7.987a1.573 1.573 0 001.571-1.572V2.353A1.573 1.573 0 0013.428.78zM3.874 7.252a1.133 1.133 0 110-2.266 1.133 1.133 0 010 2.266zm3.667 0a1.133 1.133 0 110-2.266 1.133 1.133 0 010 2.266zm3.666 0a1.133 1.133 0 110-2.266 1.133 1.133 0 010 2.266z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
