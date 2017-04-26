<<<<<<< HEAD
function Skirt(grid, skirtlength, skirtheight,pos, stitchnr){
=======
function Skirt(grid, skirtlength, skirtheight, pos){
>>>>>>> origin/master
  this.commands = new Array(";skirt");
  this.grid = grid.grid;
  this.gridmarge = grid.marge;
  this.pos = pos;
  this.stitchnr = stitchnr;
  this.length = skirtlength;
  this.height = skirtheight;
  this.pos = pos.copy();
  append(this.commands,";param length: " + this.length);
  append(this.commands,";param height: " + this.height);
  this.skirt = [];
  this.createRect();
}
Skirt.prototype.createRect = function(){
  var ok = true;
  var maxlength = this.grid[0].length - (2* this.gridmarge);
  var maxheight = this.grid.height - (2* this.gridmarge);
  if(this.length < this.gridmarge || this.length > maxlength){
    this.error("Error Skirt: skirtlength ("+ this.length + ") is in a forbidden region.");
    noLoop();
    ok = false;
  }
  if(this.height < this.gridmarge || this.height > maxheight){
    this.error("Error Skirt: skirtheight ("+ this.height + ") is in a forbidden region.");
    noLoop();
    ok = false;
  }
  if(ok){
    this.skirt[0] = this.grid[this.gridmarge][0];
    this.skirt[1] = this.grid[this.gridmarge][ this.gridmarge].copy();
    this.skirt[2] = this.grid[this.gridmarge][ this.gridmarge + this.length].copy();
    this.skirt[3] = this.grid[this.gridmarge + this.height][ this.gridmarge + this.length].copy();
    this.skirt[4] = this.grid[this.gridmarge + this.height][ this.gridmarge].copy();
    this.skirt[5] = this.grid[this.gridmarge +  this.length][ this.gridmarge].copy();
    this.skirt[6] = this.grid[this.gridmarge +  this.length][ this.gridmarge + 2].copy();
    this.skirt[7] = this.grid[this.gridmarge + this.height + 1][ this.gridmarge + 2].copy();
    this.skirt[8] = this.grid[this.gridmarge + this.height + 1][ this.gridmarge + 4].copy();
    this.skirt[9] = this.grid[this.gridmarge + this.height + 2][ this.gridmarge + 4].copy();

    this.skirt[10] =this.grid[this.pos.x][this.pos.y].copy();
    for(var i = 0; i <= this.stitchnr; i++){
      this.skirt[10 + i] =this.grid[this.pos.x][this.pos.y + i].copy();
    }
  }

}
Skirt.prototype.createZigZag = function(){
  //first check size
  var ok = true
  var maxlength = this.grid[0].length - (2* this.gridmarge);
  var maxheight = this.grid.height - (2* this.gridmarge);
  if(this.length < this.gridmarge || this.length > maxlength){
    this.error("Error Skirt: skirtlength ("+ this.length + ") is in a forbidden region.");
    noLoop();
    ok = false;
  }
  if(this.height < this.gridmarge || this.height > maxheight){
    this.error("Error Skirt: skirtheight ("+ this.height + ") is in a forbidden region.");
    noLoop();
    ok = false;
  }
  if(ok){
    this.skirt[0] = this.grid[this.gridmarge][0];
    this.skirt[1] = this.grid[this.gridmarge][ this.gridmarge].copy();
    this.skirt[2] = this.grid[this.gridmarge][ this.gridmarge + this.length].copy();
    var next = 3;
    for(var l = this.length; l >= 0; l--){
      var zig = this.gridmarge + 1;
      var zag = this.gridmarge + this.height;
      var end = this.grid[0].length ;

      if(l % 2 == 0  && zig % 2 == 0) {
        this.skirt[next] = this.grid[zig][this.gridmarge+l].copy();
      }
      else if(l % 2 == 0 && zig % 2 == 1){
        //this.skirt[next] = this.grid[zig][end - (this.gridmarge+l)].copy();
        this.skirt[next] = this.grid[zig][this.gridmarge+l].copy();
      }
      else if(l % 2 != 0  && zag % 2 == 0) {
        this.skirt[next] = this.grid[zag][this.gridmarge+l].copy();
      }
      else if(l % 2 != 0  && zag % 2 == 1) {
        //this.skirt[next] = this.grid[zag][end - (this.gridmarge+l)].copy();
        this.skirt[next] = this.grid[zag][this.gridmarge+l].copy();
      }
      next++;
    }
    if(this.length % 2 ==1){
      this.skirt[this.skirt.length] = this.grid[this.gridmarge + this.height][ this.gridmarge + this.length].copy();
     }
  }
}
Skirt.prototype.showFirst = function(){
  stroke(255,0,255);
  strokeWeight(5);
  point(this.skirt[0].x, this.skirt[0].y);
}
Skirt.prototype.error = function(msg){
  stroke(0);
  fill(255,0,0);
  textSize(30);
  textAlign(CENTER);
  text(msg, width/2, height/2);
}
Skirt.prototype.draw = function(){
  //this.showFirst();
  for(var l = 1; l < this.skirt.length; l++){
    stroke(255,0,255);
    strokeWeight(2);
    line(this.skirt[l-1].x, this.skirt[l-1].y, this.skirt[l].x, this.skirt[l].y);
  }
}
Skirt.prototype.gcode = function(gcode, layer){

  append(this.commands, "G0 X" + this.skirt[0].x * layer.scale + " Y" + this.skirt[0].y * layer.scale + " Z10" );
  append(this.commands, "G0 X" + this.skirt[0].x * layer.scale + " Y" + this.skirt[0].y * layer.scale + " Z" + layer.layerheight );
  append(this.commands, "G0 F1200");

  for(var i = 1; i < this.skirt.length; i++){
    var x = this.skirt[i].x * layer.scale;
    x = floor(x * 100)/100;
    var y = this.skirt[i].y * layer.scale;
    y = floor(y * 100)/100;

    var dvector = p5.Vector.sub(this.skirt[i], this.skirt[i-1]);
    var d = dvector.mag()* layer.scale;

    gcode.extrude += (d * layer.thickness);
    append(this.commands, "G1 X" + x + " Y" + y + " E" + gcode.extrude );

  }

}
