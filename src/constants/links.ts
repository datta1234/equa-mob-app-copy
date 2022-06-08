import { Platform } from 'react-native';
import Config from 'react-native-config';
import { getBundleId } from 'react-native-device-info';

const APP_STORE_LINK_ID = '1573478623'; // com.aqgt.aqgreen app store id
const PACKAGE_NAME = getBundleId();

const appStoreLink = Platform.select({
  ios: `itms-apps://itunes.apple.com/us/app/id${APP_STORE_LINK_ID}?mt=8`,
  android: `market://details?id=${PACKAGE_NAME}`,
});

const firebaseLink = Platform.select({
  ios: `https://appdistribution.firebase.google.com/testerapps/${Config.FIREBASE_APP_SDK_ID_iOS}`,
  android: `https://appdistribution.firebase.google.com/testerapps/${Config.FIREBASE_APP_SDK_ID_ANDROID}`,
});

const appUpdateLink = Config.ENV === 'prod' ? appStoreLink : firebaseLink;

export default {
  privacyPolicy: 'https://aq-green.com/documents/Privacy-Policy_EN.pdf',
  termsOfUse: 'https://aq-green.com/documents/Terms-Of-Use_EN.pdf',
  revocationInformation:
    'https://aq-green.com/documents/AQ-Green-App-Revocation-Information-Subscriptions_EN.pdf',
  appUpdateLink: appUpdateLink,
};
