import { scale } from 'constants/layout';
import styled, { css } from 'styled-components/native';

export const Container = styled.View.attrs({})`
  align-self: center;
  align-items: center;
  flex-direction: ${({ isHorizontal }) => (isHorizontal ? 'row' : 'column')};
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
  margin-horizontal: 20px;
  border-width: ${({ isSelected, singleSelect }) =>
    (singleSelect ? (isSelected ? 3 : 2) : 0) + 'px'};
  border-color: ${({ isSelected, theme, mode = 'light' }) =>
    theme[mode].buttons[isSelected ? 'primary' : 'primaryDisabled']};
  /* margin-bottom: 10px; */
  border-radius: 10px;
  overflow: hidden;
`;
export const IconContainer = styled.View.attrs({})`
  /* background-color: red; */
  padding-right: ${scale(4) + 'px'};
  padding-left: ${scale(3) + 'px'};
  justify-content: center;
`;

export const ActionNodeContainer = styled.View.attrs({
  // shadowColor: '#000',
  // shadowOffset: {
  //   width: 0,
  //   height: 1,
  // },
  // shadowOpacity: 0.2,
  // shadowRadius: 1.41,
  // elevation: 2,
})`
  background-color: whitesmoke;
  border-bottom-right-radius: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
`;
