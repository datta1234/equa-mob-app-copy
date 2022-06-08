import React from 'react';

// import PropTypes from 'prop-types';
import { useRoute, useNavigationState } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { equals, head, pipe } from 'ramda';
import { TouchableOpacity } from 'react-native';

import { getIn } from 'utils/ramda';

import { CloseIcon, IconContainer, LeftIcon } from './styles';

const propTypes = {};

const defaultProps = {};

function BackButton({ onPress, mode = 'light' }) {
  const route = useRoute();
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  const isFirstRouteInParent = useNavigationState(
    pipe(getIn('routes'), head, getIn('key'), equals(route.key))
  );

  if (isFirstRouteInParent) {
    return (
      <TouchableOpacity onPress={goBack}>
        <IconContainer>
          <CloseIcon mode={mode} />
        </IconContainer>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <IconContainer>
        <LeftIcon mode={mode} />
      </IconContainer>
    </TouchableOpacity>
  );
}

BackButton.defaultProps = defaultProps;
BackButton.propTypes = propTypes;
export default React.memo(BackButton);
