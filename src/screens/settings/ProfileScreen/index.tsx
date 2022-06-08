import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { Input } from 'react-native-elements';

import Avatar from 'components/Avatar';
import { RootContainer as ScreenContainer } from 'components/Containers';
import { scale } from 'constants/layout';
import useNotification from 'hooks/useNotification';
import {
  SettingsStackNavigationProp,
  SettingsStackRouteProp,
} from 'types/navigation';

import ResetInstructions from './components/ResetInstructions';
import {
  ContentWrapper,
  AvatarSpacer,
  AvatarContainer,
  ResetPasswordButton,
} from './styles';

type Props = {
  route: SettingsStackRouteProp<'ProfileScreen'>;
  navigation: SettingsStackNavigationProp<'ProfileScreen'>;
};

const GET_USER_QUERY_NAME = 'GetUser';
const GET_USER = gql`
  query GetUser {
    ${GET_USER_QUERY_NAME} {
      id
      firstName
      lastName
      emailAddress
      regionId
    }
  }
`;

const GET_REGIONS_QUERY_NAME = 'GetRegions';
const GET_REGIONS = gql`
  query GetRegions {
    ${GET_REGIONS_QUERY_NAME} {
	id
	name
    }
  }
`;

const ResetPassword = () => {
  const showModal = useNotification();

  const showResetInstructions = () => {
    showModal({
      modalType: 'drawer',
      renderNode: ResetInstructions,
    });
  };

  return <ResetPasswordButton onPress={showResetInstructions} />;
};

const avatarSize = scale(82);

const defaultProps = {};
function ProfileScreen({}: Props) {
  const { data: userResponse } = useQuery(GET_USER, {});
  const { data: regionsResponse } = useQuery(GET_REGIONS, {});

  const user = userResponse?.[GET_USER_QUERY_NAME] || {};
  const regions = regionsResponse?.[GET_REGIONS_QUERY_NAME] || [];

  const usersRegion =
    regions?.find((item) => item.id === user.regionId)?.name || '';

  return (
    <ScreenContainer
      back
      header={<AvatarSpacer size={avatarSize / 2} />}
      title={'PROFILE DETAILS'}>
      <ContentWrapper>
        <AvatarContainer avatarSize={avatarSize}>
          <Avatar size={avatarSize} color={'dark'} />
        </AvatarContainer>
        <AvatarSpacer size={avatarSize / 2 + 20} />
        <Input
          placeholder="First name"
          label="FIRST NAME"
          value={user?.firstName}
          editable={false}
          //   onChangeText={}
        />
        <Input
          placeholder="Last name"
          label="LAST NAME"
          value={user?.lastName}
          editable={false}
          //   onChangeText={}
        />
        <Input
          label="EMAIL"
          placeholder="Email"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          value={user?.emailAddress}
          editable={false}
          //   onChangeText={}
        />
        <Input
          label="REGION"
          placeholder="UK"
          value={usersRegion}
          editable={false}
          //   onChangeText={}
        />
      </ContentWrapper>
      <ResetPassword />
    </ScreenContainer>
  );
}
ProfileScreen.defaultProps = defaultProps;
export default ProfileScreen;
