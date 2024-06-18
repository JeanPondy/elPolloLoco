let game;
let canvas;
let world;
//let keyboard = new Keyboard();
let gameEndInterval;
let audio = true;
let backgroundSound = new Audio("audio/backgroundSound.mp3");
let smallDevice = window.matchMedia("(max-width: 1100px)");
let touchDevice = window.matchMedia("(Pointer: coarse)").matches;

window.addEventListener("keydown", startGame);

document.addEventListener("DOMContentLoaded", updateControlsBox);

function startGame(event) {
  window.removeEventListener("keydown", startGame);
  document.getElementById("startpage").style.display = "none";
  event.preventDefault();
  showGameScreen();
  initLevel();
  initGame();
  checkGameEnd();

  backgroundSound.loop = true;
  backgroundSound.play().catch((error) => {
    console.error("Audio playback failed:", error);
  });

  // Audio-Button sichtbar machen
  document.getElementById("audiobtn").classList.remove("d-none");

  // Überprüfen, ob die Bildschirmbreite kleiner oder gleich 768px ist
  if (window.innerWidth <= 768) {
    document
      .querySelectorAll("#control-icons .direction, #control-icons .option")
      .forEach((element) => element.classList.remove("d-none"));
  }
}

function reset() {
  startGame(event);
}

// Funktion zum Initialisieren des Spiels
function initGame() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  // world.playBackgroundMusic(); // Kann entfernt oder angepasst werden
  console.log("My Character is", world.character);
  console.log("My enemies are", world.level.enemies);

  //updateControlsBox();
  //checkGameEnd();
}

function updateControlsBox() {
  let el = document.getElementById("control-icons");
  if (el) {
    el.classList.remove("d-none");
  } else {
    console.error("Element with ID 'control-icons' not found!");
  }
}

function showGameScreen() {
  canvas = document.getElementById("canvas");
  startpage = document.getElementById("startpage");
  endpage = document.getElementById("endPage");
  helpbox = document.getElementById("help-box");

  updateControlsBox();
  canvas.classList.remove("d-none");
  startpage.classList.add("d-none");
  endpage.classList.add("d-none");
  helpbox.classList.add("d-none");
}

// Funktion zur Überprüfung, ob das Spiel zu Ende ist
function checkGameEnd() {
  gameEndInterval = setInterval(() => {
    if (world.gameEnd) {
      clearInterval(gameEndInterval);
      showEndPage();
      document.getElementById("overlay-icons").classList.add("d-none");
    }
  }, 1000 / 20);
}

// Funktion zum Anzeigen der Endseite
function showEndPage() {
  setTimeout(() => {
    document.getElementById("endPage").classList.remove("d-none");
    document.getElementById("control-icons").classList.add("d-none");
  }, 1000);
}

function updateHelpbox() {
  let el = document.getElementById("help-box");
  if (smallDevice.matches) {
    el.classList.add("d-none");
    menuOpen = false;
  } else {
    el.classList.remove("d-none");
    menuOpen = true;
  }
}

function toggleInfobox(event) {
  let el = document.getElementById("infobox");
  event.preventDefault();
  if (event.type === "click" || event.type === "touchstart") {
    el.classList.toggle("d-none");
  }
}

function toggleMenu(event) {
  let el = document.getElementById("help-box");
  if (event) {
    event.preventDefault();
  }
  if (el.classList.contains("d-none")) {
    el.classList.remove("d-none");
  } else {
    el.classList.add("d-none");
  }
}

function toggleFullScreen(event) {
  let elem = document.getElementById("mainContainer");
  event.preventDefault();
  if (event.type === "click" || event.type === "touchstart") {
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  }
}

function toggleAudio(event) {
  const audioimg = document.getElementById("audioimg");
  event.preventDefault();
  if (event.type === "touchstart" || event.type === "click") {
    if (world.audioEnabled) {
      audioimg.style.display = "none";
      document.getElementById("audioimg-off").style.display = "block";
      world.audioEnabled = false;
      backgroundSound.pause();
    } else {
      audioimg.style.display = "block";
      document.getElementById("audioimg-off").style.display = "none";
      world.audioEnabled = true;
      backgroundSound.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  }
}
