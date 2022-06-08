import * as R from 'ramda';

import { decamelize } from './humps';
import { renameKeys, getIn, isNotDefined, getInOr, isDefined } from './ramda';

export const humanUnderscore = (role) => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  if (R.isNil(role)) {
    return role;
  }

  return role
    .split('_')
    .map((str) => capitalize(str))
    .join(' ');
};

export function humanCamelize(value) {
  return R.pipe(decamelize, humanUnderscore)(value);
}

const transformMessage = (value) => {
  return `- ${value} `;
};
const exeLense = R.lens(R.prop('extensions'), R.assoc('subtitle'));

const modalDefaults = {
  type: 'failure',
  modalType: 'modal',
  title: 'Failure',
  subtitle: 'Something went wrong with your request',
  showAction: false,
  showCancel: false,
};

const isNetworkError = R.pipe(getIn('networkError'), isDefined);

const getNetworkError = R.pipe(
  getInOr('Network Error', 'message'),
  (message) => ({
    title: message,
    subtitle: 'Please check your network connection',
  }),
  R.mergeRight(modalDefaults)
);
const getGQLError = R.pipe(
  // R.tap((v) => console.log('GQL Error', { v })),
  getIn('graphQLErrors'),
  R.ifElse(
    isNotDefined,
    R.always(modalDefaults),
    R.pipe(
      R.head,
      R.pick(['message', 'extensions']),
      R.evolve({
        extensions: {
          messageDetails: R.pipe(R.map(transformMessage), R.join('\n')),
        },
      }),
      R.over(exeLense, R.prop('messageDetails')),
      renameKeys({
        message: 'title',
      }),
      R.mergeRight(modalDefaults) // adds defaults to Object if they don't exist
      // R.tap((v) => console.log('PrettyError', v))
    )
  )
);
export const prettyGraphQLErrors = R.ifElse(
  isNetworkError,
  getNetworkError,
  getGQLError
);

export const carbonOffsetFormat = (
  number = 0,
  { limitNumber = 10000000, exp = 2, dec = 2 } = {}
) => {
  const _number = parseFloat(number);

  if (_number >= limitNumber) {
    return _number.toExponential(exp);
  }

  return _number.toFixed(dec);
};
