//meerderen en minderen

function Hanger(printer, material,style, pos,  rows, stitches){


  this.name = "Hanger";
  this.rows =45;
  this.stitches = 20;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.grid = new Grid(50,50, 4,4,3); // 6X6
  this.grid.draw();
  this.grid.testPos(pos.x,pos.y); //row, stitches

  this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y,this.rows, this.stitches);
  
  this.knitgrid.draw();

  this.gcode = new Gcode(this.settings);
  this.layers = [];
  this.knittings = [];
  for(var i = 0; i < 2; i++){
    this.layers[i] = new Layer(i, this.settings);
    if(i == 0){
      this.skirt = new Skirt(this.grid, 25,3);
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
Hanger.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
  this.isSaved = true;
}
