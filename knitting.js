function Knitting(biggrid, knitgrid, layer, patternname){
  this.commands = new Array(";knitting");
  this.biggrid = biggrid;
  this.grid = knitgrid.grid;
  this.layer = layer;
  this.row = knitgrid.row;
  this.rows =  knitgrid.rows;
  this.stitches =  knitgrid.stitches;
  this.stitchnr =  knitgrid.stitchnr;


   if(patternname != "wall"){
    this.createPattern("straight");
    //this.testPattern(this.layer, this.knitgrid, "ABBBBCLLLLLKRRRRRSLLLLLKRRRRRSLLLLLKRRRRRSLLLLLKRRRRRSUVVVVW");
    this.drawPattern();
  }
  if(patternname == "wall"){
    this.createWall();
  }


}
Knitting.prototype.createWall = function(){
  var wall = [];
  var w = this.grid[0].length;
  var h = this.grid.length;
  
  this.test(this.grid[4][1]);
  this.test(this.grid[h-2][1]);
  this.test(this.grid[h-2][w-3]);
  this.test(this.grid[4][w-3]);

  //append(wall, this.knitgrid[4][11]);
  //append(wall, this.knitgrid[4][8]);
  var pos = [];
  pos[0] = this.grid[4][1].copy();
  pos[1] = this.grid[h-2][1].copy();
  pos[2] = this.grid[h-2][w-3].copy();
  pos[3] = this.grid[4][w-3].copy();
  pos[4] = this.grid[4][w-3].copy();
  pos[4].x -= 3;
  pos[5] = this.grid[h-2][w-3].copy();
  pos[5].x -= 3;
  pos[5].y += 3;
  pos[6] = this.grid[h-2][1].copy();
  pos[6].x += 3;
  pos[6].y -= 3;
  pos[7] = this.grid[4][1].copy();
  pos[7].x += 3;

  for(var i = 0; i < 8; i++){
    pos[i].z = 1;
    append(this.layer.p , pos[i]);
  }


}
Knitting.prototype.createStitch = function(type, r, s){
  var stitch = new Stitch(type).stitch;
  var i
  var kr, ks, kz;
  var last;
  for(i = 0; i < stitch.length; i++){
    var ok = true
    //test on the knitgrid;
    kr = (r*4) + stitch[i].y;
    ks = (s*4) + stitch[i].x ;
    kz = stitch[i].z;
    if(kr < 0 || kr >= this.grid.length){
      ok = false;
    }
    if(ks < 0 || ks >= this.grid[0].length){
      ok = false;
    }
    if(ok ){
      append(this.layer.p, createVector(this.grid[kr][ks].x,
                                 this.grid[kr][ks].y,
                                 kz).copy());
    }
  }
}
Knitting.prototype.testPattern = function(strpattern){
    this.patternToGrid(strpattern);
}
Knitting.prototype.createPattern = function(patternname){
  var strpattern = "";
  var pos = this.grid[0][0];
  //rows = (this.grid.length-1)/4;
  //stitches = (this.grid[0].length - 5)/4;
  if(patternname == "straight"){
    if(pos.x % 8 == 0){
          //EVEN START

          for(var r = 0; r <= this.rows; r+=1){
            if(r == 0 ){
              var E = "E";
              strpattern = strpattern.concat("D",E.repeat(this.stitches-2),"F");
            }
            else if(r > 0 && r <= this.rows-1){
              if(r % 2 == 1){
                //oneven
                var L = "L";
                strpattern = strpattern.concat(L.repeat(this.stitches-1),"K");
              }
              else {
                //even
                var R = "R";
                strpattern = strpattern.concat(R.repeat(this.stitches-1),"S");
              }
            }
            else if(r ==this.rows){
              if(r % 2 == 0){
                //even
                var Y = "Y";
                strpattern = strpattern.concat("X",Y.repeat(this.stitches-2),"Z");
              }
              else {
              var V = "V";
              strpattern = strpattern.concat("U",V.repeat(this.stitches-2),"W");
              }
            }
          }
    }
    else{
          //ONEVEN START
          for(var r = 0; r <= this.rows; r+=1){
            if(r == 0 ){
                var B = "B";
                strpattern = strpattern.concat("A",B.repeat(this.stitches-2),"C");
              }
            else if(r > 0 && r <= this.rows-1){
              if(r % 2 == 0){
                  //even
                  var R = "R";
                  strpattern = strpattern.concat(R.repeat(this.stitches-1),"S");
                }
                else {
                  //oneven
                  var L = "L";
                  strpattern = strpattern.concat(L.repeat(this.stitches-1),"K");
                }
            }
            else if(r == this.rows){
              if(r % 2 == 0){
                //EVEN
                var Y = "Y";
                strpattern = strpattern.concat("X",Y.repeat(this.stitches-2),"Z");
              }
              else{
                //ONEVEN
                var V = "V";
                strpattern = strpattern.concat("U",V.repeat(this.stitches-2),"W");
              }
            }

          }
        }

  }
  println(strpattern);
  println(strpattern.length);
  this.patternToGrid(strpattern);
}
Knitting.prototype.patternToGrid = function(strpattern ){
  var pos = this.grid[0][0];
  var r, s;
  var type;

    for(var i = 0; i < strpattern.length; i++){
      if(i < strpattern.length){
        type = strpattern.substring(i,i+1);
      }

      r = floor(i / this.stitches);
      s = i % this.stitches;
      var maxs =  this.stitches ;
      println(r + ','+ s + "," + maxs);
      if(pos.x % 2 == 0 ){
        if(r % 2 == 0 ){
          //even
          this.createStitch(type,r, s);
        }
        else{
          this.createStitch(type,r, maxs - s);
        }
      }
      else{
        if(r % 2 == 0 ){
          //even
          this.createStitch(type,r, s);
        }
        else{
          this.createStitch(type,r, maxs - s);
        }
      }
    }

  this.transportToStart();

}
Knitting.prototype.transportToStart = function(){

      this.biggrid.testPos(this.biggrid.hmax-this.biggrid.marge  ,this.stitchnr  );
      this.biggrid.testPos(this.biggrid.hmax-this.biggrid.marge  ,this.biggrid.marge);
      this.biggrid.testPos(this.row ,this.biggrid.marge);
      append(this.layer.p, this.biggrid.getPos((this.biggrid.hmax-this.biggrid.marge)*4 , ( this.stitchnr)*4).copy());
      append(this.layer.p, this.biggrid.getPos((this.biggrid.hmax-this.biggrid.marge)*4 , this.biggrid.marge*4).copy());
      append(this.layer.p, this.biggrid.getPos((this.row)*4 , this.biggrid.marge*4).copy());

}
Knitting.prototype.drawPattern = function(){
  for(var i = 1; i < this.layer.p.length; i++){

    if(this.layer.p[i-1].x == this.layer.p[i].x && this.layer.p[i-1].y == this.layer.p[i].y){
      //double
      stroke(255,0,0);
      strokeWeight(5);
      point(this.layer.p[i].x, this.layer.p[i].y);
    }
    else{
      stroke(0);
      strokeWeight(1);
      line(this.layer.p[i-1].x, this.layer.p[i-1].y,this.layer.p[i].x, this.layer.p[i].y);
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
Knitting.prototype.gcode = function(gcode){

  append(this.commands, "G0 F" + this.layer.speed);
  append(this.commands, "G0 Z" + this.layer.totallayerheight);
  append(this.commands, "G0 X" + this.layer.p[0].x * this.layer.scale + " Y" + this.layer.p[0].y * this.layer.scale  );
  // if(layer.layer == 0){
  //   append(this.commands, "G4 P5000" );
  // }
  for(var i = 1; i < this.layer.p.length; i++){


    var x = this.layer.p[i].x * this.layer.scale;
    x = floor(x * 100)/100;
    var y = this.layer.p[i].y * this.layer.scale;
    y = floor(y * 100)/100;
    var z = this.layer.p[i].z;

    var dvector = p5.Vector.sub(this.layer.p[i], this.layer.p[i-1]);
    var d = dvector.mag()* this.layer.scale;


    var kz = this.layer.totallayerheight * z;
    if(z == 0){
      append(this.commands, "G0 X" + x + " Y" + y );
    }
    else{
      gcode.extrude += (d * this.layer.thickness);
      append(this.commands, "G1 X" + x + " Y" + y + " E" + gcode.extrude );
    }
  }
}
Knitting.prototype.draw = function(){
    stroke(0);
    fill(255);
    rect(0,0,width-1, height-1);

      for(var i = 1; i < this.layer.p.length; i++){
        var x =  this.layer.p[i].x;
        var y =  this.layer.p[i].y;
        var z =  this.layer.p[i].z;

        x = floor(x * 100)/100;
        y = floor(y * 100)/100;
        z = floor(z * 100)/100;

        stroke(this.layer.thickness);
        line( this.layer.p[i-1].x,  layer.p[i-1].y,x,y);

    }
}
Knitting.prototype.test = function(pos){
  stroke(0,255,0);
  strokeWeight(5);
  point(pos.x, pos.y);
}
