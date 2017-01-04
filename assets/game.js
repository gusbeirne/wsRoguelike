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
      w: 60,
      h: 30,
      o: null
    },
    avatar: {
      w: 20,
      h: 30,
      o: null
    },
    message: {
      w: 80,
      h: 6,
      o: null
    }
  },

   _curUiMode: null,

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

    // var map = new ROT.Map.Uniform(80,24,
    //   {dugPercentage: 0.2,
    //   roomWidth: [4,10],
    //   roomHeight: [3,9]}
    // );
    //map.create(this.display.main.o.DEBUG);

    Game.switchUiMode(Game.UIMode.gameStart);

    this.renderDisplayAll();
  },

  renderDisplayMain: function(){
    // Ascii art splash screen
    this.getDisplay('main').drawText(7,11,"_____         _     _____                      ");
    this.getDisplay('main').drawText(6,12,"|_   _|       | |   |  __ \\                     ");
    this.getDisplay('main').drawText(8,13,"| | ___  ___| |_  | |  \\/ __ _ _ __ ___   ___ ");
    this.getDisplay('main').drawText(8,14,"| |/ _ \\/ __| __| | | __ / _` | '_ ` _ \\ / _ \\");
    this.getDisplay('main').drawText(8,15,"| |  __/\\__ \\ |_  | |_\\ \\ (_| | | | | | |  __/");
    this.getDisplay('main').drawText(8,16,"\\_/\\___||___/\\__| \\_____/\\__,_|_| |_| |_|\\___|");
  },

  renderDisplayAvatar: function(){
    this.getDisplay('avatar').drawText(0,0,"avataravataravataravatar");
  },

  renderDisplayMessage: function(){
    this.getDisplay('message').drawText(0,0,"message");
  },

  renderDisplayAll: function() {
    this.renderDisplayAvatar();
    this.renderDisplayMain();
    this.renderDisplayMessage();
  },
  switchUiMode: function (newUiMode) {
    if (this._curUiMode !== null) {
      this._curUiMode.exit();
    }
    this._curUiMode = newUiMode;
    if (this._curUiMode !== null) {
      this._curUiMode.enter();
    }
    this.renderDisplayAll();
  }
};
