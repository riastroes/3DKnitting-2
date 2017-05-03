function FreeForm1(printer, material,style, pos,  rows, stitches){


  this.name = "HalfFreeForm1";
  this.rows = 16;
  this.stitches = 5;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.grid = new Grid(50,50,3,3,3); // 6X6
  //this.grid.draw();
  //this.grid.testPos(pos.x,pos.y); //row, stitches
//  this.grid.createFreeFormGrid();
  //this.grid.drawFreeFormGrid((this.stitches*4)+1,this.rows*4, false);

  var a = createVector(50,50);
  var b = createVector(50, 350);
  var c = createVector(250, 300);
  var d = createVector(250, 500);

  this.grid.createBetweenTwoLines(this.stitches, this.rows,a,b,c,d,true);



  this.gcode = new Gcode(this.settings);
  this.layers = [];
  this.knittings = [];

  var i = 0
  this.layers[i] = new Layer(i, this.settings);

  //this.skirt = new Skirt(this.grid, 3,10, pos, 10);
  //this.skirt.draw();
  //this.skirt.gcode(this.gcode, this.layers[0]);

  this.knittings[i] = new Knitting(this.grid, this.grid, this.layers[i],0,0,this.stitches);
//  this.knittings[i].createPattern("setup", 0,1);
  this.knittings[i].createPattern("straight", 0,this.rows);
//  this.knittings[i].createPattern("end",this.rows-1,this.rows);
  //
  this.knittings[i].patternToGrid();
  this.knittings[i].drawPattern();
  this.knittings[i].gcode(this.gcode, this.layers[i]);




  this.gcode.generate(this.layers,this.skirt, this.knittings);
  noLoop();
}
FreeForm1.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
  this.isSaved = true;
}
