function Knitting(){
  this.commands = new Array(";knitting");
  this.p = [];

}
Knitting.prototype.createPattern = function(name, first){
  var pattern = new Pattern(name, first);
  this.p = concat(this.p, pattern.p);
  console.log("0:" + this.p[0]);
  console.log("1:" + this.p[1]);
}
Knitting.prototype.gcode = function(layer){
  append(this.commands, "G0 X" + this.p[0].x + " Y" + this.p[0].y  );
  var lz = ((layer.layer+1) * layer.layerheight);
  append(this.commands, "G0 Z" + lz);


  for(var i = 1; i < this.p.length; i++){
    var x = this.p[i].x * layer.scale;
    x = floor(x * 100)/100;
    var y = this.p[i].y * layer.scale;
    y = floor(y * 100)/100;
    var z = this.p[i].z;

    var dvector = p5.Vector.sub(this.p[i], this.p[i-1]);
    var d = dvector.mag()* layer.scale;

    gcode.extrude += (d * layer.layerheight * layer.thickness);


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
    for(var i = 1; i < this.p.length; i++){
    var x = this.p[i].x;
    var y = this.p[i].y;
    var z = this.p[i].z;

    x = floor(x * 100)/100;
    y = floor(y * 100)/100;
    z = floor(z * 100)/100;

    stroke(2);
    line(this.p[i-1].x, this.p[i-1].y,x,y);
  }
}
