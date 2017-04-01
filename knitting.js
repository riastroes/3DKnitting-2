function Knitting(layer, patternname,row, stitchnr, rows, stitches, show){
  this.commands = new Array(";knitting");
  this.layer = layer;

  this.knitgrid = grid.getKnitGrid(row, stitchnr, rows, stitches);
  //grid.disorderWidth(this.knitgrid);
  if(show){
    grid.drawKnitGrid(this.knitgrid,row, stitchnr);
  }

  this.createPattern(this.layer,this.knitgrid,"straight");
  //this.testPattern(this.layer, this.knitgrid, "ABBBBCLLLLLKRRRRRSLLLLLKRRRRRSLLLLLKRRRRRSLLLLLKRRRRRSUVVVVW");
  this.drawPattern(this.layer);
//  this.gcode(this.layer);

          //this.createPattern(layer,knitgrid, patternname);
          // this.patternname = patternname;
          //
          // if(patternname == "new"){
          //   this.pattern = new Pattern(this.layer, this.patternname, this.grid);
          //   this.createPattern();
          // }
          // else{
          //   this.pattern = "";
          // }

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


  // pos.x += stitch[i-1].x * w;
  // pos.y += stitch[i-1].y * h;
  // pos.z = stitch[i-1].z;
  // return pos;
}
Knitting.prototype.testPattern = function(layer, knitgrid, strpattern){
    this.patternToGrid(layer, knitgrid, strpattern);
}
Knitting.prototype.createPattern = function(layer,knitgrid, patternname){
  var strpattern = "";
  var pos = knitgrid[0][0];
  rows = (knitgrid.length/4);
  stitches = (knitgrid[0].length/4) - 1;

  if(pos.x % 8 == 0){
    if(patternname == "straight"){

        rows = knitgrid.length/4;
        stitches = (knitgrid[0].length/4) - 1;
        for(var r = 0; r < rows; r+=1){
          if(r == 0 ){
            var E = "E";
            strpattern = strpattern.concat("D",E.repeat(stitches-2),"F");
          }
          else if(r > 0 && r < rows -2){
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
          else if(r == rows-2){
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
      println(strpattern);
      println(strpattern.length);
    }
  else{
    if(patternname == "straight"){
        //ONEVEN
        rows = (knitgrid.length/4 )-1;
        stitches = (knitgrid[0].length/4) - 1;
        for(var r = 0; r < rows-2; r+=1){
          if(r == 0 ){
              var B = "B";
            strpattern = strpattern.concat("A",B.repeat(stitches-2),"C");
          }
          else if(r > 0 && r < floor(rows -2)){
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
          else if(r == floor(rows-2)){
            if(r % 2 == rows){
              var Y = "Y";
              strpattern = strpattern.concat("X",Y.repeat(stitches-2),"Z");
            }
            else{
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
      //if(r == knitgrid.length - 5 ){r += 4;}
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
    append(layer.p, grid.getPos(100,0));

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
Knitting.prototype.generateGcode = function(layer){

  //for(var i = 0; i < this.layers.length; i++){
    this.commands = concat(this.commands, layer.commands);
    //this.commands = concat(this.commands, this.pattern.commands);
    this.gcode(layer);
  //}
}
Knitting.prototype.gcode = function(layer){


  if(layer.layer > 0){
    //append(this.commands, "G4 P20000");
    layer.layerheight = settings.layerheight + 0.1;
  }
  var lz = ((layer.layer+1) * layer.layerheight);
  append(this.commands, "G0 F" + layer.speed);
  append(this.commands, "G0 Z" + lz);
  append(this.commands, "G0 X" + layer.p[0].x * layer.scale + " Y" + layer.p[0].y * layer.scale  );

  for(var i = 1; i < layer.p.length; i++){
    var x = layer.p[i].x * layer.scale;
    x = floor(x * 100)/100;
    var y = layer.p[i].y * layer.scale;
    y = floor(y * 100)/100;
    var z = layer.p[i].z;

    var dvector = p5.Vector.sub(layer.p[i], layer.p[i-1]);
    var d = dvector.mag()* layer.scale;


    var kz = ((layer.layer+1) * layer.layerheight) * z;
    if(z == 0){
      append(this.commands, "G0 X" + x + " Y" + y );
    }
    else if(kz != lz){
      gcode.extrude += (d * layer.thickness);
      append(this.commands, "G1 X" + x + " Y" + y + " Z" + kz + " E" + gcode.extrude );
    }
    else if(kz == lz){
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
