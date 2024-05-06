class Level {
  enemies; // Array von Gegnerobjekten im Level
  clouds; // Array von Wolkenobjekten im Level
  bottles;
  backgroundObejcts; // Array von Hintergrundobjekten im Level
  level_end_x = 2600; // X-Position, die das Ende des Levels definiert

  constructor(enemies, clouds, backgroundObejcts, bottles) {
    this.enemies = enemies; // Initialisiere das Array der Gegner
    this.bottles = bottles;
    this.clouds = clouds; // Initialisiere das Array der Wolken
    this.backgroundObejcts = backgroundObejcts; // Initialisiere das Array der Hintergrundobjekte
  }
}
