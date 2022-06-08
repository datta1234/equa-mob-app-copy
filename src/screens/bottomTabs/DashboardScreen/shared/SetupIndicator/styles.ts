import styled from 'styled-components/native';

import Typography from 'components/Typography';

export const Container = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const Bar = styled.View`
  background-color: ${({ theme, mode = 'light', isActive }) =>
    theme[mode].colors[isActive ? 'success' : 'lightGray1']};
  height: 8px;
  width: 100%;

  border-top-left-radius: ${({ isFirst }) => (isFirst ? '8px' : 0)};
  border-bottom-left-radius: ${({ isFirst }) => (isFirst ? '8px' : 0)};

  border-top-right-radius: ${({ isLast }) => (isLast ? '8px' : 0)};
  border-bottom-right-radius: ${({ isLast }) => (isLast ? '8px' : 0)};
`;

export const ProgressFragmentContainer = styled.View`
  flex: 1;
  margin-horizontal: 1.5px;
`;

export const BarTitleContainer = styled.View`
  margin-top: 8px;
`;

export const BarTitle = styled(Typography.Text).attrs(
  ({ theme, mode = 'light', isActive }) => ({
    size: 'small',
  })
)`
  line-height: 18px;
  color: ${({ theme, mode = 'light', isActive }) =>
    theme[mode].colors[isActive ? 'success' : 'gray']};
`;
