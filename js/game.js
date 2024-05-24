let canvas;
let world;
let keyboard = new Keyboard();
let gameEndInterval;
let audio = true;
let backgroundSound;
//let backgroundSound = new Audio("audio/backgroundSound.mp3");

// Event-Listener, um das Spiel zu starten, wenn eine Taste gedrückt wird
window.addEventListener("keydown", startGame);

// Event-Listener, um die Steuerelemente nach dem Laden der Seite anzuzeigen
document.addEventListener("DOMContentLoaded", updateControlsBox);

// Funktion zum Initialisieren des Spiels
function initGame() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  world.playBackgroundMusic();
  // Konsolenausgaben zur Überprüfung
  console.log("My Character is", world.character);
  console.log("My enemies are", world.level.enemies);
  updateControlsBox(); // Aktualisiere die Anzeige der Steuerungselemente
  checkGameEnd(); // Überprüfe regelmäßig, ob das Spiel zu Ende ist
}

// Funktion zur Aktualisierung der Steuerungsanzeige
function updateControlsBox() {
  let el = document.getElementById("control-icons");
  if (el) {
    el.classList.remove("d-none"); // Entferne die Klasse, um das Element sichtbar zu machen
  } else {
    console.error("Element with ID 'control-icons' not found!");
  }
}

// Funktion zum Starten des Spiels
function startGame(event) {
  // Verstecke die Startseite, wenn das Spiel gestartet wird
  document.getElementById("startpage").style.display = "none";

  // Logik zum Starten des Spiels
  window.removeEventListener("keydown", startGame); // Entferne den Event-Listener, um Mehrfachstarts zu verhindern
  event.preventDefault(); // Standardaktion des Events verhindern
  showGameScreen(); // Zeige den Spielbildschirm an
  initLevel(); // Initialisiere das Level
  initGame(); // Initialisiere das Spiel
  checkGameEnd(); // Überprüfe regelmäßig, ob das Spiel zu Ende ist

  // Hintergrundsound abspielen
  backgroundSound.loop = true; // Endlosschleife aktivieren
  backgroundSound.play().catch((error) => {
    console.error("Audio playback failed:", error);
  });
}

// Funktion zum Anzeigen des Spielbildschirms
function showGameScreen() {
  canvas = document.getElementById("canvas"); // Canvas-Element abrufen
  startpage = document.getElementById("startpage"); // Startseite-Element abrufen
  endpage = document.getElementById("endPage"); // Endseite-Element abrufen
  helpbox = document.getElementById("help-box"); // Hilfe-Box-Element abrufen

  if (helpbox) {
    // Überprüfe, ob das Hilfe-Box-Element existiert
    updateControlsBox(); // Aktualisiere die Steuerungsanzeige
    canvas.classList.remove("d-none"); // Mache das Canvas-Element sichtbar
    startpage.classList.add("d-none"); // Verstecke die Startseite
    endpage.classList.add("d-none"); // Verstecke die Endseite
    helpbox.classList.add("d-none"); // Verstecke die Hilfe-Box
  } else {
    console.error("Element with ID 'help-box' not found!"); // Fehler in der Konsole ausgeben, wenn das Hilfe-Box-Element nicht gefunden wird
  }
}

// Funktion zum Anzeigen der Endseite
function showEndPage() {
  setTimeout(() => {
    document.getElementById("endPage").classList.remove("d-none"); // Mache die Endseite sichtbar
    document.getElementById("control-icons").classList.add("d-none"); // Verstecke die Steuerungssymbole

    // Hintergrundsound stoppen
    backgroundSound.pause();
    backgroundSound.currentTime = 0;

    // Überprüfen, ob der Neustart-Button bereits existiert
    let restartButton = document.getElementById("restart-btn");
    if (!restartButton) {
      // Füge den Neustart-Button hinzu, wenn er noch nicht existiert
      restartButton = document.createElement("div"); // Erstelle ein neues div-Element
      restartButton.id = "restart-btn"; // Setze die ID des Buttons
      restartButton.classList.add("restart-btn"); // Füge die Klasse "restart-btn" hinzu
      restartButton.textContent = "RESTART"; // Setze den Text des Buttons
      restartButton.onclick = function () {
        window.location.reload(); // Lade die Seite neu, um das Spiel neu zu starten
      };
      document.getElementById("endPage").appendChild(restartButton); // Füge den Button zur Endseite hinzu
    }
  }, 1000); // Warte 1 Sekunde, bevor die Endseite angezeigt wird
}

// Funktion zur Aktualisierung der Hilfe-Box
function updateHelpbox() {
  let el = document.getElementById("help-box"); // Hilfe-Box-Element abrufen
  if (smallDevice.matches) {
    // Überprüfe, ob das Gerät klein ist (mobile Geräte)
    el.classList.add("d-none"); // Verstecke die Hilfe-Box
    menuOpen = false; // Setze das Menü auf geschlossen
  } else {
    el.classList.remove("d-none"); // Mache die Hilfe-Box sichtbar
    menuOpen = true; // Setze das Menü auf geöffnet
  }
}

// Funktion zum Umschalten der Info-Box
function toggleInfobox(event) {
  let el = document.getElementById("infobox"); // Info-Box-Element abrufen
  event.preventDefault(); // Standardaktion des Events verhindern
  if (event.type === "click" || event.type === "touchstart") {
    el.classList.toggle("d-none"); // Umschalten der Sichtbarkeit der Info-Box
  }
}

// Funktion zum Umschalten des Menüs
function toggleMenu(event) {
  let el = document.getElementById("help-box"); // Hilfe-Box-Element abrufen
  if (event) {
    event.preventDefault(); // Standardaktion des Events verhindern
  }
  if (el.classList.contains("d-none")) {
    el.classList.remove("d-none"); // Mache die Hilfe-Box sichtbar
  } else {
    el.classList.add("d-none"); // Verstecke die Hilfe-Box
  }
}

// Funktion zum Umschalten des Vollbildmodus
function toggleFullScreen() {
  let mainContainer = document.getElementById("mainContainer");
  let startpage = document.getElementById("startpage");
  let canvas = document.getElementById("canvas");
  if (!document.fullscreenElement) {
    // Überprüfe, ob kein Element im Vollbildmodus ist
    mainContainer
      .requestFullscreen()
      .then(() => {
        startpage.classList.add("fullscreen");
        canvas.classList.add("fullscreen");
      })
      .catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        startpage.classList.remove("fullscreen");
        canvas.classList.remove("fullscreen");
      });
    }
  }
}

// Funktion zum Umschalten des Audio-Status
function toggleAudio(event) {
  const audioimg = document.getElementById("audioimg"); // Audio-Bild-Element abrufen
  event.preventDefault(); // Standardaktion des Events verhindern
  if (event.type === "touchstart" || event.type === "click") {
    // Überprüfe, ob das Event ein Klick oder Touchstart ist
    if (audio) {
      audioimg.style.display = "none"; // Verstecke das Bild "volume-high.svg"
      document.getElementById("audioimg-off").style.display = "block"; // Zeige das Bild "volume-off.svg" an
      audio = false; // Setze den Audio-Status auf falsch (deaktiviert)
    } else {
      audioimg.style.display = "block"; // Zeige das Bild "volume-high.svg" an
      document.getElementById("audioimg-off").style.display = "none"; // Verstecke das Bild "volume-off.svg"
      audio = true; // Setze den Audio-Status auf wahr (aktiviert)
    }
  }
}

// Funktion zur Überprüfung, ob das Spiel zu Ende ist
function checkGameEnd() {
  gameEndInterval = setInterval(() => {
    if (world.gameEnd) {
      // Überprüfe, ob das Spiel zu Ende ist
      console.log("Game ended!"); // Konsolenausgabe hinzufügen
      clearInterval(gameEndInterval); // Stoppe das Intervall
      showEndPage(); // Zeige die Endseite an
      document.getElementById("overlay-icons").classList.add("d-none"); // Verstecke die Overlay-Symbole
    }
  }, 1000 / 20); // Überprüfe 20 Mal pro Sekunde, ob das Spiel zu Ende ist
}
