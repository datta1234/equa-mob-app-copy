import {
  addIndex,
  map,
  lens,
  set,
  view,
  keys,
  or,
  reduce,
  curry,
  assoc,
  anyPass,
  isEmpty,
  equals,
  isNil,
  complement,
  compose,
  when,
  is,
  split,
  pathOr,
  path,
  assocPath,
  join,
} from 'ramda';

export const getPath = (_p) =>
  compose(
    when(is(String), (p) => [...split('.', p)]),
    when(is(Array), compose(getPath, join('.')))
  )(_p);

export const getIn = curry((p, v) => path(getPath(p), v));
export const getInOr = curry((defaultValue, p, v) =>
  pathOr(defaultValue, getPath(p), v)
);

export const isNotDefined = anyPass([isEmpty, isNil]);

export const isDefined = complement(isNotDefined);

export const renameKeys = curry((keysMap, obj) =>
  reduce((acc, key) => assoc(keysMap[key] || key, obj[key], acc), {}, keys(obj))
);

const makePropLens = (key) => lens(getIn(key), assocPath(getPath(key)));
export const setParam = curry((params, lensKey, key) =>
  set(makePropLens(lensKey), key, params)
);
export const getParam = curry((params, lensKey) =>
  view(makePropLens(lensKey), params)
);

export const mapIndexed = addIndex(map);

export const alt = curry((f1, f2, arg) => or(f1(arg), f2(arg)));

export const fork = (joinFunction, f1, f2) => (val) =>
  joinFunction(f1(val), f2(val));

export const notEquals = complement(equals);
