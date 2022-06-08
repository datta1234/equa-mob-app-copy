import React from 'react';

import ProjectCard from '../../common/ProjectCard';

import { ProjectListContainer, Title } from './portfolioProjects.styles';

const PortfolioProjects = ({ projects }) => {
  return (
    <ProjectListContainer>
      <Title>{'Portfolio projects'}</Title>
      {projects?.map((project) => (
        <ProjectCard key={project?.projectId} project={project} />
      ))}
    </ProjectListContainer>
  );
};

export default PortfolioProjects;
