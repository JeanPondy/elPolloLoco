class Cloud extends MovableObject {
  constructor() {
    super();
    this.y = 20;
    this.height = 250;
    this.width = 500;

    // loadImage-Methode aufrufen, um das Bild zu laden
    this.loadImage("./img/5_background/layers/4_clouds/1.png");
    this.x = 0 + Math.random() * 500;
  }
}
