import styled, { css } from 'styled-components/native';

import Typography from 'components/Typography';

export const ValueText = styled(Typography.Text).attrs({
  numberOfLines: 1,
  bold: true,
  fontSize: 'h5',
})`
  padding-right: 5px;
  color: ${({ theme, mode = 'light' }) => theme[mode].text.primary};
`;

export const UnitText = styled(Typography.Text).attrs({})`
  color: ${({ theme, mode = 'light' }) => theme[mode].text.primary};
`;

export const DescriptionText = styled(Typography.Text).attrs({})`
  color: ${({ theme, mode = 'light' }) => theme[mode].text.primary};
  padding-right: 10px;
`;

export const ValueContainer = styled.View`
  align-items: center;
  flex-direction: row;
  /* // Add in below if text should right align  */
  /* flex-grow: 1; */
  /* justify-content: flex-end; */
`;

export const EmissionContainer = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.contrast};
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  border-radius: 10px;
  padding-horizontal: 20px;
  padding-vertical: 15px;
`;
