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
        if (
          this.world.character.isColliding(enemy) &&
          enemy.active &&
          !this.world.character.isHurt()
        ) {
          this.world.character.hit(40);
          this.world.character.lastAction = new Date().getTime();
          this.world.statusBar.setPercentage(this.world.character.energy);
        }
        if (
          enemy.x - this.world.character.x + this.world.character.width <
          550
        ) {
          enemy.attack = true;
        }
      });
  }

  characterHitEnemies() {
    this.world.level.enemies.forEach((enemy) => {
      // Überprüfen, ob der Charakter mit dem Feind kollidiert und der Feind aktiv ist
      if (
        (enemy instanceof ChickenSmall ||
          enemy instanceof Chicken ||
          enemy instanceof Endboss) &&
        this.world.character.isCollidingWith(enemy) &&
        enemy.active
      ) {
        // Überprüfen, ob der Charakter über dem Feind ist oder sich nach unten bewegt (fällt)
        const character = this.world.character;
        if (character.isAboveGround()) {
          // Hier wurde isAbove durch isAboveGround ersetzt
          if (enemy instanceof Endboss) {
            character.jump(30); // Charakter springt, wenn er den Endboss trifft
          }
          enemy.energy = 0; // Feind wird besiegt
          clearInterval(enemy.walkingAnimations);
          clearInterval(enemy.movingAnimations);
          // Weitere Aktionen bei Treffen ausführen (z. B. Animationen)
        }
      }
    });
  }

  characterHitEndbossWithBottle() {
    this.world.throwableObjects.forEach((bottle) => {
      let endboss = this.world.level.enemies.find(
        (enemy) => enemy instanceof Endboss && enemy.active
      );

      if (endboss && endboss.isColliding(bottle) && bottle.active) {
        endboss.endbossHit(this.world.bottlePower); // Reduziere die Energie des Endbosses entsprechend der Flaschenkraft
        this.world.bottle.splash(); // Spiele die Splash-Animation der Flasche ab
        this.world.bottle.removeObject(); // Entferne die Flasche aus der Spielwelt
        this.world.endbossBar.setPercentage(endboss.energy); // Aktualisiere die Endboss-Lebensleiste
        bottle.active = false; // Deaktiviere die Flasche, um weitere Kollisionen zu verhindern
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
