function Grid(cellwidth, cellheight, wstitchpercell, hstitchpercell, marge){
  //voorbeeld 50 x 50, 2x2 = 4 steken per cm2
  this.wstitchpercell = wstitchpercell;
  this.hstitchpercell = hstitchpercell;

  this.cellwidth = cellwidth / wstitchpercell;
  this.cellheight = cellheight/ hstitchpercell;

  this.wmax = floor(width / this.cellwidth);
  this.hmax = floor(height / this.cellheight);

  this.marge = marge;

  this.grid = [];

  this.createGrid();
  println(this.cellwidth, this.cellheight);
}
Grid.prototype.createGrid = function(){

  for(r = 0; r<= this.hmax; r++){
    this.grid[r] = [];
      for(s = 0; s <= this.wmax; s++){
          this.grid[r][s] = createVector(s * this.cellwidth, r * this.cellheight);
     }
  }
}
Grid.prototype.disorderWidth = function(knitgrid){
  var a = 0;
  for(r = 0; r< knitgrid.length; r++){

    for(s = 0; s < knitgrid[0].length; s++){

        knitgrid[r][s].x += 40 * sin(a);

     }
     a += 0.2;
  }
}
Grid.prototype.disorderSinWave = function(knitgrid){
  var a=0;
  for(r = 0; r< knitgrid.length; r++){

    for(s = 0; s < knitgrid[0].length; s++){

        knitgrid[r][s].x +=20 * cos(a);

     }
     a += 0.2;
  }
}
Grid.prototype.disorderToPoint = function(knitgrid, from){
  var a=0;
  for(r = from; r< knitgrid.length; r++){

     for(s = 0; s < floor(knitgrid[0].length/2)-1; s++){
        knitgrid[r][s].y +=s * a;
     }
     for(s = floor(knitgrid[0].length/2)-1; s < knitgrid[0].length; s++){
         knitgrid[r][s].y += (floor(knitgrid[0].length)-s) * a;
      }

     a += 0.025;
  }
}
Grid.prototype.disorderShrinkWidth = function(knitgrid, from,to,force){

  var pos;
  var d;
  var force=force;
  var nr= 0;  // next row
  for(r = from; r< to; r++){

     for(s = 0; s < knitgrid[0].length; s++){
       pos = knitgrid[r][floor(knitgrid[r].length/2)+1].copy();

       d = p5.Vector.sub(pos,knitgrid[r][s]);
       d.mult(nr* force);
       knitgrid[r][s].x  += d.x ;
     }

     if(r > from + ((to-from)/2)){
       nr-=1;
     }
     else{
       nr+=1;
     }

  }
}
Grid.prototype.disorderGrowWidth = function(knitgrid, from,to, force){

  var pos;
  var d;
  var force= -force;
  var nr= 0;           //next row
  for(r = from; r< to; r++){

     for(s = 0; s < knitgrid[0].length; s++){
       pos = knitgrid[r][floor(knitgrid[r].length/2)+1].copy();
      
       d = p5.Vector.sub(pos,knitgrid[r][s]);
       d.mult(nr* force);
       knitgrid[r][s].x  += d.x ;
     }

     if(r > from + ((to-from)/2)){
       nr-=1;
     }
     else{
       nr+=1;
     }

  }
}
Grid.prototype.createKnitGrid = function(row, stitchnr, rows, stitches){
//1 extra rij voor opzetten
/*formule afmeting breiwerk:
hoogte = rows * celhoogte + (celhoogte*5), waarbij celhoogte is 4
breedte = stitches * celbreedte + (celbreedte*4), waarbij celbreedte is 4


//1 extra voor stitches want je moet ook de buitenste positie hebben. voor de afmeting
//van het breiwerk.
//HET BREIWERK MOET 1 HOKJE OPSCHUIVEN
*/
  var knitgrid = [];
  for(var r = 0; r < ((rows+1) * 4)+1; r++){
    knitgrid[r]=[];
    for(var s = 0; s < ((stitches+1) * 4)+1 ; s++){
      knitgrid[r][s] = this.getPos((row*4) + r , (stitchnr*4) + s  - 4).copy();
    }
  }
  return knitgrid;
}
Grid.prototype.draw = function(){

  //forbidden area
  stroke(0);
  fill(200);
  strokeWeight(1);
  rect(0,0, (this.wmax * this.cellwidth)-1,(this.hmax * this.cellheight)-1);
  fill(255);
  rect(this.cellwidth * this.marge, this.cellheight* this.marge, (this.wmax * this.cellwidth)-(2* this.marge * this.cellwidth),  (this.hmax * this.cellheight) - (2* this.marge *this.cellheight));

  //vertical lines
  for(var s = 0; s <= this.wmax; s++){
      if(s % this.wstitchpercell == 0){
      //black vertical lines
        stroke(0);
        strokeWeight(1);
        //line((s*this.cellwidth), 0, (s*this.cellwidth) ,  (this.hmax * this.cellheight));
      }
      else{
        //red vertical lines
        stroke(255,0,0,100);
        strokeWeight(1);
      }
      line(this.grid[0][s].x, this.grid[0][s].y, this.grid[this.hmax][s].x, this.grid[this.hmax][s].y);
  }

  for(r = 0; r<= this.hmax; r++){
        if(r % 2 == 0 ){
          //even regels
          stroke(0);
          strokeWeight(3);
          point(grid.grid[r][0].x, grid.grid[r][0].y);
        }
        else {
            stroke(0);
            strokeWeight(3);
            point(grid.grid[r][this.wmax].x, grid.grid[r][this.wmax].y);
        }

    if(r % this.hstitchpercell == 0){
      stroke(0);
      strokeWeight(1);
        }
    else{
      stroke(255,0,0,100);
      strokeWeight(1);
        }
    line(this.grid[r][0].x, this.grid[r][0].y , this.grid[r][this.wmax].x, this.grid[r][this.wmax].y );
  }
}
Grid.prototype.testPos = function(x, y, z){
  stroke(255,0,0);
  strokeWeight(10);
  point(this.grid[x][y].x, this.grid[x][y].y);
  println(this.grid[x][y].x +","+ this.grid[x][y].y);
}
Grid.prototype.getPos = function(row, stitchnr){
  var pos = createVector(0,0,0);
  pos.x = stitchnr * (this.cellwidth/4);
  pos.y = row * (this.cellheight/4);
  pos.z = 0;
  return pos;
}
Grid.prototype.error = function(msg){
  stroke(0);
  fill(255,0,0);
  textSize(30);
  textAlign(CENTER);
  text(msg, width/2, height/2);
}

Grid.prototype.first = function(row, stitchnr){
  var pos = createVector(0,0);
  var ok = true;


  if(stitchnr < this.marge || stitchnr > this.wmax - this.marge){
    this.error("Error Grid: stitchnr ("+ stitchnr + ") is in a forbidden region.");
    noLoop();
    ok = false;
  }
  else if(row < this.marge || row > this.hmax - this.marge){
    this.error("Error Grid: row ("+ row + ") is in a forbidden region.");
    noLoop();
    ok = false;
  }

  if(ok){

    if(this.knitgrid.length > 0){
      stroke(255,0,0);
      strokeWeight(8);
      point(this.knitgrid[0][0].x, this.knitgrid[0][0].y);
    }
  }
  return pos;
}
Grid.prototype.drawKnitGrid = function(knitgrid, row, stitchnr){

  var rows = knitgrid.length;
  var stitches = knitgrid[0].length;

  for(var r = 0; r < rows; r++){
    for(var s = 0; s < stitches; s++){
      stroke(0);
      strokeWeight(1);
      point(knitgrid[r][s].x, knitgrid[r][s].y);
    }
  }

  stroke(255, 0,0);
  strokeWeight(10);
  point(knitgrid[0][4].x, knitgrid[0][4].y); //BEGIN POSITIE CORRECTIE
  stroke(0, 0,255);
  strokeWeight(1);
  fill(0,0,255,10);
  quad( knitgrid[0][0].x, knitgrid[0][0].y,
        knitgrid[0][stitches-1].x, knitgrid[0][stitches-1].y,
        knitgrid[rows-1][stitches-1].x, knitgrid[rows-1][stitches-1].y,
        knitgrid[rows-1][0].x, knitgrid[rows-1][0].y);

}
