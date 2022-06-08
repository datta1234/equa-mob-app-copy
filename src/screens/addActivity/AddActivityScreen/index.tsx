/* eslint-disable no-fallthrough */
import React, { useState, useEffect } from 'react';

import { gql, useQuery, useMutation } from '@apollo/client';
import R from 'ramda';
import { InteractionManager } from 'react-native';

import { EMISSION_TEMPLATE_FRAGMENT } from 'api/fragments';
import { GET_ACTIVE_USER_CREDIT_QUERY_NAME } from 'api/operations/queries/getActiveUserCredit';
import { GET_ACTIVITIES_QUERY_NAME } from 'api/operations/queries/getActivities';
import { GET_INFOGRAPHIC_EMISSIONS_QUERY_NAME } from 'api/operations/queries/getInfographicEmissions';
import { GET_USER_PROGRESS_QUERY_NAME } from 'api/operations/queries/getUserProgress';
import { Button } from 'components';
import { RootContainer as ScreenContainer } from 'components/Containers';
import { ClickableText } from 'components/Typography';
import {
  ADD_ACTIVITY_NAVIGATOR,
  MAIN_NAVIGATOR,
  ROOT_NAVIGATOR,
} from 'constants/routes';
import {
  AddActivityStackRouteProp,
  AddActivityStackNavigationProp,
} from 'types/navigation';
import { prettyGraphQLErrors } from 'utils/formats';
import { runAfterInteractionHOF } from 'utils/helpers';
import { isDefined } from 'utils/ramda';

import {
  ActivityHeader,
  EmissionsValue,
  InfoBox,
  PickList,
  TextBox,
} from './shared';
import {
  ContentWrapper,
  ButtonContainer,
  FormWrapper,
  ContentItemWrapper,
  EmissionsWrapper,
} from './styles';

const MUTATION_NAME = 'AddUserEmission';
const ADD_USER_EMISSION = gql`
  mutation AddUserEmission($calculationCode: String!, $quantity: Decimal!) {
    ${MUTATION_NAME}(
      input: { calculationCode: $calculationCode, quantity: $quantity }
    ) {
      success
      type
      title
      message
    }
  }
`;

const QUERY_NAME = 'GetEmissionFormTemplate';
const GET_EMISSIONS_FORM = gql`
query EmissionsForm($code: String, $groupCode: String) {
  ${QUERY_NAME}(input: { code: $code, groupCode: $groupCode }) {
    ...EmissionsTemplateFragment
  }
}
${EMISSION_TEMPLATE_FRAGMENT}
`;

type Props = {
  route: AddActivityStackRouteProp<'AddActivityScreen'>;
  navigation: AddActivityStackNavigationProp<'AddActivityScreen'>;
};

const defaultProps = {};
function AddActivityScreen({ navigation, route }: Props) {
  const groupCode = route?.params?.groupCode;

  const navToAddActivityScreen = (formType) => {
    //navigation.goBack();
    navigation.navigate(MAIN_NAVIGATOR.NAME, {
      screen: ADD_ACTIVITY_NAVIGATOR.NAME,
      params: {
        screen: ADD_ACTIVITY_NAVIGATOR.ADD_ACTIVITY_SCREEN.NAME,
        params: {
          groupCode: formType,
        },
      },
    });
  };

  const AddAnotherNode = (activityTypeCode) => {
    return () => (
      <Button.Clear
        style={{ marginTop: 10, marginBottom: 15 }}
        color={'primary'}
        onPress={() => navToAddActivityScreen(activityTypeCode)}>
        {`Add another ${activityTypeCode.toLowerCase()} activity`}
      </Button.Clear>
    );
  };

  const goToNotificationScreen = runAfterInteractionHOF(
    ({ type = 'failure', title, subtitle, renderNode }) => {
      navigation.navigate(ROOT_NAVIGATOR.NAME, {
        screen: ROOT_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
        params: {
          type,
          title,
          subtitle,
          renderNode,
        },
      });
    },
  );

  const goBackWithNotification = runAfterInteractionHOF(
    ({ type, title, message }) => {
      navigation.goBack();
      const params = {
        type: type ?? 'success',
        title: title,
        subtitle: message,
        renderNode: AddAnotherNode(formInfo.code),
      };
      goToNotificationScreen(params);
    },
  );

  const { loading, data: queryData } = useQuery(GET_EMISSIONS_FORM, {
    variables: { groupCode: groupCode },
  });
  const formTemplate = queryData?.[QUERY_NAME];
  const getNextFormItem = (code) =>
    formTemplate?.find((group) => group?.code === code);

  const [addUserEmission, addResponse] = useMutation(ADD_USER_EMISSION, {
    onCompleted: (onCompletedData) => {
      const { success, type, message, title } =
        onCompletedData?.[MUTATION_NAME];
      success
        ? goBackWithNotification({ type, title, message })
        : navigation.goBack();
    },
    refetchQueries: [
      GET_ACTIVE_USER_CREDIT_QUERY_NAME,
      GET_USER_PROGRESS_QUERY_NAME,
      GET_INFOGRAPHIC_EMISSIONS_QUERY_NAME,
      GET_ACTIVITIES_QUERY_NAME,
    ],
    onError: (errorData) => {
      const errors = prettyGraphQLErrors(errorData);
      goToNotificationScreen(errors);
    },
  });
  const textInputRef = React.useRef(null);
  const [formInfo, setFormInfo] = useState();
  const [firstPickList, setFirstPickList] = useState();
  const [secondPickList, setSecondPickList] = useState({});
  const [thirdPickList, setThirdPickList] = useState({});
  const [fourthPickList, setFourthPickList] = useState({});
  const [fifthPickList, setFifthPickList] = useState({});
  const [listBox, setListBox] = useState({});
  const [textBox, setTextBox] = useState({});
  const [emissions, setEmissions] = useState({});

  useEffect(() => {
    if (isDefined(formTemplate)) {
      const _formInfo = getNextFormItem(groupCode);
      _formInfo.type === 'FORM' && setFormInfo(_formInfo);
      const first = R.clone(getNextFormItem(_formInfo.nextCode));
      setFirstPickList(first);
    }
    return () => {};
  }, [formTemplate]);

  const resetFormItemStateBelow = (level) => {
    // Intentional fallthrough on switch
    switch (level) {
      case '1':
        setSecondPickList({});
      case '2':
        setThirdPickList({});
      case '3':
        setFourthPickList({});
      case '4':
        setFifthPickList({});
      case '5':
        setListBox({});
        setTextBox({});
        setEmissions({});
    }
  };

  const setNextPickList = (level, nextState) => {
    switch (level) {
      case '1':
        setSecondPickList(nextState);
        break;
      case '2':
        setThirdPickList(nextState);
        break;
      case '3':
        setFourthPickList(nextState);
        break;
      case '4':
        setFifthPickList(nextState);
        break;
      case '5':
        break;
      default:
        console.log("PickList level doesn't exist");
        break;
    }
  };

  const setNextFormItemState = (nextCode, currentPickListLevel = 0) => {
    if (!nextCode) return;

    const nextState = R.clone(getNextFormItem(nextCode));

    switch (nextState?.type) {
      case 'PICK_LIST':
        setNextPickList(currentPickListLevel, nextState);
        break;
      case 'TEXT_BOX':
        setTextBox(nextState);
        InteractionManager.runAfterInteractions(() => {
          if (textInputRef.current) {
            textInputRef.current.focus();
          }
        });
        break;
      case 'DISPLAY_LIST_BOX':
        setListBox(nextState);
        setNextFormItemState(nextState.nextCode); // Automatically set the next form item when listbox is displayed
        break;
      case 'CALCULATE':
        setEmissions(nextState);
        break;
      default:
        break;
    }
  };

  const setPickListSelected = ({ level, item }) => {
    if (level === '1') setFirstPickList(getNewState);
    if (level === '2') setSecondPickList(getNewState);
    if (level === '3') setThirdPickList(getNewState);
    if (level === '4') setFourthPickList(getNewState);
    if (level === '5') setFifthPickList(getNewState);

    function getNewState(prev) {
      const itemIndex = prev.data.findIndex(
        (prevItem) => prevItem.code === item.code,
      );
      const updatedState = R.clone(prev);
      updatedState.data.map((i) => {
        i.selected = false;
      });
      updatedState.data[itemIndex].selected =
        !updatedState.data[itemIndex].selected;
      return { ...updatedState };
    }
  };

  function onPickListItemPress(item, level) {
    setPickListSelected({ level, item });
    resetFormItemStateBelow(level);
    setNextFormItemState(item.nextCode, level);
  }

  const submitEmissions = () =>
    addUserEmission({
      variables: {
        calculationCode: emissions?.code,
        quantity: emissions?.quantity,
      },
    });

  const calculateEmissions = (value) => {
    const next = R.clone(getNextFormItem(textBox?.nextCode));
    if (next?.type === 'CALCULATE' && value) {
      setEmissions({
        ...next,
        quantity: Number(value),
      });
    }
  };

  const onTextBoxBlur = ({ nativeEvent }) => {};

  const onTextBoxEndEditing = ({ nativeEvent }) => {
    calculateEmissions(textBox?.quantity);
  };

  const onTextBoxChangeText = (value) => {
    !value && setEmissions({}); // clears emissions box if no value
    const cleanedValue = value.replace(/,/g, ''); //don't convert to number here as then the decimal will be dropped in TextBox

    setTextBox((prev) => ({
      ...prev,
      quantity: cleanedValue,
      displayToolTipMessage: false, //Used for tooltip
    }));

    // // In order to set emission immediately
    // calculateEmissions(cleanedValue);
  };
  const onTextBoxToolTipPress = () => {
    const trigger = textBox?.toolTip?.trigger;
    if (trigger) {
      setTextBox((prev) => ({
        ...prev,
        displayToolTipMessage: !!trigger,
      }));
    }

    if (trigger?.code === 'SET_DEFAULT') {
      const quantity = trigger?.defaultValue;
      setTextBox((prev) => ({
        ...prev,
        quantity: quantity,
      }));
      calculateEmissions(quantity);
    }
  };

  return (
    <ScreenContainer
      close
      header={
        <ActivityHeader
          loading={loading}
          title={`${formInfo?.title?.toUpperCase() ?? 'Add'} ${
            formInfo?.subTitle?.toUpperCase() ?? 'Activity'
          }`}
          // subTitle={formInfo?.subTitle?.toUpperCase()}
        />
      }
      extraHeight={45} // adds extra space for default button on input
      keyboardVerticalOffset={45}>
      <ContentWrapper>
        <FormWrapper>
          <ContentItemWrapper withHorizontal={false}>
            <PickList
              list={firstPickList}
              onPress={onPickListItemPress}
              level={'1'}
            />
            <PickList
              list={secondPickList}
              onPress={onPickListItemPress}
              level={'2'}
            />
            <PickList
              list={thirdPickList}
              onPress={onPickListItemPress}
              level={'3'}
            />
            <PickList
              list={fourthPickList}
              onPress={onPickListItemPress}
              level={'4'}
            />
            <PickList
              list={fifthPickList}
              onPress={onPickListItemPress}
              level={'5'}
            />
          </ContentItemWrapper>
          <ContentItemWrapper>
            <InfoBox listBox={listBox} />
            <TextBox
              ref={textInputRef}
              data={textBox}
              onBlur={onTextBoxBlur}
              onChangeText={onTextBoxChangeText}
              onToolTipPress={onTextBoxToolTipPress}
              onEndEditing={onTextBoxEndEditing}
            />
          </ContentItemWrapper>
        </FormWrapper>
        <EmissionsWrapper>
          {emissions?.type === 'CALCULATE' && (
            <>
              <EmissionsValue
                title={emissions?.title}
                value={emissions?.factor * emissions?.quantity}
                unit={emissions?.unitType}
              />
              <ButtonContainer>
                <Button
                  //showLoadingAnimation={false}
                  onPressHandler={submitEmissions}
                  isLoading={addResponse.loading}>
                  {'Add'}
                </Button>
              </ButtonContainer>
            </>
          )}
        </EmissionsWrapper>
      </ContentWrapper>
    </ScreenContainer>
  );
}

AddActivityScreen.defaultProps = defaultProps;
export default AddActivityScreen;
