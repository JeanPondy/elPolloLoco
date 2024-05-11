class Collision {
  constructor(world) {
    this.world = world; // Die Welt der Kollision initialisieren
  }

  // Methode zum Überprüfen von Kollisionen und Aufnehmen von Flaschen
  checkCollisions() {
    this.collectBottles();
    this.collectCoins();
    this.enemiesHitCharacter();
    this.characterHitEnemies();
    this.chickenHitCharacter();

    this.checkEndbossProximity();
    this.characterHitEndbossWithBottle();
    this.endbossHitCharacter();
  }

  // Methode zum Aufnehmen von Flaschen durch den Charakter
  collectBottles() {
    this.world.level.bottles.forEach((bottle) => {
      if (
        this.world.character.isColliding(bottle) &&
        this.world.bottlescore < 5 &&
        bottle.isToCollect
      ) {
        bottle.isToCollect = false; // Markiere die Flasche als aufgenommen
        this.world.bottlescore += 1; // Erhöhe den Flaschenzähler
        this.world.bottlesBar.setPercentage(this.world.bottlescore * 20); // Aktualisiere die Flaschenanzeige
        bottle.removeObject(); // Entferne die Flasche aus der Spielwelt
        if (audio) {
          this.world.bottle_sound.play(); // Spiele den Sound für das Aufnehmen der Flasche ab
        }
      }
    });
  }

  collectCoins() {
    this.world.level.coins.forEach((coin) => {
      if (
        this.world.character.isColliding(coin) &&
        this.world.coinscore < 5 &&
        coin.isToCollect
      ) {
        coin.isToCollect = false; // Markiere die Flasche als aufgenommen
        this.world.coinscore += 1; // Erhöhe den Flaschenzähler
        this.world.coinsBar.setPercentage(this.world.coinscore * 20); // Aktualisiere die Flaschenanzeige
        coin.removeObject(); // Entferne die Flasche aus der Spielwelt
        if (audio) {
          this.world.coin_sound.play(); // Spiele den Sound für das Aufnehmen der Flasche ab
        }
      }
    });
  }

  enemiesHitCharacter() {
    this.world.level.enemies.forEach((enemy) => {
      if (this.world.character.isColliding(enemy)) {
        this.world.character.hit(); // Charakter wird getroffen
        this.world.statusBar.setPercentage(this.world.character.energy); // Aktualisieren des Energiebalkens
        // Sound abspielen
        this.world.playHurtSound(); // Abspielen des Verletzungssounds
      }
    });
  }

  chickenHitCharacter() {
    // Durchlaufe alle Feinde (Enemies) in der aktuellen Spielwelt
    this.world.level.enemies
      .filter((enemy) => enemy instanceof Chicken) // Filtere nur nach Chicken-Feinden
      .forEach((enemy) => {
        // Überprüfe, ob der Character mit dem aktuellen Chicken kollidiert und der Chicken aktiv ist und der Character nicht verletzt ist
        if (
          this.world.character.isColliding(enemy) && // Kollisionsprüfung zwischen Character und Chicken
          enemy.active && // Der Chicken ist aktiv (nicht tot)
          !this.world.character.isHurt() // Der Character ist nicht bereits verletzt
        ) {
          // Wenn die obigen Bedingungen erfüllt sind:
          this.world.character.hit(40); // Character wird mit einem Schaden von 80 Punkten getroffen
          this.world.character.lastAction = new Date().getTime(); // Aktualisiere den Zeitpunkt der letzten Aktion des Characters
          this.world.statusBar.setPercentage(this.world.character.energy); // Aktualisiere die Gesundheitsleiste des Characters
        }

        // Überprüfe, ob der Chicken sich dem Character auf weniger als 550 Pixel nähert
        if (
          enemy.x - this.world.character.x + this.world.character.width <
          550
        ) {
          enemy.attack = true;
        }
      });
  }

  characterHitEnemies() {
    this.world.level.enemies
      .filter(
        (enemy) =>
          enemy instanceof ChickenSmall ||
          enemy instanceof Chicken ||
          enemy instanceof Endboss
      )
      .forEach((enemy) => {
        // Überprüfen, ob der Charakter von oben auf den Feind trifft
        if (
          this.world.character.isColliding(enemy) &&
          this.world.character.speedY > 0 && // Charakter bewegt sich nach unten (nach unten fallen)
          enemy.active
        ) {
          enemy.energy = 0; // Feind wird besiegt
          clearInterval(enemy.walkingAnimations);
          clearInterval(enemy.movingAnimations);
          // Füge hier weitere Aktionen hinzu, die bei einem Kopfstoß ausgeführt werden sollen
        }
      });
  }
  characterHitEndbossWithBottle() {
    this.world.throwableObjects.forEach((bottle) => {
      let endboss =
        this.world.level.enemies[this.world.level.enemies.length - 1];
      if (endboss.isColliding(bottle) && bottle.active) {
        endboss.endbossHit(this.world.bottlePower);
        this.world.bottle.splash();
        this.world.bottle.removeObject();
        this.world.endbossBar.setPercentage(endboss.energy);
        bottle.active = false;
      }
    });
  }

  endbossHitCharacter() {
    this.world.level.enemies
      .filter((enemy) => enemy instanceof Endboss)
      .forEach((enemy) => {
        if (this.world.character.isColliding(enemy) && enemy.active) {
          this.world.character.energy = 0;
          this.world.character.lastAction = new Date().getTime();
          this.world.healthBar.setPercentage(this.world.character.energy);
        }
      });
  }

  checkEndbossProximity() {
    const endboss =
      this.world.level.enemies[this.world.level.enemies.length - 1];
    if (this.world.character.isClose(endboss)) {
      endboss.alerted = true;
    }
  }
}
