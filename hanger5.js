function Hanger5(printer, material,style, pos,  rows, stitches){
  //TEST OK VOOR:
  //printer:   Anet
  //materiaal: BRICK
  //style:     normal, fine
  //TEST NIET OK VOOR:
//  style:     extrafine

  this.name = "Hanger";
  this.rows =45;
  this.stitches = 20;
  this.pos = pos;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.grid = new Grid(50,50, 3,3,3); // 6X6
  this.grid.draw();
  this.grid.testPos(pos.x,pos.y); //row, stitches

  this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y,this.rows, this.stitches);
  this.knitgrid.disorderCosWave(10,30,6, 0.5);
  //this.knitgrid.disorderShrinkWidth(11,37, 0.7)
  //this.knitgrid.disorderSinWave(41,51, 2, 0.4);
//  this.knitgrid.disorderSinWave(53,60, 2, 0.4);
//  this.knitgrid.disorderGrowWidth(4,35,3);
  this.knitgrid.disorderHeight(0,100, 20, 50);
  this.knitgrid.disorderHeight(0,100, 20, 34);
  this.knitgrid.disorderHeight(0,100, -20, 14);

  this.knitgrid.draw();

  this.gcode = new Gcode(this.settings);
  this.layers = [];
  this.knittings = [];
  for(var i = 0; i < 3; i++){
    this.layers[i] = new Layer(i, this.settings);
    if(i == 0){
      this.skirt = new Skirt(this.grid, 25,3, this.pos);
      this.skirt.draw();
      this.skirt.gcode(this.gcode, this.layers[0]);
    }
     this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i], "straight");
     this.knittings[i].gcode(this.gcode, this.layers[i]);
  //
  }
  this.gcode.generate(this.layers,this.skirt, this.knittings);
  noLoop();
}
Hanger5.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
  this.isSaved = true;
}
