Game.DATASTORE.MAP = {};

Game.Map = function (tilesGrid) {
  this._tiles = tilesGrid;

  this.attr = {
    _id: Game.util.randomString(32),
    _width: tilesGrid.length,
    _height: tilesGrid[0].length,
    _entitiesByLocation: {},
    _locationsByEntity: {},
  };

  Game.DATASTORE.MAP[this.attr._id] = this;
};

Game.Map.prototype.getWidth = function () {
  return this.attr._width;
};

Game.Map.prototype.getHeight = function () {
  return this.attr._height;
};

Game.Map.prototype.getTile = function (x,y) {
  if ((x < 0) || (x >= this.attr._width) || (y<0) || (y >= this.attr._height)) {
    return Game.Tile.nullTile;
  }
  return this._tiles[x][y] || Game.Tile.nullTile;
};

Game.Map.prototype.addEntity = function (ent,pos) {
  this.attr._entitiesByLocation[pos.x+","+pos.y] = ent.getId();
  this.attr._locationsByEntity[ent.getId()] = pos.x+","+pos.y;
  ent.setMap(this);
  ent.setPos(pos);
};

Game.Map.prototype.updateEntityLocation = function (ent) {
  var origLoc = this.attr._locationsByEntity[ent.getId()];
  if (origLoc) {
    this.attr._entitiesByLocation[origLoc] = undefined;
  }
  var pos = ent.getPos();
  this.attr._entitiesByLocation[pos.x+","+pos.y] = ent.getId();
  this.attr._locationsByEntity[ent.getId()] = pos.x+","+pos.y;
};

Game.Map.prototype.getEntity = function (x_or_pos,y) {
  var useX = x_or_pos,useY=y;
  if (typeof x_or_pos == 'object') {
    useX = x_or_pos.x;
    useY = x_or_pos.y;
  }
  var entId = this.attr._entitiesByLocation[useX+','+useY];
   if (entId) { return Game.DATASTORE.ENTITY[entId]; }
   return  false;
};

Game.Map.prototype.renderOn = function (display,camX,camY) {
  // console.log("display is ");
  // console.dir(display);
  var dispW = display._options.width;
  var dispH = display._options.height;
  var xStart = camX-Math.round(dispW/2);
  var yStart = camY-Math.round(dispH/2);
  for (var x = 0; x < dispW; x++) {
    for (var y = 0; y < dispH; y++) {
      // Fetch the glyph for the tile and render it to the screen - sub in wall tiles for nullTiles / out-of-bounds
      var tile = this.getTile(x+xStart,y+yStart);
      if (tile.getName() == 'nullTile') {
        tile = Game.Tile.wallTile;
      }
      tile.draw(display,x,y);
      var ent = this.getEntity(x+xStart,y+yStart);
      if (ent) {
        ent.draw(display,x,y);
      }
    }
  }

};

Game.Map.prototype.getRandomLocation = function(filter_func) {
  if (filter_func === undefined) {
    filter_func = function(tile) { return true; };
  }
  var tX,tY,t;
  do {
    tX = Game.util.randomInt(0,this.attr._width - 1);
    tY = Game.util.randomInt(0,this.attr._height - 1);
    t = this.getTile(tX,tY);
  } while (! filter_func(t));
  return {x:tX,y:tY};
};

Game.Map.prototype.getRandomWalkableLocation = function() {
  return this.getRandomLocation(function(t){ return t.isWalkable(); });
};

Game.Map.prototype.toJSON = function () {

};
Game.Map.prototype.fromJSON = function (json) {

};
