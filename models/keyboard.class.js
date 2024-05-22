class Keyboard {
  constructor() {
    this.LEFT = false;
    this.RIGHT = false;
    this.UP = false;
    this.DOWN = false;
    this.SPACE = false;
    this.D = false;

    // Eventlistener für Tastendruck (Keydown)
    window.addEventListener("keydown", (e) => {
      this.setKey(e.keyCode, true);
    });

    // Eventlistener für Tastenfreigabe (Keyup)
    window.addEventListener("keyup", (e) => {
      this.setKey(e.keyCode, false);
    });

    // Eventlistener für Touchstart und Touchend
    this.initMobileControls();
  }

  setKey(keyCode, value) {
    if (keyCode == 39) {
      this.RIGHT = value;
    }
    if (keyCode == 37) {
      this.LEFT = value;
    }
    if (keyCode == 38) {
      this.UP = value;
    }
    if (keyCode == 40) {
      this.DOWN = value;
    }
    if (keyCode == 32) {
      this.SPACE = value;
    }
    if (keyCode == 68) {
      this.D = value;
    }
  }

  initMobileControls() {
    const leftBtn = document.getElementById("left");
    const rightBtn = document.getElementById("right");
    const jumpBtn = document.getElementById("jump");
    const throwBtn = document.getElementById("throw");

    // Eventlistener für Touchstart
    if (leftBtn) {
      leftBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.LEFT = true;
      });
      leftBtn.addEventListener("touchend", (e) => {
        e.preventDefault();
        this.LEFT = false;
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.RIGHT = true;
      });
      rightBtn.addEventListener("touchend", (e) => {
        e.preventDefault();
        this.RIGHT = false;
      });
    }

    if (jumpBtn) {
      jumpBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.SPACE = true;
      });
      jumpBtn.addEventListener("touchend", (e) => {
        e.preventDefault();
        this.SPACE = false;
      });
    }

    if (throwBtn) {
      throwBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.D = true;
      });
      throwBtn.addEventListener("touchend", (e) => {
        e.preventDefault();
        this.D = false;
      });
    }
  }
}
