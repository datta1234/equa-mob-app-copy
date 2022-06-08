import styled from 'styled-components/native';

import Typography from 'components/Typography';

export const Title = styled(Typography.Title).attrs({
  fontSize: 'h5',
  bold: true,
  color: 'primary',
})`
  padding-top: 12px;
  padding-bottom: 10px;
`;

export const ProjectListContainer = styled.View.attrs({})`
  /* bottom padding used for Footer space */
  margin-bottom: 150px;
  padding-horizontal: 20px;
`;
