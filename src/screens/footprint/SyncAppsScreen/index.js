import React from 'react';

// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import { map, toLower } from 'ramda';

import Typography from 'components/Typography';
import { FOOTPRINT_NAVIGATOR } from 'constants/routes';

import AppsList from './shared/AppsList';
import { BlockContainer, TitleContainer, ScrollViewContainer } from './styles';

const propTypes = {};

const defaultProps = {};

function SyncApps({ data }) {
  const navigation = useNavigation();

  const isUberTrigger = () => {
    navigation.navigate(FOOTPRINT_NAVIGATOR.SCREENS.UBER_AUTH.NAME);
  };

  const renderApp = ({ name, ...rest }) => (
    <AppsList.Item
      {...rest}
      onChange={(isActive) => {
        if (isActive && toLower(name) == 'uber') {
          isUberTrigger();
        }
      }}>
      {name}
    </AppsList.Item>
  );

  const renderApps = map(renderApp);

  const renderBlock = ({ title, data }) => (
    <BlockContainer>
      {title && (
        <TitleContainer>
          <Typography.Title level={2}>{title}</Typography.Title>
        </TitleContainer>
      )}
      <AppsList>{renderApps(data)}</AppsList>
    </BlockContainer>
  );

  const renderBlocks = map(renderBlock);

  return <ScrollViewContainer>{renderBlocks(data)}</ScrollViewContainer>;
}

SyncApps.defaultProps = defaultProps;
SyncApps.propTypes = propTypes;
export default SyncApps;
