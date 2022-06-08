import styled from 'styled-components/native';

import Typography from 'components/Typography';

const Text = styled(Typography.Text).attrs({
  size: 'tiny',
  color: 'info',
  center: true,
})``;
const Instructions = styled(Text).attrs({})`
  margin-top: 15px;
`;
const Disclaimer = styled(Text).attrs({})`
  align-self: center;
  max-width: 200px;
  margin-bottom: 25px;
`;

export default { Instructions, Disclaimer };
