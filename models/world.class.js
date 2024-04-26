class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgroundObejcts = [
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
  ];
  canvas;
  ctx; // mit context kann man funltion aufrufen
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }
  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObejcts);
    this.addToMap(this.character);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enemies);
    this.ctx.translate(-this.camera_x, 0);

    // draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
  // extra Funktion
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }
  // extra Funktion
  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save(); // alle Eigenschaft von ctx speichern
      this.ctx.translate(mo.width, 0); // Wir spiegeln das Bild um 180° andere Richtung
      this.ctx.scale(-1, 1); // nach recht verschieben
      mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}
