
var HelloApp = module.exports = function() {
  this.name = 'hello';
};

HelloApp.prototype.init = function(elroy) {
  elroy.observe('type="photosensor"').subscribe(function(photosensor){
    elroy.expose(photosensor);
  });
};
