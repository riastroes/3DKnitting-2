//meerderen en minderen

function Armband3(printer, material,style, pos,  stitches, rows){


  this.name = "Armband3";
  this.rows = 33;
  this.stitches = 10;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.grid = new Grid(50,50,2,2,3); // 6X6
  this.grid.draw();
  //this.grid.testPos(pos.x,pos.y); //row, stitches

  this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y,this.stitches, this.rows );
  //this.knitgrid.disorderHeight(1,25,24,75);
  this.knitgrid.disorderCosWave(10,33,3, PI/this.stitches)
  //this.knitgrid.disorderSinWave(1,10,5, PI/30)
  this.knitgrid.disorderGrowWidth(15,33,2, PI/60);
  //this.knitgrid.disorderToPoint(30,30,0.1);

  this.knitgrid.disorderShrinkWidth(10,15,1);
  //this.knitgrid.disorderGrowWidth(12,18,0.5);
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

  this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i],0,0,10);
  this.knittings[i].createPattern("setup", 0,1);
  this.knittings[i].createPattern("straight", 1,this.rows);
  this.knittings[i].createPattern("end",this.rows,this.rows+1);

  this.knittings[i].patternToGrid();
  this.knittings[i].drawPattern();
  this.knittings[i].gcode(this.gcode, this.layers[i]);

// layer 1


  this.gcode.generate(this.layers,this.skirt, this.knittings);
  noLoop();
}
Armband3.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
  this.isSaved = true;
}
