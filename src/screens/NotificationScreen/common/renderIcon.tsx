import React from 'react';

import {
  ErrorIcon,
  MailIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from 'assets/svgs/modal';
import { equals } from 'ramda';
import styled from 'styled-components/native';

const ShiftIconContainer = styled.View`
  width: 70px;
  height: 70px;
  /* background-color: gray; */
  align-items: center;
  justify-content: center;
  /* border-radius: 50px; */
  position: absolute;
  top: -35px;
  /* left: 50%; */
  /* transform: translateX(-25px); */
  /* transform: translateX(-5px); */
`;

export const TYPES = {
  FAILURE: 'failure',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success',
  MAIL: 'mail',
};

export type NotificationType = keyof typeof TYPES;

const renderIcon = (type: NotificationType) => {
  if (equals(TYPES.WARNING, type)) {
    return <WarningIcon />;
  }

  if (equals(TYPES.SUCCESS, type)) {
    return <SuccessIcon />;
  }

  if (equals(TYPES.FAILURE, type)) {
    return <ErrorIcon />;
  }
  if (equals(TYPES.INFO, type)) {
    return <InfoIcon />;
  }
  if (equals(TYPES.MAIL, type)) {
    return <MailIcon />;
  }
};

export { renderIcon, ShiftIconContainer };
