//meerderen en minderen

function Armband4(printer, material,style, pos){


  this.name = "Armband4";
  this.rows = 33;
  this.stitches = 6;
  this.stitchnr = 0;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.grid = new Grid(50,50,2,2,3); // 6X6
  this.grid.draw();
  this.grid.testPos(pos.x,pos.y); //row, stitches

  this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y, this.stitches,this.rows);
  //this.knitgrid.disorderHeight(1,25,24,75);

  //this.knitgrid.disorderSinWave(1,33,2,TWO_PI/this.stitches); //from, to, force, angle
  //this.knitgrid.disorderCosWave(1,33,3, TWO_PI/this.stitches)   //from, to, force, angle
  //this.knitgrid.disorderGrowWidth(1,33,1);
  //this.knitgrid.disorderGrowHeight(26,33,3);
  //this.knitgrid.disorderToPoint(24,30,2);

  //this.knitgrid.disorderShrinkWidth(6,20,1);
  //this.knitgrid.disorderGrowWidth(12,18,0.5);
   this.knitgrid.draw();

  this.gcode = new Gcode(this.settings);
  this.layers = [];
  this.knittings = [];
  // layer 0
  for(var i = 0; i < 10; i++){


  this.layers[i] = new Layer(i, this.settings);
  if(i == 0){
    this.skirt = new Skirt(this.grid,4,15, pos, 0);
    this.skirt.draw();
    this.skirt.gcode(this.gcode, this.layers[0]);
  }

  this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i],this.stitchnr,this.row,this.stitches);
  this.knittings[i].createPattern("setup", 0,1);
  this.knittings[i].createPattern("straight", 1,this.rows);
  this.knittings[i].createPattern("end",this.rows,this.rows);
  this.knittings[i].patternToGrid();
  this.knittings[i].gotoStart(pos);
  this.knittings[i].drawPattern();
  this.knittings[i].gcode(this.gcode);

  }


  this.gcode.generate(this.layers,this.skirt, this.knittings);
  noLoop();
}
Armband4.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.stitches + "x"+ this.rows);
  this.isSaved = true;
}
