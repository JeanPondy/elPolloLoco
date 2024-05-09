// in Welt ist unsere Spiel Logik

class World {
  collision = new Collision();

  character = new Character(); // Erstellen des Spielcharakters
  statusBar = new StatusBar(); // statusBar1 // Erstellen der Statusleiste
  bottlesBar = new BottlesBar();
  coinsBar = new CoinsBar();
  endbossBar = new EndbossBar();
  hurt_sound = new Audio("audio/hurt3.mp3"); // Audio für Verletzungssound
  //bottlesBar = new BottlesBar(); // Endboss Health Bar
  level = level1; // Festlegen des Spiellevels
  canvas;
  ctx; // mit context kann man funltion aufrufen
  keyboard;
  camera_x = 0; // X-Position der Kamera (für Kameraverfolgung)

  throwableObjects = []; // Array für werfbare Objekte
  totalBottles = 5;
  bottlePower = 30;
  bottlescore = 0;
  coinTotal = 5;
  coinscore = 0;
  bottle;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // Kontext für das Zeichnen auf dem Canvas
    this.canvas = canvas;
    this.keyboard = keyboard; // Tastatursteuerung für die Spielwelt
    this.draw(); // Starten der Zeichenfunktion
    this.setWorld(); // Initialisieren der Spielwelt
    this.run(); // Starten der Spiellogik
  }
  // Verknüpfung des Charakters mit der Spielwelt
  setWorld() {
    this.character.world = this;
    this.collision.world = this;
  }
  // Hauptfunktion zur Ausführung der Spiellogik (wird wiederholt aufgerufen)
  run() {
    setInterval(() => {
      this.collision.checkCollisions(); // Kollisionsüberprüfung zwischen Charakter und Feinden
      this.checkThrowObjects(); // Überprüfung zum Werfen von Objekten
    }, 200); // Zeitintervall für die Ausführung der Überprüfungen
  }

  // Überprüfung und Ausführung des Wurfens von Objekten
  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      ); // Erstellen eines neuen werfbaren Objekts (Flasche)
      this.throwableObjects.push(bottle); // Hinzufügen des Objekts zum Array
      this.playHurtSound(); // Abspielen des Verletzungssounds ....später für werfen
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
