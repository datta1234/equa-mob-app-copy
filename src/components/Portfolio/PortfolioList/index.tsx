import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Animated, TouchableOpacity, View } from 'react-native';
// import { length } from 'ramda';
// import { ActivityIndicator } from 'react-native';

import { PORTFOLIO_NAVIGATOR } from 'constants/routes';

import Card from './Card';
import SelectedIcon from './Card/SelectedIcon';
import SkeletonList from './SkeletonList';
import { ListSeparator, StyledFlatList } from './styles';

const portfolioOverviewScreen =
  PORTFOLIO_NAVIGATOR.PORTFOLIO_OVERVIEW_SCREEN.NAME;
const PortfolioNavigator = PORTFOLIO_NAVIGATOR.NAME;

const PortfolioCard = ({
  onPortfolioSelect,
  isSelected,
  portfolio,
  actionHandler,
  isLoading,
}) => {
  const navigation = useNavigation();

  const navToPortfolioOverview = id =>
    navigation.navigate(PortfolioNavigator, {
      screen: portfolioOverviewScreen,
      params: {
        id: id,
      },
    });

  const onSelect = () => {
    if (onPortfolioSelect) {
      onPortfolioSelect(portfolio?.id);
    } else {
      navToPortfolioOverview(portfolio?.id);
    }
  };

  const onForwardPress = () => navToPortfolioOverview(portfolio?.id);

  return (
    <Card
      onSelect={onSelect}
      onForwardPress={onForwardPress}
      isHorizontal
      portfolio={portfolio}
      singleSelect={!!onPortfolioSelect}
      isSelected={isSelected}
      // render action will be used in Offsets. Commenting out for now
      renderAction={
        actionHandler
          ? () => (
              <TouchableOpacity onPress={actionHandler}>
                <SelectedIcon.Multi
                  isSelected={portfolio.isSelected}
                  isLoading={isLoading}
                />
              </TouchableOpacity>
            )
          : null
      }
    />
  );
};

const PortfolioList = ({
  portfolios,
  isLoading,
  onPortfolioSelect,
  selectedPortfolioId,
  fetchMore,
}) => {
  const offset = React.useRef(new Animated.Value(10)).current;

  const renderPortfolioCard = ({ item }) => (
    <PortfolioCard
      portfolio={item}
      key={item?.id}
      isSelected={item?.id === selectedPortfolioId}
      onPortfolioSelect={onPortfolioSelect}
    />
  );

  return portfolios.map((item, idx) => (
    <View key={item.id} style={{ alignItems: 'center' }}>
      {renderPortfolioCard({ item })}
      <ListSeparator />
    </View>
  ));

  // TODO: move Flatlist out of component if rendered inside scrollview
  // Fixing VisualisedList error on RN 0.66
  // return (
  //   <StyledFlatList
  //     data={portfolios}
  //     renderItem={renderPortfolioCard}
  //     extraData={length(portfolios)}
  //     ListFooterComponent={() =>
  //       isLoading && <ActivityIndicator style={{ padding: 25 }} />
  //     }
  //     // // fetch more will be added when BE adds paging
  //     //onEndReached={fetchMore}
  //     //       onEndReachedThreshold={0.1}
  //     //       scrollEventThrottle={16}
  //     //       onScroll={(value) => {
  //     //         if (
  //     //           value.nativeEvent.contentOffset.y >= 1 &&
  //     //           value.nativeEvent.contentOffset.y <= 650
  //     //         ) {
  //     //           Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
  //     //             useNativeDriver: false,
  //     //           })(value);
  //     //         }
  //     //       }}
  //   />
  // );
};

PortfolioList.Card = Card;
PortfolioList.SkeletonList = SkeletonList;

export { SelectedIcon };
export default PortfolioList;
