//meerderen en minderen

function Hanger4(printer, material,style, pos,  rows, stitches){


  this.name = "Hanger4";
  this.rows = 40;
  this.stitches = 50;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.grid = new Grid(50,50,3,3,3); // 6X6
  //this.grid.draw();
  //this.grid.testPos(pos.x,pos.y); //row, stitches

  this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y,this.rows, this.stitches);
  this.knitgrid.disorderHeight(1,25,24,75);
  this.knitgrid.disorderSinWave(1,40,1, PI/13)
  //this.knitgrid.disorderSinWave(1,10,5, PI/30)
  //this.knitgrid.disorderGrowWidth(10,25,2, PI/60);
  //this.knitgrid.disorderToPoint(30,30,0.1);

  this.knitgrid.disorderShrinkWidth(6,20,1);
  this.knitgrid.disorderGrowWidth(12,18,0.5);
  this.knitgrid.draw();

  this.gcode = new Gcode(this.settings);
  this.layers = [];
  this.knittings = [];
// layer 0
  var i = 0
  this.layers[i] = new Layer(i, this.settings);

  this.skirt = new Skirt(this.grid, 3,10, pos, 10);
  this.skirt.draw();
  this.skirt.gcode(this.gcode, this.layers[0]);

  this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i],0,10,27);
  this.knittings[i].createPattern("setup", 0,1);
  this.knittings[i].createPattern("straight", 0,3);

  //this.knittings[i].createPattern("straight", 0,19);
  this.knittings[i].createPattern("more",3, 30);
  this.knittings[i].createPattern("straight",30, 39);

//  this.knittings[i].createPattern("end",17,22);

  this.knittings[i].patternToGrid();
  this.knittings[i].drawPattern();
  this.knittings[i].gcode(this.gcode, this.layers[i]);

// layer 1


  this.gcode.generate(this.layers,this.skirt, this.knittings);
  noLoop();
}
Hanger4.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
  this.isSaved = true;
}
