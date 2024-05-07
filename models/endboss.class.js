class Endboss extends MovableObject {
  width = 300; // Breite des Endbosses
  height = 400; // Höhe des Endbosses
  y = 55; // Y-Position des Endbosses

  // Array mit Bildpfaden für die Geh-Animation des Endbosses
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERTED = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  constructor() {
    super(); // Aufruf des Konstruktors der Elternklasse (MovableObject)
    this.loadImage(this.IMAGES_WALKING[0]); // Lade das erste Bild der Geh-Animation
    this.loadImages(this.IMAGES_WALKING); // Lade alle Bilder der Geh-Animation in den Cache
    this.loadImages(this.IMAGES_ALERTED);
    this.x = 2800; // X-Position des Endbosses auf dem Canvas

    this.speed = 10;
    this.animate(); // Starte die Animation des Endbosses
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING); // Spiele die Geh-Animation des Endbosses
      this.moveLeft();
    }, 200); // Aktualisierungsrate der Animation (alle 200 Millisekunden)
  }
}
