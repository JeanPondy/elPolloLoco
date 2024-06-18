class Cloud extends MovableObject {
  constructor() {
    super(); // Aufruf des Konstruktors der Elternklasse (MovableObject)
    this.y = 20;
    this.height = 250;
    this.width = 500;

    // Laden des Standard-Bilds für die Wolke
    this.loadImage("./img/5_background/layers/4_clouds/1.png");
    // Zufällige X-Position für die Wolke innerhalb eines bestimmten Bereichs
    this.x = 0 + Math.random() * 500;
    this.animate(); // Starten der Animation der Wolke
  }

  // Animation der Wolke (Bewegung nach links)
  animate() {
    this.movingAnimations = setInterval(() => {
      this.moveLeft();
    }, 1000 / 40);
  }
}
