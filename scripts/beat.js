/** @jsx React.DOM */
var React = require('react');
var Instrument = require('./instrument');
var utils = require('./utils');
var play = require('./play');
var instrumentStore = require('./instrumentStore');

// C scale
var notes = [130.81, 146.83, 164.81, 174.61, 196.00, 220.00, 246.94, 261.63];
// instruments are numbered from 0 to 13
function noteFromNumber(num) {
  // first three instruments are buffers not notes
  if (num < 2) {
    return -1;
  }

  return notes[num-3];
}


var Beat = React.createClass({
  playInstrumentNumber: function(n, ctx) {
    // first three instruments are buffer-based
    if (n < 3) {
      var buffer = this.props.buffers[n];
      play.buffer(buffer, ctx);
    } else {
      var note = notes[n-3];
      play.note(note, ctx);
    }
  },
  componentDidUpdate: function(prevProps, prevState) {
    var self = this;
    // if this is the first time we are updating to the
    // current beat, play all selected instruments
    if (this.props.beat == this.props.key && prevProps.beat != this.props.beat) {
      instrumentStore.instruments[this.props.key].map(function(selected, i) {
        if (selected) {
          //console.log('playing');
          return self.playInstrumentNumber(i, self.props.ctx);
        }
        //console.log('not playing ', selected, i);
      });
    }
  },
  render: function() {
    var self = this;

    var instruments = instrumentStore.instruments[0].map(function(selected, i) {
      return <Instrument key={i} selected={instrumentStore.getInstrument(self.props.key, i)} />
    });

    var classes;
    if (this.props.key == this.props.beat) {
      classes = "beat active";
    } else {
      classes = "beat";
    }

    return (
      <section className={classes}>
        {instruments}
      </section>
    );
  }
});


module.exports = Beat;
