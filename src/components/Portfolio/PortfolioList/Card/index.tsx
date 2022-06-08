import React from 'react';

import { pipe } from 'ramda';
import { TouchableOpacity } from 'react-native';

import { Icon } from 'components';
import { scale } from 'constants/layout';
import { isNotDefined } from 'utils/ramda';

import withShadow from './hocs/withShadow';
import { CardImage, CardDetails } from './shared';
import { Container, ActionNodeContainer, IconContainer } from './styles';

function PortfolioCard({
  isHorizontal,
  simple,
  isSelected,
  singleSelect,
  renderAction,
  onForwardPress,
  onSelect,
  disabled,
  portfolio = {},
}) {
  const { name, shortDescription, quote, media } = portfolio;
  const _renderAction = () => {
    if (isNotDefined(renderAction)) {
      return null;
    }
    return renderAction();
  };

  const imageSize = isHorizontal ? 100 : 210;
  const width = simple ? scale(60) : imageSize;
  return (
    <TouchableOpacity onPress={onSelect} disabled={disabled || !onSelect}>
      <Container
        isHorizontal={isHorizontal}
        isSelected={isSelected}
        singleSelect={singleSelect}>
        <ActionNodeContainer>{_renderAction()}</ActionNodeContainer>
        <CardImage
          media={media}
          width={width}
          isHorizontal={isHorizontal}
          isSelected={isSelected}
        />
        <CardDetails
          simple={simple}
          title={name}
          description={shortDescription}
          quote={quote}
          width={width}
          isHorizontal={isHorizontal}
        />
        {isHorizontal && (onForwardPress || onSelect) && (
          <IconContainer>
            <Icon type="forward" size={20} onPress={onForwardPress} />
          </IconContainer>
        )}
      </Container>
    </TouchableOpacity>
  );
}

const propTypes = {};

const defaultProps = {};

PortfolioCard.defaultProps = defaultProps;
PortfolioCard.propTypes = propTypes;
export default pipe(withShadow)(PortfolioCard);
