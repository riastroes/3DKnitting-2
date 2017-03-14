function Pattern(name, first){
  this.p = [];
  this.first = first.copy();
  this.create(name);
  this.p[0] = first;

}
Pattern.prototype.create =function(name){
  if(name == "random50"){
    for(var i = 1; i < 20; i++){
      this.p[i] = createVector(this.first.x + random(-50,50), this.first.y + random(-50,50));
    }
  }
  
}
