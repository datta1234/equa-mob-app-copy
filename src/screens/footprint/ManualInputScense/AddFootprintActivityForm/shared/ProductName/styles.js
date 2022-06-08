import styled from 'styled-components/native';

import Typography from 'components/Typography';

export const Container = styled.View`
  padding-horizontal: 10px;
`;

export const ProductNameText = styled(Typography.Text).attrs({
  center: true,
})`
  color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark};
  text-transform: capitalize;
`;
