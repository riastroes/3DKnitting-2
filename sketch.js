
"use strict";

var knitting;
var stitches;
var rows;
var pos;
var sliderStitches;
var sliderRows;
var btnGenerate;
var btnSave;
var offset;  // wordt alleen gebruikt in de tekenfuncties
var checkShowGrid;

function setup() {
    createCanvas(1000,1200);
    pos = createVector(0,0);
    offset = createVector(0,200);
    //background(255,0,0);
    textSize(18);
    fill(0);
    text("Stitches:", 10,70);
    text("Rows:", 10,100);


    sliderStitches = createSlider(2, 50, 10);
    sliderStitches.position(130, 110);
    sliderStitches.style('width', '120px');

    sliderRows = createSlider(2, 52, 10);
    sliderRows.position(130, 140);
    sliderRows.style('width', '120px');

    checkShowGrid = createCheckbox('show grid', true);
    checkShowGrid.position(130, 170);


    btnGenerate = createButton('generate');
    btnGenerate.position(130, 220);
    btnGenerate.mousePressed(create);

    btnSave = createButton('save');
    btnSave.position(210, 220);
    btnSave.mousePressed(downloadKnitting);

    //inStitches = document.getElementById("institches")
    //inStitches.style('width', '180px');

    //knitting = new FreeForm1("Anet", "ABS", "fine",pos );
    create();

    frameRate(1);
}
function draw(){

  fill(255);
  noStroke();
  rect(290,60, 60,40);
  fill(0);
  textSize(18);
  text(sliderStitches.value(), 300,70);
  text(sliderRows.value(), 300,100);



}

function create(){
  fill(255);
  stroke(0);
  rect(offset.x, offset.y, width - offset.x, height - offset.y);
  stitches = floor(sliderStitches.value());
  rows = floor(sliderRows.value());
  pos = createVector(6,3);
  knitting = new Armband1("Ultimaker2+", "PETGCARBON", "fat", pos, stitches, rows,checkShowGrid.checked()  );
  knitting.create(checkShowGrid.checked());
}
function downloadKnitting(){

    if(!knitting.isSaved){
      knitting.save();
    }
}
