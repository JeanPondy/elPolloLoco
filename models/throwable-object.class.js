class ThrowableObject extends MovableObject {
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  IMAGES_ROTATE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super();

    this.loadImage(this.IMAGES_ROTATE[0]);
    this.loadImages(this.IMAGES_SPLASH);
    this.loadImages(this.IMAGES_ROTATE);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;

    this.throw();
  }

  /**
   * Sets the initial speed and animation for throwing the object.
   * Starts moving the object horizontally and applies gravity.
   */
  throw() {
    this.speedY = 15; // Set vertical speed
    this.applyGravity();
    this.movingAnimations = setInterval(() => {
      this.x += 20;
      this.playAnimation(this.IMAGES_ROTATE);
    }, 25);
  }

  /**
   * Stops the throwing animation and plays the splash animation.
   * Removes the object from the screen after a delay.
   */
  splash() {
    clearInterval(this.movingAnimations);
    this.playAnimation(this.IMAGES_SPLASH);
    setTimeout(() => {
      this.removeObject();
    }, 1500);
  }
}
