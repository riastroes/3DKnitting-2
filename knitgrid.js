function Knitgrid(biggrid, row, stitchnr, rows, stitches){
  this.grid = [];
  this.row = row - 1;
  this.krow = this.row*4;
  this.stitchnr = stitchnr;
  this.kstitchnr = stitchnr*4;
  this.rows = rows;
  this.krows = ((this.rows + 1)*4) + 1;
  this.stitches = stitches;
  this.kstitches = (this.stitches*4) + 1 ;
  this.create(biggrid);
}
Knitgrid.prototype.create = function(biggrid){
  for(var r = 0; r <= this.krows ; r++){
    this.grid[r]=[];
    for(var s = 0; s <= this.kstitches ; s++){
      this.grid[r][s] = biggrid.getPos(this.krow + r , this.kstitchnr + s).copy();
    }
  }
}
Knitgrid.prototype.disorderCosWave = function(from, to, force, angle){
  var a=1;
  for(var r = 4+(from * 4); r < 4+(to * 4); r++){
    for(var s = 0; s < this.grid[0].length; s++){
        this.grid[r][s].x += (force  * 4 * cos(a));
     }
     a += angle;
  }
}
Knitgrid.prototype.disorderSinWave = function(from, to, force, angle){
  var a=1;
  for(var r = 4+(from * 4); r < 4+(to * 4); r++){
    for(var s = 0; s < this.grid[0].length; s++){
        this.grid[r][s].y += 4  * force * sin(a);
     }
     a += angle;
  }
}
Knitgrid.prototype.disorderToPoint = function(from){
  var a=0;
  for(r = from; r< this.grid.length; r++){

     for(s = 0; s < floor(this.grid[0].length/2)-1; s++){
        this.grid[r][s].y +=s * a;
     }
     for(s = floor(this.grid[0].length/2)-1; s < this.grid[0].length; s++){
         this.grid[r][s].y += (floor(this.grid[0].length)-s) * a;
      }

     a += 0.15;
  }
}
Knitgrid.prototype.disorderShrinkWidth = function(from,to,force){

  var pos;
  var d;
  var force= force / ((to* 4) - (from * 4));
  var nr= 0;           //next row
  for(r = 4 + (from*4); r<  4 + (to*4); r++){
     if(r > 0 && r < this.grid.length){
       for(s = 0; s < this.grid[0].length; s++){
         pos = this.grid[r][floor(this.grid[r].length/2)+1].copy();

         d = p5.Vector.sub(pos,this.grid[r][s]);
         d.mult(nr* force);
         this.grid[r][s].x  += d.x ;
       }

       if(r > (from*4) + ((to*4)-(from*4))/2){
         nr-=1;
       }
       else{
         nr+=1;
       }
     }
  }
}
Knitgrid.prototype.disorderGrowWidth = function(from,to, force){

  var pos;
  var d;
  var force= -force / ((to* 4) - (from * 4));
  var nr= 0;           //next row
  for(r = 4 + (from*4); r<  4 + (to*4); r++){
     if(r > 0 && r < this.grid.length){
       for(s = 0; s < this.grid[0].length; s++){
         pos = this.grid[r][floor(this.grid[r].length/2)+1].copy();

         d = p5.Vector.sub(pos,this.grid[r][s]);
         d.mult(nr* force);
         this.grid[r][s].x  += d.x ;
       }

       if(r > (from*4) + ((to*4)-(from*4))/2){
         nr-=1;
       }
       else{
         nr+=1;
       }
     }
  }
}
Knitgrid.prototype.disorderGrowHeight = function(from,to, force){

  var pos;
  var d;
  var force= -force / ((to* 4) - (from * 4));
  var nr= 0;           //next row
  for(r = 4 + (from*4); r<  4 + (to*4); r++){
     if(r > 1 && r < this.grid.length){
       for(s = 0; s < this.grid[0].length; s++){
         pos = this.grid[r-1][s].copy();

         d = p5.Vector.sub(pos,this.grid[r][s]);
         d.mult(nr* force);
         this.grid[r][s].y  += d.y ;
       }

       if(r > (from*4) + ((to*4)-(from*4))/2){
         nr-=1;
       }
       else{
         nr+=1;
       }
     }
  }
}
Knitgrid.prototype.draw = function(){
  for(var r = 0; r < this.krows; r++){
    for(var s = 0; s <  this.kstitches; s++){
      stroke(0);
      strokeWeight(1);
      point( this.grid[r][s].x,  this.grid[r][s].y);
    }
  }

  stroke(255, 0,0);
  strokeWeight(10);
  point( this.grid[0][4].x,  this.grid[0][4].y); //BEGIN POSITIE CORRECTIE
  stroke(0, 0,255);
  strokeWeight(1);
  fill(0,0,255,10);
  quad(  this.grid[0][0].x,  this.grid[0][0].y,
         this.grid[0][ this.kstitches-1].x,  this.grid[0][ this.kstitches-1].y,
         this.grid[ this.krows-1][ this.kstitches-1].x,  this.grid[ this.krows-1][ this.kstitches-1].y,
         this.grid[ this.krows-1][0].x,  this.grid[ this.krows-1][0].y);

}
