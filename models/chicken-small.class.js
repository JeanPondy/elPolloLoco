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
    }, 1000 / 60); // Aktualisierungsgeschwindigkeit der Bewegung (60 Frames pro Sekunde)
    this.chickenSmallMoveLeft(); // Bewegung des Hühnchens nach links
    this.chickenSmallWalk();
  }

  chickenSmallAttack() {
    if (this.attack) {
      this.speed = 5.5;
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
/*   constructor() {
    super(); // Aufruf des Konstruktors der Elternklasse (MovableObject)

    this.x = 400 + Math.random() * 1700;
    this.y = 390;
    this.height = 40;
    this.width = 40;
    this.offset = {
      top: 8,
      left: 8,
      right: 8,
      bottom: 8,
    };
    this.speed = 0.15 + Math.random() * 0.5;

    this.IMAGES_WALKING = [
      "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];
    this.IMAGES_DEAD = ["./img/3_enemies_chicken/chicken_small/dead.png"];

    // Laden der Bilder für die Laufanimation des Hühnchens
    this.loadImages(this.IMAGES_WALKING);

    // Animationen starten
    this.startAnimations();
  }

  startAnimations() {
    // Periodische Bewegung des Hühnchens nach links
    this.chickenSmallAnimations = setInterval(() => {
      if (this.isDead()) {
        this.chickenSmallDead();
      } else {
        this.chickenSmallMoveLeft(); // Bewegung des Hühnchens nach links
        this.chickenSmallWalk(); // Laufanimation des Hühnchens abspielen
      }
    }, 1000 / 60); // Aktualisierungsgeschwindigkeit der Bewegung (60 Frames pro Sekunde)
  }

  // Periodisches Abspielen der Laufanimation des Hühnchens
  chickenSmallWalk() {
    this.playAnimation(this.IMAGES_WALKING); // Abspielen der Laufanimation
  }

  // Bewegung des Hühnchens nach links
  chickenSmallMoveLeft() {
    this.moveLeft(); // Bewegung des Hühnchens nach links
  }

  // Methode zur Behandlung des Todes des Hühnchens
  chickenSmallDead() {
    this.active = false; // Huhn als inaktiv markieren
    this.playAnimation(this.IMAGES_DEAD); // Todesanimation des Hühnchens abspielen

    // Hühnchen nach einer Verzögerung entfernen
    setTimeout(() => {
      this.removeObject(); // Huhn aus der Spielwelt entfernen
    }, 1500);
  } */
