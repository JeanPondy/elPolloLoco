class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super(); // Aufruf des Konstruktors der Elternklasse (MovableObject)
    // Laden des Bildes für das werfbare Objekt (z. B. Salsa-Flasche)
    this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
    // Festlegen der Anfangsposition und Größe des werfbaren Objekts
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    // Starten der Wurfanimation
    this.throw();
  }
  //Methode für werfbaren Objekten
  throw() {
    this.speedY = 30; // Setzen der vertikalen Wurfgeschwindigkeit (nach oben)
    this.applyGravity(); // Anwenden der Gravitation auf das werfbare Objekt
    // Animation für das Horizontalscrollen des geworfenen Objekts
    setInterval(() => {
      this.x += 10; // Bewegung um 10 Pixel nach rechts
    }, 25); //pro 25 Millisekunden
  }
}
