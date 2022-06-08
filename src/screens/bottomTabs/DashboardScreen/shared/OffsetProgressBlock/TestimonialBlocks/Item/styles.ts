import styled from 'styled-components/native';

import Typography from 'components/Typography';

export const Container = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.lightGray};
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  align-items: center;
`;

export const TargetValueContainer = styled.Text.attrs({
  numberOfLines: 1,
})`
  flex-direction: row;
  align-items: flex-end;
  /* flex-wrap: wrap; */
  justify-content: center;
  margin-bottom: 7px;
`;

export const ValueText = styled(Typography.Title).attrs({})`
  margin-right: 3px;
`;

export const ModuleText = styled(Typography.Title).attrs({
  level: 5,
})`
  transform: translateY(-3px);
`;

export const DescriptionText = styled(Typography.Text).attrs({
  size: 'small',
})``;

export const PostfixContainer = styled.View`
  margin-top: 5px;
  padding-horizontal: 5px;
`;
