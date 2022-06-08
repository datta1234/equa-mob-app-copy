import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}
function SvgComponent({ color = colors.GREEN, ...props }: Props) {
  return (
    <Svg
      width={14}
      height={16}
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6.564 16c.903 0 1.641-.739 1.641-1.641H4.923c0 .902.739 1.641 1.641 1.641zm4.923-4.923V6.974c0-2.519-1.337-4.627-3.692-5.185V1.23C7.795.55 7.245 0 6.565 0c-.682 0-1.232.55-1.232 1.23v.559c-2.346.558-3.692 2.658-3.692 5.185v4.103L0 12.717v.822h13.128v-.821l-1.64-1.641zm-1.64.82H3.281V6.974c0-2.035 1.239-3.692 3.282-3.692s3.282 1.657 3.282 3.692v4.923z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
