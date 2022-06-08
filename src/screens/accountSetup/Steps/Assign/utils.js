// X :: [n] -> n -> n -> [n]
import * as R from 'ramda';

export const changeLinkedValues = R.curry((value, idx, x) => {
  const delta = R.compose(
    R.flip(R.divide)(R.length(value) - 1),
    R.flip(R.subtract)(x),
    R.prop(idx)
  )(value);

  // return R.compose(R.update(idx, x), R.map(R.add(delta)))(value);
  const indexededReduce = R.addIndex(R.reduce);
  const mapIndexed = R.addIndex(R.map);

  const debAccum = indexededReduce(
    (acc, _val, _idx) => {
      if (R.equals(_idx, idx)) {
        return {
          ...acc,
          result: R.append(x, acc.result),
        };
      }

      const _newVal = _val + delta;

      if (R.gt(0, _newVal)) {
        return {
          debt: R.add(_newVal * -1, acc.debt),
          result: R.append(0, acc.result),
        };
      }

      return {
        ...acc,
        result: R.append(_newVal, acc.result),
      };
    },
    {
      debt: 0,
      result: [],
    }
  );

  const debtReduce = ({ debt, result }) => {
    let _debt = debt;
    return mapIndexed((value, _idx) => {
      if (R.equals(_idx, idx)) {
        return value;
      }

      if (value >= _debt) {
        const _newVal = value - _debt;
        _debt = _newVal <= 0 ? _newVal * -1 : 0;
        return _newVal;
      }

      return value;
    }, result);
  };

  return R.pipe(debAccum, debtReduce)(value);
});

// const a = [70, 0, 20, 10];
// console.log(X(a, 0, 15));
