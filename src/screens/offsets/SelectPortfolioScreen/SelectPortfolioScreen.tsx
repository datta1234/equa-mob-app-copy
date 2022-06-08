import React, { useState } from 'react';

import PortfolioList from 'components/Portfolio/PortfolioList';

import useOffsetNav from '../hooks/useOffsetNav';

import Container from './components/Container';
import Header from './components/Header';

const title = 'SELECT YOUR PORTFOLIO';
const info = 'Select a portfolio to auto offset \nyour footprint each month';
const details = 'The projects for each portfolio are frequently updated';

const defaultProps = {};
const SelectPortfolioScreen = ({ portfolios, loading }) => {
  const goTo = useOffsetNav();
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);

  const onNext = () =>
    goTo.subscriptionOverview({
      portfolioId: selectedPortfolioId,
      isActive: false,
      subscriptionId: null,
    });

  return (
    <Container
      isFooterVisible={!!selectedPortfolioId}
      onNext={onNext}
      title={title}>
      <Header bodyTitle={info} bodyInfo={details} />
      <PortfolioList
        selectedPortfolioId={selectedPortfolioId}
        onPortfolioSelect={(id) =>
          setSelectedPortfolioId((prev) => (prev === id ? null : id))
        }
        singleSelect={true}
        isLoading={loading}
        portfolios={portfolios}
      />
    </Container>
  );
};

SelectPortfolioScreen.defaultProps = defaultProps;
export default SelectPortfolioScreen;
