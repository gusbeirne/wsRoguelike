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

    var bindEventToScreen = function(eventType) {
      window.addEventListener(eventType, function(evt) {
        Game.eventHandler(eventType, evt);
        });
      };
    // Bind keyboard input events
    bindEventToScreen('keypress');
    bindEventToScreen('keydown');
    // Set the UI mode to gameStart
    Game.switchUIMode(Game.UIMode.gameStart);
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
  _randomSeed: 0,

  _game: null,
  _PERSISTANCE_NAMESPACE: 'wsRoguelikeSave',

  getDisplay: function (displayId) {
  if (this.display.hasOwnProperty(displayId)) {
    return this.display[displayId].o;
  }
  return null;
  },


  init: function(){
    console.log("game init");

    this._game = this;
    Game.setRandomSeed(5 + Math.floor(ROT.RNG.getUniform()*100000));

    for (var display_key in this.display) {
      if (this.display.hasOwnProperty(display_key)) {
        this.display[display_key].o = new ROT.Display(
          {width: this.display[display_key].w,
          height: this.display[display_key].h,
          spacing: Game._DISPLAY_SPACING}
        );
      }

    }

    this.renderDisplayAll();
  },

  renderDisplayMain: function(){
    if (this._curUiMode !== null) {
      this.getDisplay('main').clear();
      this._curUiMode.render(this.getDisplay('main'));
    }
  },

  renderDisplayAvatar: function(){
    this.getDisplay('avatar').drawText(0,0,"Avatar Info:");
  },

  renderDisplayMessage: function(){
    Game.Message.render(this.display.message.o);
  },

  renderDisplayAll: function() {
    this.renderDisplayAvatar();
    this.renderDisplayMain();
    this.renderDisplayMessage();
  },

  eventHandler: function (eventType, evt) {
    // When an event is received have the current ui handle it
    if (this._curUiMode !== null) {
        this._curUiMode.handleInput(eventType, evt);
        Game.renderDisplayAll();
    }
  },

  switchUIMode: function (newUiMode) {
    if (this._curUiMode !== null) {
      this._curUiMode.exit();
    }
    this._curUiMode = newUiMode;
    if (this._curUiMode !== null) {
      this._curUiMode.enter();
    }
    this.renderDisplayAll();
  },

  getRandomSeed: function () {
  return this._randomSeed;
  },

  setRandomSeed: function (s) {
    this._randomSeed = s;
    console.log("using random seed "+this._randomSeed);
    ROT.RNG.setSeed(this._randomSeed);
  },

  toJSON: function() {
    var json = {"_randomSeed":this._randomSeed};
    return json;
  }

};
