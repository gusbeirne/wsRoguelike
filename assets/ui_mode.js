Game.UIMode = {};

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
          Game.switchUIMode(Game.UIMode.gamePlay);
    }
  }
};

Game.UIMode.gamePlay = {
  enter: function () {
    console.log('gameplay begining');
    Game.Message.clear();
  },
  exit: function () {
    console.log('gamePlay exit');
  },
  render: function (display) {
    console.log('gamePlay render');

    // var map = new ROT.Map.Uniform(80,24,
    //   {dugPercentage: 0.2,
    //   roomWidth: [4,10],
    //   roomHeight: [3,9]}
    // );
    // map.create(display.DEBUG);

    display.drawText(19,14,"Press W to Win");
    display.drawText(19,15,"Press L to Lose");
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
    }
  }
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
