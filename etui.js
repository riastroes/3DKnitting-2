function Etui(printer, material,style,  rows, stitches, content){
  //TEST OK VOOR:
  //printer:   Anet
  //materiaal: SATIN
  //style:     normal, fine

  //settings = new Settings("Anet","TPC FLEX","normal");
  //settings = new Settings("Anet","Coper","normal");
  //settings = new Settings("Ultimaker2+", "PLA", "fine");
  //settings = new Settings("Ultimaker2+", "PETGCARBON","normal");
  //settings = new Settings("Anet", "SATIN", "fine");
  //settings = new Settings("Ultimaker2+", "PLABRO", "normal");
  //settings = new Settings("Anet", "SATIN", "normal");
  //settings = new Settings("Ultimaker2+", "PLABRO", "normal");


  this.name = "Etui";
  this.rows = rows;
  this.stitches = stitches;
  this.isSaved = false;
  this.settings = new Settings("Anet", "SATIN", "normal");
  this.grid = new Grid(100,100, 6,6,2); // 6X6
  this.grid.draw();
  this.grid.testPos(5,5); //row, stitches
  this.gcode = new Gcode(this.settings);

  this.maxlayer = ceil(content / this.settings.layerheight) + 4;
  this.layers = [];
  this.for(var i = 0; i < this.maxlayer; i++){
    this.layers[i] = new Layer(i, this.settings);

  }

  this.skirt = new Skirt(grid, 25,2);
  this.skirt.draw();
  this.skirt.gcode(this.gcode,layers[0]);
  this.wall = [];



  this.knittings = [];
  var i;
  for(i = 0; i < 4; i++){

    this.knittings[i] = new Knitting(this.layers[i], "straight", 4,20,rows,stitches, true);
    this.knittings[i].gcode(this.gcode,this.layers[i]);
  }
  for(i = 2; i < this.maxlayer-2; i++){
    this.layers[i].speed = 1800;
    this.knittings[i] = new Knitting(this.layers[i], "wall", 6,6, rows,stitches, true);
    this.knittings[i].gcode(this.gcode,this.layers[i]);
  }

    if(i == this.maxlayer-2){
      append(this.layers[i].commands,"G4 P20000    ; pauze");
    }
  for(i = this.maxlayer-2; i < this.maxlayer; i++){
    this.knittings[i] = new Knitting(this.layers[i], "straight", 6,6,rows,stitches, true);
    this.knittings[i].gcode(this.gcode,this.layers[i]);
  }


this.gcode.generate(this.layers,this.skirt, this.knittings);
noLoop();
}

Etui.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
}
