import { Icon } from 'react-native-elements';
import styled, { css } from 'styled-components/native';

export const AddressMapIcon = styled(Icon).attrs({
  name: 'map-marker-multiple-outline',
  type: 'material-community',
  size: 16,
})``;

export const MedalIcon = styled(Icon).attrs({
  name: 'medal-outline',
  type: 'material-community',
  size: 16,
})``;

export const ExternalContainer = styled.View.attrs({})`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
  align-self: center;
  flex-direction: ${({ isHorizontal }) => (isHorizontal ? 'row' : 'column')};
  border-radius: 6px;
  overflow: hidden;
`;

export const Container = styled.View.attrs({})`
  align-self: center;
  flex-direction: ${({ isHorizontal }) => (isHorizontal ? 'row' : 'column')};
`;

export const ImageContainer = styled.View`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark};
  width: 210;
  height: 155;
  position: relative;

  ${({ isHorizontal }) =>
    isHorizontal &&
    css`
      height: 110;
      width: 110;
      margin-left: 15;
      margin-top: 15;
    `}
`;

export const DescriptionContainer = styled.View`
  padding: 15px;
  ${({ isHorizontal }) =>
    isHorizontal &&
    css`
      flex: 1;
    `}
`;

export const ActionNodeContainer = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,

  elevation: 2,
})`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

//   description: {
//     padding: 15,
//   },
//   horizontalDescription: {
//     flex: 1,
//   },

//   projectDescrionText: {
//     fontSize: 12,
//     opacity: 0.75,
//   },
//   projectDescrionIconContainer: {
//     marginRight: 3,
//     opacity: 0.85,
//   },
//   projectDescrionContainer: {
//     borderTopWidth: 1,
//     borderColor: rgba(colors.GRAY2, 0.25),
//     paddingVertical: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   typeText: {
//     textTransform: 'uppercase',
//     fontSize: 10,
//   },
// });
