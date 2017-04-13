
"use strict";
var settings;
var grid;
var gcode;
var layers;
var skirt;
var knitting;
var isSaved;
var isDesign;
var isToGrid;
var isDesigned;
var knitting;
var wall;


function setup() {
    createCanvas(1000,1000);
    //background(255,0,0);

    //settings = new Settings("Anet","TPC FLEX","normal");
    //settings = new Settings("Anet","Coper","normal");
    //settings = new Settings("Ultimaker2+", "PLA", "fine");
    //settings = new Settings("Ultimaker2+", "PETGCARBON","normal");
    //settings = new Settings("Anet", "SATIN", "fine");
    //settings = new Settings("Ultimaker2+", "PLABRO", "normal");
    //settings = new Settings("Anet", "SATIN", "normal");
    //settings = new Settings("Ultimaker2+", "PLABRO", "normal");

  //  this.knitting = new Etui("Anet","SATIN", "normal", 34,20, 7.5);
    //this.knitting = new Hanger("Anet","BRICK", "extrafine", 34,20);

    knitting = new Hanger("Anet", "BRICK", "fine", 51,12 );


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
    if(!knitting.isSaved){

      knitting.save();

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
      gcode.generate(layers,skirt, knitting);
      knitting.draw();
      //settings.report(gcode);
      isDesigned = true;
      isSaved = false;

      noLoop();
      }
  }
}
