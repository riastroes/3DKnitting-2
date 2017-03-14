function Knitting(layers, name, first){
  this.commands = new Array(";knitting");
  this.pattern = new Pattern(name, first);
  this.layers = layers;
  this.createPattern();
}
Knitting.prototype.createPattern = function(){
    for(var i = 0; i < this.layers.length; i++){
      this.layers[i].p = concat(this.layers[i].p, this.pattern.p);
  }
}
Knitting.prototype.generateGcode = function(){

  for(var i = 0; i < this.layers.length; i++){
    this.commands = concat(this.commands, this.layers[i].commands);
    this.gcode(this.layers[i]);
  }
}
Knitting.prototype.gcode = function(layer){

  var lz = ((layer.layer+1) * layer.layerheight);
  append(this.commands, "G0 Z" + lz);
  append(this.commands, "G0 X" + layer.p[0].x * layer.scale + " Y" + layer.p[0].y * layer.scale  );

  for(var i = 1; i < layer.p.length; i++){
    var x = layer.p[i].x * layer.scale;
    x = floor(x * 100)/100;
    var y = layer.p[i].y * layer.scale;
    y = floor(y * 100)/100;
    var z = layer.p[i].z;

    var dvector = p5.Vector.sub(layer.p[i], layer.p[i-1]);
    var d = dvector.mag()* layer.scale;

    gcode.extrude += (d * layer.thickness);


    var kz = ((layer.layer+1) * layer.layerheight) + floor(z  * 100)/100;
    if(kz != lz){
      append(this.commands, "G1 X" + x + " Y" + y + " Z" + z + " E" + gcode.extrude );
    }
    else{
      append(this.commands, "G1 X" + x + " Y" + y + " E" + gcode.extrude );
    }
  }
}
Knitting.prototype.draw = function(){
    stroke(2);
    rect(0,0,width-1,height-1);
    for(var l = 0; l < this.layers.length; l++){
      for(var i = 1; i < this.layers[l].p.length; i++){
      var x =  this.layers[l].p[i].x;
      var y =  this.layers[l].p[i].y;
      var z =  this.layers[l].p[i].z;

      x = floor(x * 100)/100;
      y = floor(y * 100)/100;
      z = floor(z * 100)/100;

      stroke(this.layers[l].thickness);
      line( this.layers[l].p[i-1].x,  this.layers[l].p[i-1].y,x,y);
    }
  }
}
