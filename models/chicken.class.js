class Chicken extends MovableObject {
  constructor() {
    super();
    this.x = 400 + Math.random() * 1500;
    this.y = 360;
    this.height = 70;
    this.width = 70;
    this.offset = {
      top: 8,
      left: 25,
      right: 25,
      bottom: 8,
    };
    this.speed = 0.15 + Math.random() * 0.5;
    /*   this.offset = {
      top: 8,
      left: 25,
      right: 25,
      bottom: 8,
    }; */
    this.attack = false;
    this.crushPlayed = false;
    this.crush_sound = new Audio("audio/hurt2.mp3");

    // this.DYINGCHICKEN_SOUND = AUDIO("dyingChicken.mp3");

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
    // Intervalle für die Animationen
    this.chickenAnimations = setInterval(() => {
      this.updateState(); // Zustand überprüfen (Angriff, Tod)
    }, 1000 / 20);

    this.walkingAnimations = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING); // Laufanimation abspielen
    }, 1000 / 8);

    this.movingAnimations = setInterval(() => {
      this.moveLeft(); // Nach links bewegen
    }, 1000 / 60);
  }

  updateState() {
    if (this.isDead()) {
      this.handleDeath(); // Aktionen ausführen, wenn das Huhn tot ist
    }

    if (this.attack && !this.attackSoundPlayed) {
      this.speed = 1.5; // Geschwindigkeit erhöhen, wenn das Huhn angreift
    }
  }

  handleDeath() {
    this.active = false; // Deaktivieren, damit es nicht mehr in der Spielwelt angezeigt wird
    this.playAnimation(this.IMAGES_DEAD); // Todesanimation abspielen

    clearInterval(this.walkingAnimations); // Laufanimation stoppen
    clearInterval(this.movingAnimations); // Bewegungsanimation stoppen

    setTimeout(() => {
      this.removeObject(); // Nach einer Verzögerung das Huhn aus der Spielwelt entfernen
    }, 1500);

    if (audio && !this.crushPlayed) {
      this.crush_sound.play(); // Sound abspielen, wenn das Huhn stirbt
      this.crushPlayed = true; // Markieren, dass der Sound abgespielt wurde
    }
  }
}
