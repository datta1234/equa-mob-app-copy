import styled from 'styled-components/native';

export const ItemContainer = styled.View`
  padding-horizontal: 10px;
  padding-bottom: 5px;
  align-items: center;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.9)};
  flex: 1;
`;

export const IconContainer = styled.View`
  flex: 1;
  min-height: 28px;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
`;

export const ItemTitleContainer = styled.View`
  /* flex: 1; */
  margin-top: -0px;
`;

export const ActiveDot = styled.View`
  /* flex: 1; */
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.accent};
`;

export const ActiveDotContainer = styled.View`
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-2.5px) translateY(10px);
`;
