import FastImage from 'react-native-fast-image';
import styled, { css } from 'styled-components/native';

import Typography from 'components/Typography';
import { SCREEN_WIDTH } from 'constants/layout';

export const Title = styled(Typography.Title).attrs({
  fontSize: 'h5',
  bold: true,
  color: 'primary',
})`
  padding-top: 12px;
  padding-bottom: 10px;
  padding-horizontal: 20px;
`;

const goalSize = (SCREEN_WIDTH - 82) / 3;

export const GoalsSetContainer = styled.View`
  flex-direction: row;
  width: ${SCREEN_WIDTH + 'px'};
  flex-wrap: wrap;
  /* margin-right: 0, */
`;
export const GoalContainer = styled.View`
  position: relative;
  border-radius: 10px;
  justify-content: center;
  overflow: hidden;
  height: ${goalSize + 'px'};
  align-items: center;
  margin-right: ${({ isLast }) => (isLast ? '20px' : '20px')};
  margin-left: ${({ isFirst }) => (isFirst ? '20px' : '0px')};
  margin-bottom: 10px;
`;

export const GoalImage = styled(FastImage).attrs(({ uri }) => ({
  source: {
    uri: uri,
    priority: FastImage.priority.normal,
  },
  // resizeMode: FastImage.resizeMode.cover,
}))`
  ${({ theme, mode = 'light' }) => css``}
  width: ${goalSize + 'px'};
  height: ${goalSize + 'px'};
  border-radius: 10px;
`;
