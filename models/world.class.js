// in Welt ist unsere Spiel Logik

class World {
  character = new Character();
  level = level1;
  canvas;
  ctx; // mit context kann man funltion aufrufen
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar(); // statusBar1
  hurt_sound = new Audio("audio/hurt3.mp3");
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      // check Collisions
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.playHurtSound();
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        // Sound abspielen
        this.playHurtSound();
      }
    });
  }

  /* -------------------- */
  playHurtSound() {
    // Überprüfen, ob der Sound abgespielt wird
    if (this.hurt_sound.paused) {
      this.hurt_sound.play();
    } else {
      // Zurücksetzen, um den Sound erneut abzuspielen
      this.hurt_sound.currentTime = 0;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObejcts);
    /* -------Space for fixed Objects Start */
    this.ctx.translate(-this.camera_x, 0); //Back
    this.addToMap(this.statusBar); // statusBar2
    this.ctx.translate(this.camera_x, 0); //Forwards
    /* ------Space End */

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    // draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
  // extra Funktion
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }
  // extra Funktion
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save(); // alle Eigenschaft von ctx speichern
    this.ctx.translate(mo.width, 0); // Wir spiegeln das Bild um 180° andere Richtung
    this.ctx.scale(-1, 1); // nach recht verschieben
    mo.x = mo.x * -1;
  }
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
