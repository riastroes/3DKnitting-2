//meerderen en minderen

function Hanger2(printer, material,style, pos,  rows, stitches){


  this.name = "Hanger2";
  this.rows = 34;
  this.stitches =20;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.grid = new Grid(50,50,2,2,3); // 6X6
  //this.grid.draw();
  //this.grid.testPos(pos.x,pos.y); //row, stitches

  this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y,this.stitches,this.rows);
  this.knitgrid.disorderShrinkWidth(9,22,1);
  this.knitgrid.disorderToPoint(22,34,5);

  this.knitgrid.disorderShrinkWidth(9,22,1);
  this.knitgrid.draw();

  this.gcode = new Gcode(this.settings);
  this.layers = [];
  this.knittings = [];
  for(var i = 0; i < 3; i++){
    this.layers[i] = new Layer(i, this.settings);


  if(i == 0){
      this.skirt = new Skirt(this.grid, 3,20, pos, 10);
      this.skirt.draw();
      this.skirt.gcode(this.gcode, this.layers[0]);
    }


  this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i],5,0,10);//stitchnr, row, stitches
  this.knittings[i].createPattern("setup", 0,0);
  this.knittings[i].createPattern("straight", 1,11);
  this.knittings[i].createPattern("more",12, 22);
  this.knittings[i].createPattern("less",23, 34);
//  this.knittings[i].createPattern("end",17,22);

  this.knittings[i].patternToGrid();
  this.knittings[i].gotoStart(pos);
  this.knittings[i].drawPattern();
  this.knittings[i].gcode(this.gcode, this.layers[i]);

}


  this.gcode.generate(this.layers,this.skirt, this.knittings);
  noLoop();
}
Hanger2.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
  this.isSaved = true;
}
