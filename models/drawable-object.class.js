class DrawableObject {
  audio;
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 270;
  height = 150;
  width = 100;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

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

  /* // Methode zum Zeichnen des Rahmens des Objekts (z. B. für Debugging-Zwecke)
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof ChickenSmall ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof Bottle ||
      this instanceof Coin
    ) {
      // Prüfen, ob das Objekt eine Spielfigur oder ein Huhn ist
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.x + this.width - this.offset.right - (this.x + this.offset.left),
        this.y + this.height - this.offset.bottom - (this.y + this.offset.top)
      );
      ctx.stroke();
    }
     {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    } 
  } */
}
