var Q = require('q');

function loadBuffers(paths, ctx) {
  return Q.all(paths.map(function(p) { return loadBuffer(p, ctx); }));
}

function loadBuffer(path, context) {
  var deferred = Q.defer();
  var request = new XMLHttpRequest();
  request.open('GET', path, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    context.decodeAudioData(request.response, function(theBuffer) {
      return deferred.resolve(theBuffer);
    }, function(err) {
      return deferred.reject(err);
    });
  }
  request.send();
  return deferred.promise;
}

module.exports = loadBuffers;
