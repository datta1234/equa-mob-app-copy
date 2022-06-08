import { add } from 'ramda';
import { from, Observable, of } from 'rxjs';
import { scan, mergeMap, concatMap, delay } from 'rxjs/operators';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const $precentage = Observable.create((obs) => {
  obs.next([10, 25, 50, 15]);
  obs.complete();
}).pipe(
  mergeMap(from),
  concatMap((x) => of(x).pipe(delay(getRandomInt(150, 250)))),
  scan(add, 0)
);
