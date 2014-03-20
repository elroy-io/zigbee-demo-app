var PhotosensorDriver = module.exports = function(info,xbeeAPI) {
  this.type = 'photosensor';
  this.name = 'xbee-photosensor ('+info.remote16+')';
  this.data = {
    remote16 : info.remote16,
    remote64 : info.remote64
  };
  this.value = NaN;
  this.xbeeAPI = xbeeAPI;

  this.state = 'ready';
};

PhotosensorDriver.prototype.init = function(config) {
  config
    .stream('value', this.onValue);
};

PhotosensorDriver.prototype.onValue = function(emitter) {
  var self = this;
  this.xbeeAPI.on('frame_object',function(frame){
    if(frame.type !== 146)
      return;
    

    self.value = frame.analogSamples.AD0;
//    emitter.emit('data', {value : self.value,units : 'mV'}  );
    emitter.emit('data', self.value  );
  });
};
