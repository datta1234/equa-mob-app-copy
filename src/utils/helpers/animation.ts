import { LayoutAnimation, InteractionManager } from 'react-native';

export const runAfterInteraction = (func) =>
  InteractionManager.runAfterInteractions(func);

export const runAfterInteractionHOF = (func) => (params) => {
  InteractionManager.runAfterInteractions(() => func(params));
};

/**    ConfigureLayoutAnimation
 *  configure the next layout animation
 * @param obj with properties: duration, type and style
 * duration: default 500ms
 * type: default 'linear'
 * style: default 'opacity'
 * LayoutAnimation handles the way layout changes are handled every time the screen ( or part of it ) is re-rendered. What this means is that every time setState is called resulting in views changing position LayoutAnimation can be used to animate the way views move to their new positions.
 *
 * LayoutAnimation works by identifying views by their unique key, computing their expected position, and relying on the underlying native framework (CoreAnimation on iOS) to animate the change. Frame changes are animated as long as the view keeps the same key between state changes.
 *
 * ReactNative’s Animated API works similarly, but requires a state property for each desired animation.
 */
let isLayoutAnimationConfigured = false;

export const configureLayoutAnimation = ({
  duration = 500,
  type = 'linear',
  style = 'opacity',
} = {}) => {
  if (!isLayoutAnimationConfigured) {
    isLayoutAnimationConfigured = true;

    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        duration,
        LayoutAnimation.Types[type],
        LayoutAnimation.Properties[style],
      ),
      () => {
        // LayoutAnimation Ended function
        isLayoutAnimationConfigured = false;
      },
      () => {
        // LayoutAnimation Failed function
        isLayoutAnimationConfigured = false;
      },
    );
  }
};
