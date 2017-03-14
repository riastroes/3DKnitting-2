function Pattern(name, first){
  this.p = [];
  this.p[0] = first.copy();
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

}
