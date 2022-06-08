import { curry } from 'ramda';
import { of, animationFrameScheduler, concat, interval } from 'rxjs';
import {
  map,
  mapTo,
  scan,
  startWith,
  switchMap,
  take,
  takeWhile,
} from 'rxjs/operators';

export const debounce = curry((interval, fn) => {
  let timer;
  return function debounced() {
    clearTimeout(timer);
    const args = arguments;
    const that = this;
    timer = setTimeout(function callOriginalFn() {
      fn.apply(that, args);
    }, interval);
  };
});

export const roundNumber = (number, offset = 1, base = 10) =>
  Math.round(number * base ** offset) / base ** offset;

export const getSmartCounterStream = ({
  initial = 0,
  value,
  animateTimeMs = 2000,
}) => {
  const timeCurve = (gap) =>
    animateTimeMs * (Math.atan(Math.log10(Math.abs(gap) + 1)) / (Math.PI / 2));

  const valueCurve = (last, next, duration, currTime) =>
    currTime >= duration
      ? next
      : (1 - (1 - currTime / duration) ** 2) ** 0.5 * (next - last) + last;

  const rafInterval$ = () =>
    interval(0, animationFrameScheduler).pipe(
      scan((a) => ((a[1] = Date.now()), a), [Date.now()]),
      map(([a, b]) => b - a)
    );

  const singleAnime$ = ([last, next]) =>
    concat(
      rafInterval$().pipe(
        map((currTime) =>
          valueCurve(last, next, timeCurve(next - last), currTime)
        ),
        map((val) => val),
        takeWhile((val) => val !== next)
      ),

      // * tick last frame
      rafInterval$().pipe(take(1), mapTo(next))
    );

  return of(initial).pipe(
    startWith(0),
    map((v) => [value, v]),
    switchMap(singleAnime$)
    // tap(setValue)
  );
};
