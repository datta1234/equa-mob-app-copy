import React from 'react';

import SelectedOverlay from './SelectedOverlay';
import { Image, ImageContainer } from './styles';

const CardImage = ({ media, isHorizontal, isSelected, width }) => {
  const url = media?.[0]?.url;
  return (
    <ImageContainer isHorizontal={isHorizontal} width={width}>
      <SelectedOverlay width={width} isSelected={isSelected}>
        <Image isHorizontal={isHorizontal} uri={url} />
      </SelectedOverlay>
    </ImageContainer>
  );
};

export default CardImage;
