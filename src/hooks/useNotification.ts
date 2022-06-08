import { useNavigation, useRoute } from '@react-navigation/native';

import { AUTH_NAVIGATOR, ROOT_NAVIGATOR } from 'constants/routes';
import { prettyGraphQLErrors } from 'utils/formats';
import { runAfterInteractionHOF } from 'utils/helpers';

function useNotification(options = { isAuth: false }) {
  const navigation = useNavigation();

  const navigator = options.isAuth
    ? AUTH_NAVIGATOR.NAME
    : ROOT_NAVIGATOR.NAME;
  const screen = options.isAuth
    ? AUTH_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME
    : ROOT_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME;

  const goToNotificationScreen = ({ errors, ...rest }) => {
    const notificationProps = errors ? prettyGraphQLErrors(errors) : rest;
    const { type, title, subtitle, renderNode, navType = 'navigate', ...other } = notificationProps;

    navigation[navType](navigator, {
      screen: screen,
      params: {
        type,
        title,
        subtitle,
        renderNode,
        ...other,
      },
    });
  };
  return runAfterInteractionHOF(goToNotificationScreen);
}

export default useNotification;
