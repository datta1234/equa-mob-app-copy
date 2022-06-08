import React, { useEffect, useRef, useState } from 'react';

import R from 'ramda';
import styled from 'styled-components/native';

import { Text } from 'components/Typography';
import { SCREEN_WIDTH } from 'constants/layout';
import { SelectedSlices } from 'models/SelectedSlice';
import { configureLayoutAnimation } from 'utils/helpers';

const SliceScrollContainer = styled.ScrollView.attrs({
  horizontal: true,
  decelerationRate: 'fast',
  snapToInterval: SCREEN_WIDTH, //your element width
  snapToAlignment: 'center',
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})`
  flex: 1;
`;

const SliceContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: ${SCREEN_WIDTH + 'px'};
  padding-horizontal: 30px;
  padding-vertical: 20px;
`;

export const TypeItemCircle = styled.View`
  width: 18px;
  height: 18px;
  background-color: ${({ theme, type = 'default' }) =>
    theme.light.activity[type]};
  border-color: ${({ theme }) => theme.light.background.secondary};
  border-width: 3px;
  border-radius: 10px;
  margin-right: 5px;
`;

const TypeItemContainer = styled.View`
  flex-direction: row;
  /* margin: 5px 10px; */
  align-items: center;
  justify-content: center;
`;
const UserContainer = styled.View`
  /* margin: 5px 10px; */
  /* align-items: center; */
  justify-content: center;
`;
const AverageContainer = styled.View`
  /* margin: 5px 10px; */
  /* align-items: center; */
  justify-content: center;
`;

const Separator = styled.View`
  background-color: ${({ theme }) =>
    theme.light.activity.locationAverageBorder};
  width: 1px;
  margin-horizontal: 15px;
  height: 30px;
`;
const Heading = styled(Text).attrs({
  color: 'info',
  fontSize: 'h9',
  bold: true,
  uppercase: true,
})`
  margin-bottom: 9px;
`;
const Value = styled(Text).attrs({
  color: 'primary',
  fontSize: 'h7',
})`
  font-weight: 600;
`;
const Type = ({ type }) => (
  <TypeItemContainer>
    <TypeItemCircle type={type?.toLowerCase()} />
    <Text color={'primary'}>{type}</Text>
  </TypeItemContainer>
);
const User = ({ value }) => (
  <UserContainer>
    <Heading>You</Heading>
    <Value>{value}kgCO2e</Value>
  </UserContainer>
);
const Average = ({ region, value }) => (
  <AverageContainer>
    <Heading>{`${region?.shortName} Average`}</Heading>
    <Value>{value}kgCO2e</Value>
  </AverageContainer>
);

const EmissionsSliceDetails = ({
  selectedSlice,
  setSelectedSlice,
  emissionsTotals,
  region,
}) => {
  const [itemCords, setItemCords] = useState([]);
  const scrollRef = useRef(null);

  const currentSlice = emissionsTotals?.find(
    (slice) => slice.activityTypeCode === selectedSlice
  );
  const id = emissionsTotals?.findIndex(
    (slice) => slice.activityTypeCode === selectedSlice
  );

  const scrollToItem = React.useCallback(
    (id) => {
      const x = itemCords[id]?.x; // - screen.width / 2 + itemCords[idx].width / 2;
      scrollRef.current?.scrollTo({ x: x, y: 0, animated: true });
    },
    [itemCords] // ItemCords aren't set until after component is mounted and changes between renders thus a callback is used with ItemCords
  );

  useEffect(() => {
    // Delay scroll as workaround to scroll to not always firing due to animations
    // TODO: Make scroll only run after screen animation finishes. Note InteractionManager.runAfterInteractions doesn't work

    setTimeout(() => {
      scrollToItem(id);
    }, 250);
  }, [id, scrollToItem]);

  const setChartSliceSelection = ({ nativeEvent }) => {
    const { contentOffset } = nativeEvent;

    const swipePastInterval = SCREEN_WIDTH * 0.2;
    const min = 0 - swipePastInterval;
    const max = R.last(itemCords).x + swipePastInterval;

    if (contentOffset.x < min || contentOffset.x > max) {
      configureLayoutAnimation({
        duration: 600,
      });
      setSelectedSlice(SelectedSlices.SELECT_NONE);
      return;
    }
    //const sliceIndex = itemCords.findIndex((item) => item.x === contentOffset.x);
    const sliceIndex = R.findIndex(R.propEq('x', contentOffset.x))(itemCords); //itemCords.findIndex was causing mutations to itemCords
    if (sliceIndex === -1) {
      return;
    }

    configureLayoutAnimation({
      duration: 300,
    });
    setSelectedSlice(
      emissionsTotals[sliceIndex]?.activityTypeCode ??
        SelectedSlices.SELECT_NONE
    );
  };

  if (!currentSlice || id === -1) {
    return null;
  }
  const onLayout = (event, idx) => {
    const newCords = R.clone(itemCords);
    newCords[idx] = event.nativeEvent.layout;
    setItemCords(newCords);
  };

  return (
    <SliceScrollContainer
      onScroll={setChartSliceSelection}
      scrollEventThrottle={200} // sample rate (check every 200 ms)
      scrollToOverflowEnabled={true} // Needed to allow scrollTo to run outside of setTimeout
      ref={scrollRef}>
      {emissionsTotals.map((slice, idx) => {
        return (
          <SliceContainer key={idx} onLayout={(event) => onLayout(event, idx)}>
            <Type type={slice.activityTypeCode} />
            <Separator />
            <User value={slice.total} />
            <Separator />
            <Average region={region} value={slice.averageTotalPerMonth} />
          </SliceContainer>
        );
      })}
    </SliceScrollContainer>
  );
};

export default EmissionsSliceDetails;
