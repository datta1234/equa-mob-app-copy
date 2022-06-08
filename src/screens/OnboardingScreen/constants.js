import offsetStepImg from 'assets/onboarding/offsetStep.png';
import profileMockStepImg from 'assets/onboarding/profileMock.gif';
import reduceStepImg from 'assets/onboarding/ReduceStep.jpg';
import sharedResposibilityStepImg from 'assets/onboarding/sharedResposibilityStep.jpg';

export const SCREENS = [
  { key: 'intro' },
  {
    key: '1',
    title: 'onboarding.slides.1.title',
    subtitle: 'onboarding.slides.1.subtitle',
    img: profileMockStepImg,
  },
  {
    key: '2',
    title: 'onboarding.slides.2.title',
    subtitle: 'onboarding.slides.2.subtitle',
    img: reduceStepImg,
  },
  {
    key: '3',
    title: 'onboarding.slides.3.title',
    subtitle: 'onboarding.slides.3.subtitle',
    img: offsetStepImg,
  },
  {
    key: '4',
    title: 'onboarding.slides.4.title',
    subtitle: 'onboarding.slides.4.subtitle',
    img: sharedResposibilityStepImg,
  },
];
