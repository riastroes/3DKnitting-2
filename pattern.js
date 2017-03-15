function Pattern(name, first, rows, stitches){
  this.p = [];
  this.p[0] = first.copy();
  this.rows = rows;
  this.stitches = stitches;
  this.design = [];
  this.create(name);
}
Pattern.prototype.create =function(name){
  if(name == "6xknoopje-random50"){
    for(var x = 0; x < 6; x++){
      var start = this.p.length;
      for(var i = 0; i < 20; i++){
        this.p[start + i] = createVector(this.p[start-1].x + 120 + random(-50,50), this.p[start-1].y + random(-50,50));
      }
      this.p[this.p.length] = this.p[start].copy();
    }
  }
  if(name == "1xknoopje-random80"){
    for(var x = 0; x < 1; x++){
      var start = this.p.length;
      for(var i = 0; i < 25; i++){
        this.p[start + i] = createVector(this.p[start-1].x + 120 + random(-80,80), this.p[start-1].y + random(-80,80));
      }
      this.p[this.p.length] = this.p[start].copy();
    }
  }
  if(name == "straight"){
    this.skirt(this.p[0], 600);
    this.designPattern("straight", this.rows, this.stitches);
    //this.testDesign("UVVVVVW");
    var start = this.p.length ;
    for(var r = 0 ; r < this.design.length; r++){
      for(var s = 0; s < this.design[r].length; s++){
        var type = this.design[r].charAt(s);
        var astitch = new Stitch(type);
        var start = this.p.length ;
        for (var i = 0 ; i < astitch.stitch.length; i++){
          var next = start + i;
          var last = start;
          this.p[next] = this.p[next-1].copy();
          this.p[next].x =  this.p[last].x + astitch.stitch[i].x * 5 ;
          this.p[next].y = this.p[last].y + astitch.stitch[i].y * 5;
          this.p[next].z = this.p[last].z + astitch.stitch[i].z * 5;
        }
      }
    }
    console.log(this.p);
  }

}
Pattern.prototype.skirt = function(pos, len){
  var next = this.p.length-1;
  this.p[next] = pos.copy();
  this.p[next].x += 5;
  this.p[next].y = this.p[next].y/2;
  this.p[next + 1] = pos.copy();
  this.p[next + 1].x += len;
  this.p[next + 1].y = this.p[next].y/2;
  this.p[next + 2] = pos.copy();
  this.p[next + 2].x += len;
  this.p[next + 2].y = ( this.p[next].y/2) -1;
  this.p[next + 3] = pos.copy();
  this.p[next + 3].y =  ( this.p[next].y/2) -1;
  this.p[next + 4] = pos.copy();
}
Pattern.prototype.testDesign = function(strDesign){
  this.design=[];
  this.design[0] = strDesign;
}
Pattern.prototype.designPattern = function(name, row, stitches){

  var r = 0;
  this.stitches = stitches;
  if(name == "straight"){
     var s = "B"
     this.design[r] ="A" + s.repeat(this.stitches - 2) + "C";
     for( r = 1; r < row+1; r++){
       if(r % 2 == 1){
         s = "L"
         this.design[r] = s.repeat(this.stitches -1) + "K";
       }
       else{
         s = "R";
         this.design[r] = s.repeat(this.stitches -1) + "S";
       }
     }
     if(row % 2 == 1){
       s = "Y"
       this.design[r] ="X" + s.repeat(this.stitches - 1) + "Z";
     }
     else{
       s = "V";
       this.design[r] ="U" + s.repeat(this.stitches -1) + "W";
     }
  }
  console.log(this.design);
}
