/**
 * Check if any values of keys in an object are empty strings
 * @param obj object with type key: value
 */
export function testEmptyInputs(obj) {
  for (const key in obj) {
    if (obj[key] === '' || obj[key] === null) return true;
  }
  return false;
}
