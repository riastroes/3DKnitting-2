
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
var wall;


function setup() {
    createCanvas(1000,1000);
    //background(255,0,0);

    //settings = new Settings("Anet","TPC FLEX","normal");
    //settings = new Settings("Anet","Coper","normal");
    //settings = new Settings("Ultimaker2+", "PLA", "fine");
    //settings = new Settings("Ultimaker2+", "PETGCARBON","normal");
    settings = new Settings("Anet", "SATIN", "fine");
    //settings = new Settings("Anet", "SATIN", "normal");
    //settings = new Settings("Ultimaker2+", "PLABRO", "normal");
    grid = new Grid(100,100, 6,6,2); // 6X6
    grid.draw();
    grid.testPos(5,5); //row, stitches
    gcode = new Gcode(settings);

    layers = [];
    for(var i = 0; i < 48; i++){
      layers[i] = new Layer(i, settings);

    }

    skirt = new Skirt(grid, 25,2);
    skirt.draw();
    skirt.gcode(layers[0]);
    wall = [];



    knittings = [];
    var i;
    for(i = 0; i < 2; i++){

      knittings[i] = new Knitting(layers[i], "straight", 6,6,50,24, true);
      knittings[i].gcode(layers[i]);
    }
    // for(i = 2; i < 46; i++){
    //   layers[i].speed = 1800;
    //   knittings[i] = new Knitting(layers[i], "wall", 6,6, 34,20, true);
    //   knittings[i].gcode(layers[i]);
    // }
    //
    //   if(i == 46){
    //     append(layers[i].commands,"G4 P20000    ; pauze");
    //   }
    // for(i = 46; i < 48; i++){
    //   knittings[i] = new Knitting(layers[i], "straight", 6,6,34,20, true);
    //   knittings[i].gcode(layers[i]);
    // }


    gcode.generate(layers,skirt, knittings);
    isSaved = false;
    noLoop();

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

      gcode.save("IPHONE5" + settings.materialcode + settings.style);
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
