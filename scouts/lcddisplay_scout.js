var EventEmitter = require('events').EventEmitter;
var mdns = require('mdns2');
var util = require('util');

var LCDDriver = require('../drivers/lcd_arduino.js');

var MDNSScout = module.exports = function() {
 EventEmitter.call(this); 
};
util.inherits(MDNSScout, EventEmitter);

MDNSScout.prototype.init = function() {
  var self = this;
  var browser = mdns.createBrowser(mdns.tcp('lcddisplay'));
  browser.on('serviceUp', function(service) {
    var ipAddr = service.addresses[0];
    self.emit('discover', LCDDriver,ipAddr);
  });
  browser.start();
};
