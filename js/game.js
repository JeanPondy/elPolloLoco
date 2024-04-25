let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);

  console.log("My Character is", world.character);
  console.log("My enemies are", world.enemies);
}

// ob ein Taske nicht gedrückt ist oder losgelassen ist // Keyboard Objekt
window.addEventListener("keypress", (e) => {
  console.log(e);
});
