import React from 'react';

import Button from 'components/Button';
import useLogout from 'hooks/api/useLogout';
import useNotification from 'hooks/useNotification';

const LogoutAction = () => {
  const [logout, { loading }] = useLogout();
  const primaryProps = {
    title: 'Yes, logout',
    isLoading: loading,
    onPressHandler: logout,
  };

  return <Button.Combo primaryProps={primaryProps} />;
};

export default function useLogoutModal() {
  const showModal = useNotification();
  //   const goToPasswordReset = () => navigation.navigate(resetPasswordScreen);

  function onLogout() {
    showModal({
      type: 'warning',
      title: 'Are you sure you want to logout of the app?',
      renderNode: LogoutAction,

      //isActionLoading: loading, // TODO: This loading state doesn't work. Pass the button as a component to the screen. See Delete Activity
      cancel: true,
    });
  }

  return onLogout;
}
