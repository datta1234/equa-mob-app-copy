import React from 'react';

import { isEmpty } from 'lodash';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { BackButton } from 'components/Button/IconButtons';
import { RootContainer as ScreenContainer } from 'components/Containers';
import { isIOS } from 'utils/helpers';

import { Body, Header, Footer } from './components';

const FixedBackButton = () => {
  const insets = useSafeAreaInsets();
  return (
    <BackButtonContainer insets={insets}>
      <BackButton color={'dark'} iconColor={'white'} />
    </BackButtonContainer>
  );
};

const screenTitle = 'PORTFOLIO OVERVIEW';

const PortfolioOverviewScreen = ({ portfolio, loading }) => {
  if (isEmpty(portfolio)) {
    return null;
  }

  const { id, media, name, description, quote, projects } = portfolio;

  const backImageUrl = media?.find((img) => img?.typeCode === 'THUMBNAIL')?.url;

  return (
    <AlternateScreenContainer>
      <FixedBackButton />
      <ScreenContainer
        headerImageSource={{ uri: backImageUrl }}
        // back
        title={screenTitle}
        bodyColor={'secondary'}>
        <Body {...portfolio} />
        {/*  <FixedBackButton /> 
      <SafeAreaTop>
        <ScrollContainer>
          <Header image={media?.[0]} />
          <Body {...portfolio} />
        </ScrollContainer> 
      </SafeAreaTop>*/}
      </ScreenContainer>
      <Footer portfolioId={id} quote={quote} />
    </AlternateScreenContainer>
  );
};

export default PortfolioOverviewScreen;

const SafeAreaTop = styled(SafeAreaView).attrs({ edges: ['top', 'bottom'] })``;

const AlternateScreenContainer = styled.View.attrs({})`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
  /* //Intentional left for Footer position absolute */
  /* padding-top: 35px; */
  position: relative;
`;
const BackButtonContainer = styled.View.attrs({})`
  position: absolute;
  z-index: 100;
  top: ${({ insets }) => (isIOS ? insets.top + 5 : insets.top + 15) + 'px'};
  left: 20px;
`;

const ScrollContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  bounce: false,
})`
  /* Padding left for floating button */
  padding-top: 40px;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
`;
