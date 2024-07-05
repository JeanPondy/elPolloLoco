let game;
let canvas;
let world;

let gameEndInterval;
let audio = true;

let game_over_sound = new Audio("audio/gameOver.mp3");
let winning_sound = new Audio("audio/win.mp3");
let backgroundSound = new Audio("audio/backgroundSound.mp3");
backgroundSound.volume = 0.05;
backgroundSound.loop = true;

let isMuted = false;
let isStopped = false;
let isRestarted = false;
let gameOverSoundPlayed = false;
let winningSoundPlayed = false;

let smallDevice = window.matchMedia("(max-width: 1100px)");
let touchDevice = window.matchMedia("(pointer: coarse)").matches;

window.addEventListener("keydown", startGame);

document.addEventListener("DOMContentLoaded", updateControlsBox);

/**
 * Starts the game, hides start page, initializes game elements, and begins background music.
 * @param {Event} event - The event object triggering the game start.
 */
function startGame(event) {
  window.removeEventListener("keydown", startGame);
  document.getElementById("startpage").style.display = "none";
  event.preventDefault();
  showGameScreen();
  initLevel();
  initGame();
  checkGameEnd();
  backgroundSound.play();
  showSmallScreen();
}

/**
 * Shows additional controls on small screens.
 */
function showSmallScreen() {
  document.getElementById("audiobtn").classList.remove("d-none");
  if (window.innerWidth <= 768) {
    document
      .querySelectorAll("#control-icons .direction, #control-icons .option")
      .forEach((element) => element.classList.remove("d-none"));
  }
}

/**
 * Restarts the game.
 */
function restartGame() {
  backgroundSound.pause();
  backgroundSound.currentTime = 0;
  startGame(event);
  document.getElementById("overlay-icons").classList.remove("d-none");
  backgroundSound.play();
}

/**
 * Initializes the game canvas and world.
 */
function initGame() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My Character is", world.character);
  console.log("My enemies are", world.level.enemies);
}

/**
 * Updates the visibility of the control icons box.
 */
function updateControlsBox() {
  let el = document.getElementById("control-icons");
  if (el) {
    el.classList.remove("d-none");
  } else {
    console.error("Element with ID 'control-icons' not found!");
  }
}

/**
 * Shows the game screen by hiding start and end pages, and showing controls.
 */
function showGameScreen() {
  canvas = document.getElementById("canvas");
  let startpage = document.getElementById("startpage");
  let endpage = document.getElementById("endPage");
  let helpbox = document.getElementById("help-box");
  updateControlsBox();
  canvas.classList.remove("d-none");
  startpage.classList.add("d-none");
  endpage.classList.add("d-none");
  helpbox.classList.add("d-none");
}

/**
 * Checks if the game has ended and displays the end page accordingly.
 */
function checkGameEnd() {
  gameEndInterval = setInterval(() => {
    if (world.gameEnd) {
      clearInterval(gameEndInterval);
      showEndPage();
      document.getElementById("overlay-icons").classList.add("d-none");
    }
  }, 1000 / 20);
}

/**
 * Shows the end page after a delay and pauses background music.
 */
function showEndPage() {
  setTimeout(() => {
    document.getElementById("endPage").classList.remove("d-none");
    document.getElementById("control-icons").classList.add("d-none");
  }, 1000);
  backgroundSound.pause();
}

/**
 * Updates the visibility of the help box based on the screen size.
 */
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

/**
 * Toggles the visibility of the information box.
 * @param {Event} event - The event object triggering the toggle.
 */
function toggleInfobox(event) {
  let el = document.getElementById("infobox");
  event.preventDefault();
  if (event.type === "click" || event.type === "touchstart") {
    el.classList.toggle("d-none");
  }
}

/**
 * Toggles the visibility of the help box.
 * @param {Event} event - The event object triggering the toggle.
 */
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

/**
 * Toggles full screen mode for the game.
 * @param {Event} event - The event object triggering the toggle.
 */
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

/**
 * Opens the impressum page in a new tab.
 */
function openImpressum() {
  window.open("impressum.html", "_blank");
}

/**
 * Opens the datenschutz page in a new tab.
 */
function openDatenschutz() {
  window.open("copyright.html", "_blank");
}

/**
 * Plays a sound if the game is not muted.
 * @param {HTMLAudioElement} sound - The audio element to play.
 */
function playSound(sound) {
  if (!isMuted) {
    sound.loop = false;
    sound.play();
  }
}

/**
 * Toggles the mute state of the game audio.
 * @param {Event} event - The event object triggering the toggle.
 */
function toggleMute(event) {
  const audioimg = document.getElementById("audioimg");
  const audioimgOff = document.getElementById("audioimg-off");
  event.preventDefault();
  isMuted = !isMuted;
  if (isMuted) {
    audioimg.style.display = "none";
    audioimgOff.style.display = "block";
    backgroundSound.pause();
    game_over_sound.pause();
    winning_sound.pause();
  } else {
    unmuteAudio(event);
  }
}

/**
 * Unmutes the game audio.
 * @param {Event} event - The event object triggering the unmute.
 */
function unmuteAudio(event) {
  const audioimg = document.getElementById("audioimg");
  const audioimgOff = document.getElementById("audioimg-off");
  event.preventDefault();

  isMuted = false;
  audioimg.style.display = "block";
  audioimgOff.style.display = "none";
  backgroundSound.play().catch((error) => {
    console.error("Audio playback failed:", error);
  });
}
