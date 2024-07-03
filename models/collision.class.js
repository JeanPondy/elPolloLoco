class Collision {
  constructor(world) {
    this.world = world;

    setInterval(() => {
      this.checkCollisions();
      this.checkGameEndConditions();
    }, 100);
  }
  /**
   * Checks for various collisions and interactions in the game.
   */
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

  /**
   * Checks if the game end conditions are met.
   */
  checkGameEndConditions() {
    if (this.world.character.energy <= 0 || this.isEndbossDefeated()) {
      this.world.gameEnd = true;
    }
  }

  /**
   * Checks if the endboss is defeated.
   * @returns {boolean} - True if the endboss is defeated, false otherwise.
   */
  isEndbossDefeated() {
    return this.world.level.enemies.some(
      (enemy) => enemy instanceof Endboss && enemy.energy <= 0
    );
  }

  /**
   * Collects bottles if the character collides with them.
   */
  collectBottles() {
    this.world.level.bottles.forEach((bottle) => {
      if (
        this.world.character.isColliding(bottle) &&
        this.world.bottlescore < 5 &&
        bottle.isToCollect
      ) {
        bottle.isToCollect = false;
        this.world.bottlescore += 1;
        this.world.bottlesBar.setPercentage(this.world.bottlescore * 20);
        bottle.removeObject();
        if (!isMuted) {
          this.world.bottle_sound.play();
        }
      }
    });
  }

  /**
   * Collects coins if the character collides with them.
   */
  collectCoins() {
    this.world.level.coins.forEach((coin) => {
      if (
        this.world.character.isColliding(coin) &&
        this.world.coinscore < 5 &&
        coin.isToCollect
      ) {
        coin.isToCollect = false;
        this.world.coinscore += 1;
        this.world.coinsBar.setPercentage(this.world.coinscore * 20);
        coin.removeBoss();
        if (!isMuted) {
          this.world.coin_sound.play();
        }
      }
    });
  }

  /**
   * Handles collisions between enemies and the character.
   * @param {number} [val=15] - The damage value to apply.
   */
  enemiesHitCharacter(val = 15) {
    this.world.level.enemies.forEach((enemy) => {
      if (
        this.world.character.isColliding(enemy) &&
        enemy.active &&
        !this.world.character.isHurt() &&
        !this.world.character.isAboveGround() &&
        enemy.energy > 0
      ) {
        this.world.character.hit(val);
        this.world.statusBar.setPercentage(this.world.character.energy);
        if (!isMuted) {
          this.world.playHurtSound();
        }
      }
    });
  }

  /**
   * Handles collisions between small chickens and the character.
   */
  chickenSmallHitCharacter() {
    this.world.level.enemies
      .filter((enemy) => enemy instanceof ChickenSmall)
      .forEach((enemy) => {
        if (
          this.world.character.isColliding(enemy) &&
          enemy.active &&
          !this.world.character.isHurt() &&
          !this.world.character.isAboveGround() &&
          enemy.energy > 0
        ) {
          if (!isMuted) {
            this.world.hurt_sound.play();
          }
          this.world.character.hit(10);
          this.world.character.lastAction = new Date().getTime();
          this.world.statusBar.setPercentage(this.world.character.energy);
        }
      });
  }

  /**
   * Handles collisions between regular chickens and the character.
   */
  chickenHitCharacter() {
    this.world.level.enemies
      .filter((enemy) => enemy instanceof Chicken)
      .forEach((enemy) => {
        if (
          this.world.character.isColliding(enemy) &&
          enemy.active &&
          !this.world.character.isHurt() &&
          !this.world.character.isAboveGround() &&
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

  /**
   * Handles collisions between the endboss and the character.
   */
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
          if (!isMuted) {
            this.world.playHurtSound();
          }
        }
      });
  }

  /**
   * Checks if the character is close to the endboss to alert it.
   */
  checkEndbossProximity() {
    const endboss =
      this.world.level.enemies[this.world.level.enemies.length - 1];
    if (this.world.character.isClose(endboss)) {
      endboss.alerted = true;
    }
  }

  /**
   * Handles collisions between the character and enemies.
   */
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
          if (!isMuted) {
            this.world.collisionCharacterEnemies_sound.play();
          }
          if (enemy instanceof Endboss) {
            this.world.character.jump(30);
            enemy.energy = 0;
            this.world.endbossBar.setPercentage(0);
          } else {
            enemy.energy = 0;
          }
          clearInterval(enemy.walkingAnimations);
          clearInterval(enemy.movingAnimations);
        }
      });
  }

  /**
   * Handles collisions between throwable objects and the endboss.
   */
  characterHitEndbossWithBottle() {
    const val = 35;
    this.world.throwableObjects.forEach((bottle) => {
      let endboss = this.world.level.enemies.find(
        (enemy) => enemy instanceof Endboss && enemy.active
      );
      if (endboss && endboss.isColliding(bottle) && bottle.active) {
        endboss.endbossHit(val);
        bottle.splash();
        bottle.removeObject();
        if (!isMuted) {
          this.world.splash_sound.play();
        }
        this.world.endbossBar.setPercentage(endboss.energy);
        bottle.active = false;
      }
    });
  }
}
