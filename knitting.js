function Knitting(grid, layer, patternname,row, stitchnr, rows, stitches, show){
  this.commands = new Array(";knitting");
  this.grid = grid;
  this.layer = layer;
  this.row = row;
  this.rows = rows;
  this.stitches = stitches;
  this.stitchnr = stitchnr;


  this.knitgrid = this.grid.createKnitGrid(row, stitchnr, rows, stitches);
  this.grid.disorderShrinkWidth(this.knitgrid, 60, 80, 0.02);
  this.grid.disorderGrowWidth(this.knitgrid, 80,185, 0.05);
  this.grid.disorderToPoint(this.knitgrid, 160);

  if(show){
    this.grid.drawKnitGrid(this.knitgrid,row, stitchnr);
  }
   if(patternname != "wall"){
    this.createPattern(this.layer,this.knitgrid,"straight");
    //this.testPattern(this.layer, this.knitgrid, "ABBBBCLLLLLKRRRRRSLLLLLKRRRRRSLLLLLKRRRRRSLLLLLKRRRRRSUVVVVW");
    this.drawPattern(this.layer);
  }
  if(patternname == "wall"){
    this.createWall();
  }


}
Knitting.prototype.createWall = function(){
  var wall = [];
  var w = this.knitgrid[0].length;
  var h = this.knitgrid.length;
  //this.test(this.knitgrid[4][11]);
  //this.test(this.knitgrid[4][8]);
  this.test(this.knitgrid[4][4]);
  this.test(this.knitgrid[h-2][4]);
  this.test(this.knitgrid[h-2][w-2]);
  this.test(this.knitgrid[4][w-2]);

  //append(wall, this.knitgrid[4][11]);
  //append(wall, this.knitgrid[4][8]);
  var pos = [];
  pos[0] = this.knitgrid[4][4].copy();
  pos[1] = this.knitgrid[h-2][4].copy();
  pos[2] = this.knitgrid[h-2][w-2].copy();
  pos[3] = this.knitgrid[4][w-2].copy();
  pos[4] = this.knitgrid[4][w-2].copy();
  pos[4].x += 3;
  pos[5] = this.knitgrid[h-2][w-2].copy();
  pos[5].x += 3;
  pos[5].y -= 3;
  pos[6] = this.knitgrid[h-2][4].copy();
  pos[6].x -= 3;
  pos[6].y -= 3;
  pos[7] = this.knitgrid[4][4].copy();
  pos[7].x -= 3;

  for(var i = 0; i < 8; i++){
    pos[i].z = 1;
    append(this.layer.p , pos[i]);
  }


}
Knitting.prototype.createStitch = function(layer,type, r, s){
  var stitch = new Stitch(type).stitch;
  var i
  var kr, ks, kz;
  var last;
  for(i = 0; i < stitch.length; i++){
    var ok = true
    //test on the knitgrid;
    kr = (r*4) + stitch[i].y;
    ks = (s*4) + stitch[i].x + 4; //HET BREIWERK MOET 1 HOKJE OPSCHUIVEN
    kz = stitch[i].z;
    if(kr < 0 || kr >= this.knitgrid.length){
      ok = false;
    }
    if(ks < 0 || ks >= this.knitgrid[0].length){
      ok = false;
    }
    if(ok ){
      append(layer.p, createVector(this.knitgrid[kr][ks].x,
                                 this.knitgrid[kr][ks].y,
                                 kz).copy());
    }
  }
}
Knitting.prototype.testPattern = function(layer, knitgrid, strpattern){
    this.patternToGrid(layer, knitgrid, strpattern);
}
Knitting.prototype.createPattern = function(layer,knitgrid, patternname){
  var strpattern = "";
  var pos = knitgrid[0][0];
  rows = (knitgrid.length-1)/4;
  stitches = (knitgrid[0].length - 5)/4;
  if(patternname == "straight"){
    if(pos.x % 8 == 0){
          //EVEN START

          for(var r = 0; r < rows; r+=1){
            if(r == 0 ){
              var E = "E";
              strpattern = strpattern.concat("D",E.repeat(stitches-2),"F");
            }
            else if(r > 0 && r < rows-1){
              if(r % 2 == 1){
                //oneven
                var L = "L";
                strpattern = strpattern.concat(L.repeat(stitches-1),"K");
              }
              else {
                //even
                var R = "R";
                strpattern = strpattern.concat(R.repeat(stitches-1),"S");
              }
            }
            else if(r == rows-1){
              if(r % 2 == 0){
                //even
                var Y = "Y";
                strpattern = strpattern.concat("X",Y.repeat(stitches-2),"Z");
              }
              else {
              var V = "V";
              strpattern = strpattern.concat("U",V.repeat(stitches-2),"W");
              }
            }
          }
    }
    else{

          //ONEVEN START

          for(var r = 0; r < rows; r+=1){
            if(r == 0 ){
                var B = "B";
                strpattern = strpattern.concat("A",B.repeat(stitches-2),"C");
              }
            else if(r > 0 && r < rows-1){
              if(r % 2 == 0){
                  //even
                  var R = "R";
                  strpattern = strpattern.concat(R.repeat(stitches-1),"S");
                }
                else {
                  //oneven
                  var L = "L";
                  strpattern = strpattern.concat(L.repeat(stitches-1),"K");
                }
            }
            else if(r == rows-1){
              if(r % 2 == 0){
                //EVEN
                var Y = "Y";
                strpattern = strpattern.concat("X",Y.repeat(stitches-2),"Z");
              }
              else{
                //ONEVEN
                var V = "V";
                strpattern = strpattern.concat("U",V.repeat(stitches-2),"W");
              }
            }

          }
        }

  }
  println(strpattern);
  println(strpattern.length);
  this.patternToGrid(layer, knitgrid, strpattern);
}
Knitting.prototype.patternToGrid = function(layer, knitgrid, strpattern ){
  var pos = knitgrid[0][0];
  var r, s;
  var type;

    for(var i = 0; i < strpattern.length; i++){
      if(i < strpattern.length){
        type = strpattern.substring(i,i+1);
      }
      r = floor(i / ((knitgrid[0].length-5)/4)); //min 5, want min 1 rij en 1 stip

      s = i % ((knitgrid[0].length-5)/4);
      var maxs =  floor((knitgrid[0].length-5)/4);
      if(pos.x % 2 == 0 ){
        if(r % 2 == 0 ){
          //even
          this.createStitch(layer, type,r, s);
        }
        else{
          this.createStitch(layer, type,r, maxs - s);
        }
      }
      else{
        if(r % 2 == 0 ){
          //even
          this.createStitch(layer, type,r, s);
        }
        else{
          this.createStitch(layer, type,r, maxs - s);
        }
      }
    }

  this.transportToStart(layer);

}
Knitting.prototype.transportToStart = function(layer){

      this.grid.testPos(this.grid.hmax-this.grid.marge  ,this.stitchnr  );
      this.grid.testPos(this.grid.hmax-this.grid.marge  ,this.grid.marge);
      this.grid.testPos(this.row ,this.grid.marge);
      append(layer.p, this.grid.getPos((this.grid.hmax-this.grid.marge)*4 , ( this.stitchnr)*4).copy());
      append(layer.p, this.grid.getPos((this.grid.hmax-this.grid.marge)*4 , this.grid.marge*4).copy());
      append(layer.p, this.grid.getPos((this.row)*5 , this.grid.marge*4).copy());

}
Knitting.prototype.drawPattern = function(layer){
  for(var i = 1; i < layer.p.length; i++){

    if(layer.p[i-1].x == layer.p[i].x && layer.p[i-1].y == layer.p[i].y){
      //double
      stroke(255,0,0);
      strokeWeight(5);
      point(layer.p[i].x, layer.p[i].y);
    }
    else{
      stroke(0);
      strokeWeight(1);
      line(layer.p[i-1].x, layer.p[i-1].y,layer.p[i].x, layer.p[i].y);
    }
  }
}
// Knitting.prototype.createPattern = function(){
//     for(var i = 0; i < this.layers.length; i++){
//       this.layers[i].p = concat(this.layers[i].p, this.pattern.p);
//   }
// }
// Knitting.prototype.generateGcode = function(layer){
//
//   //for(var i = 0; i < this.layers.length; i++){
//     this.commands = concat(this.commands, layer.commands);
//     //this.commands = concat(this.commands, this.pattern.commands);
//     this.gcode(layer);
//   //}
// }
Knitting.prototype.gcode = function(gcode, layer){

  append(this.commands, "G0 F" + layer.speed);
  append(this.commands, "G0 Z" + layer.totallayerheight);
  append(this.commands, "G0 X" + layer.p[0].x * layer.scale + " Y" + layer.p[0].y * layer.scale  );
  // if(layer.layer == 0){
  //   append(this.commands, "G4 P5000" );
  // }
  for(var i = 1; i < layer.p.length; i++){


    var x = layer.p[i].x * layer.scale;
    x = floor(x * 100)/100;
    var y = layer.p[i].y * layer.scale;
    y = floor(y * 100)/100;
    var z = layer.p[i].z;

    var dvector = p5.Vector.sub(layer.p[i], layer.p[i-1]);
    var d = dvector.mag()* layer.scale;


    var kz = layer.totallayerheight * z;
    if(z == 0){
      append(this.commands, "G0 X" + x + " Y" + y );
    }
    else{
      gcode.extrude += (d * layer.thickness);
      append(this.commands, "G1 X" + x + " Y" + y + " E" + gcode.extrude );
    }
  }
}
Knitting.prototype.draw = function(layer){
    stroke(0);
    fill(255);
    rect(0,0,width-1, height-1);

      for(var i = 1; i < layer.p.length; i++){
        var x =  layer.p[i].x;
        var y =  layer.p[i].y;
        var z =  layer.p[i].z;

        x = floor(x * 100)/100;
        y = floor(y * 100)/100;
        z = floor(z * 100)/100;

        stroke(layer.thickness);
        line( layer.p[i-1].x,  layer.p[i-1].y,x,y);

    }
}
Knitting.prototype.test = function(pos){
  stroke(0,255,0);
  strokeWeight(5);
  point(pos.x, pos.y);
}
