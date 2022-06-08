import React from 'react';

import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';

import Header from 'components/Header';
import { Text } from 'components/Typography';
import colors from 'constants/colors';
import { scaleHeight } from 'constants/layout';

const ActivityHeader = ({ loading, title, subTitle }) =>
  loading ? (
    <View style={{ padding: 30 }}>
      <ActivityIndicator size="large" color={colors.NAVY} />
    </View>
  ) : (
    <View style={{ alignItems: 'center', marginBottom: scaleHeight(15) }}>
      <Header.Title style={{ marginTop: scaleHeight(15), marginBottom: 10 }}>
        {title}
      </Header.Title>
      {subTitle && (
        <Text
          style={{ marginBottom: scaleHeight(5) }}
          fontSize={'h7'}
          bold
          color={'primary'}>
          {subTitle}
        </Text>
      )}
    </View>
  );

export default ActivityHeader;
