module.exports.ucFirst = function (str) {
  if (typeof str !== 'string') {
    throw new Error('str must be of type string');
  }
  return str[0].toUpperCase() + str.slice(1);
}