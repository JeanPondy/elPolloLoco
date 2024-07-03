class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  level_end_x = 2600;

  /**
   * Constructs a new World object with given arrays of enemies, clouds, background objects, bottles, and coins.
   * @param {Object[]} enemies Array of enemy objects.
   * @param {Object[]} clouds Array of cloud objects.
   * @param {Object[]} backgroundObjects Array of background objectss.
   * @param {Object[]} bottles Array of bottle objects.
   * @param {Object[]} coins Array of coin objects.
   */
  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
