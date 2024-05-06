class EndbossBar extends DrawableObject {
  IMAGES_ENDBOSS = [
    "./img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "./img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "./img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "./img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "./img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "./img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  x = 500;
  y = 0;
  width = 200;
  height = 60;

  constructor() {
    super();
    this.loadImages(this.IMAGES_ENDBOSS);
    this.setPercentage(100);
  }

  /**
   * This sets the endboss health bar to a given percentage
   * @param {Number} percentage Sets the percentage of the bar
   */
  setPercentage(percentage) {
    this.percentage = percentage; // => 0 ... 5 and creates let percentage
    let path = this.IMAGES_ENDBOSS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * This resolves the percentage and sets the corresponding image
   * @returns {Number} Index of Image from IMAGE Array
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
