import styled from 'styled-components/native';

import Typography from 'components/Typography';
import { scale, scaleHeight } from 'constants/layout';
import { isIOS } from 'utils/helpers';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  /* justify-content: space-between; */
  margin-horizontal: 20px;
  padding-top: ${scaleHeight(25) + 'px'};
  padding-bottom: ${scaleHeight(30) + 'px'};
`;

export const Title = styled(Typography.Title).attrs({
  color: 'primary',
  lineHeightRatio: 1.5,
  level: 2,
})`
  margin-top: ${scaleHeight(20) + 'px'};
  font-weight: 600;
`;

export const SubTitle = styled(Title).attrs({
  color: 'highlight',
})`
  margin-top: 0px;
`;
export const Text = styled(Typography.Text).attrs({
  color: 'primary',
  lineHeightRatio: 1.5,
})`
  margin-top: ${scaleHeight(10) + 'px'};
  margin-bottom: ${scaleHeight(40) + 'px'};
  max-width: 285px;
`;

export const InfoBoxContainer = styled.View`
  align-items: center;
  align-self: stretch;
  /* flex: 1; */
  justify-content: space-between;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.dark};
  border-radius: 15px;
  padding-horizontal: ${scale(22) + 'px'};
  padding-vertical: ${scaleHeight(18) + 'px'};
  margin-horizontal: 20px;
  margin-bottom: ${scaleHeight(20, 5) + 'px'};
  flex-direction: row;
`;
export const InfoTextCont = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 200px;
  padding-right: ${15 + 'px'};
`;

export const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
`;

export const EditText = styled(Typography.Text).attrs({
  color: 'light',
  fontSize: 'h7',
})`
  font-weight: 600;
  margin-right: 7px;
`;

export const InfoText = styled(Typography.Text).attrs({
  color: 'light',
  fontSize: 'h6',
})`
  font-weight: 600;
`;

export const StatusCont = styled.View`
  align-items: center;
  /* align-self: center; */
  /* flex: 1; */
  /* justify-content: space-between; */
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.accent};
  border-radius: 30px;
  padding-horizontal: ${7 + 'px'};
  margin-bottom: -5px;
`;

export const StatusText = styled(Typography.Text).attrs({
  color: 'primary',
  fontSize: isIOS ? 'h6' : 'h7', // workaround for moving status box with margin-bottom: -5px not working on Android
})`
  font-weight: 600;
`;
