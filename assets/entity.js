Game.Entity = function(template) {
    template = template || {};
    Game.Symbol.call(this, template);
    if (! ('attr' in this)) { this.attr = {}; }
    this.attr._name = template.name || '';
    this.attr._x = template.x || 0;
    this.attr._y = template.y || 0;

    this._entityID = Game.util.randomString(32);
    Game.ALL_ENTITIES[this._entityID] = this;

    // trait sutff
    // track traits and groups, copy over non-META properties, and run the trait init if it exists
    this._traits = template.traits || [];
    this._traitTracker = {};
    console.dir(template);
    console.dir(template.traits);
    console.dir(this._traits);
    for (var i = 0; i < this._traits.length; i++) {
      var trait = this._traits[i];
      console.dir(trait);
      this._traitTracker[trait.META.traitName] = true;
      this._traitTracker[trait.META.traitGroup] = true;
      for (var traitProp in traitProp != 'META' && trait) {
        if (traitProp != 'META' && trait.hasOwnProperty(traitProp)) {
          this[traitProp] = trait[traitProp];
        }
      }
      if (trait.META.hasOwnProperty('stateNamespace')) {
        this.attr[trait.META.stateNamespace] = {};
        for (var traitStateProp in trait.META.stateModel) {
          if (trait.META.stateModel.hasOwnProperty(traitStateProp)) {
            this.attr[trait.META.stateNamespace][traitStateProp] = trait.META.stateModel[traitStateProp];
          }
        }
      }
      if (trait.META.hasOwnProperty('init')) {
        trait.META.init.call(this,template);
      }
    }
};
Game.Entity.extend(Game.Symbol);

Game.Entity.prototype.hasTrait = function(checkThis) {
    if (typeof checkThis == 'object') {
      return this._traitTracker.hasOwnProperty(checkThis.META.traitName);
    } else {
      return this._traitTracker.hasOwnProperty(checkThis);
    }
};

Game.Entity.prototype.getName = function() {
    return this.attr._name;
};
Game.Entity.prototype.setName = function(name) {
    this.attr._name = name;
};
Game.Entity.prototype.setPos = function(x_or_xy,y) {
  if (typeof x_or_xy == 'object') {
    this.attr._x = x_or_xy.x;
    this.attr._y = x_or_xy.y;
  } else {
    this.attr._x = x_or_xy;
    this.attr._y = y;
  }
};
Game.Entity.prototype.getX = function() {
    return this.attr._x;
};
Game.Entity.prototype.setX = function(x) {
    this.attr._x = x;
};
Game.Entity.prototype.setY = function(y) {
    this.attr._y = y;
};
Game.Entity.prototype.getY   = function() {
    return this.attr._y;
};