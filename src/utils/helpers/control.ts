// Throttling and debouncing give control over the rate at which a function is called. - i.e limit the number of times a function can execute.
/**    Debounce Function
 * debouncing prevents multiple function calls in a delay window.
 * @param func function to run after a delay
 * @param delay delay between function calls
 * Debouncing is good for a resize or scroll event handler
 */
let debounceTimerId;
export const debounceFunction = (func, delay) => {
  // Cancels the setTimeout method execution
  clearTimeout(debounceTimerId);
  // Executes the func after delay time.
  debounceTimerId = setTimeout(func, delay);
};

/**    Throttle Function
 * Throttling rate limits function calls so that they only happen every x intervals (the delay between calls).
 * @param func function to run after a delay
 * @param delay delay between function calls
 * Throttling is good for a API calls, mouse/touch movements or preventing spam clicks
 */
let throttleTimerId;
export const throttleFunction = (func, delay) => {
  // If setTimeout is already scheduled, no need to do anything
  if (throttleTimerId) {
    return;
  }
  // Schedule a setTimeout after delay seconds
  throttleTimerId = setTimeout(() => {
    func();

    // Once setTimeout function execution is finished, throttleTimerId = undefined so that in <br>
    // the next scroll event function execution can be scheduled by the setTimeout
    throttleTimerId = undefined;
  }, delay);
};

/**    Promise.allSettled Function
 * polyfill for Promise.allSettled as it currently isn't in RN see open PR: https://github.com/then/promise/pull/171.
 * @param promises array of promises
 */
export const allSettled = (promises) => {
  return Promise.all(
    promises.map((promise) =>
      promise
        .then((value) => ({ status: 'fulfilled', value }))
        .catch((reason) => ({ status: 'rejected', reason }))
    )
  );
};
