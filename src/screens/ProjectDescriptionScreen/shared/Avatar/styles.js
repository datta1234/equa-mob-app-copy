import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

export const StyledFastImage = styled(FastImage).attrs(({ url }) => ({
  resizeMode: FastImage.resizeMode.contain,
  source: {
    priority: FastImage.priority.normal,
    uri: url,
  },
}))`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark};
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border-width: 1px;
  border-color: ${({ theme, mode = 'light' }) => theme[mode].colors.mediumGray};
`;
