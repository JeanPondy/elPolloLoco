class Cloud extends MovableObject {
  constructor() {
    super();
    this.y = 20;
    this.height = 250;
    this.width = 500;
    this.loadImage("./img/5_background/layers/4_clouds/1.png");
    this.x = 0 + Math.random() * 500;
    this.animate();
  }
  /**
   * Animates the object by moving it to the left at a set interval.
   */
  animate() {
    this.movingAnimations = setInterval(() => {
      this.moveLeft();
    }, 1000 / 40);
  }
}
