import * as React from 'react';

import Svg, { SvgProps, Path, Color } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}

const SvgComponent = ({ color = colors.WHITE, ...props }: Props) => (
  <Svg
    width={21}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      d="M.9.9v14.7"
    />
    <Path
      stroke={color}
      strokeWidth={0.8}
      strokeLinecap="round"
      d="M13.4.4v15.7M20.4.4v15.7M18.4.4v15.7M11.4.4v15.7"
    />
    <Path
      stroke={color}
      strokeWidth={0.5}
      strokeLinecap="round"
      d="M3.25.25v16"
    />
    <Path
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      d="M8.9.9v14.7M5.9.9v14.7"
    />
    <Path stroke={color} strokeWidth={2} strokeLinecap="round" d="M16 1v14.5" />
  </Svg>
);

export default SvgComponent;
