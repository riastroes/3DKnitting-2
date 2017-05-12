function Hanger5(printer, material,style, pos,  rows, stitches){
  //TEST OK VOOR:
  //printer:   Anet
  //materiaal: BRICK
  //style:     normal, fine
  //TEST NIET OK VOOR:
//  style:     extrafine

  this.name = "Hanger5";
  this.rows =53;
  this.stitches = 20;
  this.pos = pos;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.grid = new Grid(50,50, 3,3,3); // 6X6
  this.grid.createGrid();
  this.grid.draw();
  this.grid.testPos(pos.x,pos.y); //row, stitches
  this.layers = [];



  this.gcode = new Gcode(this.settings);

  this.knittings = [];
  for(var i = 0; i < 2; i++){
    this.layers[i] = new Layer(i, this.settings);
    if(i == 0){           //this.grid, this.knitgrid, this.layers[i],15,0,20
      this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y,this.stitches,this.rows);
      this.knitgrid.draw();
      this.knitgrid.disorderCosWave(11,20,2, -TWO_PI/70);
      this.knitgrid.disorderCosWave(32,43,2, TWO_PI/70);
      //this.knitgrid.disorderShrinkWidth(11,37, 0.7)
      //this.knitgrid.disorderSinWave(41,51, 2, 0.4);
      //this.knitgrid.disorderSinWave(53,60, 2, 0.4);
      //this.knitgrid.disorderGrowWidth(4,35,3);
      //this.knitgrid.disorderHeight(0,100, 20, 50);
      //this.knitgrid.disorderHeight(0,100, 20, 34);
      //this.knitgrid.disorderHeight(0,100, -20, 14);

      this.skirt = new Skirt(this.grid, 3,10, this.pos, 5);
      this.skirt.draw();
      this.skirt.gcode(this.gcode, this.layers[0]);
    }

    this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i],5,0,10);
    this.knittings[i].createPattern("setup", 0,1);
    this.knittings[i].createPattern("straight", 1,52);
    this.knittings[i].createPattern("end",52,53);

    this.knittings[i].patternToGrid();
    this.knittings[i].drawPattern();
    this.knittings[i].gcode(this.gcode, this.layers[i]);

  //
  }
  this.gcode.generate(this.layers,this.skirt, this.knittings);
  //noLoop();
}
Hanger5.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
  this.isSaved = true;
}
