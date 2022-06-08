import { makeVar, InMemoryCache } from '@apollo/client';

import { SelectedSlices, SelectedSlicesKeysValue } from 'models/SelectedSlice';

export const isLoggedInVar = makeVar(false);
export const selectedSliceVar = makeVar<SelectedSlicesKeysValue>(
  SelectedSlices.SELECT_NONE,
);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        selectedSlice: {
          read() {
            return selectedSliceVar();
          },
        },
      },
    },
  },
});
