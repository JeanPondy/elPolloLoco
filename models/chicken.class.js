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
    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length; //let i = 7%6; Rest 1
      // i = 0,1,2,3,4,5, 0,1,2,3,4,5, 0,1,2,3,4,5,0 ....
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 1000 / 10);
  }
}
