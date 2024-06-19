class Collision {
  constructor(world) {
    this.world = world; // Die Welt der Kollision initialisieren

    // Interval zum regelmäßigen Überprüfen von Kollisionen
    setInterval(() => {
      this.checkCollisions();
      this.checkGameEndConditions();
    }, 100);
  }

  // Methode zum Überprüfen von Kollisionen und Aufnehmen von Flaschen
  checkCollisions() {
    this.chickenSmallHitCharacter();
    this.collectBottles();
    this.collectCoins();
    this.enemiesHitCharacter();
    this.characterHitEnemies();
    this.chickenHitCharacter();
    this.checkEndbossProximity();
    this.characterHitEndbossWithBottle();
    this.endbossHitCharacter();
  }

  checkGameEndConditions() {
    if (this.world.character.energy <= 0 || this.isEndbossDefeated()) {
      this.world.gameEnd = true;
    }
  }

  isEndbossDefeated() {
    return this.world.level.enemies.some(
      (enemy) => enemy instanceof Endboss && enemy.energy <= 0
    );
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
        this.world.bottle_sound.play(); // Spiele den Sound für das Aufnehmen der Flasche ab
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
        coin.isToCollect = false; // Markiere die Münze als aufgenommen
        this.world.coinscore += 1; // Erhöhe den Münzzähler
        this.world.coinsBar.setPercentage(this.world.coinscore * 20); // Aktualisiere die Münzanzeige
        coin.removeObject(); // Entferne die Münze aus der Spielwelt
        this.world.coin_sound.play(); // Spiele den Sound für das Aufnehmen der Münze ab
      }
    });
  }

  enemiesHitCharacter(val = 15) {
    this.world.level.enemies.forEach((enemy) => {
      if (
        this.world.character.isColliding(enemy) &&
        enemy.active &&
        !this.world.character.isHurt() &&
        !this.world.character.isAboveGround() && // Charakter ist nicht über dem Boden
        enemy.energy > 0
      ) {
        this.world.character.hit(val); // Charakter wird getroffen mit dem angegebenen Wert 'val'
        this.world.statusBar.setPercentage(this.world.character.energy); // Aktualisieren des Energiebalkens
        this.world.playHurtSound(); // Abspielen des Verletzungssounds
      }
    });
  }
  chickenSmallHitCharacter() {
    this.world.level.enemies
      .filter((enemy) => enemy instanceof ChickenSmall)
      .forEach((enemy) => {
        if (
          this.world.character.isColliding(enemy) &&
          enemy.active &&
          !this.world.character.isHurt() &&
          !this.world.character.isAboveGround() && // Charakter ist nicht über dem Boden
          enemy.energy > 0
        ) {
          this.world.character.hit(10);
          this.world.character.lastAction = new Date().getTime();
          this.world.statusBar.setPercentage(this.world.character.energy);
        }
        /*   if (
          enemy.x - this.world.character.x + this.world.character.width <
          450
        ) {
          enemy.attack = true;
        } */
      });
  }

  chickenHitCharacter() {
    // Durchlaufe alle Feinde (Enemies) in der aktuellen Spielwelt
    this.world.level.enemies
      .filter((enemy) => enemy instanceof Chicken)
      .forEach((enemy) => {
        if (
          this.world.character.isColliding(enemy) &&
          enemy.active &&
          !this.world.character.isHurt() &&
          !this.world.character.isAboveGround() && // Charakter ist nicht über dem Boden
          enemy.energy > 0
        ) {
          this.world.character.hit(20);
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
  endbossHitCharacter() {
    this.world.level.enemies
      .filter((enemy) => enemy instanceof Endboss)
      .forEach((enemy) => {
        if (
          this.world.character.isColliding(enemy) &&
          enemy.active &&
          !this.world.character.isAboveGround()
        ) {
          this.world.character.energy = 0;
          this.world.character.lastAction = new Date().getTime();
          this.world.statusBar.setPercentage(this.world.character.energy);
          this.world.playHurtSound();
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

  characterHitEnemies() {
    this.world.level.enemies
      .filter(
        (enemy) =>
          enemy instanceof ChickenSmall ||
          enemy instanceof Chicken ||
          enemy instanceof Endboss
      )
      .forEach((enemy) => {
        if (
          this.world.character.isColliding(enemy) &&
          this.world.character.speedY < 0 &&
          this.world.character.isAboveGround() &&
          enemy.active
        ) {
          if (enemy instanceof Endboss) {
            this.world.character.jump(30);
            enemy.energy = 0; // Setze die Energie des Endbosses auf 0
            this.world.endbossBar.setPercentage(0); // Setze die Lebensleiste des Endbosses auf 0
          } else {
            enemy.energy = 0;
          }
          clearInterval(enemy.walkingAnimations);
          clearInterval(enemy.movingAnimations);
        }
      });
  }

  characterHitEndbossWithBottle() {
    const val = 35; // Festlegen des Werts für die Flaschenkraft

    this.world.throwableObjects.forEach((bottle) => {
      let endboss = this.world.level.enemies.find(
        (enemy) => enemy instanceof Endboss && enemy.active
      );

      if (endboss && endboss.isColliding(bottle) && bottle.active) {
        endboss.endbossHit(val);

        bottle.splash();
        bottle.removeObject();

        this.world.endbossBar.setPercentage(endboss.energy); // Aktualisiere die Endboss-Lebensleiste
        bottle.active = false;
      }
    });
  }
}
/* 
if (
  this instanceof Character ||
  this instanceof ChickenSmall ||
  this instanceof Chicken ||
  this instanceof Endboss ||
  this instanceof Bottle ||
  this instanceof Coin
) {
  // Prüfen, ob das Objekt eine Spielfigur oder ein Huhn ist
  ctx.beginPath();
  ctx.lineWidth = '5';
  ctx.strokeStyle = 'red';
  ctx.rect(this.x + this.offset.left, this.y + this.offset.top,(this.x + this.width - this.offset.right) - (this.x + this.offset.left),(this.y + this.height - this.offset.bottom) - (this.y + this.offset.top));
  ctx.stroke();
} */
