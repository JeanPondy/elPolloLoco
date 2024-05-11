class Interval {
  constructor(world) {
    this.world = world;
  }

  /**
   * This method clears all intervals running for the game when it ends.
   */
  clearAllIntervals() {
    this.clearWorldInterval();
    this.clearCharacterIntervals();
    this.clearEnemyIntervals(Chicken);
    this.clearEnemyIntervals(ChickenSmall);
    this.clearEndbossIntervals();
    this.clearCloudIntervals();
    this.clearThrowableObjectIntervals();
  }

  /**
   * This method clears the main world interval responsible for collisions.
   */
  clearWorldInterval() {
    clearInterval(this.world.mainInterval);
  }

  /**
   * This method clears intervals related to the character.
   */
  clearCharacterIntervals() {
    const { movingAnimations, characterAnimations } = this.world.character;
    clearInterval(movingAnimations);
    clearInterval(characterAnimations);
  }

  /**
   * This method clears intervals for a specific type of enemy.
   * @param {class} enemyType The type of enemy to clear intervals for.
   */
  clearEnemyIntervals(enemyType) {
    this.world.level.enemies
      .filter((enemy) => enemy instanceof enemyType)
      .forEach((enemy) => {
        clearInterval(enemy.gravityAnimation);
        if (enemy instanceof Endboss) {
          clearInterval(enemy.movingAnimations);
          clearInterval(enemy.hurtAnimations);
          clearInterval(enemy.deadAnimations);
        }
      });
  }

  /**
   * This method clears intervals related to the endboss.
   */
  clearEndbossIntervals() {
    this.clearEnemyIntervals(Endboss);
  }

  /**
   * This method clears intervals related to clouds.
   */
  clearCloudIntervals() {
    this.world.level.clouds.forEach((cloud) => {
      clearInterval(cloud.movingAnimations);
    });
  }

  /**
   * This method clears intervals related to throwable objects.
   */
  clearThrowableObjectIntervals() {
    this.world.throwableObjects.forEach((tho) => {
      clearInterval(tho.gravityAnimation);
      clearInterval(tho.movingAnimations);
    });
  }
}
