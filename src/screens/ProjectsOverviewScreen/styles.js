import React from 'react';

import { rgba } from 'polished';
import { Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { getIn } from 'utils/ramda';

export const Container = styled.View`
  position: relative;
  flex: 1;
  /* background-color: ${({ theme, mode = 'light' }) =>
    rgba(theme[mode].colors.dark, 0.5)}; */
  justify-content: flex-end;
  align-items: center;
`;

export const LoaderContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme, mode = 'light' }) =>
    rgba(theme[mode].colors.dark, 0.15)};
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled.View`
  width: 100%;
  padding: 0 15px;
  /* background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.white}; */
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.lightGray};

  /* justify-content: space-between; */
  min-height: 125px;
  justify-content: center;
  align-self: center;
  margin-top: 150px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  overflow: hidden;
  /* z-index: 2; */
  /* flex: 1; */
`;

// export const HeaderContainer = styled.View`
//   flex-direction: row;
//   /* padding-vertical: 5px; */
//   justify-content: center;
//   margin-bottom: 15px;
// `;

export const PullTargetBar = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.mediumGray};
  border-radius: 120px;
  width: 80px;
  height: 5px;
`;

export const PullTargetContainer = styled(LinearGradient).attrs(
  ({ theme, mode = 'light' }) => ({
    colors: [rgba(theme[mode].colors.dark, 0.15), 'transparent', 'transparent'],
  })
)`
  /* padding: 10px; */
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  padding: 10px 0;
  z-index: 1;

  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  /* transform: translateY(-30px); */
`;

export const GoBackOverlay = styled.TouchableOpacity.attrs({
  activeOpacity: 0.75,
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const ListSeparator = styled.View`
  margin-bottom: 15px;
`;

export const StyledFlatList = styled.FlatList.attrs({
  keyExtractor: getIn('id'),
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 25, paddingBottom: 25 },
  ItemSeparatorComponent:
    Platform.OS !== 'android' && (({ highlighted }) => <ListSeparator />),
})`
  /* min-height: 250px; */
`;

// export const ImagegradientOverlay = styled(LinearGradient).attrs(
//   ({ theme, mode = 'light' }) => ({
//     colors: [rgba(theme[mode].colors.dark, 0.75), 'transparent'],
//   })
// )`
//   position: absolute;
//   top: 0;
//   right: 0;
//   left: 0;
// `;
