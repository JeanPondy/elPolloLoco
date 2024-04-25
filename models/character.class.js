class Character extends MovableObject {
  width = 160; // Standardbreite festlegen
  height = 290; // Standardhöhe festlegen
  x = 120;
  y = 143;
  constructor() {
    super();
    // 2.Bilder Einfügen
    this.loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.loadImages([
      "./img/2_character_pepe/2_walk/W-21.png",
      "./img/2_character_pepe/2_walk/W-22.png",
      "./img/2_character_pepe/2_walk/W-23.png",
      "./img/2_character_pepe/2_walk/W-24.png",
      "./img/2_character_pepe/2_walk/W-25.png",
      "./img/2_character_pepe/2_walk/W-26.png",
    ]);
  }
  jump() {}
}
