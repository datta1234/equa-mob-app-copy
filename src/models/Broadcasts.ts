export const BroadcastTypeCodes =
  {
    CREDIT: 'CREDIT_ACTIVATION',
    INSURANCE: 'INSURANCE_ACTIVATION',
  } as const;

export type BroadcastTypeCodesKey = keyof typeof BroadcastTypeCodes;
export type BroadcastTypeCodesValue = typeof BroadcastTypeCodes[BroadcastTypeCodesKey];
