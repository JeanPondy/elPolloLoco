class DrawableObject {
  audio;
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 270;
  height = 150;
  width = 100;

  /**
   * Loads an image from the specified path.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images and stores them in the image cache.
   * @param {string[]} arr - An array of paths to the image files.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the current image on the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    if (this.img) {
      try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      } catch (e) {
        console.warn("Error when rendering the image ", e);
        console.log(this.img.src);
      }
    }
  }
}
