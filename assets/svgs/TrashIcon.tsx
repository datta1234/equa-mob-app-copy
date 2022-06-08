import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ color = colors.GRAY2, ...props }: Props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10 2L8 3.9H4v1.8h1v13.5c0 .47.191.95.568 1.288.377.34.91.512 1.432.512h10c.522 0 1.055-.172 1.432-.512.377-.339.568-.818.568-1.288V5.7h1V3.9h-4L14 2h-4zM7 5.7h10v13.5H7V5.7zM9 7v11h2V7H9zm4 0v11h2V7h-2z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
