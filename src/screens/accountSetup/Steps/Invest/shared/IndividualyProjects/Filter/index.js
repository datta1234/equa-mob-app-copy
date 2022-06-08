import React from 'react';

// import PropTypes from 'prop-types';
import { map } from 'ramda';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { Typography } from 'components';
import Badges from 'components/Badges';
import colors from 'constants/colors';
import translator from 'utils/translator';

import {
  ContentWrapper,
  ContentItemWrapper,
  ContentRowWrapper,
  HorizontalScrollContainer,
} from '../../../../styles';

import { withState } from './hocs';

const propTypes = {};

const defaultProps = {};

function InitialScreen({ getFilterParam, setFilterParam }) {
  const TYPES_FILTERS = [
    {
      key: 'all',
      name: translator.translate(
        'setupAccount.steps.invest.individualyProjects.filter.types.all'
      ),
      isActive: true,
    },
    {
      key: 'type21',
      name: translator.translate(
        'setupAccount.steps.invest.individualyProjects.filter.types.filterItem'
      ),
      isActive: false,
    },
    {
      key: 'type23',
      name: translator.translate(
        'setupAccount.steps.invest.individualyProjects.filter.types.filterItem'
      ),
      isActive: false,
    },
    {
      key: 'type24',
      name: translator.translate(
        'setupAccount.steps.invest.individualyProjects.filter.types.filterItem'
      ),
      isActive: false,
    },
    {
      key: 'type25',
      name: translator.translate(
        'setupAccount.steps.invest.individualyProjects.filter.types.filterItem'
      ),
      isActive: false,
    },
  ];

  const LOCATIONS_FILTERS = [
    {
      key: 'all',
      name: translator.translate(
        'setupAccount.steps.invest.individualyProjects.filter.types.all'
      ),
      isActive: true,
    },
    {
      key: 'location21',
      name: translator.translate(
        'setupAccount.steps.invest.individualyProjects.filter.types.filterItem'
      ),
      isActive: false,
    },
    {
      key: 'location23',
      name: translator.translate(
        'setupAccount.steps.invest.individualyProjects.filter.types.filterItem'
      ),
      isActive: false,
    },
    {
      key: 'location24',
      name: translator.translate(
        'setupAccount.steps.invest.individualyProjects.filter.types.filterItem'
      ),
      isActive: false,
    },
    {
      key: 'location25',
      name: translator.translate(
        'setupAccount.steps.invest.individualyProjects.filter.types.filterItem'
      ),
      isActive: false,
    },
  ];

  const renderTypeBadge = ({ key, isActive, name, ...rest }) => (
    <TouchableOpacity key={key} onPress={() => setFilterParam('type', key)}>
      <Badges.Item isActive={getFilterParam('type') == key}>{name}</Badges.Item>
    </TouchableOpacity>
  );
  const renderTypeBadges = map(renderTypeBadge);

  const renderLocationBadge = ({ key, isActive, name, ...rest }) => (
    <TouchableOpacity key={key} onPress={() => setFilterParam('location', key)}>
      <Badges.Item isActive={getFilterParam('location') == key}>
        {name}
      </Badges.Item>
    </TouchableOpacity>
  );
  const renderLocationBadges = map(renderLocationBadge);

  return (
    <>
      <ContentWrapper withVertical={false}>
        <ContentRowWrapper>
          <View />

          <ContentRowWrapper>
            <Typography.Text
              style={{ textTransform: 'uppercase', marginRight: 5 }}>
              {translator.translate(
                'setupAccount.steps.invest.individualyProjects.filter.close'
              )}
            </Typography.Text>

            <Icon
              name="close"
              type="antdesign"
              size={21}
              color={colors.FONTS.SECONDARY}
            />
          </ContentRowWrapper>
        </ContentRowWrapper>
      </ContentWrapper>

      <ContentItemWrapper>
        <ContentItemWrapper withHorizontal>
          <Typography.Text>
            {translator.translate(
              'setupAccount.steps.invest.individualyProjects.filter.types.name'
            )}
          </Typography.Text>
        </ContentItemWrapper>
        <HorizontalScrollContainer>
          <Badges>{renderTypeBadges(TYPES_FILTERS)}</Badges>
        </HorizontalScrollContainer>
      </ContentItemWrapper>

      <ContentItemWrapper>
        <ContentItemWrapper withHorizontal>
          <Typography.Text>
            {translator.translate(
              'setupAccount.steps.invest.individualyProjects.filter.locations.name'
            )}
          </Typography.Text>
        </ContentItemWrapper>
        <HorizontalScrollContainer>
          <Badges>{renderLocationBadges(LOCATIONS_FILTERS)}</Badges>
        </HorizontalScrollContainer>
      </ContentItemWrapper>

      {/* <ContentItemWrapper>
        <ContentItemWrapper withHorizontal>
          <Typography.Text>Standarts</Typography.Text>
        </ContentItemWrapper>
        <HorizontalScrollContainer>
          <Badges>{renderBadges(FILTERS)}</Badges>
        </HorizontalScrollContainer>
      </ContentItemWrapper> */}
    </>
  );
}

InitialScreen.defaultProps = defaultProps;
InitialScreen.propTypes = propTypes;
export default withState(InitialScreen);
