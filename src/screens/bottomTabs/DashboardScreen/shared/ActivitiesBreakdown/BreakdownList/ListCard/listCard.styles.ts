import styled from 'styled-components/native';

import { Icon, Typography } from 'components';
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
  overflow: hidden;
  /* box-shadow: 0px -6px 24px rgba(0, 0, 0, 0.05); */
  margin-bottom: 14px;
`;
export const ContentContainer = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
  padding-left: 23px;
  padding-vertical: 10px;
`;

export const Content = styled.View`
  padding-right: ${scale(7, 4) + 'px'};
  flex: 1;
`;

export const SectionText = styled(Typography.Text).attrs({
  uppercase: true,
  size: 'tiny',
})``;

export const TitleText = styled(Typography.Text).attrs({
  size: 'big',
  numberOfLines: 1,
})`
  color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark};
  line-height: 24px;
`;

export const ValueText = styled(Typography.Text).attrs(({ dark }) => ({
  fontSize: 'h7',
  lineHeightRatio: 1.1,
  color: dark ? 'primary' : 'light',
}))`
  font-weight: 600;
`;
export const UnitText = styled(ValueText)`
  opacity: 0.5;
`;

export const ModuleText = styled(Typography.Text).attrs({
  fontSize: 'h8',
  numberOfLines: 1,
})`
  padding-top: 5px;
`;

export const EmissionContainer = styled.View`
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

export const RowContainer = styled.View`
  flex-direction: row;
  /* align-items: flex-start; */
`;

export const DeleteIcon = styled(Icon).attrs(
  ({ theme, mode = 'light', show }) => ({
    iconColor: show ? theme[mode].icons.tertiary : theme[mode].icons.clear,
    size: 35,
  })
)``;

export const IconContainer = styled.View`
  margin-right: ${({ isDeleteOpen }) => (isDeleteOpen ? 0 : 10) + 'px'};
  margin-left: ${({ isDeleteOpen }) => (isDeleteOpen ? 2 : 5) + 'px'};
  align-items: center;
  justify-content: center;
`;
