function Grid(cellwidth, cellheight, wstitchpercell, hstitchpercell, marge){
  //voorbeeld 50 x 50, 2x2 = 4 steken per cm2
  this.wstitchpercell = wstitchpercell;
  this.hstitchpercell = hstitchpercell;

  this.cellwidth = cellwidth / wstitchpercell;
  this.cellheight = cellheight/ hstitchpercell;

  this.wmax = width / this.cellwidth;
  this.hmax = height / this.cellheight;

  this.marge = marge;
  this.start = createVector(0,0);

  this.grid = [];
}

Grid.prototype.draw = function(){

  //forbidden area
  stroke(0);
  fill(200);
  strokeWeight(1);
  rect(0,0, (this.wmax * this.cellwidth)-1,(this.hmax * this.cellheight)-1);
  fill(255);
  rect(this.cellwidth * this.marge, this.cellheight* this.marge, (this.wmax * this.cellwidth)-(2* this.marge * this.cellwidth),  (this.hmax * this.cellheight) - (2* this.marge *this.cellheight));

  noFill();
  strokeWeight(0.1);
  for(r = 0; r<= this.hmax; r++){
    this.grid[r] = [];
      for(s = 0; s <= this.wmax; s++){
        if(r ==0){
          if(s % this.wstitchpercell == 0){
          //vertical lines
          stroke(0);
          strokeWeight(1);
          line((s*this.cellwidth), 0, (s*this.cellwidth) ,  (this.hmax * this.cellheight));
          }
          else{
            stroke(255,0,0,100);
            strokeWeight(1);
            line((s*this.cellwidth), 0, (s*this.cellwidth) ,  (this.hmax * this.cellheight));
          }
        }
        if(r % 2 == 0 ){
          //even regels
          this.grid[r][s] = createVector(s * this.cellwidth, r * this.cellheight);
          if(s == 0){
          stroke(0);
          strokeWeight(10);
          point(grid.grid[r][s].x, grid.grid[r][s].y);
          point(grid.grid[r][s].x,  grid.grid[r][s].y );
          }
        }
        else {
          this.grid[r][this.wmax -s] = createVector(s * this.cellwidth, r * this.cellheight);
          if(s == this.wmax){
            stroke(0);
            strokeWeight(10);
            point(grid.grid[r][this.wmax -s].x, grid.grid[r][this.wmax -s].y);
          }
        }

     }
    if(r % this.hstitchpercell == 0){
      stroke(0);
      strokeWeight(1);
      line(0,  (r*this.cellheight),  (this.wmax * this.cellwidth) , (r*this.cellheight));
    }
    else{
      stroke(255,0,0,100);
      strokeWeight(1);
      line(0,  (r*this.cellheight),  (this.wmax * this.cellwidth) , (r*this.cellheight));
    }
  }
}
Grid.prototype.first = function(row, stitchnr){
  var pos = createVector(0,0);
  var ok = true;


  if(stitchnr < this.marge || stitchnr > this.wmax - this.marge){
    this.error("Error: stitchnr ("+ stitchnr + ") is in a forbidden region.");
    noLoop();
    ok = false;
  }
  else if(row < this.marge || row > this.hmax - this.marge){
    this.error("Error: row ("+ row + ") is in a forbidden region.");
    noLoop();
    ok = false;
  }

  if(ok){

    pos.x = stitchnr * this.cellwidth;

    pos.y = row * this.cellheight;
    if((row % this.cellheight) == 0 ){
      //van rechts naar links
      pos.x += this.cellwidth;
    }
    stroke(255,0,0);
    strokeWeight(8);
    point(pos.x, pos.y);
  }
  return pos;
}

Grid.prototype.error = function(msg){
  stroke(0);
  fill(255,0,0);
  textSize(30);
  textAlign(CENTER);
  text(msg, width/2, height/2);
}
Grid.prototype.drawKnitGrid = function(row, stitchnr, stitches, rows){
  this.start = this.first(row, stitchnr);
  stroke(0, 0,255);
  strokeWeight(1);
  fill(0,0,255,30);
  rect(this.start.x, this.start.y, stitches * this.cellwidth, rows * this.cellheight);
}
