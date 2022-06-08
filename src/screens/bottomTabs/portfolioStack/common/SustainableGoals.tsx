import React, { useState } from 'react';

import { isEmpty } from 'lodash';
import Swiper from 'react-native-swiper';

import { LoaderOverlay } from 'components/LoadingOverlay';
import { colors } from 'constants/';
import { chunkArray } from 'utils/helpers';

import {
  Title,
  GoalsSetContainer,
  GoalContainer,
  GoalImage,
} from './sustainableGoals.styles';

const SustainableGoals = ({ sustainableGoals }) => {
  const [swiperHeight, setSwiperHeight] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const turnOnLoading = () => setLoading(true);
  const turnOffLoading = () => setLoading(false);

  if (isEmpty(sustainableGoals)) {
    return null;
  }

  const size = sustainableGoals.length + 1 <= 6 ? 3 : 6;
  const includePaginationSpace = sustainableGoals.length !== 6;

  const goalSets = chunkArray(sustainableGoals, size);

  const onLayout = ({ nativeEvent }) =>
    setSwiperHeight(
      nativeEvent.layout.height + (includePaginationSpace ? 20 : 0)
    );

  return (
    <>
      <Title>{'Sustainable development goals'}</Title>
      <Swiper
        removeClippedSubviews={false} // RN flatlist bug workaround - fixes SDGs not showing on initial screen load until user interacts (this removes all flatlist optimization ) - See Issue: https://github.com/leecade/react-native-swiper/issues/1194
        activeDotColor={colors.NAVY}
        style={{ height: swiperHeight }}
        paginationStyle={{ bottom: 5 }}>
        {goalSets.map((set, idx) => (
          <GoalsSetContainer onLayout={onLayout} key={idx}>
            {set.map((goal, idx) => (
              <GoalContainer
                key={goal.id}
                isFirst={(idx + 3) % 3 === 0}
                isLast={(idx + 1) % 3 === 0}>
                <GoalImage
                  onLoadStart={turnOnLoading}
                  onLoadEnd={turnOffLoading}
                  uri={goal.imageUrl}
                />
                {isLoading && <LoaderOverlay color={colors.NAVY} />}
              </GoalContainer>
            ))}
          </GoalsSetContainer>
        ))}
      </Swiper>
    </>
  );
};

export default SustainableGoals;
