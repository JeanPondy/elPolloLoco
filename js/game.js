// Deklaration der Variablen
let canvas;
let world;
let keyboard = new Keyboard(); // Neue Instanz der Keyboard-Klasse erstellen

// Funktion zum Initialisieren des Spiels
function init() {
  canvas = document.getElementById("canvas"); // Das Canvas-Element mit der ID "canvas" aus dem DOM abrufen
  world = new World(canvas, keyboard); // Neue Instanz der World-Klasse erstellen und das Canvas-Element sowie das Keyboard-Objekt übergeben

  // Konsolenausgaben zur Überprüfung
  console.log("My Character is", world.character);
  console.log("My enemies are", world.level.enemies);
}

// Eventlistener für Tastendruck (Keydown)
window.addEventListener("keydown", (e) => {
  // Überprüfen, welche Taste gedrückt wurde, und entsprechende Eigenschaften im Keyboard-Objekt setzen
  if (e.keyCode == 39) {
    keyboard.RIGHT = true; // Rechte Pfeiltaste: true setzen
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true; // Linke Pfeiltaste: true setzen
  }
  if (e.keyCode == 38) {
    keyboard.UP = true; // Obere Pfeiltaste: true setzen
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true; // Untere Pfeiltaste: true setzen
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true; // Leertaste: true setzen
  }
  if (e.keyCode == 68) {
    keyboard.D = true; // Taste 'D': true setzen
  }

  console.log(e); // Konsolenausgabe des Tastaturereignisses (Keydown-Ereignis)
});

// Eventlistener für Tastenfreigabe (Keyup)
window.addEventListener("keyup", (e) => {
  // Überprüfen, welche Taste losgelassen wurde, und entsprechende Eigenschaften im Keyboard-Objekt zurücksetzen
  if (e.keyCode == 39) {
    keyboard.RIGHT = false; // Rechte Pfeiltaste: false setzen
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false; // Linke Pfeiltaste: false setzen
  }
  if (e.keyCode == 38) {
    keyboard.UP = false; // Obere Pfeiltaste: false setzen
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false; // Untere Pfeiltaste: false setzen
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false; // Leertaste: false setzen
  }
  if (e.keyCode == 68) {
    keyboard.D = false; // Taste 'D': false setzen
  }

  console.log(e); // Konsolenausgabe des Tastaturereignisses (Keyup-Ereignis)
});
