import React from 'react';

import { svgs } from 'assets';
import { length } from 'ramda';
import { Pressable } from 'react-native';

import { Icon } from 'components';
import { Text } from 'components/Typography';
import useMainNav from 'hooks/navigation/useMainNav';

import {
  Container,
  Bar,
  IconContainer,
  BarTitle,
  BarTitleContainer,
  ProgressFragmentContainer,
  ProgressContainer,
  StepIndicatorContainer,
  StepIconsIndicatorContainer,
} from './progressIndicator.styles';

const CompletedIcon = ({ size, completed, activityTypeCode }) => {
  const goTo = useMainNav();
  const onPress = () => goTo.addActivity(activityTypeCode);
  return (
    <Pressable hitSlop={20} onPress={onPress}>
      <IconContainer isActive={completed} size={size}>
        {completed ? <Icon type={'tick'} /> : <Icon type={'add'} />}
      </IconContainer>
    </Pressable>
  );
};

const ProgressBarFragments = ({ isCompleted, isLast, isFirst }) => {
  return (
    <ProgressFragmentContainer>
      <ProgressContainer>
        <Bar isActive={isCompleted} isFirst={isFirst} />
        {isLast ? <Bar isActive={isCompleted} isLast={isLast} /> : null}
      </ProgressContainer>
    </ProgressFragmentContainer>
  );
};
const ProgressIconFragments = ({
  typeTitle,
  typeCode,
  isCompleted,
  isLast,
  isFirst,
}) => {
  return (
    <ProgressFragmentContainer>
      <ProgressContainer>
        <Bar clear isActive={isCompleted} isFirst={isFirst} />
        <BarTitleContainer>
          <BarTitle center isActive={isCompleted}>
            {typeTitle}
          </BarTitle>
          <CompletedIcon completed={isCompleted} activityTypeCode={typeCode} />
        </BarTitleContainer>

        {isLast ? <Bar clear isActive={isCompleted} isLast={isLast} /> : null}
      </ProgressContainer>
    </ProgressFragmentContainer>
  );
};

const ProgressIndicator = ({ steps }) => {
  // ProgressIconFragments are over-layed with absolute positioning on the ProgressBars to get the correct styling with bars running under Icons
  return (
    <Container>
      <Text bold size={'small'} color={'light'}>
        Update your profile by adding activities!
      </Text>
      <StepIndicatorContainer>
        <StepIconsIndicatorContainer>
          {steps?.map((step, idx) => (
            <ProgressIconFragments
              key={step.id}
              {...step}
              isLast={idx + 1 === length(steps)}
              isFirst={idx === 0}
            />
          ))}
        </StepIconsIndicatorContainer>
        {steps?.map((step, idx) => (
          <ProgressBarFragments
            key={step.id}
            title={step.typeTitle}
            isCompleted={step.isCompleted}
            isLast={idx + 1 === length(steps)}
            isFirst={idx === 0}
          />
        ))}
      </StepIndicatorContainer>
    </Container>
  );
};

export default ProgressIndicator;
