class MovableObject extends DrawableObject {
  constructor() {
    super();
    this.speed = 0.15;
    this.otherDirection = false;
    this.speedY = 0;
    this.acceleration = 3;
    this.energy = 100;
    this.isToCollect = true;
    this.groundY = 143;
    this.active = true;
    this.lastHit = 0;
  }

  chickenAnimations;
  walkingAnimations;
  characterAnimations;
  movingAnimations;
  chickenSmallAnimations;
  hurtAnimations;
  deadAnimations;
  gravityAnimation;

  applyGravity() {
    this.gravityAnimation = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isIdle() {
    let idletime = new Date().getTime() - this.lastAction;
    idletime = idletime / 1000;
    return idletime < 5;
  }

  isLongIdle() {
    let idletime = new Date().getTime() - this.lastAction;
    idletime = idletime / 1000;
    return idletime > 5;
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y <= this.groundY;
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }
  isCollidingHarsch(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height
    );
  }

  removeBoss() {
    this.speedY = 10;
    this.applyGravity();
    setInterval(() => {
      this.x += 5;
      this.y += 10;
    }, 25);
  }

  removeObject() {
    this.speedY = 10;

    setTimeout(() => {
      this.x = -100;
    }, 300);
  }

  hit(val) {
    this.energy -= val;
    this.lastHit = new Date().getTime();
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  endbossHit(val) {
    this.energy -= val;
    const yReduction = (this.height * 3) / 10;
    this.height -= yReduction;
    this.width -= (this.width * 3) / 10;
    this.y += yReduction;
    this.speed -= 4;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.4;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  isClose(mo) {
    return mo.x - (this.x + this.width) < 250;
  }

  playAnimation(images) {
    if (Array.isArray(images) && images.length > 0) {
      let i = this.currentImage % images.length;
      let path = images[i];
      if (this.imageCache && this.imageCache[path]) {
        this.img = this.imageCache[path];
        this.currentImage++;
      } else {
        console.error(`Bildpfad '${path}' nicht im Cache gefunden.`);
      }
    } else {
      console.error("Ungültiges oder leeres Array von Bildpfaden.");
    }
  }

  jump(speedY = 30) {
    this.speedY = speedY;
  }

  calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  checkDistance(character, endboss) {
    return this.calculateDistance(
      character.x,
      character.y,
      endboss.x,
      endboss.y
    );
  }
}
