import * as React from 'react';

import Svg, { Circle, Path, Rect, SvgProps } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={32.5} cy={31.5} r={24.5} fill="#F14040" />
      <Path
        d="M31.742 34.125h1.75v1.75h-1.75v-1.75zm0-7h1.75v5.25h-1.75v-5.25zm.866-4.375c-4.83 0-8.74 3.92-8.74 8.75s3.91 8.75 8.74 8.75c4.84 0 8.76-3.92 8.76-8.75s-3.92-8.75-8.76-8.75zm.01 15.75c-3.868 0-7-3.133-7-7s3.132-7 7-7c3.867 0 7 3.133 7 7s-3.133 7-7 7z"
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
