class ChickenSmall extends MovableObject {
  x = 100;
  y = 390;
  height = 40;
  width = 40;
  y = 360;
  offset = {
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
  };
  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
  chicken_sound = new Audio("audio/chicken.mp3"); // Audio-Objekt für Laufgeräusche

  constructor() {
    super(); // Aufruf des Konstruktors der Elternklasse (MovableObject)

    // Laden des Standard-Bilds für das Hühnchen
    this.loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    // Laden der Bilder für die Laufanimation des Hühnchens
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.y = 390;
    // Zufällige X-Position für das Hühnchen innerhalb eines bestimmten Bereichs
    this.x = 400 + Math.random() * 1700;
    // Zufällige Bewegungsgeschwindigkeit des Hühnchens
    this.speed = 0.15 + Math.random() * 0.5;
    // Animationen starten
    this.startAnimations();
  }

  // Animation des Hühnchens (Bewegung nach links und laufende Animation)
  startAnimations() {
    // Periodische Bewegung des Hühnchens nach links
    this.chickenSmallAnimations = setInterval(() => {
      this.chickenSmallAttack();
      if (this.isDead()) {
        this.chickenSmallDead();
      }
      // Abspielen des Laufgeräusches, wenn das Huhn zu laufen beginnt
      //this.chicken_sound.play();
    }, 1000 / 20); // Aktualisierungsgeschwindigkeit der Bewegung (60 Frames pro Sekunde)
    this.chickenSmallMoveLeft(); // Bewegung des Hühnchens nach links
    this.chickenSmallWalk();
  }

  chickenSmallAttack() {
    if (this.attack) {
      this.speed = 2.5;
    }
  }
  chickenSmallDead() {
    this.active = false;
    this.playAnimation(this.IMAGES_DEAD);
    clearInterval(this.walkInt);
    clearInterval(this.moveInt);
    setTimeout(() => {
      this.removeObject();
    }, 1500);
  }

  // Periodisches Abspielen der Laufanimation des Hühnchens
  chickenSmallWalk() {
    this.walkingAnimations = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING); // Abspielen der Laufanimation
    }, 1000 / 8); // Geschwindigkeit der Laufanimation (5 Bilder pro Sekunde)
  }
  chickenSmallMoveLeft() {
    this.movingAnimations = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
