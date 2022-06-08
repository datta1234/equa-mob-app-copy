import 'react-native-svg';

declare module 'react-native-svg' {
  export interface SvgProps {
    xmlns?: string; //see open issue https://github.com/react-native-svg/react-native-svg/issues/1638
    xmlnsXlink?: string;
  }
}
