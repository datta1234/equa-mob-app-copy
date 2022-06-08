import React from 'react';

import { MaterialIndicator, PacmanIndicator } from 'react-native-indicators';
import styled from 'styled-components/native';

import Typography from 'components/Typography';
import { colors } from 'constants/';
import { isTestingEnv } from 'utils/helpers';

const Status = styled(Typography.Text).attrs({
  color: 'primary',
  center: true,
  fontSize: 'h6',
})`
  margin-bottom: 30px;
`;
const Container = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
  flex: 1;
`;
const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 100px;
  margin-bottom: 70px;
`;

const SubscriptionLoadingStatus = ({ status }) => {
  return (
    <Container>
      {isTestingEnv && status && (
        <Status>
          {'Payment Status:\n'}
          {status}
        </Status>
      )}

      <LoadingContainer>
        {isTestingEnv ? (
          <PacmanIndicator size={70} color={colors.TEAL} />
        ) : (
          <MaterialIndicator size={60} color={colors.GREEN} />
        )}
      </LoadingContainer>
    </Container>
  );
};

export default SubscriptionLoadingStatus;
