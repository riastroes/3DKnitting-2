//meerderen en minderen

function Hanger2(printer, material,style, pos,  rows, stitches){


  this.name = "Hanger2";
  this.rows = 40;
  this.stitches = 20;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.grid = new Grid(50,50,2,2,3); // 6X6
  //this.grid.draw();
  //this.grid.testPos(pos.x,pos.y); //row, stitches

  this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y,this.rows, this.stitches);
  this.knitgrid.disorderShrinkWidth(5,9,2);
  this.knitgrid.disorderToPoint(9,13,2);

  this.knitgrid.disorderShrinkWidth(13,18,2);
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

  this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i],0,5,10);
  this.knittings[i].createPattern("setup", 0,0);
  this.knittings[i].createPattern("straight", 0,19);
  //this.knittings[i].createPattern("more",11, 17);
//  this.knittings[i].createPattern("end",17,22);

  this.knittings[i].patternToGrid();
  this.knittings[i].drawPattern();
  this.knittings[i].gcode(this.gcode, this.layers[i]);

// layer 1


  this.gcode.generate(this.layers,this.skirt, this.knittings);
  noLoop();
}
Hanger2.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
  this.isSaved = true;
}
