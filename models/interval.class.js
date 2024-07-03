class Interval {
  constructor(world) {
    this.world = world;
  }

  clearAllIntervals() {
    this.clearWorldInterval();
    this.clearCharacterIntervals();
    this.clearChickenIntervals();
    this.clearChickenSmallIntervals();
    this.clearEndbossIntervals();
    this.clearCloudIntervals();
    this.clearThrowableObjectIntervals();
  }

  clearWorldInterval() {
    clearInterval(this.world.mainInterval);
  }

  clearCharacterIntervals() {
    clearInterval(this.world.character.movingAnimations);
    clearInterval(this.world.character.characterAnimations);
  }

  clearChickenIntervals() {
    this.world.level.enemies
      .filter((enemy) => enemy instanceof Chicken)
      .forEach((enemy) => {
        clearInterval(enemy.gravityAnimation);
        clearInterval(enemy.walkingAnimations);
        clearInterval(enemy.movingAnimations);
      });
  }

  clearChickenSmallIntervals() {
    this.world.level.enemies
      .filter((enemy) => enemy instanceof ChickenSmall)
      .forEach((enemy) => {
        clearInterval(enemy.walkingAnimations);
        clearInterval(enemy.movingAnimations);
      });
  }

  clearEndbossIntervals() {
    this.world.level.enemies
      .filter((enemy) => enemy instanceof Endboss)
      .forEach((enemy) => {
        clearInterval(enemy.movingAnimations);
        clearInterval(enemy.hurtAnimations);
        clearInterval(enemy.deadAnimations);
      });
  }

  clearCloudIntervals() {
    this.world.level.clouds.forEach((cloud) => {
      clearInterval(cloud.movingAnimations);
    });
  }

  clearThrowableObjectIntervals() {
    this.world.throwableObjects.forEach((tho) => {
      clearInterval(tho.gravityAnimation);
      clearInterval(tho.movingAnimations);
    });
  }
}
