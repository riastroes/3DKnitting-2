function FreeForm1(printer, material,style, pos,  rows, stitches){


  this.name = "Form";
  this.rows = 30;
  this.stitches = 20;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.grid = new Grid(50,50,3,3,3); // 6X6

  //this.grid.testPos(pos.x,pos.y); //row, stitches
//  this.grid.createFreeFormGrid();
  //this.grid.drawFreeFormGrid((this.stitches*4)+1,this.rows*4, false);

//driehoek
  // var a = createVector(100,100);      //line from a
  // var b = createVector(100,300);    //line to b
  // var c = createVector(300, 300);    //curve from c
  // var d = createVector(200, 300);   //curve to d
  // var e = createVector(300, 300);   //control point
  // var f = createVector(300, 300);   //control point
//figuur 1
// var a = createVector(100,100);      //line from a
// var b = createVector(100,500);    //line to b
// var c = createVector(550, 100);    //curve from c
// var d = createVector(700, 500);   //curve to d
// var e = createVector(450, 200);   //control point
// var f = createVector(550, 500);   //control point
//figuur 2
var a = createVector(700,100);      //line from a
var b = createVector(400,100);    //line to b
var c = createVector(400, 600);    //curve from c
var d = createVector(100, 100);   //curve to d
var e = createVector(450, 300);   //control point
var f = createVector(450, 300);   //control point

//figuur 3
// var a = createVector(100,100);      //line from a
// var b = createVector(100,700);    //line to b
// var c = createVector(400, 100);    //curve from c
// var d = createVector(400, 700);   //curve to d
// var e = createVector(800, 0);   //control point
// var f = createVector(800, 900);   //control point


  this.grid.createBetweenTwoLines(this.stitches, this.rows,a,b,c,d,true);
  //this.grid.createBetweenLineAndCurve(this.stitches, this.rows,a,b,c,e,f,d,true);



  this.gcode = new Gcode(this.settings);
  this.layers = [];
  this.knittings = [];

  var i = 0
  this.layers[i] = new Layer(i, this.settings);

  //this.skirt = new Skirt(this.grid, 3,10, pos, 10);
  //this.skirt.draw();
  //this.skirt.gcode(this.gcode, this.layers[0]);

  this.knittings[i] = new Knitting(this.grid, this.grid, this.layers[i],0,0,this.stitches);
  this.knittings[i].createPattern("setup", 0,1);
  this.knittings[i].createPattern("straight", 0,this.rows-1);
  this.knittings[i].createPattern("end",this.rows-1,this.rows);
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
