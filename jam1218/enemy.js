class Enemy {
  constructor(stage, hp, name) {
    this.hp = hp;
    const img = new createjs.Bitmap(images["sobaya"]);
    img.x = 300;
    img.y = 50;
    img.scaleX = 0.8;
    img.scaleY = 0.8;
    this.name = name;
    stage.addChild(img);
  }
  attack(log, p, d) {
    if (Math.random() > 0.9) {
      log.put(this.name + "の「帰るのは逃げだよ」、" + p.name + "に" + d * 2 + "ダメージ!");
      p.dame(d);
    } else if (Math.random() > 0.5) {
      log.put(this.name + "は進捗を生んでいる!");
    } else {
      log.put(this.name + "の攻撃、" + p.name + "に" + d * 1.5 + "ダメージ!");
      p.dame(d * 1.5);
    }
  }
  dame(d) {
    this.hp -= d;
  }
}
