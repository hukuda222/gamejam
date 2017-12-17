class Player {
  constructor(stage, hp, name) {
    const img = new createjs.Bitmap(images["yagi"]);
    img.x = 100;
    img.y = 300;
    this.name = name;
    stage.addChild(img);
    this.hpbar = new createjs.Shape();
    this.hpbar.graphics.beginFill("Red").rect(100, 420, 120, 20);
    this.hp = 500;
    stage.addChild(this.hpbar);
  }
  attack(log, e, d) {
    if (Math.random() > 0.1) {
      log.put(this.name + "の攻撃、" + e.name + "に" + d + "ダメージ!");
      e.dame(d);
    } else {
      log.put(this.name + "の会心の攻撃、" + e.name + "に" + d * 1.5 + "ダメージ!");
      e.dame(d * 1.5);
    }
  }
  dame(d) {
    this.hp -= d;
    this.hpbar.graphics.clear().beginFill("Red").rect(100, 420, (120 * this.hp) / 500, 20);
  }
}
