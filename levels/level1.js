/* let level1; 
initLevel(){
  level1 = new Level(alle Arrays)
} */

const level1 = new Level(
  // Array mit Feinden und dem Endboss
  [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Endboss(),
  ],
  // Array mit Wolken-Objekten
  [new Cloud()], // Neues Cloud-Objekt
  // Array mit Hintergrundobjekten (BackgroundObjects)
  [
    new BackgroundObject("./img/5_background/layers/air.png", -719),
    new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject(
      "./img/5_background/layers/2_second_layer/2.png",
      -719
    ),
    new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("./img/5_background/layers/air.png", 0),
    new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("./img/5_background/layers/air.png", 719),
    new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("./img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject(
      "./img/5_background/layers/3_third_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "./img/5_background/layers/2_second_layer/1.png",
      719 * 2
    ),
    new BackgroundObject(
      "./img/5_background/layers/1_first_layer/1.png",
      719 * 2
    ),
    new BackgroundObject("./img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject(
      "./img/5_background/layers/3_third_layer/2.png",
      719 * 3
    ),
    new BackgroundObject(
      "./img/5_background/layers/2_second_layer/2.png",
      719 * 3
    ),
    new BackgroundObject(
      "./img/5_background/layers/1_first_layer/2.png",
      719 * 3
    ),
    new BackgroundObject("./img/5_background/layers/air.png", 719 * 4),
    new BackgroundObject(
      "./img/5_background/layers/3_third_layer/1.png",
      719 * 4
    ),
    new BackgroundObject(
      "./img/5_background/layers/2_second_layer/1.png",
      719 * 4
    ),
    new BackgroundObject(
      "./img/5_background/layers/1_first_layer/1.png",
      719 * 4
    ),
  ],
  [
    new Bottle(300),
    new Bottle(650),
    new Bottle(1220),
    new Bottle(1480),
    new Bottle(1620),
    new Bottle(1860),
  ],
  [
    new Coin(500),
    new Coin(750),
    new Coin(950),
    new Coin(1000),
    new Coin(1400),
    new Coin(1550),
    new Coin(2050),
  ]
);
