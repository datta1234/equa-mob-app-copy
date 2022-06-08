import styled from 'styled-components/native';

import { scaleHeight } from 'constants/layout';

export const ContentWrapper = styled.View`
  flex: 1;
  margin-horizontal: ${({ withHorizontal = false }) =>
    withHorizontal ? '30px' : 0};
  margin-vertical: ${({ withVertical = true }) => (withVertical ? '30px' : 0)};
`;

export const FormWrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
`;
export const ContentItemWrapper = styled.View`
  justify-content: flex-start;
  margin-horizontal: ${({ withHorizontal = true }) =>
    withHorizontal ? '30px' : 0};
`;
export const EmissionsWrapper = styled.View`
  /* align-items: center; */
  padding-top: ${scaleHeight(20) + 'px'};
  margin-horizontal: ${({ withHorizontal = true }) =>
    withHorizontal ? '30px' : 0};
`;

export const ButtonContainer = styled.View`
  margin-horizontal: ${({ withHorizontal = false }) =>
    withHorizontal ? '30px' : 0};
  padding-top: ${scaleHeight(20) + 'px'};
  padding-bottom: 0px;
`;
