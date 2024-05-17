// Deklaration der Variablen
let canvas;
let world;
let keyboard = new Keyboard(); // Neue Instanz der Keyboard-Klasse erstellen

// Funktion zum Initialisieren des Spiels
function initGame() {
  canvas = document.getElementById("canvas"); // Das Canvas-Element mit der ID "canvas" aus dem DOM abrufen
  world = new World(canvas, keyboard); // Neue Instanz der World-Klasse erstellen und das Canvas-Element sowie das Keyboard-Objekt übergeben

  // Konsolenausgaben zur Überprüfung
  console.log("My Character is", world.character);
  console.log("My enemies are", world.level.enemies);
}
