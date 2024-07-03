class Endscreen {
  static gameOverSoundPlayed = false;
  static winningSoundPlayed = false;
  constructor(gameWon) {
    this.gameWon = gameWon;
    this.loadImage();
  }

  loadImage() {
    this.img = new Image();
    if (this.gameWon) {
      this.img.src = "img/9_intro_outro_screens/game_over/you_won_bold.png";
      if (!Endscreen.winningSoundPlayed) {
        Endscreen.winningSoundPlayed = true;
        setTimeout(() => {
          winning_sound.play();
        }, 3000);
      }
    } else {
      this.gameOver();
    }
  }

  gameOver() {
    this.img.src = "img/9_intro_outro_screens/game_over/youlosto.png";
    if (!Endscreen.gameOverSoundPlayed) {
      Endscreen.gameOverSoundPlayed = true;
      setTimeout(() => {
        game_over_sound.play();
      }, 2500);
    }
  }

  draw(ctx) {
    ctx.drawImage(this.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
