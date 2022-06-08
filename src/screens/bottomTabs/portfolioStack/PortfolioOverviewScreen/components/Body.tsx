import React from 'react';

import { CertificationStandards, SustainableGoals } from '../../common';

import {
  DetailsContainer,
  Title,
  Description,
  HeaderContainer,
  LogoImage,
} from './body.styles';
import { Container } from './body.styles';
import PortfolioProjects from './PortfolioProjects';

const Details = ({ title, description, media }) => {
  const logoImageUrl = media?.find((img) => img?.typeCode === 'LOGO')?.url;
  return (
    <DetailsContainer>
      <HeaderContainer>
        <Title>{title}</Title>
        {logoImageUrl && <LogoImage uri={logoImageUrl} />}
      </HeaderContainer>
      <Description>{description}</Description>
    </DetailsContainer>
  );
};

const Body = ({
  name,
  description,
  sustainableGoals,
  certificationStandards,
  projects,
  media,
}) => {
  return (
    <Container>
      <Details title={name} description={description} media={media} />
      <SustainableGoals sustainableGoals={sustainableGoals} />
      <CertificationStandards certificationStandards={certificationStandards} />
      <PortfolioProjects projects={projects} />
    </Container>
  );
};

export default Body;
