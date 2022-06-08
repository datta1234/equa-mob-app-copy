import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';
interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ color = colors.WHITE, ...props }: Props) {
  return (
    <Svg
      width={13}
      height={12}
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M.447 0c-.53-.016-.62.753-.1.859l.96.21c.506 2.426 1.06 4.842 1.595 7.262.044.198.22.34.424.34h7.613c.586.008.586-.877 0-.868H3.674l-.192-.867h7.84c.204 0 .38-.14.424-.34l.96-4.334a.434.434 0 00-.423-.527c-3.317 0-6.634 0-9.95-.002L2.097.615a.434.434 0 00-.331-.334L.533.011a.429.429 0 00-.086-.01zM5.13 8.96c-.633 0-1.156.522-1.156 1.156 0 .633.523 1.156 1.156 1.156.634 0 1.156-.523 1.156-1.156 0-.634-.522-1.157-1.156-1.157zm4.046 0c-.633 0-1.156.522-1.156 1.156 0 .633.523 1.156 1.156 1.156.633 0 1.156-.523 1.156-1.156 0-.634-.523-1.157-1.156-1.157z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
