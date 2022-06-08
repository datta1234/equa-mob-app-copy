import styled, { css } from 'styled-components/native';

import StyledImage from 'components/StyledImage';
import { scale } from 'constants/layout';

export const ImageContainer = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.primary};

  height: 155px;
  position: relative;

  ${({ isHorizontal, width }) =>
    isHorizontal
      ? css`
          border-radius: 5px;
          height: ${scale(width) + 'px'};
          width: ${scale(width) + 'px'};
          margin-left: 10px;
          margin-top: 10px;
          margin-bottom: 10px;
        `
      : css`
          width: ${width + 'px'};
        `}
`;

export const Image = styled(StyledImage).attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
  border-radius: ${(isHorizontal) => (isHorizontal ? 5 : 0) + 'px'};
`;
