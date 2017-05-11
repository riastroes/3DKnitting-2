
"use strict";

var knitting;
var stitches;
var rows;
var pos;

function setup() {
    createCanvas(1000,1000);
    //background(255,0,0);

    pos = createVector(10,3);
    //knitting = new FreeForm1("Anet", "ABS", "fine",pos );

    frameRate(1);
}
function draw(){
  stroke(0);
  strokeWeight(2)
  noFill();
  rect(0,0, width-1, height-1);

  stitches = floor(institches);
  rows = floor(inrows);
  knitting = new Armband1("Ultimaker2+", "PETGCARBON", "fat", pos, stitches, rows );

}
function mousePressed(){

    if(!knitting.isSaved){
      knitting.save();
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
