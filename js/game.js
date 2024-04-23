let canvas;
let ctx; // mit context kann man funltion aufrufen

let world = new World();

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  console.log("My Character is", world.character);
  console.log("My enemies are", world.enemies);
}
