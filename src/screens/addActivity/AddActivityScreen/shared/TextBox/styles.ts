import styled, { css } from 'styled-components/native';

import Typography from 'components/Typography';

export const TextBoxTitle = styled(Typography.Text).attrs({
  size: 'normal',
  color: 'secondary',
})`
  ${({ theme, mode = 'light' }) => css``}
`;
export const InfoBox = styled.View`
  ${({ theme, mode = 'light' }) => css`
    background-color: ${theme[mode].background.contrast};
    border-radius: 10px;
    padding-vertical: 10px;
    padding-horizontal: 15px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `}
`;
export const InfoBoxText = styled(Typography.Text).attrs({
  size: 'normal',
  color: 'secondary',
})`
  ${({ theme, mode = 'light' }) => css`
    flex-shrink: 1;
  `}
`;
