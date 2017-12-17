class initLog {
  constructor(stage) {
    const back = new createjs.Shape();
    back.graphics.beginFill("#9999FF").rect(50, stage.h - 150, stage.w - 50, stage.h - 50);
    back.alpha = 0.5;
    stage.addChild(back);
    this.boxs = [];
    this.mess = [];
    this.stage = stage;
    for (let i = 0; i < 3; i++) {
      this.boxs.push(new createjs.Text("", "30px Century Gothic", "White"))
      this.boxs[i].x = 60;
      this.boxs[i].y = stage.h - 140 + i * 40;
      stage.addChild(this.boxs[i]);
    }
  };
  put(mes) {
    if (this.mess.length >= 3) {
      this.mess.shift();
    }
    this.mess.push(mes);
    this.mess.forEach((m, i) => {
      this.boxs[i].text = m;
    });
  }
};
