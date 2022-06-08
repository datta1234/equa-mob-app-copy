import React from 'react';

// import PropTypes from 'prop-types';

import { map, not, partial, pipe } from 'ramda';
import { ActivityIndicator, Image, View } from 'react-native';

import { Typography } from 'components';
import Button from 'components/Button';
import { isDefined } from 'utils/ramda';
import translator from 'utils/translator';

import Avatar from '../Avatar';

import { withQuery, withMutation } from './hocs';
import {
  Container,
  TypeIconContainer,
  TotalValueText,
  AvatarsContainber,
  AvatarWrapper,
  InvestorsContainer,
  InvestorsCountContainer,
  ButtonContainer,
  ContentItemWrapper,
  LoaderContainer,
} from './styles';

const propTypes = {};

const defaultProps = {};

function ProjectInfoModalScreen({
  project,
  addProjectToPortfolio,
  removeProjectFromPortfolio,
  isLoading,
}) {
  const toogleIsAdded = () => {
    if (project.isSelected) {
      removeProjectFromPortfolio();
    }

    if (not(project.isSelected)) {
      addProjectToPortfolio();
    }
  };

  const renderMemberAvatar = ({ id, thumbnailAvatar }) => (
    <AvatarWrapper style={{ zIndex: 2, marginLeft: -15 }} key={id}>
      <Avatar url={thumbnailAvatar} />
    </AvatarWrapper>
  );

  const renderMemberAvatars = map(renderMemberAvatar);

  return (
    <Container>
      {isLoading && (
        <LoaderContainer>
          <ActivityIndicator />
        </LoaderContainer>
      )}

      <TypeIconContainer>
        <Image
          source={{ uri: project.thumbnailLogo }}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="contain"
        />
        {/* <LocalSvg
          asset={forestIcon}
          width={30}
          height={30}
          // onEndLoading={() => setLoaded(true)}
        /> */}
      </TypeIconContainer>

      <ContentItemWrapper>
        <Typography.Text size="tiny" uppercase>
          {project.category}
        </Typography.Text>
      </ContentItemWrapper>

      <ContentItemWrapper>
        <Typography.Title center level={2}>
          {/* Yorkshire Dales Woodland Restoration Group */}
          {project.name}
        </Typography.Title>
      </ContentItemWrapper>

      <ContentItemWrapper>
        <TotalValueText>€ {project.price}</TotalValueText>
      </ContentItemWrapper>

      {project.interest && (
        <ContentItemWrapper>
          <Typography.Title type="success" level={4}>
            {translator.translate(
              'modals.projectDescription.portfolioDistribution',
              { interest: project.interest }
            )}
          </Typography.Title>
        </ContentItemWrapper>
      )}

      {isDefined(project.members) ? (
        <ContentItemWrapper>
          <InvestorsContainer>
            <AvatarsContainber>
              {renderMemberAvatars(project.members)}
            </AvatarsContainber>

            <InvestorsCountContainer>
              <Typography.Text>{project.usersCount}+</Typography.Text>
            </InvestorsCountContainer>
          </InvestorsContainer>
        </ContentItemWrapper>
      ) : (
        <ContentItemWrapper>
          <InvestorsContainer>
            <Typography.Text>
              {translator.translate('modals.projectDescription.noMembers', {
                interest: project.interest,
              })}
            </Typography.Text>
          </InvestorsContainer>
        </ContentItemWrapper>
      )}

      <ButtonContainer>
        <Button
          isDisabled={isLoading}
          level={4}
          onPressHandler={pipe(
            // partial(actionHandler, [isAdded]),
            toogleIsAdded
          )}
          isOutline={project.isSelected}
          mode={project.isSelected ? 'dark' : 'light'}>
          {project.isSelected
            ? translator.translate(
                'modals.projectDescription.buttons.removeFromPortfolio',
                {
                  interest: project.interest,
                }
              )
            : translator.translate(
                'modals.projectDescription.buttons.addToPortfolio',
                {
                  interest: project.interest,
                }
              )}
        </Button>
      </ButtonContainer>
    </Container>
  );
}

ProjectInfoModalScreen.defaultProps = defaultProps;
ProjectInfoModalScreen.propTypes = propTypes;
export default pipe(
  React.memo,
  withQuery,
  React.memo,
  withMutation
)(ProjectInfoModalScreen);
