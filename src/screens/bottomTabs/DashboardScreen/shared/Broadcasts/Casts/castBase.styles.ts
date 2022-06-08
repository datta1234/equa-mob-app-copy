import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

import { Button, Text } from 'components';
import { scaleHeight } from 'constants/layout';

export const Container = styled.View`
  align-items: center;
  margin-top: -20px;
`;

const logoSize = { height: 96, width: 192 };
export const LogoImage = styled(FastImage).attrs<{ uri: string }>(({ uri }) => ({
  source: {
    uri: uri,
    priority: FastImage.priority.normal,
  },
}))`
  height: ${logoSize.height + 'px'};
  width: ${logoSize.width + 'px'};
  margin-bottom: 5px;
`;

export const Message = styled(Text).attrs({
  center: true,
  color: 'secondary',
})`
  margin-bottom: ${scaleHeight(10) + 'px'};
  width: 100%;
  max-width: 260px;
`;

export const ActionButton = styled(Button).attrs({})`
  margin-top: ${scaleHeight(10) + 'px'};
`;
