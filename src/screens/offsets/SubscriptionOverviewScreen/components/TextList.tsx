import React from 'react';

import styled from 'styled-components/native';

import Typography from 'components/Typography';
import { scaleHeight } from 'constants/layout';

export const ListContainer = styled.View`
  margin-top: ${scaleHeight(12) + 'px'};
  padding-top: 10px;
  max-width: 300px;
  margin-horizontal: 40px;
`;
export const ListItemContainer = styled.View`
  padding-bottom: 10px;
  flex-direction: row;
`;

export const Text = styled(Typography.Text).attrs({
  fontSize: 'h8',
  lineHeightRatio: 1.5,
  color: 'secondary',
})``;

const TextList = ({ list }) => {
  return (
    <ListContainer>
      {list.map((item) => (
        <ListItemContainer key={item.key}>
          <Text>{'\u2022  '}</Text>
          <Text>{item.value}</Text>
        </ListItemContainer>
      ))}
    </ListContainer>
  );
};

export default TextList;
