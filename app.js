
var HelloApp = module.exports = function() {
  this.name = 'hello';
};

HelloApp.prototype.init = function(elroy) {

  elroy.observe('type="lcddisplay"').subscribe(function(lcd){
    elroy.expose(lcd);
    
    var count = 0;
    var names = ['updateValA','updateValB'];
    elroy
      .observe('type="photosensor"')
      .take(2)
      .subscribe(function(photosensor){
	elroy.expose(photosensor);
	
	var func = names[count];
	photosensor.on('update',function(val){
	  lcd.call(func,val,function(){});
	});

	count++;
      });
  });

};
