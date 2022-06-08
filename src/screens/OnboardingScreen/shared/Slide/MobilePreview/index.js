import React, { useEffect, useRef } from 'react';

// import PropTypes from 'prop-types';
import profileMockImg from 'assets/onboarding/profileMock.gif';
import { Animated, Image, View } from 'react-native';

import { IphoneBazelsImg, Container } from './styles';

const propTypes = {};

const defaultProps = {};

function MobilePreview({ sourceImage }) {
  const animated = useRef(new Animated.Value(255)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: 0,
      duration: 750,
      useNativeDriver: true,
    }).start();

    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Container>
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            padding: 11,
            paddingBottom: 0,
            marginBottom: 15,
            overflow: 'hidden',
          }}>
          <Animated.View
            style={[
              {
                transform: [{ translateY: animated }],
                opacity: animatedOpacity,
              },
            ]}>
            <Image
              source={sourceImage}
              resizeMode="contain"
              style={{ flex: 1 }}
            />
          </Animated.View>
        </View>

        <IphoneBazelsImg
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />
      </View>
    </Container>
  );
}

MobilePreview.defaultProps = defaultProps;
MobilePreview.propTypes = propTypes;
export default MobilePreview;
