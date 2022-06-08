import styled from 'styled-components/native';

import Typography from 'components/Typography';

export const Container = styled.View`
  padding-top: 24px;
  padding-bottom: 22px;
  padding-horizontal: 30px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const Text = styled(Typography.Text)``;

export const GreetingContainer = styled.View``;
export const GreetingName = styled(Typography.Title).attrs({
  fontSize: 'h3',
})``;

export const WelcomeBackContainer = styled.View`
  border-radius: 20px;
  background-color: #283e53;
  padding-horizontal: 22px;
  padding-vertical: 18px;
`;

export const GetStartedContainer = styled.View`
  align-items: center;
  padding-top: 2px;
  padding-bottom: 3px;
`;

export const GetStartedText = styled(Typography.Text).attrs({
  fontSize: 'h7',
  color: 'lightSecondary',
})`
  padding-bottom: 10px;
`;
