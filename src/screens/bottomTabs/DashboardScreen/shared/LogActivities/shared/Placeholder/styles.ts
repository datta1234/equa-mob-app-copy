import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';

import { Typography } from 'components';

export const Container = styled.View`
  margin-horizontal: 20px;
  padding-vertical: 20px;
  border-radius: 15px;
  align-items: center;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
`;

export const Background = styled(ImageBackground).attrs({
  style: {
    //width: '100%',
    //     overflow: 'hidden', // prevent image overflow the container
  },
  imageStyle: {
    //     resizeMode: 'cover',
    tintColor: '#8DD1D380',
    //       height: 200,
    //       top: undefined,
    //       bottom: 0,
  },
})`
  justify-content: center;
  width: 100%;
  align-items: center;
`;

export const Title = styled(Typography.Title).attrs({
  color: 'primary',
  level: 3,
  center: true,
})`
  padding-vertical: 10px;
`;
export const ButtonContainer = styled.View`
  align-items: center;
  padding-vertical: 5px;
`;
