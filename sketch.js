
"use strict";
var settings;
var gcode;
var layers;
var knitting;
var isSaved;


function setup() {
    createCanvas(1000,1000);
    background(255);

    settings = new Settings("Anet","TPC FLEX","fine");
    gcode = new Gcode(settings);
    layers = [];
    layers[0] = new Layer(0, settings);

    //knitting = new Knitting(layers, "6xknoopje-random50", createVector(100,100,0));
    knitting = new Knitting(layers, "straight", createVector(20,150,0), 5, 48);
    knitting.generateGcode(layers);

    gcode.generate(layers, knitting);
    knitting.draw();
    //settings.report(gcode);
    isSaved = false;
    noLoop();
}

function mousePressed(){
    if(!isSaved){
      var date = new Date();
      var strdate = date.getYear() +"-"+ date.getMonth() +"-"+ date.getDay();

      gcode.save("Serie" + strdate + settings.style);
      isSaved = true;
    }
}
