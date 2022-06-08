import { gql } from '@apollo/client';

export const GET_INFOGRAPHIC_EMISSIONS_QUERY_NAME = 'GetUserEmissionsSummary';

export const GET_INFOGRAPHIC_EMISSIONS = gql`
  query ${GET_INFOGRAPHIC_EMISSIONS_QUERY_NAME}($activityTypeCode: String , $startDateTime: DateTime, $endDateTime: DateTime) {
    ${GET_INFOGRAPHIC_EMISSIONS_QUERY_NAME}(input: {activityTypeCode: $activityTypeCode, startDateTime: $startDateTime, endDateTime: $endDateTime}) {
      emissionsTotals {
        activityTypeCode
        activityTypeTitle
        total
        totalKgCo2e {
          value,
          valueRounded
        }
        averageTotalPerMonth
        totalPercentage
      }
      region {
        id
        name
        shortName
      }
      total
      totalKgCo2e {
        value,
        valueRounded
      }
    }
  }
`;
