var HelloApp = module.exports = function() {
  this.name = 'hello';
};

HelloApp.prototype.init = function(zetta) {

  zetta.observe('type="lcddisplay"').subscribe(function(lcd){
    zetta.expose(lcd);
    
    var count = 0;
    var names = ['updateValA','updateValB'];
    zetta
      .observe('type="photosensor"')
      .take(2)
      .subscribe(function(photosensor){
	zetta.expose(photosensor);
	
	var func = names[count];
	photosensor.on('update',function(val){
	  lcd.call(func,val,function(){});
	});

	count++;
      });
  });

};
