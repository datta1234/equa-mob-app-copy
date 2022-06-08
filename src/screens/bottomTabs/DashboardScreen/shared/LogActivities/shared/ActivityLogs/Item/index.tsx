import React from 'react';

import { anyPass, equals, not, pipe, toLower } from 'ramda';
import { useTheme } from 'styled-components/native';

import colors from 'constants/colors';
import { scale } from 'constants/layout';
import { ACTIVITIES_TYPES } from 'constants/logActivities';
import withFadeIn from 'hocs/withFadeIn';
import { carbonOffsetFormat } from 'utils/formats';
import { isDefined } from 'utils/ramda';

import {
  Container,
  SectionText,
  TitleText,
  ValueText,
  ModuleText,
  TitleContainer,
  ValueContainer,
  ContentContainer,
  RightIcon,
  IconContainer,
  Content,
} from './styles';

const propTypes = {};

const defaultProps = {};

function ListItem({
  id,
  activityTypeCode,
  activityTypeTitle,
  activityTypeInputTitle,
  frequencyTypeTitle,
  output,
  outputTypeTitle,
  typeCode,
  typeTitle,
  header,
  ...rest
}) {
  const theme = useTheme().light;
  const isFootprintActivityType =
    typeCode === ACTIVITIES_TYPES.habit ||
    typeCode === ACTIVITIES_TYPES.activity;
  const isProjectType = typeCode === ACTIVITIES_TYPES.project;

  const infoLength = scale(13, 3);
  const info = {
    left:
      activityTypeInputTitle.length < infoLength
        ? `${activityTypeInputTitle}`
        : `${activityTypeInputTitle.substring(0, infoLength - 3)}...`,
    right: frequencyTypeTitle,
  };
  const showRight = !!frequencyTypeTitle;

  if (isFootprintActivityType) {
    output = carbonOffsetFormat(output, {
      limitNumber: 100000,
      exp: 1,
      dec: 0,
    });
  }

  const isAdded = pipe(
    toLower,
    anyPass([equals('added'), equals('on')])
  )(output);
  const isRemoved = pipe(
    toLower,
    anyPass([equals('removed'), equals('off')])
  )(output);

  const showType = false; //isDefined(typeTitle) && not(isProjectType);
  const showRightIcon = false; //isDefined(id);

  return (
    <Container>
      <Content>
        {header && <SectionText>{header}</SectionText>}
        <ContentContainer>
          <TitleContainer>
            <TitleText>{activityTypeTitle}</TitleText>
          </TitleContainer>
        </ContentContainer>
        <ModuleText>
          {info.left + (showRight ? `  |  ${info.right}` : '')}
        </ModuleText>
      </Content>

      <ValueContainer type={activityTypeCode}>
        <ValueText
          style={[
            isProjectType && { fontSize: 21 },
            { color: theme.text.primary },
            isAdded && { color: colors.SUCCESS },
            isRemoved && { color: colors.FAILURE },
          ]}>
          {`+${output} ${outputTypeTitle}`}
        </ValueText>
        {showType && <ModuleText>{typeTitle}</ModuleText>}
      </ValueContainer>

      <IconContainer>{<RightIcon show={showRightIcon} />}</IconContainer>
    </Container>
  );
}

ListItem.defaultProps = defaultProps;
ListItem.propTypes = propTypes;
export default withFadeIn(ListItem);
