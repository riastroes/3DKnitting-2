function Layer(layer, settings){
  this.layer = layer;
  this.layerheight = settings.layerheight;
  this.thickness = settings.thickness;
  this.speed = settings.speed;
  this.scale = settings.scale;
  this.commands = new Array(";Layer " + this.layer);
  this.commands = append(this.commands, ";param layerheight: " + this.layerheight);
  this.commands = append(this.commands, ";param thickness:   " + this.thickness);
  this.commands = append(this.commands, ";param speed:       " + this.speed);
  this.commands = append(this.commands, "G0 F" + this.speed);
}
Layer.prototype.gcode = function(){
  return this.commands;
}
