class Endboss extends MovableObject {
  constructor() {
    super();
    this.x = 2500;
    this.y = 60;
    this.width = 250;
    this.height = 400;
    this.offset = {
      top: 80,
      left: 50,
      right: 50,
      bottom: 90,
    };
    this.speed = 4;
    this.alerted = false;
    this.angry = false;
    this.energy = 100;

    this.IMAGES_WALKING = [
      "img/4_enemie_boss_chicken/1_walk/G1.png",
      "img/4_enemie_boss_chicken/1_walk/G2.png",
      "img/4_enemie_boss_chicken/1_walk/G3.png",
      "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    this.IMAGES_HURT = [
      "img/4_enemie_boss_chicken/4_hurt/G21.png",
      "img/4_enemie_boss_chicken/4_hurt/G22.png",
      "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    this.IMAGES_DEAD = [
      "img/4_enemie_boss_chicken/5_dead/G24.png",
      "img/4_enemie_boss_chicken/5_dead/G25.png",
      "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.startWalkingAnimation();
    this.startHurtAnimation();
    this.startDeadCheck();
  }

  startWalkingAnimation() {
    this.walkingAnimation = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      this.moveLeft();
    }, 1000 / 10);
  }

  startHurtAnimation() {
    this.hurtAnimation = setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }
    }, 1000 / 10);
  }

  startDeadCheck() {
    this.deadCheck = setInterval(() => {
      if (this.isDead()) {
        this.handleDeath();
      } else if (this.alerted && !this.angry) {
        this.startAngryAnimation();
      }
    }, 1000 / 25);
  }

  startAngryAnimation() {
    this.angryAnimation = setTimeout(() => {
      this.playAnimation(this.IMAGES_ALERTED);
      this.angry = true;
      this.speed = 12;
    }, 1200);
  }

  handleDeath() {
    if (audio) {
      this.gamewon_sound.play();
    }
    world.gameEnd = true;
    world.gameWon = true;
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.removeObject();
    }, 1500);
    world.gameWon = true;
  }
}
