import { rgba } from 'polished';
import styled from 'styled-components/native';

export const LoaderContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme, mode = 'light' }) =>
    rgba(theme[mode].colors.lightGray, 0.25)};
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
