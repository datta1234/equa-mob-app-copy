import { apply, equals, evolve, map, pick, pipe, unapply } from 'ramda';

export const checkIsAvatarPropsEquals = pipe(
  unapply(map(pick(['isLoading', 'me']))),
  map(evolve({ me: pick(['thumbnailAvatar']) })),
  apply(equals),
);
