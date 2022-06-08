import * as React from 'react';

import { NavigationContainerRef, StackActions } from '@react-navigation/native';

// //TODO: React Navigation V6 change to:
// import { createNavigationContainerRef } from '@react-navigation/native';

// export const navigationRef = createNavigationContainerRef()

// export function navigate(name, params) {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params);
//   }
// }

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function replace(...args) {
  navigationRef.current?.dispatch(StackActions.replace(...args));
}

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}
