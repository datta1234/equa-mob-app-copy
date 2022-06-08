import React from 'react';

import { roundNumber } from 'utils/common';

import { PortfolioName, Description, Container } from './styles';
import { Value, ValueDescription, QuoteContainer } from './styles';

const Quote = ({ quote }) =>
  quote?.totalHabitAmount ? (
    <QuoteContainer>
      <Value>
        {`${quote?.currency?.symbol}${roundNumber(
          quote?.totalHabitAmount,
          2
        ).toFixed(2)} per month`}
      </Value>
      <ValueDescription>{'based on your monthly emissions'}</ValueDescription>
    </QuoteContainer>
  ) : (
    <QuoteContainer>
      <ValueDescription>
        <Value>
          {quote?.totalAmount && !quote?.totalHabitAmount
            ? 'Add a recurring activity'
            : 'Measure your footprint'}
        </Value>
        {' to see portfolio pricing'}
      </ValueDescription>
    </QuoteContainer>
  );

const CardDetails = ({
  title,
  description,
  quote,
  isHorizontal,
  simple,
  width,
}) => {
  return (
    <Container width={width} isHorizontal={isHorizontal}>
      <PortfolioName>{title}</PortfolioName>
      <Description>{description}</Description>
      {!simple && <Quote quote={quote} />}
    </Container>
  );
};

export default CardDetails;
