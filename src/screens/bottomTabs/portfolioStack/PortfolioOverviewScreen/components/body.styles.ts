import FastImage from 'react-native-fast-image';
import styled, { css } from 'styled-components/native';

import Typography from 'components/Typography';

export const Container = styled.View`
  padding-top: 0px;
  /* padding-horizontal: 20px; */
  /* align-items: center; */
`;

export const Title = styled(Typography.Title).attrs({
  fontSize: 'h5',
  bold: true,
  color: 'primary',
})`
  margin-top: 10px;
`;

export const DetailsContainer = styled.View.attrs({})`
  padding-horizontal: 20px;
`;

export const Description = styled(Typography.Text).attrs({
  fontSize: 'h8',
  color: 'info',
  lineHeightRatio: 1.5,
})`
  padding-bottom: 5px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
`;

const logoSize = { height: 42, width: 84 };
export const LogoImage = styled(FastImage).attrs(({ uri }) => ({
  source: {
    uri: uri,
    priority: FastImage.priority.normal,
  },
  // resizeMode: FastImage.resizeMode.cover,
}))`
  height: ${logoSize.height + 'px'};
  width: ${logoSize.width + 'px'};
  margin-bottom: 5px;
`;
