import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const ScrollViewContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
  flex: 1;
`;

// export const SafeAreaContainer = styled(SafeAreaView).attrs({
//   // edges: ['top'],
// })`
//   flex: 1;
// `;

export const Container = styled(SafeAreaView)`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
  flex: 1;
  /* padding-top: 25px;
  padding-bottom: 25; */
  z-index: 1;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  margin-horizontal: 20px;
`;

export const BorderContentWrapper = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.lightGray1};
  width: 100%;
`;

export const ContentVerticalContainer = styled.View`
  padding-vertical: 15px;
`;

export const ContentHorizontalContainer = styled.View`
  margin-horizontal: 20px;
`;
