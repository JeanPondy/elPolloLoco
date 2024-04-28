class Chicken extends MovableObject {
  width = 55; // Standardbreite festlegen
  height = 65; // Standardhöhe festlegen
  y = 360;

  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super();

    // loadImage-Methode aufrufen, um das Bild zu laden
    this.loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.5; //Chicken mit unterschiedlich geschwindigkeit laufen
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 5);
  }
}
