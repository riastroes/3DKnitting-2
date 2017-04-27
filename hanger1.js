//meerderen en minderen

function Hanger1(printer, material,style, pos,  stitches, rows){


  this.name = "Hanger1";
  this.rows = 33;
  this.stitches = 6;
  this.isSaved = false;
  this.settings =new Settings(printer, material, style);
  this.grid = new Grid(50,50,2,2,3); // 6X6
  this.grid.draw();
  //this.grid.testPos(pos.x,pos.y); //row, stitches

  this.knitgrid = new Knitgrid(this.grid,pos.x,pos.y,this.stitches, this.rows );
  //this.knitgrid.disorderHeight(1,25,-20,6);
  this.knitgrid.disorderCosWave(10,33,3, TWO_PI/this.stitches)
  //this.knitgrid.disorderSinWave(1,10,5, PI/30)
this.knitgrid.disorderGrowWidth(15,28,2, PI/60);
  this.knitgrid.disorderToPoint(25,33,2);

//  this.knitgrid.disorderShrinkWidth(10,15,1);
  //this.knitgrid.disorderGrowWidth(12,18,0.5);
  this.knitgrid.draw();

  this.gcode = new Gcode(this.settings);
  this.layers = [];
  this.knittings = [];
// layer 0
  for(var i = 0; i < 3; i++){
    this.layers[i] = new Layer(i, this.settings);
    if(i == 0){
        this.skirt = new Skirt(this.grid, 3,20, pos, 10);
        this.skirt.draw();
        this.skirt.gcode(this.gcode, this.layers[0]);
      }

    this.knittings[i] = new Knitting(this.grid, this.knitgrid, this.layers[i],0,0,this.stitches);
    this.knittings[i].createPattern("setup", 0,1);
    this.knittings[i].createPattern("straight", 1,25);
    this.knittings[i].createPattern("less", 25,28);
    this.knittings[i].createPattern("straight", 28,this.rows);
    this.knittings[i].createPattern("end",this.rows,this.rows+1);

    this.knittings[i].patternToGrid();
    this.knittings[i].gotoStart(pos);
    this.knittings[i].drawPattern();
    this.knittings[i].gcode(this.gcode, this.layers[i]);
  }
// layer 1


  this.gcode.generate(this.layers,this.skirt, this.knittings);
  noLoop();
}
Hanger1.prototype.save = function(){
  this.gcode.save(this.name + this.settings.materialcode + this.settings.style + this.rows + "x"+ this.stitches);
  this.isSaved = true;
}
