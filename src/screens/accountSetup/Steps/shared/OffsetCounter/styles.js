import styled from 'styled-components/native';

import { Typography } from 'components';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  padding: 0;
  align-self: flex-start;
`;

export const OffsetValue = styled(Typography.Title)`
  font-size: 42;
  margin-bottom: -6;
`;

export const HintWrapper = styled.View`
  margin-top: 10;
`;
