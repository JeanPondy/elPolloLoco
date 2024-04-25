class Character extends MovableObject {
  width = 140; // Standardbreite festlegen
  height = 250; // Standardhöhe festlegen
  x = 120;
  y = 180;
  constructor() {
    super();
    // 2.Bilder Einfügen
    this.loadImage("./img/2_character_pepe/2_walk/W-21.png");
  }
  jump() {}
}
