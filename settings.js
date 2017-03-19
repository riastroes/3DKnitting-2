function Settings(printer, material, style){
  this.printer = printer;
  this.material = material;
  this.style = style;
  this.width = width;
  this.height = height;
  this.scale = 0;
  this.layerheight = 0;
  this.thickness = 0;
  this.speed = 0;
  this.nozzletemp = 0;
  this.bedtemp = 0;
  this.filement = 0;
  this.init();


}
Settings.prototype.init = function(){
  this.initMaterial();
  switch(this.printer){
    case "Anet":{
      this.scale = 0.2;         //canvas = 1000 px, bed = 220 mm
      this.filement = 1.75;
      if(this.material == "PLA" && this.style == "fine"){
        this.initStyle(0.4, 0.09, 200); //test OK
      }
      else if(this.material == "TPC FLEX" && this.style == "fine"){
        this.initStyle(0.4, 0.2, 800); //not tested - TE DUN 0.1
      }
      else if(this.material == "PLA" && this.style == "normal"){
        this.initStyle(0.4, 0.12, 800);//test OK
      }
      break;
    }
    case "Ultimaker2+":{
      this.scale = 0.23;         //canvas = 1000 px, bed = 220 mm
      this.filement = 2.85;
      if(this.material == "PLA" && this.style == "fine"){
        this.initStyle(1, 0.03, 600);   //test // 1  0.05   1000 test OK
      }
      else if(this.material == "PLA" && this.style == "grof" ){
        //nozzle 0.08
        this.initStyle(1.5, 1, 800);  //not tested
      }
      break;
    }
  }


}
Settings.prototype.initMaterial = function(){
    switch(this.material){
    case "PLA":{
      this.nozzletemp = 210;
      this.bedtemp = 50;
      break;
    }
    case "TPC FLEX":{
      this.nozzletemp = 210;
      this.bedtemp = 80;
      break;
    }
  }
}

Settings.prototype.initStyle = function( layerheight,thickness,speed){
  this.layerheight = layerheight;
  this.thickness = thickness;
  this.speed = speed;
}
Settings.prototype.report = function(gcode){
  console.log("nozzletemp :   " + this.nozzletemp);
  console.log("bedtemp :   " + this.bedtemp);
  console.log("layers :   " + layers.length);
  console.log("layerheight :   " + this.layerheight);
  console.log("thickness :   " + this.thickness);
  console.log("speed :   " + this.speed);
  console.log("extrude :   " + gcode.extrude);
  console.log("filement "+ this.filement + ":   " + floor(gcode.extrude*10)/ 10/this.filement + "cm");

}
