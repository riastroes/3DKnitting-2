
"use strict";
var settings;
var gcode;
var layers;
var knitting;
var isSaved;
var isDesign;
var isToGrid;
var isDesigned;


function setup() {
    createCanvas(1100,1100);
    background(255,0,0);

    //settings = new Settings("Anet","TPC FLEX","fine");
    //settings = new Settings("Anet","Coper","normal");
    settings = new Settings("Ultimaker2+", "PLA", "fine");
    gcode = new Gcode(settings);
    layers = [];
    layers[0] = new Layer(0, settings);
    layers[1] = new Layer(1, settings);


    //knitting = new Knitting(layers, "6xknoopje-random50", createVector(100,100,0));
    //knitting = new Knitting(layers, "straight", createVector(20,150,0), 5, 23);
    knitting = new Knitting(layers, "new", createVector(30,250,0),41,46);//4118
    isDesign = true;
    if(isDesign){
      knitting.pattern.drawGrid(name, 7,40);
      isToGrid = false;
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

      gcode.save("ST" + "9*39" + settings.style);
      isSaved = true;
    }
  }

}
function keyPressed(){
  if(keyCode == 71 || keyCode == 103 ){ // g of G
    if(!isToGrid){
    knitting.pattern.gridToPattern();
    knitting.createPattern();
    isDesign = false;
    isToGrid = true;
    }
  }
  if(keyCode == 66 || keyCode == 98 ){ // b of B
    if(isToGrid && !isDesigned){
      knitting.generateGcode(layers);
      gcode.generate(layers, knitting);
      knitting.draw();
      //settings.report(gcode);
      isDesigned = true;
      isSaved = false;

      noLoop();
      }
  }
}
