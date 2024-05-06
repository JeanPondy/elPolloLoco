class ChickenSmall extends MovableObject {
  x = 100;
  y = 390;
  height = 40;
  width = 40;
  y = 360;
  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  chicken_sound = new Audio("audio/chicken.mp3"); // Audio-Objekt für Laufgeräusche

  constructor() {
    super(); // Aufruf des Konstruktors der Elternklasse (MovableObject)

    // Laden des Standard-Bilds für das Hühnchen
    this.loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    // Laden der Bilder für die Laufanimation des Hühnchens
    this.loadImages(this.IMAGES_WALKING);
    this.y = 390;
    // Zufällige X-Position für das Hühnchen innerhalb eines bestimmten Bereichs
    this.x = 400 + Math.random() * 1700;
    // Zufällige Bewegungsgeschwindigkeit des Hühnchens
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate(); // Starten der Animation des Hühnchens
  }

  // Animation des Hühnchens (Bewegung nach links und laufende Animation)
  animate() {
    // Periodische Bewegung des Hühnchens nach links
    setInterval(() => {
      // Abspielen des Laufgeräusches, wenn das Huhn zu laufen beginnt
      //this.chicken_sound.play();
      this.moveLeft(); // Bewegung des Hühnchens nach links
      this.chickenSmallAttack();
    }, 1000 / 60); // Aktualisierungsgeschwindigkeit der Bewegung (60 Frames pro Sekunde)

    // Periodisches Abspielen der Laufanimation des Hühnchens
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING); // Abspielen der Laufanimation
    }, 1000 / 5); // Geschwindigkeit der Laufanimation (5 Bilder pro Sekunde)
  }

  chickenSmallAttack() {
    if (this.attack) {
      this.speed = 1.5;
    }
  }
}
