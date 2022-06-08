import React, { useEffect, useState } from 'react';

import { RootContainer as ScreenContainer } from 'components/Containers';
import LegalLinks from 'components/Legal';
import {
  SettingsStackNavigationProp,
  SettingsStackRouteProp,
} from 'types/navigation';

import { Body, InfoText, ClaimButton } from './carbonCode.styles';
import { CarbonCodeInput } from 'components/TextInputs';
import useToggle from 'hooks/useToggle';
import useClaimUserCredit from './hooks/useClaimUserCredit';

type Props = {
  route: SettingsStackRouteProp<'CarbonCodeScreen'>;
  navigation: SettingsStackNavigationProp<'CarbonCodeScreen'>;
};

const carbonCodeInfoText =
  'If you have received a carbon code please enter it below.';

const defaultProps = {};
function CarbonCodeScreen({}: Props) {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dirty, toggleDirty] = useToggle(false);
  const [claimUserCredit, { data, loading }] = useClaimUserCredit({
    //     onCompleted: onCompleted,
  });
  useEffect(() => {
    toggleDirty(!!code);
  }, [code, toggleDirty]);

  useEffect(() => {
    if (data?.success) {
      setCode('');
    }
    if (data?.message) {
      setErrorMessage(data.message);
    }
  }, [data]);

  const claimCredit = () => {
    claimUserCredit({
      variables: {
        voucherCode: code,
      },
    });
  };

  return (
    <ScreenContainer back title={'Carbon Code'}>
      <Body>
        <InfoText>{carbonCodeInfoText}</InfoText>
        <CarbonCodeInput
          value={code}
          onChangeText={(value) => {
            setCode(value);
            setErrorMessage('');
          }}
          errorMessage={errorMessage}
        />
        {dirty && (
          <ClaimButton isLoading={loading} onPressHandler={claimCredit} />
        )}
      </Body>
      <LegalLinks />
    </ScreenContainer>
  );
}

CarbonCodeScreen.defaultProps = defaultProps;
export default CarbonCodeScreen;
