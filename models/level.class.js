class Level {
  enemies;
  clouds;
  backgroundObejcts;
  level_end_x = 2250;

  constructor(enemies, clouds, backgroundObejcts) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObejcts = backgroundObejcts;
  }
}
