import React from 'react';

import { scale } from 'constants/layout';
import withFadeIn from 'hocs/withFadeIn';
import useToggle from 'hooks/useToggle';
import { roundNumber } from 'utils/common';
import { carbonOffsetFormat } from 'utils/formats';

import DeleteButton from './components/DeleteButton';
import {
  Container,
  SectionText,
  TitleText,
  ValueText,
  UnitText,
  ModuleText,
  EmissionContainer,
  RowContainer,
  ContentContainer,
  DeleteIcon,
  IconContainer,
  Content,
} from './listCard.styles';

const propTypes = {};
const defaultProps = {};
function ListCard({ id, title, totalKgCo2e, totalPercentage, type, header }) {
  const [showDelete, toggleShowDelete] = useToggle(false);

  const info = `${roundNumber(
    totalPercentage,
    0
  )}% of ${type.toLowerCase()} CO2e`;

  const maxTitleLength = scale(12, 2);
  const dynamicTitle =
    title.length < maxTitleLength || !showDelete
      ? `${title}`
      : `${title.substring(0, maxTitleLength - 3)}...`;

  const totalRounded = carbonOffsetFormat(totalKgCo2e?.value, {
    limitNumber: 100000,
    exp: 1,
    dec: 0,
  });

  const showRightIcon = true; //isDefined(id);

  return (
    <Container>
      <ContentContainer>
        <Content>
          {header && <SectionText>{header}</SectionText>}
          <TitleText>{title}</TitleText>
          <ModuleText>{info}</ModuleText>
        </Content>

        <EmissionContainer type={type}>
          <RowContainer>
            <ValueText
              dark={
                type === 'TRAVEL'
              }>{`+${totalKgCo2e?.valueRounded}kg`}</ValueText>
            <UnitText dark={type === 'TRAVEL'}>{`CO2e`}</UnitText>
          </RowContainer>
        </EmissionContainer>

        <IconContainer isDeleteOpen={showDelete}>
          {
            <DeleteIcon
              type={showDelete ? 'forward' : 'trash'}
              onPress={toggleShowDelete}
              show={showRightIcon}
            />
          }
        </IconContainer>
      </ContentContainer>
      {showDelete && (
        <DeleteButton activityId={id} hideButton={toggleShowDelete} />
      )}
    </Container>
  );
}

ListCard.defaultProps = defaultProps;
ListCard.propTypes = propTypes;
export default withFadeIn(ListCard);
