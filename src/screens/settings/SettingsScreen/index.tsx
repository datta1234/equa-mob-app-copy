import React from 'react';

import { RootContainer as ScreenContainer } from 'components/Containers';
import LegalLinks from 'components/Legal';
import {
  SettingsStackNavigationProp,
  SettingsStackRouteProp,
} from 'types/navigation';

import { DeleteUserAction, PermissionsBlock } from './components';
import { Body } from './settings.styles';

type Props = {
  route: SettingsStackRouteProp<'SettingsScreen'>;
  navigation: SettingsStackNavigationProp<'SettingsScreen'>;
};

const defaultProps = {};
function SettingsScreen({}: Props) {
  return (
    <ScreenContainer back title={'SETTINGS'}>
      <Body>
        <PermissionsBlock />
        <DeleteUserAction />
        <LegalLinks />
      </Body>
    </ScreenContainer>
  );
}
SettingsScreen.defaultProps = defaultProps;
export default SettingsScreen;
