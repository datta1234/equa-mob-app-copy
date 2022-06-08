import React, { useCallback, useRef } from 'react';

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import mockMapImg from 'assets/mock_map.png';
import { allPass, defaultTo, map, pick, pipe } from 'ramda';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { Typography } from 'components';
import { MAIN_NAVIGATOR } from 'constants/routes';
import { getIn, isDefined, isNotDefined } from 'utils/ramda';

import {
  withFootprintQalculatorQuery,
  withActivityQuery,
  withFootprintActivityState,
  withAddActivityMutation,
} from './hocs';
import {
  ActivityTypeLogo,
  ProductName,
  ValuePreview,
  ManualInputPreview,
  SubCategories,
  AutomateTrackingPlaceholder,
  ButtonsGroup,
  LoaderOverlay,
} from './shared';
import {
  HeaderContainer,
  BorderContentWrapper,
  ContentVerticalContainer,
  ScrollViewContainer,
  Container,
  ContentHorizontalContainer,
} from './styles';

const propTypes = {};

const defaultProps = {};

function ManualInputForm({
  activity,
  setFootprintStateParam,
  getFootprintStateParam,
  carbonDioxideVolume,
  addFootprintActivity,
}) {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      if (isDefined(scrollViewRef.current)) {
        scrollViewRef.current.scrollTo(0);
      }
    }, []),
  );

  if (isNotDefined(activity)) {
    return <LoaderOverlay />;
  }

  const { emissionTypes, emissions } = activity;

  const renderEmissionType = (emissionType) => (
    <TouchableOpacity
      onPress={() => setFootprintStateParam('emissionType', emissionType)}
      key={emissionType.value}>
      <SubCategories.Item
        isActive={
          emissionType.value == getFootprintStateParam('emissionType.id')
        }>
        {emissionType.label}
      </SubCategories.Item>
    </TouchableOpacity>
  );
  const renderEmissionTypes = map(renderEmissionType);

  const renderEmission = (emission) => (
    <TouchableOpacity
      onPress={() => setFootprintStateParam('emission', emission)}
      key={emission.value}>
      <SubCategories.Item
        isActive={emission.value == getFootprintStateParam('emission.id')}>
        {emission.label}
      </SubCategories.Item>
    </TouchableOpacity>
  );
  const renderEmissions = map(renderEmission);

  const showInputPreview = pipe(
    getFootprintStateParam,
    defaultTo({}),
    pick(['measuring', 'unit']),
    allPass([isDefined]),
  )('emission');

  const goToManualInputModal = () =>
    navigation.navigate(MAIN_NAVIGATOR.NAME, {
      screen: MAIN_NAVIGATOR.SCREENS.MANUAL_INPUT_MODAL.NAME,
      params: {
        measuring: getFootprintStateParam('emission.measuring'),
        unit: getFootprintStateParam('emission.unit'),
        value: getFootprintStateParam('value'),
        onChange: setFootprintStateParam('value'),
      },
    });

  const isUber = getIn('params.productName', route) == 'Uber service';

  return (
    <View style={{ flex: 1 }}>
      <ScrollViewContainer ref={scrollViewRef}>
        {isUber && (
          <Image
            source={mockMapImg}
            style={{ width: '100%', height: 170 }}
            resizeMode="cover"
          />
        )}

        <Container>
          <HeaderContainer>
            <ActivityTypeLogo logoUrl={activity.thumbnailLogo} />

            <BorderContentWrapper>
              <ContentVerticalContainer>
                <ValuePreview value={carbonDioxideVolume} />
              </ContentVerticalContainer>
            </BorderContentWrapper>

            {getFootprintStateParam('productName') && (
              <BorderContentWrapper>
                <ContentVerticalContainer>
                  <ProductName name={getFootprintStateParam('productName')} />
                </ContentVerticalContainer>
              </BorderContentWrapper>
            )}
          </HeaderContainer>

          <View>
            <ContentVerticalContainer>
              <ContentHorizontalContainer>
                <ContentVerticalContainer>
                  <Typography.Title level={2}>
                    {emissionTypes.title}
                  </Typography.Title>
                </ContentVerticalContainer>
              </ContentHorizontalContainer>
              <SubCategories>
                {renderEmissionTypes(emissionTypes.options)}
              </SubCategories>
            </ContentVerticalContainer>

            {isDefined(emissions) && (
              <ContentVerticalContainer style={{ paddingTop: 0 }}>
                <ContentHorizontalContainer>
                  <ContentVerticalContainer>
                    <Typography.Title level={2}>
                      {emissions.title}
                    </Typography.Title>
                  </ContentVerticalContainer>
                </ContentHorizontalContainer>
                <SubCategories title="Frequency">
                  {renderEmissions(emissions.options)}
                </SubCategories>
              </ContentVerticalContainer>
            )}

            <View style={{ minHeight: 100 }}>
              {showInputPreview && (
                <TouchableOpacity onPress={goToManualInputModal}>
                  <ContentHorizontalContainer>
                    <ContentVerticalContainer>
                      <ManualInputPreview
                        measuring={getFootprintStateParam('emission.measuring')}
                        unit={getFootprintStateParam('emission.unit')}
                        value={getFootprintStateParam('value')}
                      />
                    </ContentVerticalContainer>
                  </ContentHorizontalContainer>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Container>

        <AutomateTrackingPlaceholder activityId={activity.id} isUber={isUber} />
      </ScrollViewContainer>

      <ButtonsGroup addFootprintActivity={addFootprintActivity} />
    </View>
  );
}

ManualInputForm.defaultProps = defaultProps;
ManualInputForm.propTypes = propTypes;
export default pipe(
  React.memo,
  withFootprintQalculatorQuery,
  withActivityQuery,
  withFootprintActivityState,
  withAddActivityMutation,
)(ManualInputForm);
