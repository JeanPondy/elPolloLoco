class MovableObject {
  x = 120;
  y = 270;
  img;
  height = 150;
  width = 100;
  imageCache = {};

  // 1.Bilder Einfügen
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
  /**
   *
   * @param {Array} arr - ['img/image1.png','img/image1.png', ... ]
   */

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = path;
    });
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {}
}
