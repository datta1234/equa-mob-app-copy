import React, { useCallback, useEffect } from 'react';

import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import ChatIcon from 'assets/svgs/ChatIcon';
import { Linking } from 'react-native';
import styled from 'styled-components/native';

import { GET_ACTIVE_USER_CREDIT } from 'api/operations/queries/getActiveUserCredit';
import {
  VERIFY_USER_CAN_OFFSET,
  VERIFY_USER_CAN_OFFSET_QUERY_NAME,
} from 'api/operations/queries/verifyUserCanOffset';
import Button from 'components/Button';
import Header from 'components/Header';
import { scale, scaleHeight } from 'constants/layout';
import useMainNav from 'hooks/navigation/useMainNav';

import Credits from '../Credits';

import FootprintBlock from './FootprintBlock';

const OffsetAction = ({}) => {
  const goTo = useMainNav();

  const { data, loading, refetch } = useQuery(VERIFY_USER_CAN_OFFSET, {
    fetchPolicy: 'cache-and-network',
    variables: {},
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const { canOffset, hasCredit, hasHabit, hasSubscription, message } =
    data?.[VERIFY_USER_CAN_OFFSET_QUERY_NAME] || {};

  if (hasCredit) {
    return <Credits />;
  }

  if (!canOffset && !hasSubscription) {
    return null;
  }

  return (
    <ButtonContainer>
      <Button
        //width={180}
        round
        onPressHandler={goTo.offsets}
        // isOutline={hasSubscription ? true : false}
        showLoadingAnimation={false}
        isLoading={loading}
        fontSize={'h8'}
        // borderColor={'warning'}
        // textColor={hasSubscription && 'primary'}
        color={hasSubscription ? 'primary' : 'dark'}>
        {hasSubscription ? 'Manage Offsets' : 'Reduce Footprint'}
      </Button>
    </ButtonContainer>
  );
};

const FOOTPRINT_QUERY_NAME = 'GetUserFootprint';
const FOOTPRINT = gql`
  query GetUserFootprint($startDateTime: DateTime, $endDateTime: DateTime) {
    ${FOOTPRINT_QUERY_NAME}(
      input: { startDateTime: $startDateTime, endDateTime: $endDateTime }
    ) {
      totalKgCo2eEmissions {
        value,
        valueRounded
      },
      totalKgCo2eOffsets {
        value
        valueRounded
      },
      totalKgCo2eFootprint {
        value,
        valueRounded
      },
    }
  }
`;

const Footprint = ({ startDateTime, endDateTime }) => {
  const { data, loading, refetch } = useQuery(FOOTPRINT, {
    fetchPolicy: 'cache-and-network',
    variables: { startDateTime, endDateTime },
  });

  ////////////////TODO: REMOVE HACKY solution (unnecessary refetching)... remove when backend has fixed background worker for credit allocation
  // fetch active user credits after data is returned from the footprint
  const [getActiveUserCredits] = useLazyQuery(GET_ACTIVE_USER_CREDIT, {
    fetchPolicy: 'network-only',
  });
  useEffect(() => {
    if (data && !loading) {
      getActiveUserCredits();
    }
  }, [loading, getActiveUserCredits]);
  //////////////////////////////////////////////////////////////////////////////////////////////

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      isActive && refetch({ startDateTime, endDateTime });

      return () => {
        isActive = false;
      };
    }, [refetch, startDateTime, endDateTime])
  );

  const footPrintData = data?.[FOOTPRINT_QUERY_NAME] || {};

  return (
    <Container>
      <Header.Title>TOTAL CO2e THIS MONTH</Header.Title>
      <FootprintBlock data={footPrintData} loading={loading} />
      {/* <ButtonContainer>
        <Button
          round
          onPressHandler={() =>
            Linking.openURL(
              'mailto:support@aq-green.com?subject=AQ Green App feedback&body=Dear AG Green Team,\n\n'
            )
          }
          // isOutline
          fontSize={'h8'}
          color={'dark'}
          rightIcon={<ChatIcon />}>
          Provide feedback
        </Button>
      </ButtonContainer> */}

      <OffsetAction />
    </Container>
  );
};

export default Footprint;

const ButtonContainer = styled.View`
  align-items: center;
  padding-top: ${scaleHeight(20) + 'px'};
`;

const Container = styled.View`
  padding-horizontal: ${scale(30) + 'px'};
  padding-vertical: ${scaleHeight(20) + 'px'};
  align-items: center;
`;
