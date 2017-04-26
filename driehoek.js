//meerderen en minderen

function Driehoek(printer, material,style, pos,  rows, stitches){


  this.name = "Driehoek";
  this.rows = 100;
  this.stitches = 100;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.grid = new Grid(50,50,4,4,3); // 6X6
  //this.grid.draw();
  //this.grid.testPos(pos.x,pos.y); //row, stitches

  this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y,this.rows, this.stitches);

this.knitgrid.draw();

  this.gcode = new Gcode(this.settings);
  this.layers = [];
  this.knittings = [];
// layer 0
  var i = 0
  this.layers[i] = new Layer(i, this.settings);

  // this.skirt = new Skirt(this.grid, 2,2, pos, 8);
  // this.skirt.draw();
  // this.skirt.gcode(this.gcode, this.layers[0]);

  this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i], 0,0,72);
  this.knittings[i].createPattern("setup", 0,1);
  this.knittings[i].createPattern("less", 1,70);
  this.knittings[i].createPattern("straight",70, 71);
  this.knittings[i].createPattern("end",71,72);

  this.knittings[i].patternToGrid();
  this.knittings[i].drawPattern();
  this.knittings[i].gcode(this.gcode, this.layers[i]);

// layer 1


  this.gcode.generate(this.layers,this.skirt, this.knittings);
  noLoop();
}
Driehoek.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
  this.isSaved = true;
}
