// in Welt ist unsere Spiel Logik

class World {
  gemeEnd = false;
  gameLost = false;
  gameWon = false;
  collision = new Collision();
  interval = new Interval();
  character = new Character();
  statusBar = new StatusBar();
  bottlesBar = new BottlesBar();
  coinsBar = new CoinsBar();
  endbossBar = new EndbossBar();

  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  throwableObjects = [];
  throw;
  totalBottles = 5;
  bottlePower = 30;
  bottlescore = 0;
  coinTotal = 5;
  coinscore = 0;
  bottle;
  hurt_sound = new Audio("audio/hurt3.mp3");
  backgroundSound = new Audio("audio/music.mp3");
  coin_sound = new Audio("audio/coin.mp3");
  bottle_sound = new Audio("audio/bottle.mp3");
  mainInterval;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // Kontext für das Zeichnen auf dem Canvas
    this.canvas = canvas;
    this.keyboard = keyboard; // Tastatursteuerung für die Spielwelt
    this.draw(); // Starten der Zeichenfunktion
    this.setWorld(); // Initialisieren der Spielwelt
    this.run(); // Starten der Spiellogik
    this.throwObject();
  }
  // Verknüpfung des Charakters mit der Spielwelt
  setWorld() {
    this.character.world = this;
    this.collision.world = this;
    this.interval.world = this;
  }
  // Hauptfunktion zur Ausführung der Spiellogik (wird wiederholt aufgerufen)
  run() {
    this.mainInterval = setInterval(() => {
      this.collision.checkCollisions();
    }, 200);
  }

  throwObject() {
    this.throwObjectsInterval = setInterval(() => {
      this.throwObjects();
    }, 1000 / 10);
  }
  // Überprüfung und Ausführung des Wurfens von Objekten
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
    }
  }

  /* -------------------- */
  // Funktion zum Abspielen des Verletzungssounds
  playHurtSound() {
    if (this.hurt_sound.paused) {
      this.hurt_sound.play(); // Abspielen des Sounds, falls nicht bereits abgespielt
    } else {
      // Zurücksetzen, um den Sound erneut abzuspielen
      this.hurt_sound.currentTime = 0; // Zurücksetzen des Sounds, um ihn erneut abzuspielen
    }
  }

  // Methode zu Zeichnen der gesamten Spielwelt und ihrer Objekte

  draw() {
    // Zurücksetzen des Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Kamera-Übersetzung für die Spielwelt
    this.ctx.translate(this.camera_x, 0);
    // Hinzufügen der Hintergrundobjekte zur Karte
    this.addObjectsToMap(this.level.backgroundObejcts);
    /* -------Space for fixed Objects Start */
    // Zeichnen der festen Objekte (z. B. Statusleiste)
    this.ctx.translate(-this.camera_x, 0); // Zurücksetzen der Übersetzung
    this.addToMap(this.statusBar); // Zeichnen der Statusleiste
    this.addToMap(this.bottlesBar);
    this.addToMap(this.coinsBar);
    this.addToMap(this.endbossBar);
    this.ctx.translate(this.camera_x, 0); // Erneutes Anwenden der Kamera-Übersetzung
    /* ------Space End */

    // Hinzufügen und Zeichnen von Charakter, Wolken, Feinden und werfbaren Objekten
    this.addToMap(this.character);
    //this.addToMap(this.bottlesBar);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObjects);
    // Zurücksetzen der Kamera-Übersetzung
    this.ctx.translate(-this.camera_x, 0);

    // draw() wird immer wieder aufgerufen
    // Animationsschleife durch Aufruf der draw-Funktion mit requestAnimationFrame
    let self = this;
    requestAnimationFrame(function () {
      self.draw(); // Fortlaufendes Zeichnen der Spielwelt
    });
  }

  // extra Funktion
  // Methode zu Hinzufügen einer Liste von Objekten zur Karte
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object); // Hinzufügen jedes Objekts zur Karte
    });
  }
  // extra Funktion
  // Zeichnen eines einzelnen Objekts auf der Karte
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo); // Spiegeln des Objekts, falls erforderlich
    }
    mo.draw(this.ctx); // Zeichnen des Objekts

    mo.drawFrame(this.ctx); // Zeichnen des Rahmens um das Objekt (falls Charakter oder Feind)

    if (mo.otherDirection) {
      this.flipImageBack(mo); // Rückgängig machen der Spiegelung des Objekts
    }
  }
  // Funktion zum Spiegeln eines Objekts (z. B. Charakter)
  flipImage(mo) {
    this.ctx.save(); // Speichern der aktuellen Zeichenkonfiguration
    this.ctx.translate(mo.width, 0); // Übersetzen des Kontexts
    this.ctx.scale(-1, 1); // Spiegeln des Zeichenkontexts
    mo.x = mo.x * -1; // Anpassen der X-Position des Objekts für die Spiegelung
  }
  // Funktion zum Rückgängigmachen der Spiegelung eines Objekts
  flipImageBack(mo) {
    mo.x = mo.x * -1; // Rückgängigmachen der X-Position des Objekts
    this.ctx.restore(); // Wiederherstellen der gespeicherten Zeichenkonfiguration
  }
}
