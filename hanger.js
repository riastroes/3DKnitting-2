function Hanger(printer, material,style,  rows, stitches){
  //TEST OK VOOR:
  //printer:   Anet
  //materiaal: BRICK
  //style:     normal, fine
  //TEST NIET OK VOOR:
//  style:     extrafine

  this.name = "Hanger";
  this.rows = rows;
  this.stitches = stitches;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.grid = new Grid(100,100, 6,6,2); // 6X6
  this.grid.draw();
  this.grid.testPos(5,5); //row, stitches
  this.gcode = new Gcode(this.settings);

  this.layers = [];
  for(var i = 0; i < 4; i++){
    this.layers[i] = new Layer(i, this.settings);

  }

  this.skirt = new Skirt(this.grid, 25,2);
  this.skirt.draw();
  this.skirt.gcode(this.gcode, this.layers[0]);
  this.wall = [];
  this.knittings = [];
  var i;
  for(i = 0; i < 4; i++){

    this.knittings[i] = new Knitting(this.grid, this.layers[i], "straight", 4,20, rows, stitches, false);
    this.knittings[i].gcode(this.gcode, this.layers[i]);
  }
  this.gcode.generate(this.layers,this.skirt, this.knittings);
  noLoop();
}
Hanger.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
  this.isSaved = true;
}
