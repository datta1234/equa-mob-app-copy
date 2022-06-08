import styled from 'styled-components/native';

import { Typography } from 'components';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 15px;
`;

export const Title = styled(Typography.Title).attrs({
  fontSize: 'h5',
})``;

export const MoreText = styled(Typography.Text).attrs({
  fontSize: 'h7',
  uppercase: true,
})``;
