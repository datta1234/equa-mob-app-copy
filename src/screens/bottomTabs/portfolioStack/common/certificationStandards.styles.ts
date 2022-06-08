import styled from 'styled-components/native';

import StyledImage from 'components/StyledImage';
import Typography from 'components/Typography';
import { SCREEN_WIDTH } from 'constants/layout';

export const Title = styled(Typography.Title).attrs({
  fontSize: 'h5',
  bold: true,
  color: 'primary',
})`
  padding-top: 12px;
  padding-bottom: 10px;
`;

export const CertificationsContainer = styled.View.attrs({})`
  padding-horizontal: 20px;
`;

export const HorizontalScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  decelerationRate: 'fast',
  // snapToInterval: SCREEN_WIDTH - 25, //your element width
  snapToAlignment: 'center',
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})`
  /* flex: 1; */
`;

const size = {
  width: (SCREEN_WIDTH - 60) / 2,
  height: (SCREEN_WIDTH - 60) / 4,
};

export const CertificationContainer = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
  position: relative;
  border-radius: 10px;
  justify-content: center;
  overflow: hidden;
  align-items: center;
  height: ${size.height + 'px'};
  width: ${size.width + 'px'};
  margin-right: ${({ isFirst, isLast }) => (isLast ? '0px' : '20px')};
  margin-bottom: 20px;
`;
export const CertificationImage = styled(StyledImage).attrs({
  resizeMode: 'contain',
})`
  width: ${size.width + 'px'};
  height: ${size.height + 'px'};
  border-radius: 10px;
`;
