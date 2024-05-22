class Keyboard {
  constructor() {
    this.LEFT = false; // Zustand der linken Pfeiltaste
    this.RIGHT = false; // Zustand der rechten Pfeiltaste
    this.UP = false; // Zustand der oberen Pfeiltaste
    this.DOWN = false; // Zustand der unteren Pfeiltaste
    this.SPACE = false; // Zustand der Leertaste
    this.D = false; // Zustand der "D"-Taste

    // Eventlistener für Tastendruck (Keydown)
    window.addEventListener("keydown", (e) => {
      // Überprüfen, welche Taste gedrückt wurde, und entsprechende Eigenschaften im Keyboard-Objekt setzen
      if (e.keyCode == 39) {
        this.RIGHT = true; // Rechte Pfeiltaste: true setzen
      }
      if (e.keyCode == 37) {
        this.LEFT = true; // Linke Pfeiltaste: true setzen
      }
      if (e.keyCode == 38) {
        this.UP = true; // Obere Pfeiltaste: true setzen
      }
      if (e.keyCode == 40) {
        this.DOWN = true; // Untere Pfeiltaste: true setzen
      }
      if (e.keyCode == 32) {
        this.SPACE = true; // Leertaste: true setzen
      }
      if (e.keyCode == 68) {
        this.D = true; // Taste 'D': true setzen
      }

      console.log(e); // Konsolenausgabe des Tastaturereignisses (Keydown-Ereignis)
    });

    // Eventlistener für Tastenfreigabe (Keyup)
    window.addEventListener("keyup", (e) => {
      // Überprüfen, welche Taste losgelassen wurde, und entsprechende Eigenschaften im Keyboard-Objekt zurücksetzen
      if (e.keyCode == 39) {
        this.RIGHT = false; // Rechte Pfeiltaste: false setzen
      }
      if (e.keyCode == 37) {
        this.LEFT = false; // Linke Pfeiltaste: false setzen
      }
      if (e.keyCode == 38) {
        this.UP = false; // Obere Pfeiltaste: false setzen
      }
      if (e.keyCode == 40) {
        this.DOWN = false; // Untere Pfeiltaste: false setzen
      }
      if (e.keyCode == 32) {
        this.SPACE = false; // Leertaste: false setzen
      }
      if (e.keyCode == 68) {
        this.D = false; // Taste 'D': false setzen
      }

      console.log(e); // Konsolenausgabe des Tastaturereignisses (Keyup-Ereignis)
    });
  }
}
