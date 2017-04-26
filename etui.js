function Etui(printer, material,style,  pos){



  this.name = "Etui";
  this.rows = 23;
  this.stitches = 11;
  this.content = 7;
  this.isSaved = false;
  this.settings = new Settings(printer, material, style);
  this.grid = new Grid(100,100, 4,4,2); // 6X6
  this.grid.draw();
  this.grid.testPos(pos.x, pos.y); //row, stitches
  this.gcode = new Gcode(this.settings);



  this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y,this.rows, this.stitches);
  this.knitgrid.draw();

  this.maxlayer = ceil(this.content / this.settings.layerheight) + 4;
  this.layers = [];
  for(var i = 0; i < this.maxlayer; i++){
    this.layers[i] = new Layer(i, this.settings);

  }




  this.knittings = [];
  this.wall = [];
  var i;
  for(i = 0; i < 3; i++){
    if(i == 0){
      this.skirt = new Skirt(this.grid, 3,7, pos);
      this.skirt.draw();
      this.skirt.gcode(this.gcode,this.layers[i]);
    }
    this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i], "straight");
    this.knittings[i].gcode(this.gcode,this.layers[i]);
  }
  for(i = 3; i < this.maxlayer-2; i++){
    this.layers[i].speed = 1800;
    this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i], "wall");
    this.knittings[i].gcode(this.gcode,this.layers[i]);
  }

    if(i == this.maxlayer-2){
      append(this.layers[i].commands,"G4 P20000    ; pauze");
    }
  for(i = this.maxlayer-2; i < this.maxlayer; i++){
    this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i], "straight");
    this.knittings[i].gcode(this.gcode,this.layers[i]);
  }


this.gcode.generate(this.layers,this.skirt, this.knittings);
noLoop();
}

Etui.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
}
