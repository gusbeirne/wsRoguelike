console.log("game.js loaded");

window.onload = function(){
  console.log("starting wsRoguelike - window loaded");
  //Check if rot.js can work on this browser
  if(!ROT.isSupported()){
    alert("The rot.js library isn't supported by your browser.");
  } else {
    //Initialize the game
    Game.init();

    document.getElementById('wsRoguelike-main-display').appendChild(
      Game.display.main.o.getContainer()
    );

  }
};

var Game = {

  display: {
    main: {
      w: 80,
      h: 24,
      o: null
    }
  },

  init: function(){
    console.log("game init");
    this.display.main.o = new ROT.Display(
        {width: this.display.main.w,
        hight: this.display.main.h}
    );
    
  }

};
