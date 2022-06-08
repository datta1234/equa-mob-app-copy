import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ color = colors.NAVY, ...props }: Props) {
  return (
    <Svg
      width={15}
      height={16}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11.968 11.234c-.607 0-1.15.24-1.564.614l-5.689-3.31c.04-.184.072-.368.072-.56 0-.19-.032-.374-.072-.558l5.625-3.28c.431.4.998.647 1.628.647a2.39 2.39 0 002.393-2.393A2.39 2.39 0 0011.968 0a2.39 2.39 0 00-2.394 2.394c0 .191.032.375.072.558l-5.625 3.28a2.383 2.383 0 00-1.627-.647A2.39 2.39 0 000 7.979a2.39 2.39 0 002.394 2.393c.63 0 1.196-.247 1.627-.646l5.68 3.319a2.25 2.25 0 00-.063.519 2.332 2.332 0 002.33 2.33 2.332 2.332 0 002.33-2.33 2.332 2.332 0 00-2.33-2.33zm0-9.638a.8.8 0 01.798.798.8.8 0 01-.798.797.8.8 0 01-.798-.797.8.8 0 01.798-.798zm-9.574 7.18a.8.8 0 01-.798-.797.8.8 0 01.798-.798.8.8 0 01.797.798.8.8 0 01-.797.797zm9.574 5.601a.8.8 0 01-.798-.798.8.8 0 01.798-.797.8.8 0 01.798.797.8.8 0 01-.798.798z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
