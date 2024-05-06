class Bottle extends MovableObject {
  y = 365;
  x = 300;

  IMAGES_BOTTLES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor(x) {
    super();

    let randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLES.length);
    let randomImage = this.IMAGES_BOTTLES[randomIndex];

    // Laden des ausgewählten Bildes
    this.loadImage(randomImage);

    // Setzen der x-Position des Objekts
    this.x = x;

    // Festlegen der Höhe und Breite des Objekts
    this.height = 60;
    this.width = 70;
  }
}
/* super();
// Laden des Standard-Bilds für das Hühnchen
this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
// Laden der Bilder für die Laufanimation des Hühnchens
this.loadImages(this.IMAGES_BOTTLES);

// Setzen der x-Position des Objekts
this.x = x;

// Festlegen der Höhe und Breite des Objekts
this.height = 60;
this.width = 70;
} */
