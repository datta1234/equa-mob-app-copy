import React from 'react';

import { rgba } from 'polished';
import styled from 'styled-components/native';

import Typography from 'components/Typography';
import { colors } from 'constants/';
import { scale } from 'constants/layout';

const HeaderTitle = ({
  style,
  children,
  text,
  containerStyle,
  ...titleProps
}) => {
  return (
    <Border style={style}>
      <Container style={containerStyle}>
        <Title {...titleProps}>{children ?? text}</Title>
      </Container>
    </Border>
  );
};

export default HeaderTitle;

const Border = styled.View`
  padding: ${scale(10) + 'px'};
  border-radius: 50px;
  background-color: ${rgba(colors.WHITE, 0.18)};
`;
const Container = styled.View`
  background-color: white;
  border-radius: 40px;
  padding-horizontal: ${scale(17) + 'px'};
  padding-vertical: ${scale(8) + 'px'};
`;

const Title = styled(Typography.Title).attrs((props) => ({
  center: true,
  bold: true,
  color: 'primary',
  fontSize: 'h7',
  ...props,
}))``;
