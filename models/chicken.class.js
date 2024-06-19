class Chicken extends MovableObject {
  constructor() {
    super();
    this.x = 400 + Math.random() * 1500;
    this.y = 360;
    this.height = 70;
    this.width = 70;
    this.offset = {
      top: 8,
      left: 10,
      right: 10,
      bottom: 8,
    };
    this.speed = 0.15 + Math.random() * 0.5;
    this.attack = false;
    this.crushPlayed = false;
    this.crush_sound = new Audio("audio/hurt2.mp3");

    this.IMAGES_WALKING = [
      "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    this.IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

    this.loadImage(this.IMAGES_WALKING[0]); // Laden des Standard-Bilds
    this.loadImages(this.IMAGES_WALKING); // Vorladen der Animationsbilder
    this.loadImages(this.IMAGES_DEAD); // Vorladen der Todesanimation

    // Animationen starten
    this.startAnimations();
  }

  startAnimations() {
    this.chickenAnimations = setInterval(() => {
      this.updateState();
    }, 1000 / 20);

    this.walkingAnimations = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 8);

    this.movingAnimations = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  updateState() {
    if (this.isDead()) {
      this.handleDeath();
    }

    if (this.attack && !this.attackSoundPlayed) {
      this.speed = 1.5;
    }
  }

  handleDeath() {
    this.active = false;
    this.playAnimation(this.IMAGES_DEAD);

    clearInterval(this.walkingAnimations);
    clearInterval(this.movingAnimations);

    setTimeout(() => {
      this.removeObject();
    }, 1500);

    if (!this.crushPlayed) {
      this.crush_sound.play();
      this.crushPlayed = true;
    }
  }
}
