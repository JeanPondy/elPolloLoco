class MovableObject {
  x = 120;
  y = 250;
  img;
  height = 150;
  width = 100;
  // 1.Bilder Einfügen
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {}
}