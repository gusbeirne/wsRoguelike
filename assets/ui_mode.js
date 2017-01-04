Game.UIMode = {};

Game.UIMode.gameStart = {
  enter: function () {
    console.log('game starting');
  },
  exit: function () {
    console.log('gameStart exit');
  },
  render: function (display) {
    console.log('gameStart render');

    display.drawText(7,11,"_____         _     _____                      ");
    display.drawText(6,12,"|_   _|       | |   |  __ \\                     ");
    display.drawText(8,13,"| | ___  ___| |_  | |  \\/ __ _ _ __ ___   ___ ");
    display.drawText(8,14,"| |/ _ \\/ __| __| | | __ / _` | '_ ` _ \\ / _ \\");
    display.drawText(8,15,"| |  __/\\__ \\ |_  | |_\\ \\ (_| | | | | | |  __/");
    display.drawText(8,16,"\\_/\\___||___/\\__| \\_____/\\__,_|_| |_| |_|\\___|");

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
  },
  exit: function () {
    console.log('gamePlay exit');
  },
  render: function (display) {
    console.log('gamePlay render');
    display.clear();
  },
  handleInput: function (inputType,inputData) {
    console.log('gamePlay inputType:');
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
  },
  handleInput: function (inputType,inputData) {
    console.log('gameLose inputType:');
  }
};
