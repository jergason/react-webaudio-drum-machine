function range(n) {
  return Array.apply(null, new Array(n)).map(function(e, i) { return i; });
}

function makeN(n, item) {
  return Array.apply(null, new Array(n)).map(function() { return item; });
}
module.exports = {
  range: range,
  makeN: makeN
};
