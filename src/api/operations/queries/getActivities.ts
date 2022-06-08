import { gql } from '@apollo/client';

export const GET_ACTIVITIES_QUERY_NAME = 'GetUserEmissionsBreakdown';

export const GET_ACTIVITIES = gql`
  query ${GET_ACTIVITIES_QUERY_NAME}( $take: Int, $startDateTime: DateTime,  $endDateTime: DateTime,  ) {
    ${GET_ACTIVITIES_QUERY_NAME}(input: {
      startDateTime: $startDateTime
      endDateTime: $endDateTime
      take: $take
    }) {
      code,
      title,
      totalKgCo2e {
        value,
        valueRounded,
      },
      totalPercentage,
      averageTotalPerMonth,
      isAboveAverage,
      activities {
        id,
        code,
        title,
        totalKgCo2e {
          value,
          valueRounded,
        },
        totalPercentage
      }
  }
  }
`;
