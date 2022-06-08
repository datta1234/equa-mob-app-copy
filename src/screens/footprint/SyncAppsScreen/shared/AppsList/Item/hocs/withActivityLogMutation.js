import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { assoc, objOf, pipe, tap } from 'ramda';

import { ROOT_NAVIGATOR } from 'constants/routes';
import { prettyGraphQLErrors } from 'utils/formats';
import { getIn } from 'utils/ramda';

const MUTATION_NAME = 'addToLog';

// measurement: String!
// title: String!
// category: String!
// value: String!

const CREATE_ACTIVITY_LOG = gql`
  mutation AddToLog($input:  AddToLogInput!) {
    ${MUTATION_NAME}(
      input: $input
    ) {
      activityLog {
        activityType
        category
        id
        measurement
        objectId
        title
        value
      }
    }
  }
`;

export default (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation();

    const onCompleted = pipe(
      getIn([MUTATION_NAME]),
      console.log,
      // tap(console.log),
      // goToAccountConfirmStep
    );

    const goToErrorNotificationScreen = ({ title, subtitle }) =>
      navigation.navigate(ROOT_NAVIGATOR.NAME, {
        screen: ROOT_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
        params: {
          type: 'failure',
          title,
          subtitle,
        },
      });

    const [addToLog, addToLogOptions] = useMutation(CREATE_ACTIVITY_LOG, {
      onCompleted,
      onError: pipe(prettyGraphQLErrors, goToErrorNotificationScreen),
      // update: (cache, { data: { addToLog } }) => {
      //   cache.modify({
      //     fields: {
      //       activityLogs(existingActivityLogs = []) {
      //         const newActivityLogRef = cache.writeFragment({
      //           data: addToLog.activityLog,
      //           fragment: gql`
      //             fragment NewActivityLog on ActivityLog {
      //               id
      //               category
      //               measurement
      //             }
      //           `,
      //         });

      //         return {
      //           ...existingActivityLogs,
      //           activityLogs: [
      //             ...existingActivityLogs.activityLogs,
      //             newActivityLogRef,
      //           ],
      //         };
      //       },
      //     },
      //   });
      // },
    });

    return (
      <WrappedComponent
        {...props}
        // onSubmitHandler={() => {
        //   navToByStatus();
        //   goToGroupNotificationScreen();
        // }}
        isLoading={addToLogOptions.loading}
        addToLog={pipe(
          // objOf('data'),
          objOf('input'),
          objOf('variables'),
          addToLog,
        )}
      />
    );
  };
};
