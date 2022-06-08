import * as React from 'react';

import Svg, { Color, Path, SvgProps } from 'react-native-svg';

import colors from 'constants/colors';
interface Props extends SvgProps {
  color?: Color;
}

function SvgComponent({ color = colors.WHITE, ...props }: Props) {
  return (
    <Svg
      width={24}
      height={26}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M3.575 7.625a1 1 0 10-1.15 1.635l1.15-1.635zm7.316 6.369l.575-.818-.575.818zm2.218 0l-.575-.818.575.818zm8.466-4.734a1 1 0 00-1.15-1.635l1.15 1.635zm-19.15 0l7.89 5.552 1.151-1.636-7.89-5.551L2.424 9.26zm7.89 5.552a2.913 2.913 0 003.37 0l-1.151-1.636a.913.913 0 01-1.068 0l-1.15 1.636zm3.37 0l7.89-5.552-1.15-1.635-7.891 5.55 1.15 1.637zM5 21.05h14v-2H5v2zm14 0c1.707 0 3-1.444 3-3.11h-2c0 .664-.498 1.11-1 1.11v2zm3-3.11V7.386h-2V17.94h2zm0-10.554c0-1.667-1.293-3.11-3-3.11v2c.502 0 1 .445 1 1.11h2zm-3-3.11H5v2h14v-2zm-14 0c-1.707 0-3 1.443-3 3.11h2c0-.665.498-1.11 1-1.11v-2zm-3 3.11V17.94h2V7.387H2zM2 17.94c0 1.667 1.293 3.11 3 3.11v-2c-.502 0-1-.445-1-1.11H2z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
