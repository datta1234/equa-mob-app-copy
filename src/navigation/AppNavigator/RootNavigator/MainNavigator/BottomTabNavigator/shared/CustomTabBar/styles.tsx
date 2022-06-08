import React from 'react';

import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from 'react-native-svg';
import styled from 'styled-components/native';

import { svgs } from 'assets';

const tabBarIcons = svgs.icons.tabBarIcons;
type LocalIconProps = {
  type: keyof typeof tabBarIcons;
  color: Color;
  isActive: boolean;
};

type IconProps = {
  isActive: boolean;
};

export const StyledSafeAreaContainer = styled(SafeAreaView).attrs({
  edges: ['bottom'],
  marginTop: -30, // note this allows the screen view to be seen through the TabBar - all TabBar screens must have 30px padding at the bottom
})`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.dark};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  justify-content: center;
  /* height: 250px; */
  /* flex: 1; */
`;

export const TabBarItemsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* position: relative; */
  padding-top: 10px;
  padding-bottom: 15px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  /* background-color: red; */
  /* flex: 1; */
`;
export const ActivityTabItemContainer = styled.View`
  /* justify-content: space-between; */
  align-items: center;
  /* position: absolute; */
  /* top: -40px; */
  /* height: 120px; */
  /* background-color: blue; */
  /* padding-top: 10px; */
  /* padding-bottom: 15px; */
  /* flex: 1; */
`;
// const LocalIcon = ({ type }) => {
//   return svgs.icons.tabBarIcons[type];
// };

const LocalIcon = ({ color, type }: LocalIconProps) => {
  const IconSVG = tabBarIcons[type];
  return <IconSVG color={color} />;
};

export const Rawicon = styled(Icon).attrs<IconProps>(({ isActive, theme }) => ({
  size: 24,
  color: isActive
    ? theme[theme.mode].icons.primary
    : theme[theme.mode].icons.light,
}))``;

export const TabBarIcon = styled(LocalIcon).attrs<IconProps>(
  ({ isActive, theme }) => ({
    // size: 24,
    color: isActive
      ? theme[theme.mode].icons.primary
      : theme[theme.mode].icons.light,
  }),
)``;

export const ProfileIcon = styled(Rawicon).attrs(
  ({focused, theme} ) => ({
    name: 'person-outline',
    type: 'material',
}))``;

export const DashboardIcon = styled(TabBarIcon).attrs({
  type: 'dashboard',
})``;

export const ProjectsIcon = styled(TabBarIcon).attrs({
  type: 'projects',
})``;
export const ActivitiesIcon = styled(TabBarIcon).attrs({
  type: 'addActivity',
})``;

export const PlusIconWrapper = styled.View`
  background-color: ${({ theme }) => theme[theme.mode].colors.dark};
  width: 64px;
  height: 64px;
  border-radius: 64px;
  align-items: center;
  justify-content: center;
  margin-top: -32px;
  margin-bottom: 5px;
`;

export const PlusIconContainer = styled.View`
  background-color: ${({ theme }) => theme[theme.mode].colors.white};
  width: 50px;
  height: 50px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  /* border-color: ${({ theme, mode = 'light' }) => theme[mode].colors.gray};
  border-width: 4px; */
`;
