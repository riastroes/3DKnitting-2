
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
var knittings;


function setup() {
    createCanvas(1100,1100);
    //background(255,0,0);

    //settings = new Settings("Anet","TPC FLEX","fine");
    //settings = new Settings("Anet","Coper","normal");
    //settings = new Settings("Ultimaker2+", "PLA", "fine");
    settings = new Settings("Ultimaker2+", "PETGCARBON","fine");
    grid = new Grid(200,200, 20,20,5); // 6X6

    grid.draw();


    grid.testPos(3,4); //row, stitches

    gcode = new Gcode(settings);
    layers = [];
    for(var i = 0; i < 4; i++){
      layers[i] = new Layer(i, settings);
    }

    skirt = new Skirt(grid, 60,5);
    skirt.draw();
    skirt.gcode(layers[0]);
    //
    knittings = [];
    for(i = 0; i < 2; i++){
      knittings[i] = new Knitting(layers[i], "straight", 30,10, 19,20, true);
      knittings[i].gcode(layers[i]);
    }

    gcode.generate(layers,skirt, knittings);
              //knitting.draw();
              //settings.report(gcode);
      isSaved = false;
      noLoop();
    // }
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

      gcode.save("MAPETGCARBON8X5" + settings.style);
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
      gcode.generate(layers,skirt, knitting);
      knitting.draw();
      //settings.report(gcode);
      isDesigned = true;
      isSaved = false;

      noLoop();
      }
  }
}
