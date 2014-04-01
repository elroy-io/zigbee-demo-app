
var HelloApp = module.exports = function() {
  this.name = 'hello';
};

HelloApp.prototype.init = function(elroy) {

  elroy.observe('type="lcddisplay"').subscribe(function(lcd){
    elroy.expose(lcd);
  });

};
