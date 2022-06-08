import React from 'react';

import { ActivityIndicator } from 'react-native';
// import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import withFadeIn from 'hocs/withFadeIn';

import {
  HeaderContainer,
  BorderContentWrapper,
  ContentVerticalContainer,
} from '../../styles';
import ActivityTypeLogo from '../ActivityTypeLogo';

const propTypes = {};

const defaultProps = {};

function LoaderOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
  // return (
  // <SkeletonPlaceholder style={styles.container}>
  //   <View
  //     style={{
  //       // borderBottomWidth: 1,
  //       padding: 25,
  //       margin: 25,
  //       marginBottom: 35,
  //       alignItems: 'center',
  //     }}>
  //     <View style={{ marginBottom: 20 }}>
  //       <View style={{ width: 85, height: 85, borderRadius: 85 }} />
  //     </View>

  //     <View style={{ marginBottom: 10 }}>
  //       <View style={{ width: 120, height: 45, borderRadius: 12 }} />
  //     </View>

  //     <View style={{ width: 60, height: 20, borderRadius: 12 }} />
  //   </View>

  //   <View style={{ marginLeft: 20, marginBottom: 30 }}>
  //     <View style={{ marginBottom: 15 }}>
  //       <View style={{ width: 175, height: 30, borderRadius: 12 }} />
  //     </View>

  //     <View style={{ flexDirection: 'row' }}>
  //       <View style={{ marginRight: 10 }}>
  //         <View style={{ width: 120, height: 30, borderRadius: 12 }} />
  //       </View>
  //       <View style={{ marginRight: 10 }}>
  //         <View style={{ width: 120, height: 30, borderRadius: 12 }} />
  //       </View>
  //       <View style={{ marginRight: 10 }}>
  //         <View style={{ width: 120, height: 30, borderRadius: 12 }} />
  //       </View>
  //       <View style={{ marginRight: 10 }}>
  //         <View style={{ width: 120, height: 30, borderRadius: 12 }} />
  //       </View>
  //       <View style={{ marginRight: 10 }}>
  //         <View style={{ width: 120, height: 30, borderRadius: 12 }} />
  //       </View>
  //       <View style={{ marginRight: 10 }}>
  //         <View style={{ width: 120, height: 30, borderRadius: 12 }} />
  //       </View>
  //     </View>
  //   </View>

  //   <View style={{ marginLeft: 20, marginBottom: 30 }}>
  //     <View style={{ marginBottom: 15 }}>
  //       <View style={{ width: 150, height: 35, borderRadius: 12 }} />
  //     </View>

  //     <View style={{ flexDirection: 'row' }}>
  //       <View style={{ marginRight: 10 }}>
  //         <View style={{ width: 120, height: 30, borderRadius: 12 }} />
  //       </View>
  //       <View style={{ marginRight: 10 }}>
  //         <View style={{ width: 120, height: 30, borderRadius: 12 }} />
  //       </View>
  //       <View style={{ marginRight: 10 }}>
  //         <View style={{ width: 120, height: 30, borderRadius: 12 }} />
  //       </View>
  //       <View style={{ marginRight: 10 }}>
  //         <View style={{ width: 120, height: 30, borderRadius: 12 }} />
  //       </View>
  //       <View style={{ marginRight: 10 }}>
  //         <View style={{ width: 120, height: 30, borderRadius: 12 }} />
  //       </View>
  //       <View style={{ marginRight: 10 }}>
  //         <View style={{ width: 120, height: 30, borderRadius: 12 }} />
  //       </View>
  //     </View>
  //   </View>

  //   {/* <BorderContentWrapper>
  //           <ContentVerticalContainer>
  //             <ProductName />
  //           </ContentVerticalContainer>
  //         </BorderContentWrapper> */}
  //   {/* <ActivityIndicator size="large" style={{ marginTop: -125 }} /> */}
  // </SkeletonPlaceholder>
  // );
}

LoaderOverlay.defaultProps = defaultProps;
LoaderOverlay.propTypes = propTypes;
export default withFadeIn(LoaderOverlay);

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // wrapper: {
  //   marginBottom: 10,
  // },
});
