import PropTypes from 'prop-types';
import { Platform, Dimensions, PlatformIOSStatic } from 'react-native';
import Config from 'react-native-config';

import { testingEnvironments, productionEnvironments } from 'constants/index';

import {
  configureLayoutAnimation,
  runAfterInteractionHOF,
  runAfterInteraction,
} from './animation';
import { allSettled, debounceFunction, throttleFunction } from './control';
import { chunkArray, numberFormatter } from './formatting';
import renderNode from './renderNode';
import { testEmptyInputs } from './testInputs';

const nodeType = PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.object,
  PropTypes.bool,
  PropTypes.func,
]);

const isProdEnv = productionEnvironments.includes(Config.ENV);
const isTestingEnv = testingEnvironments.includes(Config.ENV);
const isIOS = Platform.OS === 'ios';
const isIPad = (Platform as PlatformIOSStatic).isPad

const majorVersionIOS = parseInt((Platform as PlatformIOSStatic).Version, 10);
const majorVersionAndroid = Platform.Version;

const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};

const isBoolean = (val) => typeof val === 'boolean';

/**
 *  Clones object omitting a particular key from the objec
 * @param prop key in object to omit
 * @param object key in object to omit
 */
const omit = (prop, obj) => { 
  const { [prop]: _, ...rest } = obj
 return rest
};

function objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

export {
  allSettled,
  chunkArray,
  configureLayoutAnimation,
  runAfterInteractionHOF,
  runAfterInteraction,
  isLandscape,
  isProdEnv,
  isTestingEnv,
  isIOS,
  isIPad,
  isBoolean,
  omit,
  majorVersionIOS,
  majorVersionAndroid,
  debounceFunction,
  throttleFunction,
  objectWithoutProperties,
  renderNode,
  numberFormatter,
  nodeType,
  testEmptyInputs,
};
