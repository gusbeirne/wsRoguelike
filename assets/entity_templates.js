Game.EntityGenerator = new Game.Generator('entities',Game.Entity);

Game.EntityGenerator.learn('avatar', {
  name: 'avatar',
  chr:'@',
  fg:'#f00',
  traits: [Game.EntityTrait.WalkerCorporeal,Game.EntityTrait.HitPoints,Game.EntityTrait.Chronicle]
});

Game.EntityGenerator.learn('debris', {
  name: 'debris',
  chr:'~',
  fg:'#555',
  maxHp: 1,
  mixins: [Game.EntityTrait.HitPoints]
});
