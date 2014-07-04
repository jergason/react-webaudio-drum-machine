/** @jsx React.DOM */
var React = require('react');
var play = require('./play');


var Instrument = React.createClass({
  toggleInstrument: function() {
    this.props.selected.setInstrument(!this.props.selected.value)
  },
  render: function() {
    var markIfSelected = this.props.selected.value ? "selected" : "";
    return <article onClick={this.toggleInstrument} className={"instrument" + " " + markIfSelected}></article>
  }
});

module.exports = Instrument;
