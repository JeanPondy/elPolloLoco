class Character extends MovableObject {
  width = 160; // Standardbreite festlegen
  height = 290; // Standardhöhe festlegen
  x = 120;
  y = 43; // war y = 143 px
  speed = 10;
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];
  world;
  walking_sound = new Audio("audio/running2.mp3");

  constructor() {
    super();
    // 2.Bilder Einfügen
    this.loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.applyGravity();
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        // Character bleibt links im Bild
        this.x -= this.speed;
        this.otherDirection = true;
        this.walking_sound.play();
      }
      this.world.camera_x = -this.x + 100; //Character weiter 100px nach links
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        // walk animation
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 20);
  }

  jump() {}
}
