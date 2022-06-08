import React from 'react';

import { useNavigation } from '@react-navigation/native';
import ResetIcon from 'assets/svgs/ResetIcon';
import styled from 'styled-components/native';

import { Button, Typography } from 'components';
import QuestionAction from 'components/QuestionAction';
import { scaleHeight } from 'constants/layout';
import useNotification from 'hooks/useNotification';

import useResetPassword from '../hooks/useResetPassword';

const Container = styled.View`
  align-items: center;
  margin-top: ${scaleHeight(10) + 'px'};
`;

const SendButton = styled(Button).attrs({ title: 'Send Instructions' })`
  margin-top: ${scaleHeight(60) + 'px'};
`;

const Instructions = styled(Typography.Text).attrs({
  fontSize: 'h5',
  color: 'primary',
  center: true,
})`
  font-weight: 600;
  margin-top: ${scaleHeight(20) + 'px'};
  max-width: 260px;
`;
const CancelButton = styled(Button.Clear).attrs({
  text: 'Cancel',
  color: 'primary',
})`
  margin-top: ${scaleHeight(20) + 'px'};
  margin-bottom: ${scaleHeight(40) + 'px'};
`;

const ResetInstructions = () => {
  const navigation = useNavigation();
  const showNotification = useNotification({ isAuth: false });

  const [resetPasswordReq, { loading, refetch }] = useResetPassword({
    onCompleted: (data) => {
      // navigation.goBack();
      showNotification({
        type: 'success',
        modalType: 'modal',
        dismiss: true,
        title: data?.ResetPassword?.message,
        renderNode: () => (
          <QuestionAction
            question={"Didn't receive it?"}
            actionText={'Resend'}
            loading={loading}
            onActionPress={() => refetch()}
          />
        ),
      });
    },
  });

  return (
    <Container>
      <ResetIcon />
      <Instructions>
        {'You will be sent an email with instructions to reset your password.'}
      </Instructions>
      <SendButton isLoading={loading} onPressHandler={resetPasswordReq} />
      <CancelButton onPress={navigation.goBack} />
    </Container>
  );
};

export default ResetInstructions;
