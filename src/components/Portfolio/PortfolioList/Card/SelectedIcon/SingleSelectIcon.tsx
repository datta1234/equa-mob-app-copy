import { scale } from 'constants/layout';
import * as React from 'react';
import Svg, {
  Rect,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

function SvgComponent({ size = 52, ...props }) {
  return (
    <Svg
      width={scale(size)}
      height={scale(size)}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect width={52} height={52} rx={26} fill="#fff" />
      <Circle
        cx={26.001}
        cy={25.999}
        r={19.595}
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M23.467 29.524l-3.522-3.522-1.199 1.19 4.721 4.722 10.136-10.135-1.191-1.191-8.945 8.936z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={7.295}
          y1={6.404}
          x2={7.922}
          y2={23.309}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#50CB99" />
          <Stop offset={1} stopColor="#1BA3A6" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
