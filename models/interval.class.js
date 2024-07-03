class Interval {
  constructor(world) {
    this.world = world;
  }

  /**
   * Clears all intervals related to the world, characters, enemies, clouds, and throwable objects.
   */
  clearAllIntervals() {
    this.clearWorldInterval();
    this.clearCharacterIntervals();
    this.clearChickenIntervals();
    this.clearChickenSmallIntervals();
    this.clearEndbossIntervals();
    this.clearCloudIntervals();
    this.clearThrowableObjectIntervals();
  }

  /**
   * Clears the main interval of the world.
   */
  clearWorldInterval() {
    clearInterval(this.world.mainInterval);
  }

  /**
   * Clears intervals related to the character.
   */
  clearCharacterIntervals() {
    clearInterval(this.world.character.movingAnimations);
    clearInterval(this.world.character.characterAnimations);
  }

  /**
   * Clears intervals related to Chicken enemies.
   */
  clearChickenIntervals() {
    this.world.level.enemies
      .filter((enemy) => enemy instanceof Chicken)
      .forEach((enemy) => {
        clearInterval(enemy.gravityAnimation);
        clearInterval(enemy.walkingAnimations);
        clearInterval(enemy.movingAnimations);
      });
  }

  /**
   * Clears intervals related to ChickenSmall enemies.
   */
  clearChickenSmallIntervals() {
    this.world.level.enemies
      .filter((enemy) => enemy instanceof ChickenSmall)
      .forEach((enemy) => {
        clearInterval(enemy.walkingAnimations);
        clearInterval(enemy.movingAnimations);
      });
  }

  /**
   * Clears intervals related to Endboss enemies.
   */
  clearEndbossIntervals() {
    this.world.level.enemies
      .filter((enemy) => enemy instanceof Endboss)
      .forEach((enemy) => {
        clearInterval(enemy.movingAnimations);
        clearInterval(enemy.hurtAnimations);
        clearInterval(enemy.deadAnimations);
      });
  }

  /**
   * Clears intervals related to cloud objects.
   */
  clearCloudIntervals() {
    this.world.level.clouds.forEach((cloud) => {
      clearInterval(cloud.movingAnimations);
    });
  }

  /**
   * Clears intervals related to throwable objects.
   */
  clearThrowableObjectIntervals() {
    this.world.throwableObjects.forEach((tho) => {
      clearInterval(tho.gravityAnimation);
      clearInterval(tho.movingAnimations);
    });
  }
}
