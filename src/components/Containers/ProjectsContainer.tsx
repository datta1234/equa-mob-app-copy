import React from 'react';

import styled from 'styled-components/native';

import { Title, Text } from 'components/Typography';
import { scale } from 'constants/layout';

import BaseContainer from './BaseContainer';

const BodyTitle = styled(Title).attrs({
  center: true,
  bold: true,
  fontSize: 'h6',
})`
  padding-top: 30px;
  padding-horizontal: ${scale(15) + 'px'};
`;

const BodyInfo = styled(Text).attrs({
  center: true,
  fontSize: 'h7',
  lineHeightRatio: 1.5,
  color: 'secondary',
})`
  padding-vertical: 10px;
  padding-horizontal: ${scale(40) + 'px'};
`;

const InfoContainer = ({ bodyTitle, bodyInfo, children, ...baseProps }) => {
  return (
    <BaseContainer {...baseProps}>
      <BodyTitle>{bodyTitle}</BodyTitle>
      <BodyInfo>{bodyInfo}</BodyInfo>
      {children}
    </BaseContainer>
  );
};

export default InfoContainer;
