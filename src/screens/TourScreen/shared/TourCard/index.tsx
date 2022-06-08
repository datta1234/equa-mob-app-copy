import React from 'react';

import { Image } from 'react-native';
import styled from 'styled-components/native';

import { Typography } from 'components';

const propTypes = {};

const defaultProps = {};

function TourCard({ data }) {
  return (
    <Container>
      <IconContainer>
        <CardIcon source={data.icon} />
      </IconContainer>

      <ContentItemWrapper>
        <CardTitle>{data.title}</CardTitle>
        <CardText>{data.text}</CardText>
      </ContentItemWrapper>
    </Container>
  );
}

TourCard.defaultProps = defaultProps;
TourCard.propTypes = propTypes;
export default TourCard;

const Container = styled.View`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
  padding-horizontal: 25px;
  min-height: 150px;
  justify-content: center;
  border-radius: 15px;
  align-items: center;
`;
const CardIcon = styled(Image).attrs({})``;
const CardTitle = styled(Typography.Title).attrs({
  center: true,
  fontSize: 'h2',
})`
  margin-top: 10px;
`;
const CardText = styled(Typography.Text).attrs({
  lineHeightRatio: 1.5,
  color: 'primary',
  center: true,
})`
  margin-vertical: 10px;
`;

const IconContainer = styled.View`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.accent};
  width: 68px;
  height: 68px;
  border-radius: 60px;
  align-items: center;
  justify-content: center;
  align-self: center;
  position: absolute;
  top: -52px;
`;

const ContentItemWrapper = styled.View`
  padding-vertical: 15px;
`;
