import i18n from 'i18n-js';
import { memoizeWith } from 'ramda';
import { I18nManager, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import * as RNLocalize from 'react-native-localize';

import en from 'assets/translations/en.json';

const getLanguage = async () => {
  let translationsDir = [];
  try {
    translationsDir = await (Platform.OS === 'android'
      ? RNFS.readDir(RNFS.DocumentDirectoryPath)
      : RNFS.readDir(RNFS.MainBundlePath + '/translations'));
  } catch (error) {}

  const translationPaths = translationsDir
    .filter(({ isFile, name }) => isFile() && name.endsWith('.json'))
    .reduce((all, { name, path }) => {
      const languageTag = name.replace('.json', '');
      return { ...all, [languageTag]: path };
    }, {});

  // fallback if no available language fits
  const fallback = { languageTag: 'en', isRTL: false };

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationPaths)) ||
    fallback;

  return { languageTag, isRTL };
};

const setI18nConfig = async () => {
  const { languageTag, isRTL } = await getLanguage();

  // const fileContent = await (Platform.OS === 'android'
  //   ? RNFS.readFileAssets(translationPaths[languageTag], 'utf8')
  //   : RNFS.readFile(translationPaths[languageTag], 'utf8'));

  // let fileContentParsed = {};
  // try {
  //   fileContentParsed = JSON.parse(fileContent);
  // } catch (error) {
  //   fileContentParsed = fileContent;
  // }

  // clear translation cache
  // translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  const translations = {
    en: en, //JSON.parse(en),
  };

  i18n.translations = { [languageTag]: translations[languageTag] };
  i18n.locale = languageTag;
};

setI18nConfig();

function createTranslator() {
  const translate = memoizeWith(
    (key, config) => (config ? key + JSON.stringify(config) : key),
    (key, config) => i18n.t(key, config)
  );

  return {
    setI18nConfig,
    translate,
    getLanguage,
  };
}

export default createTranslator();
