import * as React from 'react';

import Svg, {
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={50}
      height={50}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect x={5} y={5} width={40} height={40} rx={20} fill="#1BA3A6" />
      <Path
        d="M25 15c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm-8 10c0-.61.08-1.21.21-1.78L21.99 28v1c0 1.1.9 2 2 2v1.93C20.06 32.43 17 29.07 17 25zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1v-2h2c1.1 0 2-.9 2-2v-.41C30.92 18.77 33 21.65 33 25c0 2.08-.81 3.98-2.11 5.4z"
        fill="#C6E8E9"
      />
      <Rect
        x={1}
        y={1}
        width={48}
        height={48}
        rx={24}
        stroke="url(#prefix__paint0_linear)"
        strokeWidth={2}
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={0.533}
          y1={5.057}
          x2={81.757}
          y2={68.167}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#91FFEA" />
          <Stop offset={1} stopColor="#A6ED46" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
