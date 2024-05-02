class Level {
  enemies; // Array von Gegnerobjekten im Level
  clouds; // Array von Wolkenobjekten im Level
  backgroundObejcts; // Array von Hintergrundobjekten im Level
  level_end_x = 2600; // X-Position, die das Ende des Levels definiert

  constructor(enemies, clouds, backgroundObejcts) {
    this.enemies = enemies; // Initialisiere das Array der Gegner
    this.clouds = clouds; // Initialisiere das Array der Wolken
    this.backgroundObejcts = backgroundObejcts; // Initialisiere das Array der Hintergrundobjekte
  }
}
