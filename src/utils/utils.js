export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};
/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return "";
};

export const redirect = (url) => {
  window.open(url, "_blank");
};
