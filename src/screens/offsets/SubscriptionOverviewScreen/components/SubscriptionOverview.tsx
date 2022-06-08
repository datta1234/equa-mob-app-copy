import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { BarIndicator } from 'react-native-indicators';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cache } from 'api/client/cache';
import { GET_VIRTUAL_CART } from 'api/operations/queries/getVirtualCart';
import { RootContainer as ScreenContainer } from 'components/Containers';
import PortfolioCard from 'components/Portfolio/PortfolioList/Card';
import { PORTFOLIO_NAVIGATOR } from 'constants/routes';

import Quote from './Quote';
import {
  HeaderContainer,
  Title,
  InfoText,
  DetailsContainer,
  FooterContainer,
} from './subscriptionOverview.styles';
import Total from './Total';

const portfolioOverviewScreen =
  PORTFOLIO_NAVIGATOR.PORTFOLIO_OVERVIEW_SCREEN.NAME;
const PortfolioNavigator = PORTFOLIO_NAVIGATOR.NAME;

const SubscriptionOverviewScreen = ({
  loading,
  screenTitle,
  title,
  info,
  portfolio,
  billingDate,
  showTotal,
  Actions,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const backImageUrl = portfolio?.media?.find(
    (media) => media?.typeCode === 'THUMBNAIL',
  )?.url;

  if (portfolio?.quote) {
    cache.writeQuery({
      query: GET_VIRTUAL_CART,
      data: {
        cart: {
          value: portfolio?.quote?.totalAmount,
          currency: portfolio?.quote?.currency?.code,
        },
      },
      overwrite: true,
    });
  }
  const navToPortfolioOverview = (id) =>
    navigation.navigate(PortfolioNavigator, {
      screen: portfolioOverviewScreen,
      params: {
        id: id,
      },
    });

  const onSelect = () => navToPortfolioOverview(portfolio?.id);

  const onForwardPress = () => navToPortfolioOverview(portfolio?.id);

  return (
    <ScreenContainer
      back
      safeArea={{ bottom: false }}
      headerImageSource={{ uri: backImageUrl }}
      title={screenTitle}
      bodyColor={'secondary'}>
      {loading ? (
        <BarIndicator />
      ) : (
        <>
          <HeaderContainer>
            {title && <Title>{title}</Title>}
            <Quote quote={portfolio?.quote} billingDate={billingDate} />
            {info && <InfoText>{info}</InfoText>}
          </HeaderContainer>
          <DetailsContainer insets={insets}>
            <PortfolioCard
              simple
              withShadow
              // onSelect={onSelect}
              // onForwardPress={onForwardPress}
              isHorizontal
              portfolio={portfolio}
            />
            {showTotal && <Total quote={portfolio?.quote} />}
            <FooterContainer>{Actions}</FooterContainer>
          </DetailsContainer>
        </>
      )}
    </ScreenContainer>
  );
};

export default SubscriptionOverviewScreen;
