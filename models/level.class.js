class Level {
  enemies; // Array von Gegnerobjekten im Level
  clouds; // Array von Wolkenobjekten im Level
  backgroundObjects;
  bottles;
  coins;
  level_end_x = 2600; // X-Position, die das Ende des Levels definiert

  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies; // Initialisiere das Array der Gegner
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects; // Initialisiere das Array der Hintergrundobjekte
    this.bottles = bottles;
    this.coins = coins;
  }
}
