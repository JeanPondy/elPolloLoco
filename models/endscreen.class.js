class Endscreen {
  constructor(gameWon) {
    this.gameWon = gameWon;
    this.loadImage();
  }

  loadImage() {
    if (this.gameWon) {
      this.img = new Image();
      this.img.src = "img/9_intro_outro_screens/game_over/gameover.png"; // Pfad zum "win" Bild
    } else {
      this.img = new Image();
      this.img.src = "img/9_intro_outro_screens/game_over/youlosto.png"; // Pfad zum "game_over" Bild
    }
  }

  draw(ctx) {
    ctx.drawImage(this.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
