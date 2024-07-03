class Coin extends MovableObject {
  y = 140;
  x = 300;
  offset = {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40,
  };
  /**
   * Creates an instance of Coin.
   * @param {number} x - The x-coordinate position of the coin.
   */
  constructor(x) {
    super();
    this.loadImage("img/8_coin/coin_1.png");
    this.x = x;
    this.height = 120;
    this.width = 120;
  }
}
