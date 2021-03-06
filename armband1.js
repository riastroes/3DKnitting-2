function Armband1(printer, material,style, ppos,  pstitches, prows, showgrid){
  //TEST OK VOOR:
  //printer:   Anet
  //materiaal: BRICK
  //style:     normal, fine
  //TEST NIET OK VOOR:
//  style:     extrafine

  this.name = "Armband1";
  this.rows = prows;
  this.stitches = pstitches;
  this.pos = ppos;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.gcode = new Gcode(this.settings);
  this.grid = new Grid(50,50,2,2,3); // 6X6
  this.grid.createGrid();
  if(showgrid){
    this.grid.draw();
  }
  this.grid.testPos(pos.x,pos.y); //row, stitches
  this.layers = [];
  this.maxlayers= 3;
  for(var i = 0; i < this.maxlayers; i++){
    this.layers[i] = new Layer(i, this.settings);
  }
  this.skirt = new Skirt(this.grid, 2,30, this.pos, 5);
  this.skirt.draw(offset);
  this.skirt.gcode(this.gcode, this.layers[0]);

}
Armband1.prototype.create = function(showgrid){
  this.knittings = [];
  for(var i = 0; i < this.maxlayers; i++){

    if(i == 0){                   //biggrid, stitchnr,row, stitches,rows
      this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y,this.stitches,this.rows);
      this.knitgrid.disorderCosWave(1,this.rows,2, -TWO_PI/70);
      if(showgrid){
        this.knitgrid.draw(offset);
      }
    //this.knitgrid.disorderCosWave(32,43,2, TWO_PI/70);
      //this.knitgrid.disorderShrinkWidth(11,37, 0.7)
      //this.knitgrid.disorderSinWave(41,51, 2, 0.4);
      //this.knitgrid.disorderSinWave(53,60, 2, 0.4);
      //this.knitgrid.disorderGrowWidth(4,35,3);
      //this.knitgrid.disorderHeight(0,100, 20, 50);
      //this.knitgrid.disorderHeight(0,100, 20, 34);
      //this.knitgrid.disorderHeight(0,100, -20, 14);
    }

    this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i],0,0,this.stitches);
    this.knittings[i].createPattern("setup", 0,1);
    this.knittings[i].createPattern("straight", 1,this.rows);
    this.knittings[i].createPattern("end",this.rows,this.rows);

    this.knittings[i].patternToGrid();

    this.knittings[i].gotoStart(this.pos, offset);
    this.knittings[i].drawPattern(offset);
    this.knittings[i].gcode(this.gcode, this.layers[i]);

  //
  }


}
Armband1.prototype.save = function(){
  this.gcode.generate(this.layers,this.skirt, this.knittings);
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
  this.isSaved = true;
}
