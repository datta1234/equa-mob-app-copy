export const SelectedSlices = {
  SELECT_NONE: 'NONE',
  SELECT_HOME: 'HOME',
  SELECT_FOOD: 'FOOD',
  SELECT_PURCHASE: 'PURCHASE',
  SELECT_TRAVEL: 'TRAVEL',
} as const;

export type SelectedSlicesKey = keyof typeof SelectedSlices;
export type SelectedSlicesKeysValue = typeof SelectedSlices[SelectedSlicesKey];
