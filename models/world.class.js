class World {
  gameOver = false;
  gameEnd = false;
  gameLost = false;
  gameWon = false;
  collision = new Collision();
  character = new Character();
  statusBar = new StatusBar();
  bottlesBar = new BottlesBar();
  coinsBar = new CoinsBar();
  endbossBar = new EndbossBar();
  interval = new Interval();
  keyboard = new Keyboard();
  level = level1;
  canvas;
  ctx;

  camera_x = 0;
  audioEnabled = true;

  throwableObjects = [];
  totalBottles = 5;
  bottlePower = 30;
  bottlescore = 0;
  coinTotal = 5;
  coinscore = 0;
  bottle;

  hurt_sound = new Audio("audio/hurt3.mp3");
  collisionCharacterEnemies_sound = new Audio("audio/public-jump.mp3");
  backgroundSound = new Audio("audio/backgroundSound.mp3");
  coin_sound = new Audio("audio/coins.mp3");
  bottle_sound = new Audio("audio/collision-bottle.mp3");
  throw_sound = new Audio("audio/shot_bottle.mp3");
  splash_sound = new Audio("audio/bottleBroke.mp3");
  sleeping_sound = new Audio("audio/sleepingSound.mp3");
  walking_sound = new Audio("audio/running2.mp3");

  throwObjectsInterval;
  /**
   * Creates a new instance of World.
   * @param {HTMLCanvasElement} canvas The HTML canvas element for rendering.
   * @param {Keyboard} keyboard The keyboard input manager.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = level1;

    this.setupEventListeners();
    this.draw();
    this.setWorld();
    this.run();
    this.throwObject();
  }

  /**
   * Sets up event listeners.
   */
  setupEventListeners() {
    document.addEventListener("keydown", () => {}, { once: true });
  }

  /**
   * Sets references to world in various game components.
   */
  setWorld() {
    this.character.world = this;
    this.collision.world = this;
    this.interval.world = this;
  }

  /**
   * Starts the game loop.
   */
  run() {
    setInterval(() => {
      this.collision.checkCollisions();
    }, 50);
  }

  /**
   * Sets interval for throwing objects.
   */
  throwObject() {
    this.throwObjectsInterval = setInterval(() => {
      this.throwObjects();
    }, 1000 / 10);
  }

  /**
   * Throws objects based on keyboard input and remaining bottle score.
   */
  throwObjects() {
    if (this.keyboard.D == true && this.bottlescore > 0) {
      this.bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(this.bottle);
      this.bottlescore--;
      this.bottlesBar.setPercentage(
        this.bottlescore * (100 / this.totalBottles)
      );
      if (!isMuted) {
        this.playThrowSound();
      }
    }
  }

  /**
   * Plays the sound effect for throwing bottles.
   */
  playThrowSound() {
    this.throw_sound.currentTime = 0;
    this.throw_sound.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });
  }

  /**
   * Plays the sound effect for character being hurt.
   */
  playHurtSound() {
    if (this.hurt_sound.paused) {
      this.hurt_sound.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    } else {
      this.hurt_sound.currentTime = 0;
      this.hurt_sound.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  }

  /**
   * Clears the canvas and redraws game elements.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawStatusBars();
    this.drawGameObjects();
    this.scheduleNextFrame();

    this.checkGameEnd();
  }

  /**
   * Draws the game background.
   */
  drawBackground() {
    if (!this.level || !this.level.backgroundObjects) {
      console.error("Level or backgroundObjects is not defined");
      return;
    }

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws the status bars (e.g., health, bottles, coins).
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.bottlesBar);
    this.addToMap(this.coinsBar);
    this.addToMap(this.endbossBar);
  }

  /**
   * Draws all game objects (e.g., character, enemies, collectibles).
   */
  drawGameObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Checks if the game has ended and handles end game logic.
   */
  checkGameEnd() {
    if (this.gameEnd) {
      audio = false;
      if (this.gameWon) {
        this.addToMap(new Endscreen(true));
        setTimeout(() => {
          this.drawEnd();
        }, 1500);
      } else {
        this.addToMap(new Endscreen(false));
        setTimeout(() => {
          this.drawEnd();
        }, 1500);
      }
    }
  }

  /**
   * Cleans up intervals and animation frames when game ends.
   */
  drawEnd() {
    setTimeout(() => {
      this.interval.clearAllIntervals();
      cancelAnimationFrame(this.requestframeid);
    }, 1000);
  }

  /**
   * Schedules the next animation frame for drawing.
   */
  scheduleNextFrame() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds multiple game objects to be drawn.
   * @param {Array} objects The array of game objects to be added.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds a single game object to be drawn.
   * @param {Object} mo The game object to be added.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (typeof mo.drawFrame === "function") {
      mo.drawFrame(this.ctx);
    }
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image horizontally for the given game object.
   * @param {Object} mo The game object whose image should be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the image to its original orientation after flipping.
   * @param {Object} mo The game object whose image should be restored.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
