function Knitting(biggrid, knitgrid, layer,stitchnr, row, stitches){
  this.commands = new Array(";knitting");
  this.biggrid = biggrid;
  this.grid = knitgrid.grid;
  this.layer = layer;
  this.row = row;
  this.rows =  knitgrid.rows;

  this.last =0;
  this.strpattern = "";

  this.stitches =  stitches;
  this.stitchnr =  stitchnr;
  //this.patternname = patternname;
  this.pos = createVector(0,0);


  //  if(this.patternname != "wall"){
  //   this.createPattern("straight");
  //   //this.testPattern(this.layer, this.knitgrid, "ABBBBCLLLLLKRRRRRSLLLLLKRRRRRSLLLLLKRRRRRSLLLLLKRRRRRSUVVVVW");
  //   this.drawPattern();
  // }
  // if(this.patternname == "wall"){
  //   this.createWall();
  // }



}
Knitting.prototype.createWall = function(){

  var w = this.grid[0].length;
  var h = this.grid.length;

  this.test(this.grid[1][4]);
  this.test(this.grid[1][h-2]);
  this.test(this.grid[w-3][h-2]);
  this.test(this.grid[w-3][4]);


  var pos = [];
  pos[0] = this.grid[1][4].copy();
  pos[1] = this.grid[1][h-2].copy();
  pos[2] = this.grid[w-3][h-2].copy();
  pos[3] = this.grid[w-3][4].copy();
  pos[4] = this.grid[w-3][4].copy();
  pos[4].x -= 3;
  pos[5] = this.grid[w-3][h-2].copy();
  pos[5].x -= 3;
  pos[5].y += 3;
  pos[6] = this.grid[1][h-2].copy();
  pos[6].x += 3;
  pos[6].y -= 3;
  pos[7] = this.grid[1][4].copy();
  pos[7].x += 3;

  for(var i = 0; i < 8; i++){
    pos[i].z = 1;
    append(this.layer.p , pos[i]);
  }
}
// Knitting.prototype.createStitch1 = function(type, r, s){
//   var stitch = new Stitch(type).stitch;
//   var i
//   var kr, ks, kz;
//
//   for(i = 0; i < stitch.length; i++){
//     var ok = true
//     //test on the knitgrid;
//     kr = (r*4) + stitch[i].y;
//     ks = (s*4) + stitch[i].x ;
//     kz = stitch[i].z;
//     if(ks < 0 || ks >= this.grid.length){
//       ok = false;
//     }
//     if(kr < 0 || kr >= this.grid[0].length){
//       ok = false;
//     }
//
//     if(ok ){
//       append(this.layer.p, createVector(this.grid[ks][kr].x,
//                                  this.grid[ks][kr].y,
//                                  kz).copy());
//     }
//   }
// }
Knitting.prototype.createStitch = function(type){
  var stitch = new Stitch(type).stitch;
  var i
  var kr, ks, kz;
  if(this.last == 0){
    this.last = createVector(this.stitchnr * 4,this.row);

  }

  for(i = 0; i < stitch.length; i++){
    var ok = true
    //test on the knitgrid;
    kr = this.last.y + stitch[i].y;
    ks = this.last.x + stitch[i].x;
    kz = stitch[i].z;
    if(ks < 0 || ks >= this.grid.length){
      ok = false;
    }
    if(kr < 0 || kr >= this.grid[0].length){
      ok = false;
    }

    if(ok ){
      append(this.layer.p, createVector(this.grid[ks][kr].x,
                                 this.grid[ks][kr].y,
                                 kz).copy());

    }
  }
  if(ok ){
    this.last = createVector(ks, kr);
  }
}
Knitting.prototype.testPattern = function(){
    this.patternToGrid(this.strpattern);
}
Knitting.prototype.createPattern = function(patternname, from, to){
  var pos = this.grid[0][0];
  if(patternname == "setup"){
    //OPZETTEN
    var B = "B";
    this.strpattern = this.strpattern.concat("A",B.repeat(this.stitches-2),"C");
  }

  if(patternname == "straight"){
      for(var r = from; r < to; r+=1){
        if(r % 2 == 1){
            //oneven
            var L = "L";
            this.strpattern = this.strpattern.concat(L.repeat(this.stitches-1),"K");
          }
          else {
            //oneven
            var R = "R";
            this.strpattern = this.strpattern.concat(R.repeat(this.stitches-1),"S");
          }
      }

  }
  if(patternname == "less"){
    for(var r = from; r < to; r+=1){

        if(r % 2 == 1){
            //onEVEN
            var L = "L";
            this.strpattern = this.strpattern.concat(L.repeat(this.stitches),"/");
          }
          else {
            //EVEN
            var R = "R";
            this.strpattern = this.strpattern.concat(R.repeat(this.stitches),"|");
          }
       this.stitches--;
    }

  }
  if(patternname == "more"){
    for(var r = from; r < to; r+=1){
       this.stitches++;
        if(r % 2 == 0){
            //ONEVEN
            var L = "L";
            this.strpattern = this.strpattern.concat(L.repeat(this.stitches-1),"M");
          }
          else {
            //EVEN
            var R = "R";
            this.strpattern = this.strpattern.concat(R.repeat(this.stitches-1),"T");
          }

    }

  }
  if(patternname == "end"){

      //AFHECHTEN
      if(from % 2 == 0){
        //ONEVEN
        var Y = "Y";
        this.strpattern = this.strpattern.concat("X",Y.repeat(this.stitches-2),"Z");
      }
      else{
        //EVEN
        var V = "V";
        this.strpattern = this.strpattern.concat("U",V.repeat(this.stitches-2),"W");
      }

  }
  println(this.strpattern);
}
Knitting.prototype.patternToGrid = function( ){

  var type;
  for(var i = 0; i < this.strpattern.length; i++){
    type = this.strpattern.substring(i,i+1);
    this.createStitch(type);
  }




}
Knitting.prototype.gotoStart = function(pos, offset){
      var last = this.layer.p.length-1;
      var lastp = this.layer.p[last].copy();
      lastp.y += 100;
      lastp.z =0;
       point(lastp.x + offset.x, lastp.y + offset.y);
       append(this.layer.p, lastp);
       lastp = lastp.copy();
       lastp.x = 10;
       lastp.z =0;
       point(lastp.x + offset.x, lastp.y + offset.y);
       append(this.layer.p, lastp);
       lastp = lastp.copy();
       lastp.y = this.biggrid.grid[pos.x][pos.y].y;
       lastp.z =0;

       point(lastp.x + offset.x, lastp.y + offset.y);
       append(this.layer.p, lastp);
       strokeWeight(10);

       point(this.biggrid.grid[pos.x][pos.y].x  + offset.x,this.biggrid.grid[pos.x][pos.y].y + offset.y);
       append(this.layer.p, createVector(this.biggrid.grid[pos.x][pos.y].x,this.biggrid.grid[pos.x][pos.y].y,0));

}
Knitting.prototype.drawPattern = function(offset){
  for(var i = 1; i < this.layer.p.length; i++){

    if(this.layer.p[i-1].x == this.layer.p[i].x && this.layer.p[i-1].y == this.layer.p[i].y){
      //double
      stroke(255,0,0);
      strokeWeight(5);
      point(this.layer.p[i].x + offset.x, this.layer.p[i].y + offset.y);
    }
    else{
      stroke(0);
      strokeWeight(1);
      line(this.layer.p[i-1].x + offset.x, this.layer.p[i-1].y + offset.y,this.layer.p[i].x + offset.x, this.layer.p[i].y + offset.y);
    }
  }
}

Knitting.prototype.gcode = function(gcode){

  append(this.commands, "G0 F" + this.layer.speed);
  append(this.commands, "G0 Z" + this.layer.totallayerheight);
  append(this.commands, "G0 X" + this.layer.p[0].x * this.layer.scale + " Y" + this.layer.p[0].y * this.layer.scale  );

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

//  append(this.commands, "G0 Z15");

  // if(this.patternname != "wall"){
  //   append(this.commands, "G0 Z15");
  //   append(this.commands, "G0 X" + this.grid[0][0].x + " Y" + this.grid[0][0].y);
  // }


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
