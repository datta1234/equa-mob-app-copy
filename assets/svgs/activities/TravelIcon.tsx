import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';
interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ color = colors.WHITE, ...props }: Props) {
  return (
    <Svg
      width={13}
      height={11}
      viewBox="0 0 13 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12.304 3.168h-.847L10.91 1.46A2.11 2.11 0 008.903 0H4.07c-.915 0-1.734.587-2.007 1.461l-.546 1.707H.669A.67.67 0 000 3.837v.382c0 .369.3.67.67.67H.9a8.627 8.627 0 00-.205 1.87v3.208c0 .369.3.67.67.67h1.12c.368 0 .668-.301.668-.67V8.943h6.692v1.024c0 .369.3.67.669.67h1.12c.368 0 .669-.301.669-.67V6.745c0-.628-.069-1.256-.205-1.87h.232c.369 0 .669-.301.669-.67v-.382a.711.711 0 00-.696-.655zM2.69 3.85l.642-1.993a.787.787 0 01.737-.546h4.834c.342 0 .642.218.738.546l.642 1.993c.027.096-.041.178-.137.178h-7.32c-.095.014-.163-.082-.136-.178zm.765 3.523a.886.886 0 01-.888-.887c0-.492.396-.888.888-.888.491 0 .887.396.887.888.014.491-.396.887-.887.887zm6.063 0a.886.886 0 01-.888-.887c0-.492.396-.888.888-.888.491 0 .887.396.887.888a.886.886 0 01-.887.887z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
