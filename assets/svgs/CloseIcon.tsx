import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ color = colors.NAVY, ...props }: Props) {
  return (
    <Svg
      width={10}
      height={10}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9.32.939L8.38 0 4.66 3.721.939 0 0 .939l3.721 3.72L0 8.382l.939.938 3.72-3.72 3.722 3.72.938-.938L5.6 4.66 9.318.939z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
