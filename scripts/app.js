/** @jsx React.DOM */
var React = require('react');
var loadBuffers = require('./loadBuffers');
var Beat = require('./beat');
var utils = require('./utils');
var instrumentStore = require('./instrumentStore');

var ctx = new webkitAudioContext();

var App = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
      beat: 0
    }
  },
  instrumentStore: instrumentStore,
  tick: function() {
    console.log('tick');
    this.setState({
      beat: (this.state.beat + 1) % 16
    });
  },
  componentWillMount: function() {
    var self = this;
    loadBuffers(['/sounds/tss.wav', '/sounds/pah.wav', '/sounds/doo.wav'], this.props.ctx)
    .spread(function(b1, b2, b3) {
        console.log('we loaded wooo');
        self.buffers = [b1, b2, b3];
        self.setState({
          loaded: true
        });
    }).done();
    instrumentStore.changed = this.instrumentChanged;
  },
  instrumentChanged: function() {
    window.location.hash = instrumentStore.serialize();
    //var res = instrumentStore.serialize();
    this.render();
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 500);

    // check url hash for state
    var drumMachineHash = window.location.hash;
    // chop off leading #
    if (drumMachineHash[0] == '#') {
      drumMachineHash = drumMachineHash.slice(1);
    }
    instrumentStore.deserialize(drumMachineHash);
  },
  togglePause: function() {
    if (this.state.paused) {
      this.interval = setInterval(this.tick, 500);
    } else {
      clearInterval(this.interval);
    }

    this.setState({ paused: !this.state.paused });
  },
  render: function() {
    var self = this;
    if (!this.state.loaded) {
      return (
      <div className="loading">
        <p className="loading">Loading<span>.</span><span>.</span><span>.</span></p>
        <img src="/images/dancing_baby.gif" />
      </div>);
    }

    var beats = utils.range(16).map(function(beat) {
      return <Beat
        beat={self.state.beat}
        buffers={self.buffers}
        key={beat}
        ctx={self.props.ctx} />
    });

    return (
    <div className="drum-machine">
      <h1>DOMSTEP</h1>
      <button onClick={this.togglePause}>{this.state.paused ? "Play" : "Pause"}</button>
      {beats}
    </div>);
  }
});

React.renderComponent(<App ctx={ctx}/>, document.body);
