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
        d="M43.955 25.296A2.302 2.302 0 0041.659 23H23.296A2.302 2.302 0 0021 25.296v13.772a2.302 2.302 0 002.296 2.296h18.363a2.302 2.302 0 002.296-2.296V25.296zm-2.296 0l-9.182 5.738-9.181-5.738h18.363zm0 13.772H23.296V27.591l9.181 5.739 9.182-5.74v11.478z"
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
