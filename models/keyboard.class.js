class Keyboard {
  constructor() {
    this.LEFT = false;
    this.RIGHT = false;
    this.UP = false;
    this.DOWN = false;
    this.SPACE = false;
    this.D = false;
  }
}

const keyboard = new Keyboard();
/**
 * Event listener for touch start events to handle keyboard key states based on target ID.
 * @param {Event} e The touch start event object.
 */
window.addEventListener("touchstart", (e) => {
  switch (e.target.id) {
    case "right":
      keyboard.RIGHT = true;
      break;
    case "left":
      keyboard.LEFT = true;
      break;
    case "jump":
      keyboard.SPACE = true;
      break;
    case "throw":
      keyboard.D = true;
      break;
  }
});

/**
 * Event listener for touch end events to handle keyboard key states based on target ID.
 * @param {Event} e The touch end event object.
 */
window.addEventListener("touchend", (e) => {
  switch (e.target.id) {
    case "right":
      keyboard.RIGHT = false;
      break;
    case "left":
      keyboard.LEFT = false;
      break;
    case "jump":
      keyboard.SPACE = false;
      break;
    case "throw":
      keyboard.D = false;
      break;
  }
});

/**
 * Event listener for key down events to handle keyboard key states based on key code.
 * @param {KeyboardEvent} e The key down event object.
 */
window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case "ArrowUp":
      keyboard.UP = true;
      break;
    case "ArrowDown":
      keyboard.DOWN = true;
      break;
    case "Space":
      keyboard.SPACE = true;
      break;
    case "KeyD":
      keyboard.D = true;
      break;
  }
});

/**
 * Event listener for key up events to handle keyboard key states based on key code.
 * @param {KeyboardEvent} e The key up event object.
 */
window.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "ArrowRight":
      keyboard.RIGHT = false;
      break;
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;
    case "ArrowUp":
      keyboard.UP = false;
      break;
    case "ArrowDown":
      keyboard.DOWN = false;
      break;
    case "Space":
      keyboard.SPACE = false;
      break;
    case "KeyD":
      keyboard.D = false;
      break;
  }
});
