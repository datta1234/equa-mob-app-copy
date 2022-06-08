import React from 'react';
import { StyleSheet } from 'react-native';

import { Input, Icon } from 'react-native-elements';

import { useScrollToEnd } from 'components/Containers/BaseContainer';
import { Text, ClickableText } from 'components/Typography';
import colors from 'constants/colors';
import { numberFormatter } from 'utils/helpers';

import { TextBoxTitle, InfoBox, InfoBoxText } from './styles';

const TextBox = React.forwardRef(
  (
    { data: textBox, onBlur, onChangeText, onToolTipPress, ...InputProps },
    ref,
  ) => {
    const { title, placeholder, toolTip } = textBox;
    const scrollToEnd = useScrollToEnd();

    if (textBox?.type !== 'TEXT_BOX') {
      return null;
    }
    return (
      <>
        <Input
          ref={ref}
          returnKeyType={'done'}
          renderErrorMessage={false}
          label={<TextBoxTitle>{title}</TextBoxTitle>}
          placeholder={placeholder}
          autoCapitalize="none"
          autoComplete="off"
          keyboardType="numeric"
          value={textBox?.quantity ? numberFormatter(textBox?.quantity) : null}
          onBlur={() => {
            scrollToEnd();
          }}
          onChangeText={onChangeText}
          rightIcon={<Text color={'primary'}>{textBox?.unitType}</Text>}
          {...InputProps}
        />
        {/* // Hover Over ToolTip */}
        {/* {textBox?.toolTip?.title && (
        // CLICKABLE IF IT HAS A TRIGGER
        <View style={{ alignItems: 'flex-end' }}>
          <Tooltip
            toggleOnPress={!!toolTip?.trigger}
            onClose={onToolTipPress}
            backgroundColor={'#E5E5E5'}
            //overlayColor={}
            height={75}
            width={300}
            //withOverlay={false}
            popover={
              <Text color={'primary'}>{toolTip?.trigger?.displayMessage}</Text>
            }>
            <Text
              bold
              style={{ paddingVertical: 10 }}
              make={['bold', 'underline']}
              color={'primary'}
              size={'tiny'}
              //right
              uppercase>
              {textBox?.toolTip?.title}
            </Text>
          </Tooltip>
        </View>
      )} */}
        {textBox?.toolTip?.title && (
          // CLICKABLE IF IT HAS A TRIGGER
          <ClickableText
            containerStyle={s.text}
            onPress={() => {
              onToolTipPress();
              scrollToEnd();
            }}
            make={['bold', !!toolTip?.trigger && 'underline']}
            color={'primary'}
            size={'tiny'}
            right
            uppercase>
            {textBox?.toolTip?.title}
          </ClickableText>
        )}
        {textBox?.displayToolTipMessage && (
          <InfoBox>
            <Icon
              containerStyle={s.icon}
              color={colors.text.secondary}
              name={'info-outline'}
            />
            <InfoBoxText>
              {textBox?.toolTip?.trigger?.displayMessage}
            </InfoBoxText>
          </InfoBox>
        )}
      </>
    );
  },
);

export default TextBox;

const s = StyleSheet.create({
  text: {
    paddingVertical: 10,
    alignSelf: 'flex-end',
  },
  icon: {
    justifyContent: 'center',
    paddingRight: 7,
  },
});
