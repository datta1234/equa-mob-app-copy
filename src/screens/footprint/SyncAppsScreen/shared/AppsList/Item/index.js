import React, { useState } from 'react';

import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';

// import PropTypes from 'prop-types';

import { withActivityLogMutation } from './hocs';
import {
  Container,
  Styledimg,
  NameText,
  ContentContainer,
  StyledSwitch,
} from './styles';

const propTypes = {};

const defaultProps = {};

function AppsListItem({
  img,
  children,
  onChangeHandler,
  isActive,
  onChange,
  addToLog,
  isLoading,
  ...rest
}) {
  const [isEnabled, setIsEnabled] = useState(isActive);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => {
      const val = !previousState;

      addToLog({
        measurement: '',
        title: children,
        category: 'Sync Apps',
        value: val ? 'On' : 'Off',
      });

      onChange(val);
      return val;
    });
  };

  return (
    <Container>
      <ContentContainer>
        <Styledimg source={img} />
        <View style={{ flex: 1 }}>
          <NameText>{children}</NameText>
        </View>
      </ContentContainer>

      <View>
        <StyledSwitch onValueChange={toggleSwitch} value={isEnabled} />

        {isLoading && (
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    </Container>
  );
}

AppsListItem.defaultProps = defaultProps;
AppsListItem.propTypes = propTypes;
export default withActivityLogMutation(AppsListItem);
