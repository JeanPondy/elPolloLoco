// Deklaration der Variablen
let canvas;
let world;
let keyboard = new Keyboard(); // Neue Instanz der Keyboard-Klasse erstellen
window.addEventListener("keydown", startGame);

function startGame(event) {
  // Verstecke die Startseite, wenn das Spiel gestartet wird
  document.getElementById("startpage").style.display = "none";
  // Fügen Sie hier die Logik hinzu, um das Spiel zu starten
  // Zum Beispiel: starte die Spiel-Initialisierungslogik
  window.removeEventListener("keydown", startGame);
  event.preventDefault();
  showGameScreen();
  initLevel();
  initGame();
  checkGameEnd();
}

// Funktion zum Initialisieren des Spiels
function initGame() {
  canvas = document.getElementById("canvas"); // Das Canvas-Element mit der ID "canvas" aus dem DOM abrufen
  world = new World(canvas, keyboard); // Neue Instanz der World-Klasse erstellen und das Canvas-Element sowie das Keyboard-Objekt übergeben

  // Konsolenausgaben zur Überprüfung
  console.log("My Character is", world.character);
  console.log("My enemies are", world.level.enemies);
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

function checkGameEnd() {
  gameEndInterval = setInterval(() => {
    if (world.gameEnd) {
      clearInterval(gameEndInterval);
      showEndPage();
      document.getElementById("overlay-icons").classList.add("d-none");
    }
  }, 1000 / 20);
}

function showEndPage() {
  setTimeout(() => {
    document.getElementById("endPage").classList.remove("d-none");
    document.getElementById("control-icons").classList.add("d-none");
  }, 1000);
}
function updateControlsBox() {
  let el = document.getElementById("control-icons");
  if (touchDevice) {
    el.classList.remove("d-none");
  }
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
    if (el.classList.contains("d-none")) {
      el.classList.remove("d-none");
    } else {
      el.classList.add("d-none");
      toggleMenu();
    }
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
    if (!audio) {
      audioimg.src = "img/sound.png";
      audio = true;
    } else {
      audioimg.src = "img/no-sound.png";
      audio = false;
    }
  }
}
