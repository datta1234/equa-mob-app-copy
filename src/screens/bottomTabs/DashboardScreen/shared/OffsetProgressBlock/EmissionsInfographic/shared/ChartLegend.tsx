import React from 'react';

import { rgba } from 'polished';
import { Switch } from 'react-native';
import styled from 'styled-components/native';

import Typography from 'components/Typography';
import { isSmallDevice, scale, scaleHeight } from 'constants/layout';

export const LegendContainer = styled.View`
  flex-direction: row;
  padding: ${(scale(5) + 'px', scaleHeight(8) + 'px')};
  /* align-self: flex-end; */
  justify-content: space-between;
  border-radius: 16px;
  /* flex-wrap: wrap; */
  margin-bottom: 20px;
  margin-horizontal: ${isSmallDevice ? 10 : 20 + 'px'};
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  elevation: 20;
`;

export const LegendItemContainer = styled.View`
  flex-direction: row;
  flex-shrink: 1;
  margin: ${(scale(5) + 'px', scaleHeight(5) + 'px')};
  align-items: center;
  justify-content: center;
`;

export const LegendItemText = styled(Typography.Text).attrs({
  size: 'small',
  color: 'primary',
  center: true,
})`
  font-weight: 600;
`;
const size = 13;
export const LegendItemCircle = styled.View`
  width: ${size + 'px'};
  height: ${size + 'px'};
  background-color: ${({ theme }) => theme.light.activity.locationAverage};
  border-color: ${({ theme }) => theme.light.activity.locationAverageBorder};
  border-width: 1px;
  border-radius: 10px;
  margin-right: ${scale(7) + 'px'};
`;

export const Col = styled.View`
  flex-shrink: 1;
`;

const ChartLegend = ({ region, switchValue, onSwitchChange }) => {
  return (
    <LegendContainer>
      <LegendItemContainer>
        <LegendItemText>{'Measured in kgCO2e'}</LegendItemText>
      </LegendItemContainer>
      <LegendItemContainer>
        {/* <LegendItemCircle /> */}
        <Col>
          <LegendItemText>{region?.shortName} Average</LegendItemText>
          {/* <LegendItemText>{`(${region?.shortName})`}</LegendItemText> */}
        </Col>
        <AverageSwitch value={switchValue} onValueChange={onSwitchChange} />
      </LegendItemContainer>
    </LegendContainer>
  );
};

export default ChartLegend;

export const AverageSwitch = styled(Switch).attrs(({ theme, value }) => ({
  ios_backgroundColor: theme.light.toggle.inactive, //theme.light.activity.noAverageActivity,
  thumbColor: value
    ? theme.light.toggle.thumbActive
    : theme.light.toggle.thumbInactive,
  trackColor: {
    true: theme.light.toggle.active, //theme.light.activity.locationAverageBorder,
    false: theme.light.toggle.inactive, //theme.light.activity.noAverageActivity,
  },
  transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], // reduce the size of component
}))`
  margin-left: ${scale(10) + 'px'};
`;
