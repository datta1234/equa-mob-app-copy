import React from 'react';

import styled from 'styled-components/native';

import { scaleHeight } from 'constants/layout';

import Typography from '../Typography';

import HeaderBar from './HeaderBar';
import HeaderTitle from './HeaderTitle';

const Header = ({ title, subTitle, children }) => {
  return (
    <HeaderContainer>
      {title ? <StyledHeaderTitle>{title}</StyledHeaderTitle> : null}
      {subTitle ? <HeaderSubTitle>{subTitle}</HeaderSubTitle> : null}
      {children}
    </HeaderContainer>
  );
};
Header.Title = HeaderTitle;
Header.Bar = HeaderBar;

export default Header;

const HeaderContainer = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const StyledHeaderTitle = styled(HeaderTitle)`
  margin-vertical: ${scaleHeight(20) + 'px'};
`;
const HeaderSubTitle = styled(Typography.Text)`
  padding-vertical: 10px;
`;
