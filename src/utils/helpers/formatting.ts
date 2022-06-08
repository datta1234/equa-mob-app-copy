/**
 *  Removes spaces, set 2dp by default and adds commas to number for better readability
 * @param array array to break into chunks
 * @param size chunk size
 */
export function chunkArray(array, size) {
  if (array.length <= size) {
    return [array];
  }
  return [array.slice(0, size), ...chunkArray(array.slice(size), size)];
}

/**
 *  Removes spaces, set 2dp by default and adds commas to number for better readability
 * @param num number to format
 */
export function numberFormatter(num, dp = 2) {
  const removedSpaces = num.replace(/\s+/g, '');
  const numWithCommas = removedSpaces
    .toString()
    .replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

  const parts = numWithCommas.split('.');

  if (parts[1] === undefined) {
    return parts[0];
  } else {
    // Add '.' back in to string and set number of dp.
    return parts[0] + '.' + parts[1]?.replace(/,/g, '')?.slice(0, dp);
  }
}
