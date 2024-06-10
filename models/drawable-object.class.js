class DrawableObject {
  // Eigenschaften der Zeichenobjekte
  audio;
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 270;
  height = 150;
  width = 100;

  // Methode zum Laden eines Bildes
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      // Für jeden Bildpfad im Array
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  // Methode zum Zeichnen des Objekts auf dem Canvas
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

  // Methode zum Zeichnen des Rahmens des Objekts (z. B. für Debugging-Zwecke)
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
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
