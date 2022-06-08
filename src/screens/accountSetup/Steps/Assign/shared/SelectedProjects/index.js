import React from 'react';

import { useNavigation } from '@react-navigation/core';
import { partial } from 'ramda';
import { TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { View } from 'react-native';

import { Typography } from 'components';
import ProjectCards, {
  DefaultActionIcon as ProjectDefaultActionIcon,
} from 'components/ProjectCards';
import {
  ACCOUNT_SETUP_NAVIGATOR,
  APP_NAVIGATOR,
  ROOT_NAVIGATOR,
} from 'constants/routes';
import { mapIndexed } from 'utils/ramda';
import translator from 'utils/translator';

import {
  SecondaryWrapper,
  ContentWrapper,
  ContentRowWrapper,
} from '../../../styles';

const propTypes = {};

const defaultProps = {};

function SelectedProjects({ data, onChangeSlider, slidersValues }) {
  const navigation = useNavigation();

  const navToAccountSetupChooseProjectStep = () =>
    navigation.replace(APP_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.NAME,
      params: {
        screen: ACCOUNT_SETUP_NAVIGATOR.NAVIGATOR_NAME.NAME,
        params: {
          screen: ACCOUNT_SETUP_NAVIGATOR.SCREENS.CHOOSE_PROJECTS_STEP.NAME,
        },
      },
    });

  const renderProjectCard = (project, idx) => (
    <ProjectCards.Item
      isHorizontal
      key={project.id}
      renderAction={() => <ProjectDefaultActionIcon isSelected />}
      project={{ ...project, interest: null }}
      slider={{
        // onChangeHandler: partial(onChangeSlider, [idx]),
        onValueChange: partial(onChangeSlider, [idx]),
        value: slidersValues[idx],
        step: 5,
      }}
    />
  );
  const renderProjectCards = mapIndexed(renderProjectCard);

  return (
    <SecondaryWrapper>
      <ContentWrapper>
        <ContentRowWrapper>
          <Typography.Title level={2}>
            {translator.translate(
              'setupAccount.steps.assign.mySelectedProjects.title'
            )}
          </Typography.Title>

          <TouchableOpacity onPress={navToAccountSetupChooseProjectStep}>
            <Typography.Title level={4}>
              {translator.translate(
                'setupAccount.steps.assign.mySelectedProjects.buttons.edit'
              )}
            </Typography.Title>
          </TouchableOpacity>
        </ContentRowWrapper>
      </ContentWrapper>

      <View style={{ paddingHorizontal: 15 }}>
        <ProjectCards>{renderProjectCards(data)}</ProjectCards>
      </View>
    </SecondaryWrapper>
  );
}

SelectedProjects.defaultProps = defaultProps;
SelectedProjects.propTypes = propTypes;
export default SelectedProjects;
