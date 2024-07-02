class Character extends MovableObject {
  width = 140;
  height = 290;
  x = 120;
  y = 43;
  offset = {
    top: 150,
    left: 50,
    right: 60,
    bottom: 10,
  };
  lastAction = 0;
  lastHit = 0;
  deadShown = false;
  speed = 10;
  world = null;
  hurtPlayed = false;
  walking_sound = new Audio("audio/running2.mp3");
  jumping_sound = new Audio("audio/jump.mp3");
  //hurt_sound = new Audio("audio/hurt2.mp3");
  dead_sound = new Audio("audio/man_dying.mp3");

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONGIDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  constructor() {
    super();

    this.loadImage(this.IMAGES_WALKING[0]);

    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONGIDLE);

    this.applyGravity();
    this.startAnimations();
    this.lastHitFromAbove = false;
  }

  startAnimations() {
    this.movingAnimations = setInterval(() => {
      this.walking_sound.pause();
      if (this.world) {
        this.characterMoveRight();
        this.characterMoveLeft();
        this.characterJump();
        this.world.camera_x = -this.x + 30;
      }
    }, 1000 / 60);

    this.characterAnimations = setInterval(() => {
      this.characterStates();
    }, 1000 / 20);
  }

  isFalling() {
    return this.speedY > 0;
  }

  isAboveEnemy(enemy) {
    const characterBottomY = this.y + this.height;
    const enemyTopY = enemy.y;

    return characterBottomY < enemyTopY;
  }

  characterMoveRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.lastAction = Date.now();
      this.moveRight();
      this.otherDirection = false;
      if (!isMuted) {
        this.walking_sound.play();
      }
    }
  }

  characterMoveLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.lastAction = Date.now();
      this.moveLeft();
      this.otherDirection = true;
      if (!isMuted) {
        this.walking_sound.play();
      }
    }
  }

  characterJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.lastAction = Date.now();
      this.jump();
      if (!isMuted) {
        this.jumping_sound.play();
      }
    }
  }

  characterStates() {
    if (this.isDead() && !this.deadShown) {
      this.gameOverState();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isLongIdle()) {
      this.playAnimation(this.IMAGES_LONGIDLE);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  gameOverState() {
    this.world.gameEnd = true;
    this.world.gameLost = true;
    this.playAnimation(this.IMAGES_DEAD);
    this.animateDead();
  }

  animateDead() {
    this.deadShown = true;
    if (!isMuted) {
      this.dead_sound.play();
    }
    setTimeout(() => {
      clearInterval(this.characterAnimations);
      clearInterval(this.movingAnimations);
      this.loadImage(this.IMAGES_DEAD[3]);
      clearInterval(this.world.level.enemies[6].movingAnimations);
    }, 1000);
  }

  hitFromAbove() {
    this.lastHitFromAbove = true;
    setTimeout(() => {
      this.lastHitFromAbove = false;
    }, 1000);
  }
}
