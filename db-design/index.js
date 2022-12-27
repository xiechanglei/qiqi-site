import "../libs/konva/konva.min.js"

// https://konvajs.org/docs/overview.html

let stage = new Konva.Stage({ container: 'container', width: window.innerWidth, height: window.innerHeight, });

// then create layer
var layer = new Konva.Layer();

var pentagon = new Konva.RegularPolygon({
  x: stage.width() / 2,
  y: stage.height() / 2,
  sides: 5,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
  shadowOffsetX : 20,
  shadowOffsetY : 25,
  shadowBlur : 40,
  opacity : 0.5
});

// add the shape to the layer
layer.add(pentagon);

// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();