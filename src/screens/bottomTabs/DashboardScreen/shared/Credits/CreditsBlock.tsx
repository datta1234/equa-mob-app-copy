import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/core';
import { format, isPast } from 'date-fns';
import PropTypes from 'prop-types';

import { PORTFOLIO_NAVIGATOR } from 'constants/routes';
import { getSmartCounterStream } from 'utils/common';
import { carbonOffsetFormat } from 'utils/formats';
import { numberFormatter } from 'utils/helpers';

import {
  PressableContainer,
  Container,
  ValueCont,
  ValueText,
  ModuleText,
  DescriptionText,
  TargetValueContainer,
  Col,
  PostContainer,
  LogoImage,
  ForwardIcon,
} from './creditsBlock.styles';
import { ExpiryDateText, DateBold } from './creditsBlock.styles';

const ExpiryDate = ({ date }) => (
  <ExpiryDateText>
    {isPast(new Date(date)) ? 'Expired on ' : 'Valid until '}
    <DateBold>{format(new Date(date), 'dd LLL yyyy')}</DateBold>
  </ExpiryDateText>
);

function Block({
  value,
  module,
  expiryDate,
  description,
  renderPost,
  disabled,
  onSelect,
  onForwardPress,
  logo,
}) {
  const logoImageUrl = logo?.url;

  return (
    <>
      <PressableContainer onPress={onSelect} disabled={disabled || !onSelect}>
        <Container>
          {logoImageUrl && <LogoImage uri={logoImageUrl} />}
          <Col>
            <TargetValueContainer>
              <ValueCont>
                <ValueText>
                  {numberFormatter(carbonOffsetFormat(value, { dec: 0 }))}
                </ValueText>
              </ValueCont>
              <ModuleText>{module}</ModuleText>
            </TargetValueContainer>
            <ExpiryDate date={expiryDate} />
            {description ? (
              <DescriptionText>{description}</DescriptionText>
            ) : null}
          </Col>

          <ForwardIcon onPress={onForwardPress} />
        </Container>
      </PressableContainer>
      {renderPost && <PostContainer>{renderPost()}</PostContainer>}
    </>
  );
}

const propTypes = {
  credits: PropTypes.number,
};

const defaultProps = {
  credits: 0,
};

const portfolioOverviewScreen =
  PORTFOLIO_NAVIGATOR.PORTFOLIO_OVERVIEW_SCREEN.NAME;
const PortfolioNavigator = PORTFOLIO_NAVIGATOR.NAME;

function CreditsBlock({ credits, expiryDate, portfolio }) {
  const [_val, _setVal] = useState(0);
  const navigation = useNavigation();

  const logo = portfolio?.media?.find((img) => img?.typeCode === 'LOGO');

  useEffect(() => {
    const $smartCounterStream = getSmartCounterStream({
      initial: credits,
      value: _val,
      animateTimeMs: 3500,
    });

    const subscription = $smartCounterStream.subscribe(_setVal);

    return () => {
      subscription.unsubscribe();
    };
  }, [credits]);

  const navToPortfolioOverview = (id) =>
    navigation.navigate(PortfolioNavigator, {
      screen: portfolioOverviewScreen,
      params: {
        id: id,
      },
    });

  const onSelect = () => navToPortfolioOverview(portfolio?.id);
  const onForwardPress = () => navToPortfolioOverview(portfolio?.id);

  return (
    <Block
      onSelect={onSelect}
      onForwardPress={onForwardPress}
      value={_val.toFixed(2)}
      logo={logo}
      expiryDate={expiryDate}
      module="kgCO2e Remaining Credits"
      description={''}
    />
  );
}

CreditsBlock.defaultProps = defaultProps;
CreditsBlock.propTypes = propTypes;
export default CreditsBlock;
