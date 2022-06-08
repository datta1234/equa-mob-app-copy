import styled, { css } from 'styled-components/native';

import Typography from 'components/Typography';

export const ValueText = styled(Typography.Title).attrs({
  numberOfLines: 1,
})`
  font-size: 62px;
  font-family: 'JosefinSans-Regular';
  line-height: 62px;
`;

export const ModuleText = styled(Typography.Text).attrs({
  // size: 'small',
})``;

export const Container = styled.View`
  /* color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark} */

  align-items: center;
`;
