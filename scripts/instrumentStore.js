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
  }
};

// 2d array of beats and instruments
function constructInstrumentArray(numberOfBeats, numberOfInstruments) {
  return utils.range(numberOfBeats).map(function(beat) {
    return utils.makeN(numberOfInstruments, false);
  });
}


module.exports = instrumentStore;
