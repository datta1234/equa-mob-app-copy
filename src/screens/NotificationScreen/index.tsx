import React from 'react';

// import PropTypes from 'prop-types';

import { CloseButton } from 'components/Button';
import {
  AuthStackNavigationProp,
  AuthStackRouteProp,
  RootStackNavigationProp,
  RootStackRouteProp,
} from 'types/navigation';
import { isDefined, getInOr } from 'utils/ramda';

import { DrawerModal, Modal } from './common';
import { renderIcon, ShiftIconContainer } from './common/renderIcon';
import {
  AbsPositionClose,
  TitleContainer,
  Title,
  SubTitle,
  NodeContainer,
  ActionButton,
  CancelButton,
  ButtonsContainer,
} from './styles';

type Props = {
  route:
    | RootStackRouteProp<'NotificationModal'>
    | AuthStackRouteProp<'NotificationModal'>;
  navigation:
    | RootStackNavigationProp<'NotificationModal'>
    | AuthStackNavigationProp<'NotificationModal'>;
};

const defaultProps = {};
function NotificationScreen({ navigation, route }: Props) {
  const params = getInOr({}, 'params', route);
  const goBack = () => navigation.goBack();
  const { type, title, subtitle } = params;

  const onOverlayPress = params?.onOverlayPress ?? goBack;
  const onActionPress = params?.onActionPress ?? goBack;
  const onCancelPress = params?.onCancelPress ?? goBack;
  const { showAction = true, showCancel = true } = params; // Need to explicitly set these to false as params persist when a modal is revisited

  const Close = () => (
    <AbsPositionClose>
      <CloseButton color={'light'} />
    </AbsPositionClose>
  );

  const Content = (
    <>
      {params?.close && <Close />}
      {!!title && (
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>
      )}

      {!!subtitle && <SubTitle>{subtitle}</SubTitle>}

      {isDefined(params?.renderNode) && (
        <NodeContainer>{params?.renderNode()}</NodeContainer>
      )}
      <ButtonsContainer>
        {showAction && (params?.onActionPress || params?.dismiss) && (
          <ActionButton
            isLoading={params?.isActionLoading}
            onPressHandler={onActionPress}>
            {params?.actionText ?? 'Ok'}
          </ActionButton>
        )}
        {showCancel && (params?.onCancelPress || params?.cancel) && (
          <CancelButton onPress={onCancelPress}>
            {params?.cancelText ?? 'Cancel'}
          </CancelButton>
        )}
        {params?.renderFooter?.()}
      </ButtonsContainer>
    </>
  );

  const withModal = (Content) => (props) => {
    if (params?.modalType === 'drawer') {
      return (
        <DrawerModal onOverlayPress={onOverlayPress}>
          {renderIcon(params.type)}
          {Content}
        </DrawerModal>
      );
    }

    return (
      <Modal onOverlayPress={onOverlayPress}>
        <ShiftIconContainer>{renderIcon(type)}</ShiftIconContainer>
        {Content}
      </Modal>
    );
  };

  const Notification = withModal(Content);

  return <Notification />;
}

NotificationScreen.defaultProps = defaultProps;
export default NotificationScreen;
