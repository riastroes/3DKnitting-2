
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
    createCanvas(2300,2300);
    //background(255,0,0);

    //settings = new Settings("Anet","TPC FLEX","fine");
    //settings = new Settings("Anet","Coper","normal");
    //settings = new Settings("Ultimaker2+", "PLA", "fine");
    settings = new Settings("Ultimaker2+", "PETGCARBON","normal");
    //settings = new Settings("Anet", "PLA", "normal");
    grid = new Grid(230,230, 4,4,5); // 6X6
    grid.draw();
    grid.testPos(5,5); //row, stitches
    gcode = new Gcode(settings);

    layers = [];
    for(var i = 0; i < 22; i++){
      layers[i] = new Layer(i, settings);
    }

    skirt = new Skirt(grid, 15,5);
    skirt.draw();
    skirt.gcode(layers[0]);
    wall = [];



    knittings = [];
    for(i = 0; i < 2; i++){
      knittings[i] = new Knitting(layers[i], "straight", 11,8, 20,11, true);
      knittings[i].gcode(layers[i]);
    }
    knittings[0].test(knittings[0].knitgrid[4][4]);
    knittings[0].test(knittings[0].knitgrid[83][4]);
    knittings[0].test(knittings[0].knitgrid[83][47]);
    knittings[0].test(knittings[0].knitgrid[4][47]);
    append(wall, knittings[0].knitgrid[4][4]);
    append(wall, knittings[0].knitgrid[83][4]);
    append(wall, knittings[0].knitgrid[83][47]);
    append(wall, knittings[0].knitgrid[4][47]);

    for(i = 2; i < 20; i++){
      append(layers[i].p , wall[0]);
      append(layers[i].p , wall[1]);
      append(layers[i].p , wall[2]);
      append(layers[i].p , wall[3]);
      knittings[i] = new Knitting(layers[i], "wall");
      knittings[i].gcode(layers[i]);
    }
    for(i = 20; i < 22; i++){
      knittings[i] = new Knitting(layers[i], "straight", 11,8, 20,11, true);
      knittings[i].gcode(layers[i]);
    }


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

      gcode.save("MAPLA" + settings.style);
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
