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
      <Circle cx={32} cy={32} r={25} fill="#3C8CEB" />
      <Path
        d="M30.918 26.583h2.167v2.167h-2.167v-2.167zm0 4.334h2.167v6.5h-2.167v-6.5zm1.083-9.75c-5.98 0-10.833 4.853-10.833 10.833s4.853 10.833 10.833 10.833S42.835 37.98 42.835 32 37.98 21.167 32 21.167zm0 19.5c-4.777 0-8.666-3.89-8.666-8.667 0-4.777 3.889-8.667 8.666-8.667 4.778 0 8.667 3.89 8.667 8.667 0 4.778-3.89 8.667-8.667 8.667z"
        fill="#fff"
      />
      <Rect
        x={1.266}
        y={1.266}
        width={61.469}
        height={61.469}
        rx={30.734}
        stroke="#3C8CEB"
        strokeWidth={2.531}
      />
    </Svg>
  );
}

export default SvgComponent;
