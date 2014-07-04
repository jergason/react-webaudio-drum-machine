var utils = require('./utils');
var instrumentStore = {
  changed: function() {},
  instruments: constructInstrumentArray(16, 11),
  getInstrument: function(beatNum, instrumentNum) {
    var self = this;

    return {
      value: self.instruments[beatNum][instrumentNum],
      setInstrument: function(val) {
        self.setInstrument(beatNum, instrumentNum, val);
      }
    }
  },
  setInstrument: function(beatNum, instrumentNum, val) {
    this.instruments[beatNum][instrumentNum] = val;
    this.changed();
  },
  serialize: function() {
    // turn the state of the instruments array into a string
    //
    // build up a binary number representing the state of each beat
    // convert that binary number to hex (so it fits in 3 digits)
    // concatenate them all together
    return this.instruments.reduce(function(memo, beat) {
      memo += beatToHexString(beat);
      return memo;
    }, '')
  },
  deserialize: function(hash) {
    hash = hash || '';
    var beats = splitHashIntoBeats(hash);
    this.instruments = beats.map(beatStringToBeatArray);
    this.changed();
  }
};

function splitHashIntoBeats(hash) {
  // hash should be 16 * 3 or 48 chars long. If not, pad with zeros
  if (hash.length < 48) {
    hash += utils.makeN(48 - hash.length, "0").join('');
  }

  var beats = [];
  var beat;
  // split into an array of 16 3 char hex strings
  while (hash.length > 0) {
    beat = hash.slice(0,3);
    hash = hash.slice(3);
    beats.push(beat);
  }

  return beats;
}

function beatStringToBeatArray(beatString) {
  var num = parseInt(beatString, 16);
  if (num != num) {
    num = 0;
  }

  var bits = num.toString(2).split('');
  var instrument = [];
  for (var i = 0; i < 11; i++) {
    num = parseInt(bits[i], 10) || 0;
    instrument[i] = !!num;
  }

  return instrument;
}



function beatToHexString(beat) {
  var binaryString = beat.reduce(function(memo, instrument) {
    memo += (instrument ? '1' : '0');
    return memo;
  }, '');
  var hexString = parseInt(binaryString, 2).toString(16);
  return padWithLeadingZeros(hexString);
}

function padWithLeadingZeros(hexString) {
  // needs to be 3 digits long
  var numberOfZerosToPad = 3 - hexString.length;
  if (numberOfZerosToPad == 0) {
    return hexString;
  }

  return utils.makeN(numberOfZerosToPad, '0').join('') + hexString;
}

// 2d array of beats and instruments
function constructInstrumentArray(numberOfBeats, numberOfInstruments) {
  return utils.range(numberOfBeats).map(function(beat) {
    return utils.makeN(numberOfInstruments, false);
  });
}


module.exports = instrumentStore;
