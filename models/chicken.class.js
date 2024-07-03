class Chicken extends MovableObject {
  constructor() {
    super();
    this.x = 400 + Math.random() * 1500;
    this.y = 365;
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
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.startAnimations();
  }

  startAnimations() {
    this.chickenActions();
    this.chickenWalkingAnimations();
    this.chickenMovingAnimations();
  }

  chickenActions() {
    this.chickenAnimations = setInterval(() => {
      this.updateState();
    }, 1000 / 20);
  }
  chickenWalkingAnimations() {
    this.walkingAnimations = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 8);
  }

  chickenMovingAnimations() {
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
    clearInterval(this.walkingAnimationImages);
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.x = -100;
    }, 300);
  }
}
