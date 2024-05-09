class Collision {
  constructor(world) {
    this.world = world; // Die Welt der Kollision initialisieren
  }

  // Methode zum Überprüfen von Kollisionen und Aufnehmen von Flaschen
  checkCollisions() {
    this.collectBottles();
    this.collectCoins();
    this.enemiesHitCharacter();
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
        this.playHurtSound(); // Abspielen des Verletzungssounds
      }
    });
  }
}
