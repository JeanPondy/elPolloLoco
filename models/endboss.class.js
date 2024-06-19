class Endboss extends MovableObject {
  constructor() {
    super();
    this.x = 2500;
    this.y = 60;
    this.width = 250;
    this.height = 400;
    this.offset = {
      top: 80,
      left: 30,
      right: 30,
      bottom: 20,
    };
    this.speed = 4;
    this.alerted = false;
    this.angry = false;
    this.energy = 100;
    this.active = true; // Der Endboss ist aktiv

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

    this.IMAGES_ALERTED = [
      "img/4_enemie_boss_chicken/2_alert/G5.png",
      "img/4_enemie_boss_chicken/2_alert/G6.png",
      "img/4_enemie_boss_chicken/2_alert/G7.png",
      "img/4_enemie_boss_chicken/2_alert/G8.png",
      "img/4_enemie_boss_chicken/2_alert/G9.png",
      "img/4_enemie_boss_chicken/2_alert/G10.png",
      "img/4_enemie_boss_chicken/2_alert/G11.png",
      "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];
    this.nugget_sound = new Audio("audio/hurt4.mp3");
    this.gamewon_sound = new Audio("audio/dyingChicken.mp3"); //win sound

    this.hadFirstContact = false;
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ALERTED);

    this.animate();
  }

  animate() {
    this.endbossWalk();
    this.endbossHurt();
    this.endbossDeadCheck();
  }

  endbossWalk() {
    this.movingAnimations = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      this.moveLeft();
    }, 1000 / 10);
  }

  endbossHurt() {
    this.hurtAnimations = setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }
    }, 1000 / 10);
  }

  endbossDeadCheck() {
    this.deadAnimations = setInterval(() => {
      if (this.isDead()) {
        this.endbossDead();
      } else if (this.alerted && !this.angry) {
        this.endbossAngry();
      }
    }, 1000 / 25);
  }

  endbossDead() {
    if (audio) {
      this.gamewon_sound.play();
    }
    world.gameEnd = true;
    world.gameWon = true;
    this.playAnimation(this.IMAGES_DEAD);
    this.removeObject();
    // END OF THE GAME
    world.gameWon = true;
  }

  endbossAngry() {
    setTimeout(() => {
      this.playAnimation(this.IMAGES_ALERTED);
      this.angry = true;
      this.speed = 12;
    }, 1200);
  }
}
