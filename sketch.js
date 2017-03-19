
"use strict";
var settings;
var gcode;
var layers;
var knitting;
var isSaved;
var isDesign;


function setup() {
    createCanvas(1100,1100);
    background(255,0,0);

    settings = new Settings("Anet","TPC FLEX","fine");
    gcode = new Gcode(settings);
    layers = [];
    layers[0] = new Layer(0, settings);

    //knitting = new Knitting(layers, "6xknoopje-random50", createVector(100,100,0));
    //knitting = new Knitting(layers, "straight", createVector(20,150,0), 5, 23);
    knitting = new Knitting(layers, "new", createVector(50,50,0), 21,20);
    isDesign = true;
    if(isDesign){
      knitting.pattern.drawGrid(name, 21, 20);
    }
    else{
      knitting.generateGcode(layers);
      gcode.generate(layers, knitting);
      knitting.draw();
      //settings.report(gcode);
      isSaved = false;
      noLoop();
    }
}
function draw(){
  stroke(0);
  strokeWeight(2)
  noFill();
  rect(0,0, width-1, height-1);
}
function mousePressed(){
  if(isDesign){
      knitting.pattern.designStitch(mouseX, mouseY,0);
  }
  else{
    if(!isSaved){
      var date = new Date();
      var strdate = date.getYear() +"-"+ date.getMonth() +"-"+ date.getDay();

      gcode.save("Serie" + strdate + settings.style);
      isSaved = true;
    }
  }

}
function keyPressed(){
  if(keyCode == 71 || keyCode == 103 ){ // g of G
    knitting.pattern.gridToPattern();
    knitting.createPattern();
    isDesign = false;
  }
  if(keyCode == 66 || keyCode == 98 ){ // b of B
    knitting.generateGcode(layers);
    gcode.generate(layers, knitting);
    knitting.draw();
    //settings.report(gcode);
    isSaved = false;
    noLoop();
  }
}
