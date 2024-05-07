class ThrowableObject extends MovableObject {
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  IMAGES_ROTATE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  constructor(x, y) {
    super(); // Aufruf des Konstruktors der Elternklasse (MovableObject)
    // Laden des Bildes für das werfbare Objekt (z. B. Salsa-Flasche)
    this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.IMAGES_SPLASH);
    this.loadImages(this.IMAGES_ROTATE);
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
      this.x += 10;
      this.playAnimation(this.IMAGES_ROTATE);
    }, 25); //pro 25 Millisekunden
  }
}
