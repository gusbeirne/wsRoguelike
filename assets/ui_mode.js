Game.UIMode = {};
Game.UIMode.DEFAULT_COLOR_FG = '#fff';
Game.UIMode.DEFAULT_COLOR_BG = '#000';
Game.UIMode.DEFAULT_COLOR_STR = '%c{'+Game.UIMode.DEFAULT_COLOR_FG+'}%b{'+Game.UIMode.DEFAULT_COLOR_BG+'}';
var fg = Game.UIMode.DEFAULT_COLOR_FG;
var bg = Game.UIMode.DEFAULT_COLOR_BG;


Game.UIMode.gameStart = {
  enter: function () {
    console.log('game starting');
    Game.Message.send("Welcome to Test Game");
  },
  exit: function () {
    console.log('gameStart exit');
  },
  render: function (display) {
    console.log('gameStart render');

    var _SPLASH_HEIGHT = 10;

    display.drawText(7,_SPLASH_HEIGHT + 1,"_____         _     _____                      ");
    display.drawText(6,_SPLASH_HEIGHT + 2,"|_   _|       | |   |  __ \\                     ");
    display.drawText(8,_SPLASH_HEIGHT + 3,"| | ___  ___| |_  | |  \\/ __ _ _ __ ___   ___ ");
    display.drawText(8,_SPLASH_HEIGHT + 4,"| |/ _ \\/ __| __| | | __ / _` | '_ ` _ \\ / _ \\");
    display.drawText(8,_SPLASH_HEIGHT + 5,"| |  __/\\__ \\ |_  | |_\\ \\ (_| | | | | | |  __/");
    display.drawText(8,_SPLASH_HEIGHT + 6,"\\_/\\___||___/\\__| \\_____/\\__,_|_| |_| |_|\\___|");
    display.drawText(19,18,"Press Any Key to Start");
  },

  handleInput: function (inputType,inputData) {
    console.log('gameStart inputType:');
    if (inputData.charCode !== 0) { // ignore the various modding keys - control, shift, etc.
          Game.switchUIMode(Game.UIMode.gamePersistence);
    }
  }
};


Game.UIMode.gamePlay = {

  attr: {
    _map: null,
    _mapWidth: 300,
    _mapHeight: 200,
    _cameraX: 100,
    _cameraY: 100,
    _avatar: null,
  },
  JSON_KEY: 'uiMode_gamePlay',
  enter: function () {
    console.log('gameplay begining');
    Game.Message.clear();
  },
  exit: function () {
    console.log('gamePlay exit');
  },
  render: function (display) {
    console.log('gamePlay render');

    display.drawText(19,14,"Press W to Win");
    display.drawText(19,15,"Press L to Lose");

    this.attr._map.renderOn(display,this.attr._cameraX,this.attr._cameraY);
    //this.renderAvatar(display);
  },

  // renderAvatar: function (display) {
  //   Game.Symbol.AVATAR.draw(display,this.attr._avatar.getX()-this.attr._cameraX+display._options.width/2,
  //                                   this.attr._avatar.getY()-this.attr._cameraY+display._options.height/2);
  // },

  renderAvatarInfo: function (display) {
    var fg = Game.UIMode.DEFAULT_COLOR_FG;
    var bg = Game.UIMode.DEFAULT_COLOR_BG;
    display.drawText(1,2,"avatar x: "+this.attr._avatar.getX(),fg,bg); // DEV
    display.drawText(1,3,"avatar y: "+this.attr._avatar.getY(),fg,bg); // DEV
  },
  moveAvatar: function (dx,dy) {
    if (this.attr._avatar.tryWalk(this.attr._map,dx,dy)) {
      this.setCameraToAvatar();
    }
  },
  moveCamera: function (dx,dy) {
    this.setCamera(this.attr._cameraX + dx,this.attr._cameraY + dy);
  },
  setCamera: function (sx,sy) {
    this.attr._cameraX = Math.min(Math.max(0,sx),this.attr._mapWidth);
    this.attr._cameraY = Math.min(Math.max(0,sy),this.attr._mapHeight);
  },
  setCameraToAvatar: function () {
    this.setCamera(this.attr._avatar.getX(),this.attr._avatar.getY());
  },
  handleInput: function (inputType,inputData) {
    console.log('gamePlay inputType:');

    Game.Message.send("'"+String.fromCharCode(inputData.charCode)+"' Has Been Pressed");

    if (inputType == 'keypress') {
      if (((inputData.key == 'w') || (inputData.key == 'W')) && (inputData.shiftKey)) {
        Game.switchUIMode(Game.UIMode.gameWin);
      }
      else if (((inputData.key == 'l') || (inputData.key == 'L')) && (inputData.shiftKey)) {
        Game.switchUIMode(Game.UIMode.gameLose);
      }
      else if (inputData.key == '='){
        Game.switchUIMode(Game.UIMode.gamePersistence);
      }
      else if (inputData.key == 'z') {
        this.moveAvatar(-1,1);
      } else if (inputData.key == 'x') {
        this.moveAvatar(0,1);
      } else if (inputData.key == 'c') {
        this.moveAvatar(1,1);
      } else if (inputData.key == 'a') {
        this.moveAvatar(-1,0);
      } else if (inputData.key == 's') {
        // do nothing / stay still
      } else if (inputData.key == 'd') {
        this.moveAvatar(1,0);
      } else if (inputData.key == 'q') {
        this.moveAvatar(-1,-1);
      } else if (inputData.key == 'w') {
        this.moveAvatar(0,-1);
      } else if (inputData.key == 'e') {
        this.moveAvatar(1,-1);
      }
    }
  },


  setupPlay: function (restorationData) {
   var mapTiles = Game.util.init2DArray(this.attr._mapWidth,this.attr._mapHeight,Game.Tile.nullTile);
   var generator = new ROT.Map.Uniform(this.attr._mapWidth,this.attr._mapHeight);

   // run again then update map
   generator.create(function(x,y,v) {
     if (v === 0) {
       mapTiles[x][y] = Game.Tile.floorTile;
     } else {
       mapTiles[x][y] = Game.Tile.wallTile;
     }
   });
   // create map from the tiles
    this.attr._map =  new Game.Map(mapTiles);

    this.attr._avatar = Game.EntityGenerator.create('avatar');
    this.attr._avatar.setMap(this.attr._map);

    // Restore the game from restorationData or create a new game
    if (restorationData !== undefined && restorationData.hasOwnProperty(Game.UIMode.gamePlay.JSON_KEY)) {
      this.fromJSON(restorationData[Game.UIMode.gamePlay.JSON_KEY]);
      // TODO: restore all entities
      this.attr._map.updateEntityLocation(this.attr._avatar);
    } else {
      this.attr._avatar.setPos(this.attr._map.getRandomWalkableLocation());
      this.attr._map.updateEntityLocation(this.attr._avatar);
      // dev code - just add some entities to the map
      // for (var ecount = 0; ecount < 80; ecount++) {
      //   this.attr._map.addEntity(Game.EntityGenerator.create('debris'),this.attr._map.getRandomWalkableLocation());
      // }
    }
    this.setCameraToAvatar();
 },


 toJSON: function() {
    return Game.UIMode.gamePersistence.BASE_toJSON.call(this);
  },
  fromJSON: function (json) {
    Game.UIMode.gamePersistence.BASE_fromJSON.call(this,json);
  },

};


Game.UIMode.gameWin = {
  enter: function () {
    console.log('game won');
  },
  exit: function () {
    console.log('gameWin exit');
  },
  render: function (display) {
    console.log('gameWin render');
    display.drawText(19,14,"You Have Won");
  },
  handleInput: function (inputType,inputData) {
    console.log('gameWin inputType:');
  }
};


Game.UIMode.gameLose = {
  enter: function () {
    console.log('game lost');
  },
  exit: function () {
    console.log('gameLose exit');
  },
  render: function (display) {
    console.log('gameLose render');
    display.drawText(19,14,"You Have Lost");
  },
  handleInput: function (inputType,inputData) {
    console.log('gameLose inputType:');
  }
};


Game.UIMode.gamePersistence = {
  enter: function () {
    console.log('entering persistence mode');
  },
  exit: function () {
    console.log('gamePersistence exit');
  },
  render: function (display) {
    console.log('gamePersistence render');
    display.drawText(19,14,"[N]ew Game, [S]ave game or [L]oad Game");

  },

  handleInput: function (inputType,inputData) {
    console.log('gamePersistence inputType:');

    if (inputType == 'keypress') {
      if (((inputData.key == 'n') || (inputData.key == 'N')) && (inputData.shiftKey)) {
        this.newGame();
      }
      else if (((inputData.key == 'l') || (inputData.key == 'L')) && (inputData.shiftKey)) {
        this.restoreGame();
      }
      else if (((inputData.key == 's') || (inputData.key == 'S')) && (inputData.shiftKey)) {
        this.saveGame();
      }
    }

  },
  saveGame: function (json_state_data) {
    if (this.localStorageAvailable()) {
      window.localStorage.setItem(Game._PERSISTANCE_NAMESPACE, JSON.stringify(Game._game)); // .toJSON()
      Game.switchUIMode(Game.UIMode.gamePlay);
      console.log(JSON.stringify(Game._game));
    }
  },
  restoreGame: function () {
    if (this.localStorageAvailable()) {
      var json_state_data = window.localStorage.getItem(Game._PERSISTANCE_NAMESPACE);
      var state_data = JSON.parse(json_state_data);
      Game.setRandomSeed(state_data._randomSeed);
      Game.UIMode.gamePlay.setupPlay(state_data);
      Game.switchUIMode(Game.UIMode.gamePlay);
    }
  },
  newGame: function () {
    Game.setRandomSeed(5 + Math.floor(ROT.RNG.getUniform()*100000));
    Game.UIMode.gamePlay.setupPlay();
    Game.switchUIMode(Game.UIMode.gamePlay);
  },
  localStorageAvailable: function () { // NOTE: see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  	try {
  		var x = '__storage_test__';
  		window.localStorage.setItem(x, x);
  		window.localStorage.removeItem(x);
  		return true;
  	}
  	catch(e) {
      Game.Message.send('Sorry, no local data storage is available for this browser');
  		return false;
  	}
  },
  BASE_toJSON: function(state_hash_name) {
    var state = this.attr;
    if (state_hash_name) {
      state = this[state_hash_name];
    }
    var json = {};
    for (var at in state) {
      if (state.hasOwnProperty(at)) {
        if (state[at] instanceof Object && 'toJSON' in state[at]) {
          json[at] = state[at].toJSON();
        } else {
          json[at] = state[at];
        }
      }
    }
    return json;
  },
  BASE_fromJSON: function (json,state_hash_name) {
    var using_state_hash = 'attr';
    if (state_hash_name) {
      using_state_hash = state_hash_name;
    }
    for (var at in this[using_state_hash]) {
      if (this[using_state_hash].hasOwnProperty(at)) {
        if (this[using_state_hash][at] instanceof Object && 'fromJSON' in this[using_state_hash][at]) {
          this[using_state_hash][at].fromJSON(json[at]);
        } else {
          this[using_state_hash][at] = json[at];
        }
      }
    }
  }

};
