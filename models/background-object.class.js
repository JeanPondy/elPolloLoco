class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;
  constructor(imagePath, x) {
    //  super().loadImage(imagePath);
    super(); // Superklasse aufrufen
    this.loadImage(imagePath); // loadImage-Methode aufrufen, um das Bild zu laden
    this.x = x;
    this.y = 480 - this.height; // Canvashöhe - BackgroundObjectshöhe( 480 - 400 = 80)
  }
}
