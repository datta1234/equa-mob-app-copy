import React from 'react';

// import PropTypes from 'prop-types';

import { View } from 'react-native';

import translator from 'utils/translator';

import { withSlideUpAnimation } from '../../hocs';

import MobilePreview from './MobilePreview';
import {
  Container,
  AccentBlcok,
  TitleText,
  SubtitleText,
  DescriptionBlcok,
} from './styles';

const propTypes = {};

const defaultProps = {};

const AnimatedSubtitleText = withSlideUpAnimation(SubtitleText);
const AnimatedView = withSlideUpAnimation(View);

function Slide({ route } = {}) {
  return (
    <Container>
      <AccentBlcok>
        <TitleText>{route.title}</TitleText>

        <View style={{ padding: 15, flex: 1 }}>
          <View style={{ flex: 1 }}>
            <MobilePreview sourceImage={route.img} />
          </View>

          {/* <View style={{ flex: 1, backgroundColor: 'purple' }} /> */}
        </View>
      </AccentBlcok>

      <DescriptionBlcok>
        <AnimatedSubtitleText>{route.subtitle}</AnimatedSubtitleText>
      </DescriptionBlcok>
    </Container>
  );
}

function InitialSlide() {
  return (
    <Container>
      <AccentBlcok>
        <AnimatedView
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TitleText style={{ fontSize: 42, marginBottom: 15 }}>
            {translator.translate('onboarding.slides.0.title')}
          </TitleText>
        </AnimatedView>
      </AccentBlcok>

      <DescriptionBlcok>
        <SubtitleText>
          {translator.translate('onboarding.slides.0.subtitle')}
        </SubtitleText>
      </DescriptionBlcok>
    </Container>
  );
}

Slide.defaultProps = defaultProps;
Slide.propTypes = propTypes;
export { InitialSlide };
export default Slide;
