class DrawableObject {
  // Eigenschaften der Zeichenobjekte
  img; // Referenz auf das Bildobjekt
  imageCache = {}; // Cache für geladene Bilder
  currentImage = 0; // Index des aktuellen Bildes im Cache
  x = 120; // X-Position (horizontale Position) des Objekts
  y = 270; // Y-Position (vertikale Position) des Objekts
  height = 150; // Höhe des Objekts
  width = 100; // Breite des Objekts

  // Methode zum Laden eines Bildes
  loadImage(path) {
    this.img = new Image(); // Neues Image-Objekt erstellen
    this.img.src = path; // Bildpfad zuweisen
  }

  // Methode zum Zeichnen des Objekts auf dem Canvas
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // Bild auf dem Canvas zeichnen
  }

  // Methode zum Zeichnen des Rahmens des Objekts (z. B. für Debugging-Zwecke)
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      // Prüfen, ob das Objekt eine Spielfigur oder ein Huhn ist
      ctx.lineWidth = "2"; // Linienbreite für den Rahmen festlegen
      ctx.strokeStyle = "blue"; // Rahmenfarbe festlegen
      ctx.beginPath(); // Neuen Pfad beginnen
      ctx.rect(this.x, this.y, this.width, this.height); // Rechteck um das Objekt zeichnen
      ctx.stroke(); // Rahmen zeichnen
    }
  }

  /**
   * Methode zum Laden einer Liste von Bildpfaden in den Bildcache
   * @param {Array} arr - Array von Bildpfaden ['img/image1.png','img/image2.png', ... ]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      // Für jeden Bildpfad im Array
      let img = new Image(); // Neues Image-Objekt erstellen
      img.src = path; // Bildpfad zuweisen
      this.imageCache[path] = img; // Bild im Cache speichern
    });
  }
}
