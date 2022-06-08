export const PAYMENT_STATUS = {
  RESERVE_FAILED: 'RESERVE_FAILED',
  RESERVE_ERROR: 'RESERVE_ERROR',
  RESERVE_PENDING: 'RESERVE_PENDING',
  RESERVE_SUCCESS: 'RESERVE_SUCCESS',
};

export const SUBSCRIPTION_STATUS = {
  DEBIT_PENDING: 'DEBIT_PENDING',
  ALLOCATE_FAILED: 'ALLOCATE_FAILED',
  ALLOCATE_PENDING: 'ALLOCATE_PENDING',
  REFUND_SUCCESS: 'REFUND_SUCCESS',
  SUCCESS: 'SUCCESS',
};
// ********* All Statuses *********
// SUCCESS = 1,
// DEBIT_PENDING = 2,
// DEBIT_SUCCESS = 3,
// DEBIT_FAILED = 4,
// DEBIT_CANCELED = 5,
// DEBIT_ERROR = 6,
// RESERVE_PENDING = 7,
// RESERVE_SUCCESS = 8,
// RESERVE_FAILED = 9,
// RESERVE_ERROR = 10,
// ALLOCATE_PENDING = 11,
// ALLOCATE_SUCCESS = 12,
// ALLOCATE_FAILED = 13,
// ALLOCATE_ERROR = 14,
// REFUND_PENDING = 15,
// REFUND_SUCCESS = 16,
// REFUND_FAILED = 17,
// REFUND_ERROR = 18