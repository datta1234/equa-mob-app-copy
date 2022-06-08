import React from 'react';

import { RootContainer as ScreenContainer } from 'components/Containers';
// import Typography from 'components/Typography';
import { BottomTabRouteProp, BottomTabsNavigationProp } from 'types/navigation';
// import { ROOT_NAVIGATOR } from 'constants/routes';
import translator from 'utils/translator';

import { withQuery } from './hocs';
import {
  HeaderBar,
  Footprint,
  // LogActivities,
  CompleteProfileStepIndicator,
  ActivitiesBreakdown,
} from './shared';
import useBroadcast from './shared/Broadcasts/hooks/useBroadcast';
// import ConnectWithGroups from './shared/ConnectWithGroups';
import OffsetProgressBlock from './shared/OffsetProgressBlock';
import SetupIndicator from './shared/SetupIndicator';
import {
  ContentContainer,
  CompleteProfileContainer,
  HeaderContentContainer,
  HeaderContainer,
  OffsetProgressWrapper,
  // ConnectWithGroupsWrapper,
  ActivitiesWrapper,
} from './styles';
// import useRenderCount from 'hooks/useRenderCount';
// import { useWhyDidYouUpdate } from 'hooks';

type Props = {
  route: BottomTabRouteProp<'DashboardScreen'>;
  navigation: BottomTabsNavigationProp<'DashboardScreen'>;
};

const Header = () => (
  <HeaderContainer>
    <Footprint />
    {/* <HeaderContentContainer>
    <Typography.Title>
      {translator.translate('profileScreen.greeting', {
        firstName: me.firstName,
      })}
    </Typography.Title>
    <SetupIndicator />
  </HeaderContentContainer> */}
  </HeaderContainer>
);

const defaultProps = {};
function DashboardScreen({ user, route, navigation }: Props) {
  // const renders = useRenderCount()
  // useWhyDidYouUpdate('Dashboard', { user, route, navigation })
  useBroadcast();

  return (
    <ScreenContainer headerBar={<HeaderBar />} header={<Header />}>
      <CompleteProfileContainer>
        <CompleteProfileStepIndicator />
        <OffsetProgressWrapper>
          <OffsetProgressBlock />
        </OffsetProgressWrapper>
      </CompleteProfileContainer>

      <ActivitiesWrapper>
        <ContentContainer>
          <ActivitiesBreakdown />
          {/* <LogActivities /> */}
        </ContentContainer>
      </ActivitiesWrapper>

      {/* <ConnectWithGroupsWrapper>
        <ConnectWithGroups />
      </ConnectWithGroupsWrapper> */}
    </ScreenContainer>
  );
}

DashboardScreen.defaultProps = defaultProps;
export default withQuery(DashboardScreen);
