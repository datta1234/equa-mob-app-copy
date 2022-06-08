import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme, mode = 'light', isLast, isHorizontal }) => css`
    flex-direction: ${isHorizontal ? 'row' : 'column'};
  `}
`;

export const ItemWrapper = styled.View`
  ${({ theme, mode = 'light', isFirst, isLast, isHorizontal }) => css`
    margin-bottom: ${isLast ? 0 : '15px'};
    margin-bottom: ${isHorizontal ? 0 : '15px'};

    margin-horizontal: ${isHorizontal ? '10px' : 0};

    ${() =>
      isFirst &&
      css`
        margin-left: 0;
      `}

    ${() =>
      isLast &&
      css`
        margin-right: 0;
      `}
  `}
`;
