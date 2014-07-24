function buffer(buffer, ctx) {
  var source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start(0);
  source.stop(ctx.currentTime + 0.3);
}

function note(frequency, ctx) {
  var source = ctx.createOscillator()
  source.frequency.value = frequency;
  source.connect(ctx.destination);
  source.start(0);
}

module.exports = {
  buffer: buffer,
  note: note
};
