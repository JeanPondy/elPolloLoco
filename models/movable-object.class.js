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

  /**
   * Applies gravity to the object.
   */
  applyGravity() {
    this.gravityAnimation = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is idle.
   * @returns {boolean} True if idle, false otherwise.
   */
  isIdle() {
    let idletime = new Date().getTime() - this.lastAction;
    idletime = idletime / 1000;
    return idletime < 5;
  }

  /**
   * Checks if the object has been idle for a long time.
   * @returns {boolean} True if long idle, false otherwise.
   */
  isLongIdle() {
    let idletime = new Date().getTime() - this.lastAction;
    idletime = idletime / 1000;
    return idletime > 5;
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if above ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y <= this.groundY;
    }
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {Object} mo The object to check collision with.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Checks if the object is colliding harshly with another object.
   * @param {Object} mo The object to check collision with.
   * @returns {boolean} True if colliding harshly, false otherwise.
   */
  isCollidingHarsch(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height
    );
  }

  /**
   * Removes the boss object.
   */
  removeBoss() {
    this.speedY = 10;
    this.applyGravity();
    setInterval(() => {
      this.x += 5;
      this.y += 10;
    }, 25);
  }

  /**
   * Removes the object from the screen.
   */
  removeObject() {
    this.speedY = 10;

    setTimeout(() => {
      this.x = -100;
    }, 30);
  }

  /**
   * Hits the object with a given value.
   * @param {number} val The value to hit the object with.
   */
  hit(val) {
    this.energy -= val;
    this.lastHit = new Date().getTime();
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  /**
   * Hits the endboss object with a given value.
   * @param {number} val The value to hit the endboss object with.
   */
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

  /**
   * Checks if the object is currently hurt.
   * @returns {boolean} True if hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.4;
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean} True if dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Moves the object to the right by its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Checks if the object is close to another object.
   * @param {Object} mo The object to check proximity with.
   * @returns {boolean} True if close, false otherwise.
   */
  isClose(mo) {
    return mo.x - (this.x + this.width) < 250;
  }

  /**
   * Plays animation with provided images.
   * @param {string[]} images Array of image paths for animation.
   */
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

  /**
   * Makes the object jump with optional speed.
   * @param {number} speedY The vertical speed of the jump.
   */
  jump(speedY = 30) {
    this.speedY = speedY;
  }

  /**
   * Calculates the distance between two points.
   * @param {number} x1 X-coordinate of the first point.
   * @param {number} y1 Y-coordinate of the first point.
   * @param {number} x2 X-coordinate of the second point.
   * @param {number} y2 Y-coordinate of the second point.
   * @returns {number} The distance between the points.
   */
  calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  /**
   * Checks the distance between two objects.
   * @param {Object} character The first object (character).
   * @param {Object} endboss The second object (endboss).
   * @returns {number} The distance between the objects.
   */
  checkDistance(character, endboss) {
    return this.calculateDistance(
      character.x,
      character.y,
      endboss.x,
      endboss.y
    );
  }
}
