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
  },
  handleInput: function (inputType,inputData) {
    console.log('gameStart inputType:');
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
  },
  handleInput: function (inputType,inputData) {
    console.log('gamePlay inputType:');
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
