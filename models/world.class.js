class World {
  gameOver = false;
  gameEnd = false;
  gameLost = false;
  gameWon = false;
  collision = new Collision(this); // Hier wird 'this' übergeben
  character = new Character();
  statusBar = new StatusBar();
  bottlesBar = new BottlesBar();
  coinsBar = new CoinsBar();
  endbossBar = new EndbossBar();

  keyboard = new Keyboard();
  level = level1;
  canvas;
  ctx;

  camera_x = 0;
  audioEnabled = true; // Neuer Audio-Status innerhalb der World-Klasse

  throwableObjects = [];
  totalBottles = 5;
  bottlePower = 30;
  bottlescore = 0;
  coinTotal = 5;
  coinscore = 0;
  bottle;
  hurt_sound = new Audio("audio/hurt3.mp3");
  backgroundSound = new Audio("audio/backgroundSound.mp3");
  coin_sound = new Audio("audio/hurt3.mp3");
  bottle_sound = new Audio("audio/hurt3.mp3");
  throw_sound = new Audio("audio/shot_bottle.mp3"); // Neuer Sound für das Werfen der Flasche
  mainInterval;
  throwObjectsInterval;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = level1; // Initialisierung von level
    this.setupEventListeners(); // Event-Listener einrichten
    this.draw();
    this.setWorld();
    this.run();
    this.throwObject();
  }

  setupEventListeners() {
    // Beispiel: Audio-Wiedergabe beim Drücken einer Taste erlauben
    document.addEventListener(
      "keydown",
      () => {
        this.enableAudio();
      },
      { once: true }
    ); // Nur einmalig ausführen
  }
  enableAudio() {
    this.playAndResetSound(this.hurt_sound);
    this.playAndResetSound(this.backgroundSound);
    this.playAndResetSound(this.coin_sound);
    this.playAndResetSound(this.bottle_sound);
    this.playAndResetSound(this.throw_sound);
  }

  playAndResetSound(sound) {
    this.playSound(sound);
    this.resetSound(sound);
  }

  playSound(sound) {
    sound.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });
  }

  resetSound(sound) {
    sound.pause();
    sound.currentTime = 0;
  }

  setWorld() {
    this.character.world = this;
    this.collision.world = this;
  }

  run() {
    this.mainInterval = setInterval(() => {
      this.collision.checkCollisions();
      if (this.audioEnabled) {
        // Überprüfe den Audio-Status vor dem Abspielen des Hintergrundsounds
        this.playBackgroundMusic();
      }
    }, 200);
  }

  throwObject() {
    this.throwObjectsInterval = setInterval(() => {
      this.throwObjects();
    }, 1000 / 10);
  }

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
      this.playThrowSound(); // Sound für das Werfen der Flasche abspielen
    }
  }

  playBackgroundMusic() {
    let self = this;
    this.backgroundSound.addEventListener("canplaythrough", function () {
      self.backgroundSound.play();
      self.backgroundSound.volume = 0.1;
    });
  }

  playThrowSound() {
    this.throw_sound.currentTime = 0; // Setzt den Sound auf den Anfang zurück
    this.throw_sound.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });
  }

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

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawStatusBars();
    this.drawGameObjects();
    this.scheduleNextFrame();

    this.checkGameEnd();
  }

  drawBackground() {
    if (!this.level || !this.level.backgroundObjects) {
      console.error("Level or backgroundObjects is not defined");
      return;
    }

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.bottlesBar);
    this.addToMap(this.coinsBar);
    this.addToMap(this.endbossBar);
  }

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

  checkGameEnd() {
    if (this.gameEnd) {
      // Audio-Wiedergabe stoppen
      this.hurt_sound.pause();
      this.backgroundSound.pause();
      this.coin_sound.pause();
      this.bottle_sound.pause();

      if (this.gameWon) {
        this.addToMap(new Endscreen(true));
      } else {
        this.addToMap(new Endscreen(false));
      }

      setTimeout(() => {
        this.stopAllAnimations();
      }, 1500);
    }
  }

  scheduleNextFrame() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  stopAllAnimations() {
    this.gameOver = true; // Setzt das Spiel auf beendet
    setTimeout(() => {
      clearInterval(this.mainInterval);
      clearInterval(this.throwObjectsInterval);
    }, 1000);
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

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

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
