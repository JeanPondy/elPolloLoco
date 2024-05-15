class Endboss extends MovableObject {
  // Definiere die Eigenschaften der Endgegner-Spielfigur
  height = 400; // Höhe des Endgegners
  width = 250; // Breite des Endgegners
  y = 60; // Start-Y-Position des Endgegners
  x = 2500; // Start-X-Position des Endgegners
  offset = {
    top: 80,
    left: 50,
    right: 50,
    bottom: 90,
  };
  speed = 4; // Bewegungsgeschwindigkeit des Endgegners
  alerted = false; // Flag, um anzuzeigen, ob der Endgegner alarmiert ist
  angry = false; // Flag, um anzuzeigen, ob der Endgegner wütend ist
  energy = 100; // Energie/Lebenspunkte des Endgegners
  yreduction; // Veränderung der Y-Position

  // Bildpfade für verschiedene Animationen des Endgegners
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_ALERTED = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  // Audio-Objekte für Soundeffekte
  nugget_sound = new Audio("audio/chickennugget.mp3");
  gamewon_sound = new Audio("audio/win.mp3");

  hadFirstContact = false; // Flag, um anzuzeigen, ob der erste Kontakt stattgefunden hat

  constructor() {
    super();
    // Lade das erste Bild für die Standardanimation
    this.loadImage(this.IMAGES_WALKING[0]);
    // Lade alle Bilder für die verschiedenen Animationen des Endgegners
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ALERTED);
    // Starte die Animation des Endgegners
    this.startAnimations();
  }

  // Starte die verschiedenen Animationen des Endgegners
  startAnimations() {
    this.endbossWalk(); // Animation der Gehbewegung
    this.endbossHurt(); // Animation des Verletztseins
    this.endbossDeadCheck(); // Überprüfung des Todeszustands des Endgegners
  }

  // Animation der Gehbewegung des Endgegners
  endbossWalk() {
    this.movingAnimations = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING); // Spiele die Gehanimationsbilder ab
      this.moveLeft(); // Bewege den Endgegner nach links
    }, 1000 / 10); // Aktualisierungsgeschwindigkeit der Animation
  }

  // Animation des Verletztseins des Endgegners
  endbossHurt() {
    this.hurtAnimations = setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT); // Spiele die Verletzungsanimationsbilder ab, wenn der Endgegner verletzt ist
      }
    }, 1000 / 10); // Aktualisierungsgeschwindigkeit der Animation
  }

  // Überprüfung des Todeszustands des Endgegners
  endbossDeadCheck() {
    this.deadAnimations = setInterval(() => {
      if (this.isDead()) {
        this.endbossDead(); // Wenn der Endgegner tot ist, starte die Todesanimation
      } else if (this.alerted && !this.angry) {
        this.endbossAngry(); // Wenn der Endgegner alarmiert ist und nicht wütend, starte die Wutanimation
      }
    }, 1000 / 25); // Aktualisierungsgeschwindigkeit der Überprüfung
  }

  // Todesanimation des Endgegners
  endbossDead() {
    // Spiele den Gewinn-Soundeffekt, wenn der Endgegner stirbt
    if (audio) {
      this.gamewon_sound.play();
    }
    // Setze das Spielende-Flag und das Spielgewonnen-Flag in der Spielwelt
    world.gameEnd = true;
    world.gameWon = true;
    // Starte die Todesanimation des Endgegners
    this.playAnimation(this.IMAGES_DEAD);
    // Entferne den Endgegner aus dem Spiel
    this.removeObject();
    // Setze das Spielgewonnen-Flag in der Spielwelt
    // END OF THE GAME
    world.gameWon = true;
  }

  // Wutanimation des Endgegners
  endbossAngry() {
    // Verzögere die Wutanimation um 1200 Millisekunden
    setTimeout(() => {
      this.playAnimation(this.IMAGES_ALERTED); // Spiele die Wutanimationsbilder ab
      this.angry = true; // Setze den Endgegner in den wütenden Zustand
      this.speed = 12; // Erhöhe die Geschwindigkeit des Endgegners
    }, 1200); // Verzögerungsdauer der Wutanimation
  }
}
