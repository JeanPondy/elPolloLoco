class StatusBar extends DrawableObject {
  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_HEALTH[0]);
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 10;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }
  /**
   * Sets the percentage value and updates the image based on the percentage.
   * @param {number} percentage - The percentage value to set (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage; // Set the percentage value
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the current percentage to determine the appropriate image index.
   * @returns {number} - The index of the image array based on the current percentage.
   */
  resolveImageIndex() {
    if (this.percentage === 100) {
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
