//meerderen en minderen

function MoreLess(printer, material,style, pos,  rows, stitches){


  this.name = "MoreLess";
  this.rows = 50;
  this.stitches = 30;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.grid = new Grid(50,50,3,3,3); // 6X6
  //this.grid.draw();
  this.grid.testPos(pos.x,pos.y); //row, stitches

  this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y,this.rows, this.stitches);

this.knitgrid.draw();

  this.gcode = new Gcode(this.settings);
  this.layers = [];
  this.knittings = [];
// layer 0
  var i = 0
  this.layers[i] = new Layer(i, this.settings);

  this.skirt = new Skirt(this.grid, 10,3, pos, 8);
  this.skirt.draw();
  this.skirt.gcode(this.gcode, this.layers[0]);

  this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i], 4,8, 14);
  this.knittings[i].createPattern("setup", 0,1);
  this.knittings[i].createPattern("straight",1,10);
  this.knittings[i].createPattern("more",10,21);
  this.knittings[i].createPattern("straight",21, 25);
  this.knittings[i].createPattern("less", 25,47);
  this.knittings[i].createPattern("straight",47, 48);
  this.knittings[i].createPattern("end",48,49);

  this.knittings[i].patternToGrid();
  this.knittings[i].drawPattern();
  this.knittings[i].gcode(this.gcode, this.layers[i]);

// layer 1
  i = 1
  this.layers[i] = new Layer(i, this.settings);

  this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i], 62,10, 10);
  this.knittings[i].createPattern("setup", 0,1);
  this.knittings[i].createPattern("straight",1,5);
  this.knittings[i].createPattern("less", 5,10);
  this.knittings[i].createPattern("more",10,15);
  this.knittings[i].createPattern("straight",15,20);
  this.knittings[i].createPattern("end",20,21);

  this.knittings[i].patternToGrid();
  this.knittings[i].drawPattern();
  this.knittings[i].gcode(this.gcode, this.layers[i]);

  this.gcode.generate(this.layers,this.skirt, this.knittings);
  noLoop();
}
MoreLess.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
  this.isSaved = true;
}
