import React from 'react';
import { Linking } from 'react-native';

import CheckIcon from 'assets/svgs/offsets/CheckIcon';
import { RootContainer as ScreenContainer } from 'components/Containers';
import { ClickableText } from 'components/Typography';
import links from 'constants/links';
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
  CancelButton,
} from './purchaseAgreement.styles';

type Props = {
  route: OffsetStackRouteProp<'ConfirmSubscriptionScreen'>;
  navigation: OffsetStackNavigationProp<'ConfirmSubscriptionScreen'>;
};

const screenTitle = 'CONFIRM SUBSCRIPTION';
const title = 'Purchase Subscription \nAgreement';

const defaultProps = {};
const PurchaseAgreement = ({ route }: Props) => {
  const setTermsAgreed = route?.params?.setTermsAgreed;
  const goTo = useOffsetNav();

  const onAgreeHandler = () => {
    setTermsAgreed?.(true);
    goTo.back();
  };

  const onDenyHandler = () => {
    setTermsAgreed?.(false);
    goTo.back();
  };

  return (
    <ScreenContainer center title={screenTitle}>
      <Container>
        <CheckIcon />
        <Title center>{title}</Title>
        <Text center>
          {
            'By clicking [Agree] below you (i) confirm that you have received and carefully read the '
          }
          <ClickableText
            size={'small'}
            make={['underline']}
            color={'primary'}
            //customStyle={s.policyText}
            text={'revocation information'}
            onPress={() => {
              Linking.openURL(links.revocationInformation);
            }}
          />
          {
            ', (ii) agree that your subscription shall commence during the revocation period and (iii) confirm you understand that you will lose your revocation right upon full performance of the services during the first subscription interval.'
          }
        </Text>
      </Container>
      <FooterContainer>
        <AgreeButton onPressHandler={onAgreeHandler}>{'Agree'}</AgreeButton>
        <CancelButton onPress={onDenyHandler}>{'Decline'}</CancelButton>
      </FooterContainer>
    </ScreenContainer>
  );
};

PurchaseAgreement.defaultProps = defaultProps;
export default PurchaseAgreement;
