import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';

interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ color = colors.WHITE, ...props }: Props) {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10.458.144A.308.308 0 009.99.18L7.108 4.13 5.81 5.86l-.96-1.286c.42-.396.492-1.056.144-1.537L2.893.144A.347.347 0 002.401.07a.347.347 0 00-.072.493L4.058 2.94a.17.17 0 01-.036.228l-.3.217a.17.17 0 01-.228-.036L1.764.96a.347.347 0 00-.492-.072.347.347 0 00-.072.492l1.73 2.378a.17.17 0 01-.037.228l-.3.216a.17.17 0 01-.228-.036L.635 1.79a.347.347 0 00-.491-.072.347.347 0 00-.073.492l2.09 2.882a1.17 1.17 0 001.549.312l1.177 1.68-2.27 3.027a.81.81 0 00.168 1.14c.36.265.877.18 1.14-.192l1.886-2.677 1.885 2.677a.812.812 0 001.141.193.81.81 0 00.168-1.141L6.724 7.084l.768-1.093.264.192A.98.98 0 009.15 5.92l.637-.996a9.213 9.213 0 001.188-2.786 2.084 2.084 0 00-.516-1.993z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
