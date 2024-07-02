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

    this.loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");

    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.y = 390;

    this.x = 400 + Math.random() * 1700;

    this.speed = 0.15 + Math.random() * 0.5;
    // Animationen starten
    this.startAnimations();
  }

  startAnimations() {
    this.chickenSmallAnimations = setInterval(() => {
      this.chickenSmallAttack();
      if (this.isDead()) {
        this.chickenSmallDead();
      }
      //this.chicken_sound.play();
    }, 1000 / 20);
    this.chickenSmallMoveLeft();
    this.chickenSmallWalk();
  }

  chickenSmallAttack() {
    if (this.attack) {
      this.speed = 1.5;
    }
  }
  chickenSmallDead() {
    this.active = false;
    this.playAnimation(this.IMAGES_DEAD);
    clearInterval(this.walkInt);
    clearInterval(this.moveInt);
    setTimeout(() => {
      this.x = -100;
    }, 300);
  }

  chickenSmallWalk() {
    this.walkingAnimations = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 8);
  }

  chickenSmallMoveLeft() {
    this.movingAnimations = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
