import React from 'react';

import styled from 'styled-components/native';

import WorldIcon from 'assets/svgs/offsets/WorldIcon';
import { Title, Text } from 'components/Typography';
import { scale, scaleHeight } from 'constants/layout';

const BodyHeaderContainer = styled.View`
  align-items: center;
  padding-top: ${scaleHeight(20) + 'px'};
  padding-bottom: ${scaleHeight(10) + 'px'};
  padding-horizontal: ${scale(15) + 'px'};
`;
const BodyTitle = styled(Title).attrs({
  center: true,
  fontSize: 'h5',
})`
  font-weight: 600;
  padding-top: ${scaleHeight(14) + 'px'};
`;

const BodyInfo = styled(Text).attrs({
  center: true,
  fontSize: 'h8',
  lineHeightRatio: 1.5,
  color: 'secondary',
})`
  padding-top: ${scaleHeight(6) + 'px'};
`;

const Header = ({ bodyTitle, bodyInfo }) => {
  return (
    <BodyHeaderContainer>
      <WorldIcon />
      <BodyTitle>{bodyTitle}</BodyTitle>
      <BodyInfo>{bodyInfo}</BodyInfo>
    </BodyHeaderContainer>
  );
};

export default Header;
