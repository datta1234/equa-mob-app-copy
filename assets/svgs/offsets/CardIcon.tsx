import * as React from 'react';

import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

interface Props extends SvgProps {
  height?: number;
}

const ratio = 92 / 69;
function SvgComponent({ height = 69, ...props }: Props) {
  return (
    <Svg
      width={height * ratio}
      height={height}
      viewBox="0 0 92 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect width={92} height={69} rx={15} fill="#19868C" />
      <Path
        d="M71.294 14H19.831c-1.28 0-2.507.495-3.412 1.376a4.636 4.636 0 00-1.413 3.322v31.32c0 1.246.508 2.44 1.413 3.322a4.892 4.892 0 003.412 1.376h51.463c1.28 0 2.507-.495 3.412-1.376a4.636 4.636 0 001.413-3.322v-31.32a4.636 4.636 0 00-1.413-3.322A4.892 4.892 0 0071.294 14zm1.609 36.018c0 .415-.17.813-.471 1.107a1.63 1.63 0 01-1.138.459H19.831a1.63 1.63 0 01-1.138-.459 1.546 1.546 0 01-.47-1.107v-23.49h54.68v23.49zm0-26.622h-54.68v-4.698c0-.415.169-.814.47-1.107a1.63 1.63 0 011.138-.459h51.463c.427 0 .836.165 1.138.459.301.293.47.692.47 1.107v4.698zM58.428 48.452a4.856 4.856 0 003.217-1.222 4.879 4.879 0 002.474 1.161 4.944 4.944 0 002.723-.341 4.794 4.794 0 002.091-1.733 4.61 4.61 0 00.782-2.563c0-.91-.272-1.8-.782-2.564a4.794 4.794 0 00-2.09-1.733 4.944 4.944 0 00-2.724-.34 4.879 4.879 0 00-2.474 1.16 4.867 4.867 0 00-2.042-1.073 4.951 4.951 0 00-2.32-.02 4.873 4.873 0 00-2.062 1.035 4.7 4.7 0 00-1.326 1.854 4.585 4.585 0 00.538 4.354 4.787 4.787 0 001.74 1.494 4.93 4.93 0 002.255.53zm6.434-6.264c.318 0 .629.092.893.264.264.172.47.416.592.702.122.287.154.601.092.905a1.554 1.554 0 01-.44.802 1.622 1.622 0 01-.824.429c-.312.06-.635.029-.929-.09a1.6 1.6 0 01-.722-.576 1.537 1.537 0 01.2-1.978 1.63 1.63 0 011.138-.458zm-6.433 0c.318 0 .628.092.893.264.264.172.47.416.592.702.122.287.154.601.092.905a1.553 1.553 0 01-.44.802 1.622 1.622 0 01-.824.429 1.65 1.65 0 01-.929-.09 1.6 1.6 0 01-.722-.576 1.536 1.536 0 01.2-1.978 1.63 1.63 0 011.138-.458z"
        fill="url(#prefix__paint0_linear)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={15.658}
          y1={18.118}
          x2={83.117}
          y2={96.792}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#91FFEA" />
          <Stop offset={1} stopColor="#A6ED46" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
