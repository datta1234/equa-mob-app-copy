import React from 'react';

import CheckIcon from 'assets/svgs/offsets/CheckIcon';
import WarningIcon from 'assets/svgs/offsets/WarningIcon';
import { cache } from 'api/client/cache';
import { GET_VIRTUAL_CART } from 'api/operations/queries/getVirtualCart';
import { RootContainer as ScreenContainer } from 'components/Containers';
import {
  OffsetStackNavigationProp,
  OffsetStackRouteProp,
} from 'types/navigation';

import useOffsetNav from '../hooks/useOffsetNav';

import {
  Container,
  Title,
  Text,
  FooterContainer,
  AgreeButton,
} from './paymentNotificationScreen.styles';

type Props = {
  route: OffsetStackRouteProp<'PaymentNotificationScreen'>;
  navigation: OffsetStackNavigationProp<'PaymentNotificationScreen'>;
};

const TYPES = {
  FAILURE: 'failed',
  SUCCESS: 'success',
};

export type PaymentNotificationTypes = keyof typeof TYPES;

const screenTitle = 'AUTO OFFSETS';
const titleSuccess =
  'Your auto-offset subscription was successfully purchased!';
const titleFailure = 'Your auto-offset subscription was unsuccessful!';

const defaultProps = {};
const PaymentNotificationScreen = ({ route }: Props) => {
  const { type, body } = route?.params || {};
  const goTo = useOffsetNav();

  const Icon = type === TYPES.SUCCESS ? CheckIcon : WarningIcon;
  const title = type === TYPES.SUCCESS ? titleSuccess : titleFailure;

  if (type === TYPES.SUCCESS) {
    const cart = cache.readQuery({ query: GET_VIRTUAL_CART });
  }

  return (
    <ScreenContainer center title={screenTitle}>
      <Container>
        <Icon />
        <Title center>{title}</Title>
        {!!body && <Text center>{body}</Text>}
      </Container>
      <FooterContainer>
        <AgreeButton onPressHandler={goTo.dashboard}>
          {'Back to Dashboard'}
        </AgreeButton>
      </FooterContainer>
    </ScreenContainer>
  );
};

PaymentNotificationScreen.defaultProps = defaultProps;
export default PaymentNotificationScreen;
