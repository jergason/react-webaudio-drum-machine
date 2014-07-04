function buffer(buffer, ctx) {
  var source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.noteOn(0);
  setTimeout(function() {
    source.noteOff(0);
    source.disconnect();
  }, 300);
}

function note(frequency, ctx) {
  var source = ctx.createOscillator()
  source.frequency.value = frequency;
  source.connect(ctx.destination);
  source.noteOn(0);
  setTimeout(function() {
    source.noteOff(0);
    source.disconnect();
  }, 300);
}

module.exports = {
  buffer: buffer,
  note: note
};
