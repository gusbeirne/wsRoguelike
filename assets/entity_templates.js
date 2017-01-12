Game.EntityGenerator = new Game.Generator('entities',Game.Entity);

Game.EntityGenerator.learn({
  name: 'avatar',
  chr:'@',
  fg:'#f00',
  traits: [Game.EntityTrait.WalkerCorporeal,Game.EntityTrait.HitPoints,Game.EntityTrait.Chronicle]
});

Game.EntityGenerator.learn({
  name: 'debris',
  chr:'~',
  fg:'#999',
  maxHp: 1,
  mixins: [Game.EntityTrait.HitPoints]
});
