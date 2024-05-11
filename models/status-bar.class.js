class StatusBar extends DrawableObject {
  //Array für verschiedenen Bildern der Statusleiste enthält, die den Gesundheitszustand in verschiedenen Prozentsätzen darstellen.
  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  constructor() {
    super(); // Aufruf des Konstruktors der Elternklasse (DrawableObject)
    this.loadImage(this.IMAGES_HEALTH[0]);
    // Laden aller Bilder für die Statusleiste
    this.loadImages(this.IMAGES_HEALTH);
    // Festlegen der Position und Größe der Statusleiste
    this.x = 10;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100); // Standardmäßige Anzeige der Statusleiste mit vollem Prozentwert
  }

  // Methode zum Setzen des Prozentsatzes der Statusleiste
  setPercentage(percentage) {
    this.percentage = percentage; // Aktualisieren des prozentualen Werts
    // Bestimmen des Pfads des Bildes anhand des prozentualen Werts
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    // Laden des entsprechenden Bildes aus dem Cache
    this.img = this.imageCache[path];
  }
  // Methode zur Bestimmung des Index des Anzeigebildes basierend auf dem Prozentsatz
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
