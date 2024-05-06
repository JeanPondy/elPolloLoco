class Coin extends MovableObject {
  y = 140;
  x = 300;

  constructor(x) {
    super();
    this.loadImage("img/8_coin/coin_1.png");
    this.x = x;
    this.height = 120;
    this.width = 120;
  }
}
