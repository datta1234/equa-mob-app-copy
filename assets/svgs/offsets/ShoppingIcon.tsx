import * as React from 'react';

import Svg, {
  Circle,
  Path,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={38}
      height={38}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={19} cy={19} r={15} fill="#19868C" />
      <Path
        d="M21.366 19.667c.5 0 .94-.273 1.167-.686l2.386-4.327a.664.664 0 00-.58-.987h-9.866l-.627-1.333h-2.18v1.333h1.333l2.4 5.06-.9 1.627c-.486.893.154 1.98 1.167 1.98h8v-1.333h-8l.733-1.334h4.967zm-6.26-4.666h8.1l-1.84 3.333h-4.68l-1.58-3.333zm.56 8c-.733 0-1.327.6-1.327 1.333s.594 1.333 1.327 1.333 1.333-.6 1.333-1.333-.6-1.333-1.333-1.333zm6.667 0c-.734 0-1.327.6-1.327 1.333s.593 1.333 1.327 1.333c.733 0 1.333-.6 1.333-1.333s-.6-1.333-1.333-1.333z"
        fill="#D3F2E6"
      />
      <Rect
        x={1}
        y={1}
        width={36}
        height={36}
        rx={18}
        stroke="url(#prefix__paint0_linear)"
        strokeWidth={2}
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={0.405}
          y1={3.844}
          x2={62.136}
          y2={51.807}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#91FFEA" />
          <Stop offset={1} stopColor="#A6ED46" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
