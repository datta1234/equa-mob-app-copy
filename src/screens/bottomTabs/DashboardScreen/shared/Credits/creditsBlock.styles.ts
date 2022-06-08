import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

import { Icon, Typography } from 'components';
import { colors } from 'constants/';
import { scale, scaleHeight } from 'constants/layout';

export const PressableContainer = styled.TouchableOpacity`
  align-self: stretch;
  margin-top: ${scaleHeight(10) + 'px'};
`;
export const Container = styled.View`
  border-radius: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
  padding-horizontal: ${scale(15) + 'px'};
`;

export const Col = styled.View`
  align-items: center;
  padding-top: ${scale(10) + 'px'};
  padding-bottom: ${scale(5) + 'px'};
`;

export const TargetValueContainer = styled.Text.attrs({
  numberOfLines: 1,
})`
  flex-direction: row;
  /* align-items: flex-start; */
  /* flex-wrap: wrap; */
  justify-content: center;
  margin-bottom: ${5 + 'px'};
`;
// valueContainer used with min-width as value counts up to prevent credit block changing in size
export const ValueCont = styled.View`
  min-width: 30px;
  transform: translateY(4px); //fixes miss-alignment with ModuleText
`;
export const ValueText = styled(Typography.Text).attrs({
  fontSize: 'h8',
  color: 'primary',
  bold: true,
  right: true,
})``;

export const ModuleText = styled(Typography.Text).attrs({
  fontSize: 'h8',
  color: 'primary',
  bold: true,
})``;

export const DescriptionText = styled(Typography.Text).attrs({
  size: 'small',
})`
  margin-top: 5px;
`;

export const PostContainer = styled.View`
  margin-top: ${scaleHeight(5) + 'px'};
  padding-horizontal: ${scale(5) + 'px'};
`;

export const ExpiryDateText = styled(Typography.Text).attrs({
  fontSize: 'h8',
  //   lineHeightRatio: 1.5,
  color: 'primary',
})``;

export const DateBold = styled(ExpiryDateText).attrs({
  //   bold: true,
  color: 'primary',
})``;

export const ForwardIcon = styled(Icon).attrs({
  size: 20,
  type: 'forward',
  iconColor: colors.NAVY,
})`
  margin-left: ${scale(5) + 'px'};
`;

const logoSize = { height: 22, width: 44 };
export const LogoImage = styled(FastImage).attrs(({ uri }) => ({
  source: {
    uri: uri,
    priority: FastImage.priority.normal,
  },
  // resizeMode: FastImage.resizeMode.cover,
}))`
  height: ${logoSize.height + 'px'};
  width: ${logoSize.width + 'px'};
  margin-vertical: 5px;
  margin-right: ${scale(5) + 'px'};
`;
