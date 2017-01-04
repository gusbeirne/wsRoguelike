console.log("game.js loaded");

window.onload = function(){
  console.log("starting wsRoguelike - window loaded");
  // Check if rot.js can work on this browser
  if(!ROT.isSupported()){
    alert("The rot.js library isn't supported by your browser.");
  } else {
    // Initialize the game
    Game.init();
    // Instatiate the console on the browser page
    document.getElementById('wsRoguelike-avatar-display').appendChild(Game.getDisplay('avatar').getContainer());
    document.getElementById('wsRoguelike-main-display').appendChild(Game.getDisplay('main').getContainer());
    document.getElementById('wsRoguelike-message-display').appendChild(Game.getDisplay('message').getContainer());

  }
};

var Game = {

  _DISPLAY_SPACING: 1.1,

  display: {
    main: {
      w: 80,
      h: 24,
      o: null
    },
    avatar: {
      w: 20,
      h: 24,
      o: null
    },
    message: {
      w: 100,
      h: 6,
      o: null
    }
  },

  getDisplay: function (displayId) {
  if (this.display.hasOwnProperty(displayId)) {
    return this.display[displayId].o;
  }
  return null;
  },

  init: function(){
    console.log("game init");

    for (var display_key in this.display) {
      if (this.display.hasOwnProperty(display_key)) {
        this.display[display_key].o = new ROT.Display(
          {width: this.display[display_key].w,
          height: this.display[display_key].h,
          spacing: Game._DISPLAY_SPACING}
        );
      }
    }
console.log(this.display);

    var map = new ROT.Map.Uniform(80,24,
      {dugPercentage: 0.2,
      roomWidth: [4,10],
      roomHeight: [3,9]}
    );
    //map.create(this.display.main.o.DEBUG);

    // Ascii art splash screen
    this.display.main.o.drawText(17,9,"_____         _     _____                      ");
    this.display.main.o.drawText(16,10,"|_   _|       | |   |  __ \\                     ");
    this.display.main.o.drawText(18,11,"| | ___  ___| |_  | |  \\/ __ _ _ __ ___   ___ ");
    this.display.main.o.drawText(18,12,"| |/ _ \\/ __| __| | | __ / _` | '_ ` _ \\ / _ \\");
    this.display.main.o.drawText(18,13,"| |  __/\\__ \\ |_  | |_\\ \\ (_| | | | | | |  __/");
    this.display.main.o.drawText(18,14,"\\_/\\___||___/\\__| \\_____/\\__,_|_| |_| |_|\\___|");
  }

};
