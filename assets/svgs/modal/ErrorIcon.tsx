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
      <Circle cx={32} cy={32} r={25} fill="#F14040" />
      <Path
        d="M30.918 35.25h2.167v2.167h-2.167V35.25zm0-8.667h2.167v6.5h-2.167v-6.5zm1.073-5.416c-5.98 0-10.823 4.853-10.823 10.833s4.843 10.833 10.823 10.833c5.99 0 10.844-4.853 10.844-10.833S37.98 21.167 31.99 21.167zm.01 19.5A8.664 8.664 0 0123.335 32 8.664 8.664 0 0132 23.333 8.664 8.664 0 0140.668 32a8.664 8.664 0 01-8.667 8.667z"
        fill="#fff"
      />
      <Rect
        x={1}
        y={1}
        width={62}
        height={62}
        rx={31}
        stroke="#F14040"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default SvgComponent;
