import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

import Typography from 'components/Typography';
import { scale } from 'constants/layout';
import { ACTIVITIES_TYPES } from 'constants/logActivities';

export const Container = styled.View.attrs({
  // shadowOffset: {
  //   width: 0,
  //   height: 2,
  // },
  // shadowOpacity: 0.1,
  // shadowRadius: 2.62,
  // elevation: 4,
})`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
  flex-direction: row;
  align-items: center;
  border-radius: 15px;
  min-height: 85px;
  padding-left: 23px;
  padding-right: 7px;
  padding-vertical: 13px;
  box-shadow: 0px -6px 24px rgba(0, 0, 0, 0.05);
`;

export const Content = styled.View`
  padding-right: ${scale(7, 4) + 'px'};
  flex: 1;
`;

export const SectionText = styled(Typography.Text).attrs({
  uppercase: true,
  size: 'tiny',
})``;

export const TitleContainer = styled.View`
  flex: 2;
`;

export const TitleText = styled(Typography.Text).attrs({
  size: 'big',
  numberOfLines: 2,
})`
  color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark};
  line-height: 24px;
`;

export const ValueText = styled(Typography.Text).attrs({
  fontSize: 'h7',
  lineHeightRatio: 1.1,
  fontWeight: 600,
})``;

export const ModuleText = styled(Typography.Text).attrs({
  fontSize: 'h8',
  numberOfLines: 1,
})`
  padding-top: 5px;
`;

export const ValueContainer = styled.View`
  align-items: center;
  border-radius: 15px;
  min-width: ${88 + 2 * scale(10, 2) + 'px'};
  padding-horizontal: ${scale(10, 2) + 'px'};
  padding-vertical: 12px;
  background-color: ${({ theme, mode = 'light', type }) =>
    type === ACTIVITIES_TYPES.type.food
      ? theme[mode].activity.food
      : type === ACTIVITIES_TYPES.type.travel
      ? theme[mode].activity.travel
      : type === ACTIVITIES_TYPES.type.home
      ? theme[mode].activity.home
      : type === ACTIVITIES_TYPES.type.purchase
      ? theme[mode].activity.purchase
      : theme[mode].colors.white};
`;

export const ContentContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  /* background-color: red; */
`;

export const RightIcon = styled(Icon).attrs(
  ({ theme, mode = 'light', show }) => ({
    name: 'chevron-right',
    type: 'feather',
    color: show
      ? theme[mode].colors.mediumGray
      : theme[mode].background.secondary,
    // reverse: true,
    // reverseColor: theme[mode].colors.mediumGray,
    size: 20,
  })
)``;

export const IconContainer = styled.View`
  /* padding-right: 5px; */
  /* margin-right: 5px; */
  margin-left: 8px;
  /* width: 20px; */
  /* background-color: red; */
  /* padding-left: 20px; */
  align-items: center;
  justify-content: center;
`;
