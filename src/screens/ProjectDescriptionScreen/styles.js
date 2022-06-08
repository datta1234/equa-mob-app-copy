import { rgba } from 'polished';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  scrollEventThrottle: 400,
})`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark};
  flex: 1;
  position: relative;
  padding-bottom: 50px;
`;

export const ProjectTitleCard = styled.View`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
  border-radius: 6px;
`;

export const HeaderContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding-horizontal: 20;
  position: absolute;
  width: 100%;
  top: 75;
  z-index: 1;
`;

export const ImageContainer = styled.View`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark};
  width: 100%;
  height: 350px;
`;

export const ImagegradientOverlay = styled(LinearGradient).attrs(
  ({ theme, mode = 'light' }) => ({
    colors: [rgba(theme[mode].colors.dark, 0.75), 'transparent'],
  })
)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const ContentContainer = styled.View`
  padding: 15px 25px;
`;

export const ContentItemContainer = styled.View`
  padding-vertical: 10px;
`;

const RawIcon = styled(Icon).attrs(({ theme, mode = 'light' }) => ({
  color: theme[mode].colors.white,
  size: 21,
}))``;

export const TwitterIcon = styled(RawIcon).attrs({
  name: 'twitter',
  type: 'antdesign',
})``;

export const InstagramIcon = styled(RawIcon).attrs({
  name: 'instagram',
  type: 'antdesign',
})``;

export const FacebookIcon = styled(RawIcon).attrs({
  name: 'sc-facebook',
  type: 'evilicon',
  size: 28,
})``;

export const LinkIcon = styled(RawIcon).attrs({
  name: 'link',
  type: 'antdesign',
})``;

export const IconsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;
export const IconContainer = styled.View`
  margin-horizontal: 15px;
`;

export const Separator = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    rgba(theme[mode].colors.lightGray, 0.25)};
  height: 10px;
  width: 100%;
`;

export const CloseIcon = styled(Icon).attrs({
  type: 'antdesign',
  name: 'close',
  size: 26,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
})``;

export const ShareIcon = styled(Icon).attrs(({ theme, mode = 'light' }) => ({
  type: 'ionicon',
  name: 'share-outline',
  size: 31,
  color: theme[mode].colors.white,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
}))``;

export const CloseIconContainer = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.25,
  shadowRadius: 1.41,

  elevation: 5,
})`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.lightGray};
  align-self: center;
  border-radius: 50px;
  padding: 5px;
`;

export const CloseIconWrapper = styled.View`
  position: absolute;
  top: 75px;
  left: 25;
  z-index: 1;
  border-radius: 50px;
  /* overflow: hidden; */
  /* background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.lightGray}; */
`;
