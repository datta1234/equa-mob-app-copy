import React from 'react';

import styled from 'styled-components/native';
import { Icon } from 'react-native-elements';

import Button from 'components/Button';
import { BaseContainer as ScreenContainer } from 'components/Containers';
import Typography, { ClickableText } from 'components/Typography';
import colors from 'constants/colors';
import { scale, scaleHeight } from 'constants/layout';

import { AuthHeader, PoweredBy } from '../shared';

export const ContentWrapper = styled.View`
  flex: 1;
  margin-horizontal: ${({ withHorizontal = true }) =>
    withHorizontal ? scale(30, 1) + 'px' : 0 + 'px'};
  margin-vertical: ${({ withVertical = true }) =>
    withVertical ? scaleHeight(20) + 'px' : 0 + 'px'};
  align-items: center;
`;

export const ContentItemWrapper = styled.View`
  align-items: center;
  margin-vertical: ${scaleHeight(10) + 'px'};
  margin-horizontal: ${({ withHorizontal }) => (withHorizontal ? '25px' : 0)};
`;

export const Title = styled(Typography.Title).attrs({
  color: 'light',
  fontSize: 'h4',
  center: true,
})`
  font-weight: 600;
  align-self: center;
  margin-top: 10px;
  max-width: 300px;
  /* margin-horizontal: ${scale(20, 4) + 'px'}; */
`;
export const InstructionText = styled(Typography.Text).attrs({
  color: 'tertiary',
  size: 'tiny',
  center: true,
})`
  margin-top: ${scaleHeight(18) + 'px'};
`;

const propTypes = {};
const defaultProps = {};

function AuthActionContainer({ title, infoText, children, Action }) {
  return (
    <ScreenContainer dark header={<AuthHeader />}>
      <ContentWrapper>
        <ContentItemWrapper>
          <Icon
            reverse
            center
            name="mail"
            type="feather"
            color={colors.icons.primary}
          />
        </ContentItemWrapper>
        {title && <Title>{title}</Title>}
        {infoText && <InstructionText>{infoText}</InstructionText>}
        {children}
      </ContentWrapper>
      <PoweredBy />
    </ScreenContainer>
  );
}

AuthActionContainer.defaultProps = defaultProps;
AuthActionContainer.propTypes = propTypes;
export default AuthActionContainer;
