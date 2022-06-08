import { assoc, init, is, join, objOf, partial, pipe, split } from 'ramda';

import routes from 'constants/routes';

import { isDefined, getIn } from './ramda';

const pathCreator = (routes, path, value) => {
  const screen = getIn(path, routes);

  if (isDefined(screen)) {
    const newPath = pipe(split('.'), init, join('.'))(path);

    if (is(String, screen)) {
      return pathCreator(
        routes,
        newPath,
        pipe(assoc('screen', screen), objOf('params'))(value)
      );
    }

    if (isDefined(screen.STACK_NAME)) {
      return pathCreator(
        routes,
        newPath,
        pipe(assoc('screen', screen.STACK_NAME), objOf('params'))(value)
      );
    }

    return pathCreator(routes, newPath, value);
  }

  return [value.params.screen, value.params.params];
};

export const getPath = partial(pathCreator, [routes]);
