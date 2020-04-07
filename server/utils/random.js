const numbers = "0123456789";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/**
 * Generate random string
 * @param {Number} length
 * @param {Object} options
 */
const random = (length = 16, option) => {
  let chars = "";
  let result = "";

  switch (option) {
    case "number": {
      chars = numbers;
      break;
    }
    case "letter": {
      chars = letters;
      break;
    }
    case "both": {
      chars = numbers + letters;
      break;
    }
    default:
      chars = numbers;
  }

  while (length > 0) {
    length--;
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

module.exports = random;
