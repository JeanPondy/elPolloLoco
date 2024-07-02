let game;
let canvas;
let world;

let gameEndInterval;
let audio = true;

game_over_sound = new Audio("audio/gameOver.mp3");
winning_sound = new Audio("audio/win.mp3");
backgroundSound = new Audio("audio/backgroundSound.mp3");
backgroundSound.volume = 0.05;
backgroundSound.loop = true;

let isMuted = false;
let isStopped = false;
let isRestarted = false;
let gameOverSoundPlayed = false;
let winningSoundPlayed = false;

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
  backgroundSound.play();
  showSmallScreen();
}
function showSmallScreen() {
  document.getElementById("audiobtn").classList.remove("d-none");
  if (window.innerWidth <= 768) {
    document
      .querySelectorAll("#control-icons .direction, #control-icons .option")
      .forEach((element) => element.classList.remove("d-none"));
  }
}

function restart() {
  startGame(event);
}

function initGame() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My Character is", world.character);
  console.log("My enemies are", world.level.enemies);
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

function openImpressum() {
  window.open("impressum.html", "_blank");
}

function openDatenschutz() {
  window.open("copyright.html", "_blank");
}

function playSound(sound) {
  if (!isMuted) {
    sound.loop = false;
    sound.play();
  }
}

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

/* function toggleAudio(event) {
  const audioimg = document.getElementById("audioimg");
  event.preventDefault();
  if (event.type === "touchstart" || event.type === "click") {
    if (world.audioEnabled) {
      audioimg.style.display = "none";
      document.getElementById("audioimg-off").style.display = "block";
      world.audioEnabled = false;
      backgroundSound.pause();
      world.hurt_sound.pause();
    } else {
      audioimg.style.display = "block";
      document.getElementById("audioimg-off").style.display = "none";
      world.audioEnabled = true;
      world.hurt_sound.play();
      backgroundSound.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  }
} */
