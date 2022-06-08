import React, { useCallback, useRef } from 'react';

import { useFocusEffect } from '@react-navigation/core';
import mockMapImg from 'assets/mock_map.png';
import { map, pipe } from 'ramda';
import { View } from 'react-native';
import { Image } from 'react-native';

import { Typography } from 'components';
import withFadeIn from 'hocs/withFadeIn';
import { isDefined, isNotDefined } from 'utils/ramda';

import {
  ActivityTypeLogo,
  ProductName,
  ValuePreview,
  ManualInputPreview,
  SubCategories,
  AutomateTrackingPlaceholder,
} from '../AddFootprintActivityForm/shared';
import {
  HeaderContainer,
  BorderContentWrapper,
  ContentVerticalContainer,
  ScrollViewContainer,
  Container,
  ContentHorizontalContainer,
} from '../AddFootprintActivityForm/styles';

import { withFootprintQuery, withActivityQuery } from './hocs';

const propTypes = {};

const defaultProps = {};

function ManualInputForm({ activity, footprintActivity }) {
  const scrollViewRef = useRef();

  useFocusEffect(
    useCallback(() => {
      if (isDefined(scrollViewRef.current)) {
        scrollViewRef.current.scrollTo(0);
      }
    }, [])
  );

  if (isNotDefined(activity)) {
    return null;
  }

  const { emissionTypes, emissions } = activity;

  const renderEmissionType = (emissionType) => (
    <SubCategories.Item
      showIcon={false}
      key={emissionType.value}
      isActive={emissionType.value == footprintActivity.emissionType.id}>
      {emissionType.label}
    </SubCategories.Item>
  );
  const renderEmissionTypes = map(renderEmissionType);

  const renderEmission = (emission) => (
    <SubCategories.Item
      showIcon={false}
      key={emission.value}
      isActive={emission.value == footprintActivity.emission.id}>
      {emission.label}
    </SubCategories.Item>
  );
  const renderEmissions = map(renderEmission);

  const isUber = footprintActivity.productName == 'Uber service';

  return (
    <View style={{ flex: 1, position: 'relative' }}>
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
                <ValuePreview value={footprintActivity.carbonDioxideVolume} />
              </ContentVerticalContainer>
            </BorderContentWrapper>

            {footprintActivity.productName && (
              <BorderContentWrapper>
                <ContentVerticalContainer>
                  <ProductName name={footprintActivity.productName} />
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
              <ContentHorizontalContainer>
                <ContentVerticalContainer>
                  <ManualInputPreview
                    measuring={footprintActivity.emission.measuring}
                    unit={footprintActivity.emission.unit}
                    value={footprintActivity.value}
                    showPencil={false}
                  />
                </ContentVerticalContainer>
              </ContentHorizontalContainer>
            </View>
          </View>
        </Container>

        <AutomateTrackingPlaceholder activityId={activity.id} isUber={isUber} />
      </ScrollViewContainer>
    </View>
  );
}

ManualInputForm.defaultProps = defaultProps;
ManualInputForm.propTypes = propTypes;
export default pipe(
  withFadeIn,
  React.memo,
  withActivityQuery,
  React.memo,
  withFootprintQuery
)(ManualInputForm);
