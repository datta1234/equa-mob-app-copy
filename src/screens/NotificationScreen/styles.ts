import styled from 'styled-components/native';

import { Button, Title as _Title, Text as _Text} from 'components';
import { scaleHeight } from 'constants/layout';

export const AbsPositionClose = styled.View`
  position: absolute;
  top: ${20 + 'px'};
  right: ${20 + 'px'};
  z-index: 20;
  /* align-items: center; */
  /* justify-content: space-between; */
  /* padding-horizontal: 20px; */
  /* padding-top: 5px; */
`;

export const TitleContainer = styled.View`
  padding-top: ${scaleHeight(20) + 'px'};
  width: 100%;
  align-items: center;
`;

export const Title = styled(_Title).attrs({
  center: true,
  level: 2,
  color: 'primary',
})`
  margin-bottom: ${scaleHeight(10) + 'px'};
  width: 100%;
`;
export const SubTitle = styled(_Text).attrs({
  center: true,
  color: 'secondary',
})`
  margin-bottom: ${scaleHeight(10) + 'px'};
  width: 100%;
  max-width: 276px;
`;

export const NodeContainer = styled.View`
  margin-top: ${scaleHeight(10) + 'px'};
`;

export const ButtonsContainer = styled.View`
  min-width: 100px;
`;

export const ActionButton = styled(Button).attrs({})`
  margin-top: ${scaleHeight(20) + 'px'};
`;

export const CancelButton = styled(Button.Clear).attrs({
  text: 'Cancel',
  make: ['bold'],
  fontSize: 'h7',
  color: 'primary',
})`
  padding-top: ${scaleHeight(20) + 'px'};
`;
