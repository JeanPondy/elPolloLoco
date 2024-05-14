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

  throw_sound = new Audio("audio/throw.mp3");
  splash_sound = new Audio("audio/splash.mp3");
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    // Laden des Bildes für das werfbare Objekt (z. B. Salsa-Flasche)
    this.loadImage(this.IMAGES_ROTATE[0]);
    this.loadImages(this.IMAGES_SPLASH);
    this.loadImages(this.IMAGES_ROTATE);
    // Starten der Wurfanimation
    this.throw();
  }
  //Methode für werfbaren Objekten

  throw() {
    this.speedY = 15;
    this.applyGravity();
    this.movingAnimations = setInterval(() => {
      this.x += 20;
      this.playAnimation(this.IMAGES_ROTATE);
    }, 25);
  }

  splash() {
    clearInterval(this.movingAnimations);
    this.playAnimation(this.IMAGES_SPLASH);
    if (audio) {
      this.splash_sound.play();
    }
    setTimeout(() => {
      this.removeObject();
    }, 1500);
  }
}
