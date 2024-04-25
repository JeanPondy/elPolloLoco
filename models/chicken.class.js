class Chicken extends MovableObject {
  width = 55; // Standardbreite festlegen
  height = 65; // Standardhöhe festlegen

  y = 360;

  constructor() {
    super();

    // loadImage-Methode aufrufen, um das Bild zu laden
    this.loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 200 + Math.random() * 500;
  }
}
