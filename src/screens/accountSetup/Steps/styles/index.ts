import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const ScreenContainer = styled.View`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
`;

export const OffsetCounterWrapper = styled.View`
  /* margin-vertical: 25px; */
`;

export const PrimaryWrapper = styled.View`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
`;

export const SecondaryWrapper = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.lightGray};

  margin-top: 10px;
`;

export const ContentWrapper = styled.View`
  margin-horizontal: ${({ withHorizontal = true }) =>
    withHorizontal ? '25px' : 0};

  margin-vertical: ${({ withVertical = true }) => (withVertical ? '25px' : 0)};
`;

export const ContentItemWrapper = styled.View`
  margin-vertical: 10px;
  margin-horizontal: ${({ withHorizontal }) => (withHorizontal ? '25px' : 0)};
`;

export const ContentRowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HorizontalScrollContainer = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 25,
    paddingRight: 50,
  },
})``;

// old

import colors from 'constants/colors';

export default StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  centered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteBlock: {
    backgroundColor: colors.WHITE,
  },
  grayBlock: {
    backgroundColor: colors.LIGHT_GRAY,
  },
  horizontalSeparate: {
    paddingVertical: 25,
  },
  titleWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
});
