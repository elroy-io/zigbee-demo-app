var request = require('request');

var LCDDriver = module.exports = function(addr) {
  this.type = 'lcddisplay';
  this.name = 'lcd-'+addr;

  this.data = {
    addr : addr,
    valA : 0,
    valB : 0,
    requesting : false
  };
  
  this.state = 'on';
};

LCDDriver.prototype.init = function(config) {
  config
    .when('on', { allow: ['updateValA','updateValB'] })
    .map('updateValA', this.updateValA,[{type : 'number',name : 'val'}])
    .map('updateValB', this.updateValB,[{type : 'number',name : 'val'}]);
};

LCDDriver.prototype.updateValA = function(val,cb){
  var self = this;

  this.data.valA = val;

  if(this._requesting)
    return cb();

  this._requesting = true;
  console.log('requesting ',this.data.valA,this.data.valB);
  request('http://'+this.data.addr+'/arduino/update/'+this.data.valA+'/'+this.data.valB,function(err){
    self._requesting = false;
    return cb(err);
  });
};

LCDDriver.prototype.updateValB = function(val,cb){
  var self = this;

  this.data.valB = val;

  if(this._requesting)
    return cb();

  this._requesting = true;
  
  console.log('requesting ',this.data.valA,this.data.valB); 
  request('http://'+this.data.addr+'/arduino/update/'+this.data.valA+'/'+this.data.valB,function(err){
    self._requesting = false;
    return cb(err);
  });

};




