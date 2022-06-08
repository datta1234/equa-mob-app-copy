import { rgba } from 'polished';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const ItemWrapper = styled.View`
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)};
  border-color: ${({ theme, mode = 'light' }) =>
    rgba(theme[mode].colors.fonts.secondary, 0.5)};
`;
