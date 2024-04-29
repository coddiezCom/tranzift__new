/**
 * Returns a shortened string up to a specified limit, with an additional end string appended.
 *
 * @param {string} str - The input string to be shortened.
 * @param {number} limit - The maximum length of the output string.
 * @param {string} endStr - The string to append at the end of the shortened string.
 * @return {string} The shortened string with the end string appended.
 */

const limitCharacter = (str, limit, endStr) => {
  let shortStr = str.substring(0, limit);
  if (str.length > limit) {
    return shortStr + `${endStr}`;
  } else {
    return str;
  }
};

export default limitCharacter;
