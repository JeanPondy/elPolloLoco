class BackgroundObject extends MovableObject {
  // Festlegen der Breite und Höhe des Hintergrundobjekts
  width = 720; // Breite des Hintergrundobjekts (entspricht der Canvas-Breite)
  height = 480; // Höhe des Hintergrundobjekts (entspricht der Canvas-Höhe)

  constructor(imagePath, x) {
    super(); // Aufruf des Konstruktors der Elternklasse (MovableObject)

    this.loadImage(imagePath); // Laden des Hintergrundbilds anhand des übergebenen Bildpfads
    this.x = x; // Setzen der horizontalen Position (X-Koordinate) des Hintergrundobjekts
    this.y = 480 - this.height; // Setzen der vertikalen Position (Y-Koordinate) basierend auf der Höhe des Hintergrundobjekts
  }
}
