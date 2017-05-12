function Knitgrid(biggrid, stitchnr,row, stitches,rows){
  this.grid = [];
  this.row = row;
  this.krow = this.row*4;
  this.stitchnr = stitchnr;
  this.kstitchnr = stitchnr*4;
  this.rows = rows;
  this.krows = ((this.rows)*4) + 1;
  this.stitches = stitches;
  this.kstitches = (this.stitches*4) + 1 ;
  this.create(biggrid);
}
Knitgrid.prototype.create = function(biggrid){
  this.grid = [];
  for(var s = 0; s <= this.kstitches ; s++){
    this.grid[s]=[];
    for(var r = 0; r <= this.krows ; r++){
      this.grid[s][r] = biggrid.getPos(this.kstitchnr + s, this.krow + r).copy();
    }
  }
}
Knitgrid.prototype.disorderCosWave = function(from, to, force, angle){
  var a=0;

    for(var r = (from * 4); r < (to * 4); r++){
      //var a=0;
      for(var s = 0; s < this.grid.length; s++){
        this.grid[s][r].x += map(cos(a),-1,1, force*4, -force*4);
        a += angle;
     }

  }
}
Knitgrid.prototype.disorderSinWave = function(from, to, force, angle){
   var a=0;

   for(var r = (from * 4); r < (to * 4); r++){
   for(var s = 0; s < this.grid.length; s++){
        this.grid[s][r].y += ceil(force * sin(a))*4;
     }
     a += angle;
  }
}
Knitgrid.prototype.disorderToPoint = function(from, to, force){
  var nr = 0//next row
  for(r = from*4; r<= (to*4) + 1; r++){

    for(s = 0; s < this.grid.length; s++){
        this.grid[s][r].x +=map(s,0, this.grid.length ,force*nr, -force*nr);
    }
    nr++;
  }
}
Knitgrid.prototype.disorderShrinkWidth = function(from,to,force){

  var pos;
  var d;
  var force= -force / ((to* 4) - (from * 4));
  var nr= 0;           //next row

  for(r =(from*4); r<  (to*4); r++){
    for(s = 0; s < this.grid.length; s++){

     if(r > 0 && r < this.grid[s].length){

         pos = this.grid[floor(this.grid.length/2)+1][r].copy();

         d = p5.Vector.sub(pos,this.grid[s][r]);
         d.mult(nr* force);
         this.grid[s][r].x  -= d.x ;
       }


     }
     if(r > (from*4) + ((to*4)-(from*4))/2){
       nr-=1;
     }
     else{
       nr+=1;
     }
  }
}
Knitgrid.prototype.disorderGrowWidth = function(from,to, force){

  var pos;
  var d;
  var force= -force / ((to* 4) - (from * 4));
  var nr= 0;           //next row

  for(r =(from*4); r<  (to*4); r++){
    for(s = 0; s < this.grid.length; s++){

     if(r > 0 && r < this.grid[s].length){

         pos = this.grid[floor(this.grid.length/2)+1][r].copy();

         d = p5.Vector.sub(pos,this.grid[s][r]);
         d.mult(nr* force);
         this.grid[s][r].x  += d.x ;
       }


     }
     if(r > (from*4) + ((to*4)-(from*4))/2){
       nr-=1;
     }
     else{
       nr+=1;
     }
  }
}
Knitgrid.prototype.disorderGrowHeight = function(from,to, force){

  var pos;
  var d;
  var nr= 0;           //next row
  for(r = (from*4); r<  (to*4); r++){
    for(s = 0; s < this.grid.length; s++){
     if(r > 1 && r < this.grid[s].length){
         pos = this.grid[s][r-1].copy();

         d = p5.Vector.sub(pos,this.grid[s][r]);
         //d.mult(nr* force);
         //this.grid[s][r].y  += d.y ;
         this.grid[s][r].y  +=nr* force;
       }
     }
     if(r > (from*4) + ((to*4)-(from*4))/2){
       nr-=1;
     }
     else{
       nr+=1;
     }
  }
}
Knitgrid.prototype.disorderHeight = function(from,to, force, stitches){


  var diffheight  = force/ ((to) - (from));
  var d=0;
  var nr= 0;           //next row
  var st = floor((this.grid.length/2) - (stitches*4 /2));
  for(s = st; s < st + stitches*4; s++){
  for(r = 4 + (from*4); r<  4 + (to*4); r++){
     if(r > 1 && r < this.grid.length){
        d += diffheight;


         this.grid[s][r].y +=d;
       }
     }
  }
}

Knitgrid.prototype.draw = function(){
  for(var s = 0; s <  this.kstitches; s++){
  for(var r = 0; r < this.krows; r++){

      stroke(0);
      strokeWeight(1);
      point( this.grid[s][r].x,  this.grid[s][r].y);
    }
  }


  stroke(0, 0,255);
  strokeWeight(1);
  fill(0,0,255,10);
  quad(  this.grid[0][0].x,  this.grid[0][0].y,
         this.grid[ this.kstitches-1][0].x,  this.grid[ this.kstitches-1][0].y,
         this.grid[ this.kstitches-1][ this.krows-1].x,  this.grid[ this.kstitches-1][ this.krows].y,
         this.grid[0][ this.krows-1].x,  this.grid[0][ this.krows].y);

}
