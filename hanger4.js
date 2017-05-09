//meerderen en minderen

function Hanger4(printer, material,style, pos,  rows, stitches){


  this.name = "Hanger4";
  this.rows = 50;
  this.stitches = 50;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.grid = new Grid(50,50,3,3,3); // 6X6
  this.grid.createGrid();
  this.grid.draw();
  //this.grid.testPos(pos.x,pos.y); //row, stitches

  this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y,this.rows, this.stitches);
  //this.knitgrid.disorderHeight(1,25,24,75);
  //this.knitgrid.disorderSinWave(1,40,1, PI/13)
  this.knitgrid.disorderCosWave(20,40,1, TWO_PI/60)
  this.knitgrid.disorderGrowWidth(30,45,2, TWO_PI/50);
  this.knitgrid.disorderToPoint(30,49,1);

//  this.knitgrid.disorderShrinkWidth(6,20,1);
//  this.knitgrid.disorderGrowWidth(12,18,0.5);
  this.knitgrid.draw();

  this.gcode = new Gcode(this.settings);
  this.layers = [];
  this.knittings = [];
for(var i = 0; i <3;i++){
  this.layers[i] = new Layer(i, this.settings);
  if(i == 0){
    this.skirt = new Skirt(this.grid, 10,3, pos, 15);
    this.skirt.draw();
    this.skirt.gcode(this.gcode, this.layers[0]);
  }

  this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i],15,0,20);
  this.knittings[i].createPattern("setup", 0,1);
  this.knittings[i].createPattern("straight", 1,49);
  this.knittings[i].createPattern("end",49,50);

  //this.knittings[i].createPattern("straight", 0,19);
  //this.knittings[i].createPattern("more",3, 30);
  //this.knittings[i].createPattern("straight",30, 39);

  //this.knittings[i].createPattern("end",17,22);

  this.knittings[i].patternToGrid();
  this.knittings[i].drawPattern();
  this.knittings[i].gcode(this.gcode, this.layers[i]);

}


  this.gcode.generate(this.layers,this.skirt, this.knittings);
  noLoop();
}
Hanger4.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
  this.isSaved = true;
}
