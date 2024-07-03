class Endscreen {
  static gameOverSoundPlayed = false;
  static winningSoundPlayed = false;
  constructor(gameWon) {
    this.gameWon = gameWon;
    this.loadImage();
  }
  /**
   * Loads the appropriate image based on the game outcome (win or loss).
   * If the game is won, it plays a winning sound. Otherwise, it calls the gameOver method.
   */
  loadImage() {
    this.img = new Image();
    if (this.gameWon) {
      this.img.src = "img/9_intro_outro_screens/game_over/you_won_bold.png";
      if (!Endscreen.winningSoundPlayed) {
        Endscreen.winningSoundPlayed = true;
        setTimeout(() => {
          if (!isMuted) {
            winning_sound.play();
          }
        }, 3000);
      }
    } else {
      this.gameOver();
    }
  }

  /**
   * Sets the game over image and plays the game over sound if it hasn't been played already.
   */
  gameOver() {
    this.img.src = "img/9_intro_outro_screens/game_over/youlosto.png";
    if (!Endscreen.gameOverSoundPlayed) {
      Endscreen.gameOverSoundPlayed = true;
      setTimeout(() => {
        if (!isMuted) {
          game_over_sound.play();
        }
      }, 2500);
    }
  }

  /**
   * Draws the loaded image on the given canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
