import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import { LoaderOverlay } from 'components/LoadingOverlay';
import { colors } from 'constants/';

const StyledImage = ({ uri, containerStyle, source, ...rest }) => {
  const [isLoading, setLoading] = useState(false);
  const _turnOnLoading = () => setLoading(true);
  const _turnOffLoading = () => setLoading(false);

  return (
    <View style={[s.image, containerStyle]}>
      <FastImage
        onLoadStart={_turnOnLoading}
        onLoadEnd={_turnOffLoading}
        uri={uri}
        source={{
          uri: uri,
          priority: FastImage.priority.normal,
          ...source,
        }}
        {...rest}
      />
      {isLoading && <LoaderOverlay color={colors.NAVY} />}
    </View>
  );
};

const s = StyleSheet.create({
  image: {},
});

StyledImage.defaultProps = {};

export default StyledImage;
