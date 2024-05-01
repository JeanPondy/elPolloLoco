class Character extends MovableObject {
  // Definiere die Eigenschaften der Spielfigur
  width = 160; // Breite der Spielfigur
  height = 290; // Höhe der Spielfigur
  x = 120; // Start-X-Position der Spielfigur
  y = 43; // Start-Y-Position der Spielfigur (angepasst auf 43px)
  speed = 10; // Bewegungsgeschwindigkeit der Spielfigur
  world; // Referenz auf die Spielwelt, in der sich die Spielfigur befindet
  walking_sound = new Audio("audio/running2.mp3"); // Audio-Objekt für Laufgeräusche

  // Array mit Bildpfaden für verschiedene Animationen der Spielfigur
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];

  constructor() {
    super(); // Aufruf des Konstruktors der Elternklasse (MovableObject)

    // Lade die Standard-Bildressource für die Spielfigur
    this.loadImage("./img/2_character_pepe/2_walk/W-21.png");

    // Lade alle Bilder für die verschiedenen Animationen der Spielfigur
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);

    this.applyGravity(); // Wende die Schwerkraft auf die Spielfigur an
    this.animate(); // Starte die Animation der Spielfigur
  }

  // Animationen der Spielfigur
  animate() {
    // Animation für Bewegungen und Tastensteuerung der Spielfigur
    setInterval(() => {
      this.walking_sound.pause(); // Unterbreche die Audio-Wiedergabe

      // Bewegungssteuerung basierend auf der Tastaturbedienung
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false; // Spielfigur schaut nach rechts
        this.walking_sound.play(); // Spiele Laufgeräusche ab
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true; // Spielfigur schaut nach links
        this.walking_sound.play(); // Spiele Laufgeräusche ab
      }

      // Springen der Spielfigur bei Betätigung der Leertaste
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump(); // Funktion für das Springen aufrufen
      }

      this.world.camera_x = -this.x + 100; // Kamera-Verfolgung der Spielfigur
    }, 1000 / 60); // Aktualisierungsgeschwindigkeit der Animation

    // Animation für Status und Aktivitäten der Spielfigur
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD); // Spielfigur ist gestorben
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT); // Spielfigur ist verletzt
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING); // Spielfigur springt
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING); // Spielfigur läuft
        }
      }
    }, 1000 / 20); // Aktualisierungsgeschwindigkeit der Animation
  }

  // Funktion für das Springen der Spielfigur
  jump() {
    this.speedY = 30; // Setze die Sprunggeschwindigkeit der Spielfigur
  }
}
