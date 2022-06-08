import React from 'react';

import { equals, length, nth, pipe } from 'ramda';
import { TouchableOpacity, Dimensions, View } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import styled from 'styled-components';

import { Typography } from 'components';
import colors from 'constants/colors';
import { getIn } from 'utils/ramda';

const tabWidth = Dimensions.get('window').width / 3;

export const StyledTabBar = (props) => {
  return (
    <TabBar
      {...props}
      lazy
      scrollEnabled={length(props.navigationState.routes) >= 3}
      renderTabBarItem={(tabBarOptions) => {
        const { navigationState, key } = tabBarOptions;

        const isActive = pipe(
          nth(navigationState.index),
          getIn('key'),
          equals(key)
        )(navigationState.routes);
        return (
          <TouchableOpacity
            {...tabBarOptions}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Typography.Text
              size={length(navigationState.routes) >= 3 ? 'small' : 'normal'}
              numberOfLines={1}
              style={[
                { paddingHorizontal: 5, paddingVertical: 15 },
                isActive && { color: colors.NAVY },
              ]}>
              {tabBarOptions.route.title}
            </Typography.Text>
          </TouchableOpacity>
        );
      }}
      style={{
        backgroundColor: '#fff',
      }}
      indicatorStyle={{
        backgroundColor: colors.NAVY,
        // width: getTabWidth(),
      }}
    />
  );
};

// const _StyledTabBar = styled(TabBar).attrs(({ theme, mode = 'light' }) => ({
//   lazy: true,
//   scrollEnabled: true,

//   labelStyle: {
//     fontSize: 14,
//     fontFamily: 'Roboto-Regular',
//     // textTransform: 'capitalize',
//     color: theme[mode].colors.dark,
//     textTransform: 'lowercase',
//   },
//   // tabStyle: {
//   //   // alignSelf: 'center',
//   //   // width: 'auto',
//   //   // paddingHorizontal: 10,
//   //   // width: tabWidth,
//   // },
//   // pressColor: 'gray', //for click (ripple) effect color
//   // style: {
//   //   backgroundColor: 'white',
//   //   shadowOffset: { height: 0, width: 0 },
//   //   shadowColor: 'transparent',
//   //   shadowOpacity: 0,
//   //   elevation: 0,
//   // },
//   contentContainerStyle: {
//     // width: '100%',
//     // justifyContent: 'center',
//   },
//   indicatorStyle: {
//     backgroundColor: theme[mode].colors.dark,
//     // width: '100%',
//   },

//   // shadowOffset: { height: 0, width: 0 },
//   // shadowColor: 'transparent',
//   // shadowOpacity: 0,
//   // elevation: 0,
// }))``;

// export const StyledTabBar = (props) => {
//   const { navigationState } = props;

//   // const getTabWidth = () => {
//   //   if (length(navigationState.routes) >= 2) {
//   //     return Dimensions.get('window').width / 2;
//   //   }

//   //   return Dimensions.get('window').width / length(navigationState.routes);
//   // };

//   return (
//     <_StyledTabBar
//       {...props}
//       // renderTabBarItem={(tabBarProps) => {
//       //   const { route, onPress, navigationState, key } = tabBarProps;

//       //   const isActive = pipe(
//       //     nth(navigationState.index),
//       //     getIn('key'),
//       //     equals(key)
//       //   )(navigationState.routes);

//       //   return (
//       //     <TouchableOpacity
//       //       style={
//       //         {
//       //           // width: getTabWidth(),
//       //           // alignItems: 'center',
//       //           // backgroundColor: '#f0f0f0',
//       //         }
//       //       }
//       //       onPress={onPress}>
//       //       <Typography.Text
//       //         size="small"
//       //         numberOfLines={1}
//       //         style={[
//       //           { paddingHorizontal: 5, paddingVertical: 15 },
//       //           isActive && { color: colors.NAVY },
//       //         ]}>
//       //         {route.title}
//       //       </Typography.Text>
//       //     </TouchableOpacity>
//       //   );
//       // }}
//       // style={{
//       //   backgroundColor: 'white',
//       //   // shadowOffset: { height: 0, width: 0 },
//       //   // shadowColor: 'transparent',
//       //   // shadowOpacity: 0,
//       //   elevation: 0,
//       // }}
//       // indicatorStyle={{
//       //   backgroundColor: colors.NAVY,
//       //   // width: getTabWidth(),
//       // }}
//     />
//   );
// };
