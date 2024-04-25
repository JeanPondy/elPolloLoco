class Character extends MovableObject {
  width = 160; // Standardbreite festlegen
  height = 290; // Standardhöhe festlegen
  x = 120;
  y = 143;
  constructor() {
    super();
    // 2.Bilder Einfügen
    this.loadImage("./img/2_character_pepe/2_walk/W-21.png");
  }
  jump() {}
}
