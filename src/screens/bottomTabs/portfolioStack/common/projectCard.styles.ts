import styled from 'styled-components/native';

import { Title, Text } from 'components/Typography';

export const PressableContainer = styled.TouchableOpacity.attrs({})`
  align-self: center;
  flex-direction: row;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.primary};
  margin-bottom: 15px;
  padding-right: 10px;
  border-radius: 10px;
`;

export const CardDetailsContainer = styled.View`
  padding: 10px;
  justify-content: flex-start;
  flex: 1;
`;

export const ProjectName = styled(Title).attrs({
  fontSize: 'h6',
  numberOfLines: 3,
})`
  font-weight: 600;
`;
export const Description = styled(Text).attrs({
  fontSize: 'h8',
  color: 'info',
  numberOfLines: 2,
  lineHeightRatio: 1.5,
})`
  padding-top: 2px;
`;

export const ImageContainer = styled.View`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark};
  position: relative;
  border-radius: 5px;
  height: 100px;
  width: 100px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Image = styled.Image.attrs(({ uri }) => ({
  source: {
    uri: uri,
  },
  //   resizeMode: 'cover',
}))`
  width: 100%;
  height: 100%;
  border-radius: ${(isHorizontal) => (isHorizontal ? 5 : 0) + 'px'};
`;

export const IconContainer = styled.View.attrs({})`
  justify-content: flex-end;
  padding-bottom: 15px;
`;
