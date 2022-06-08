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
      width={64}
      height={64}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect x={7} y={7} width={50} height={50} rx={25} fill="#19868C" />
      <Path
        d="M25.587 33.39l-1.009-1.007a8.471 8.471 0 008.468 8.038c4.662 0 8.467-3.805 8.467-8.467 0-4.662-3.805-8.467-8.467-8.467-2.293 0-4.46.907-6.073 2.545l-.53.53-1.058-1.034.53-.53A9.889 9.889 0 0133.044 22C38.54 22 43 26.46 43 31.954c0 5.494-4.46 9.954-9.954 9.954-5.343 0-9.728-4.233-9.954-9.55l-1.034 1.033L21 32.332l2.823-2.822 2.822 2.822-1.058 1.059zm10.76-4.132v1.26h1.487v6.728h-9.602v-6.728h1.487v-1.26a3.313 3.313 0 013.302-3.302c1.814 0 3.326 1.487 3.326 3.302zm-5.116 1.26h3.63v-1.26a1.807 1.807 0 00-1.815-1.815 1.807 1.807 0 00-1.815 1.815v1.26zm5.116 1.512h-6.602v3.73h6.602v-3.73z"
        fill="#C6E8E9"
      />
      <Rect
        x={1}
        y={1}
        width={62}
        height={62}
        rx={31}
        stroke="url(#prefix__paint0_linear)"
        strokeWidth={2}
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={0.683}
          y1={6.473}
          x2={104.649}
          y2={87.254}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#91FFEA" />
          <Stop offset={1} stopColor="#A6ED46" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
