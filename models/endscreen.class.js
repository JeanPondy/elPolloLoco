class Endscreen extends DrawableObject {
  constructor(gamewon) {
    super();
    this.x = 0;
    this.y = 0;
    this.width = 720;
    this.height = 480;
    this.imagePath = gamewon
      ? "img/9_intro_outro_screens/game_over/game_won.png"
      : "img/9_intro_outro_screens/game_over/game_over.png";
    this.loadImage(this.imagePath);
  }
}
