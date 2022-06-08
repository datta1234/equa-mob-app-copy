import * as React from 'react';

import Svg, { Circle, Path, Rect, SvgProps } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={64}
      height={64}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={32} cy={32} r={25} fill="#F48242" />
      <Path
        d="M31.999 24.49l8.157 14.093H23.841L32 24.49zm0-4.323L20.082 40.75h23.833L32 20.167zm1.083 15.166h-2.167V37.5h2.167v-2.167zm0-6.5h-2.167v4.334h2.167v-4.334z"
        fill="#fff"
      />
      <Rect
        x={1}
        y={1}
        width={62}
        height={62}
        rx={31}
        stroke="#F48242"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default SvgComponent;
