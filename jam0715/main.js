/* global phina GameApp */

phina.globalize();

const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 480;

const ASSETS = {
  image: {
    "mikan1": "./mikan1.png",
    "mikan2": "./mikan2.png"
  }
};

const myscenes = [
  {
    label: "タイトル",
    className: "Title",
    nextLabel: "メイン"
  },
  {
    label: "メイン",
    className: "Main",
    nextLabel: "リザルト"
  },
  {
    label: "リザルト",
    className: "Result",
    nextLabel: "タイトル"
  }

];

phina.define("Title", {
  superClass: "DisplayScene",

  init: function() {
    this.superInit();
    this.backgroundColor = "orange";
    const label = Label({
      text: "みかんつめ\n左右キーで移動して、\nみかんを詰めよう\n\nEnter to start",
      fontSize: 40,
      fill: "white"
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(4));
  },
  update: function(app) {
    if (app.keyboard.getKey("enter")) {
      this.exit();
    }
  }
});

phina.define("Result", {
  superClass: "DisplayScene",

  init: function(param) {
    this.superInit();
    this.score = param.score;
    this.scorelabel = Label({
      text: "結果は" + param.score + "個でした\nPress T to Tweet.",
      fontsize: 15,
      x: 250,
      y: 170,
      fill: "white"
    }).addChildTo(this);
    this.backgroundColor = "orange";
  },
  update: function(app) {
    if (app.keyboard.getKey("T")) {
      let result = "みかんを" + this.score + "個詰めたよ！" + " https://hukuda222.github.io/gamejam/jam0715/ ";
      location.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(result) + "&hashtags=traP3jam";
    } else if (app.keyboard.getKey("enter")) {
      this.exit();
    }
  }
});

phina.define("Main", {
  superClass: "DisplayScene",

  init: function() {
    this.superInit();
    this.mikan1l = [];
    this.mikan2l = [];
    this.score = 0;
    this.time = 0;

    this.scorelabel = Label({
      text: "0",
      fontsize: 15,
      x: 250,
      y: 170,
      fill: "white"
    }).addChildTo(this);
    this.layer = Box2dLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    }).addChildTo(this);

    // 袋
    this.floor = RectangleShape({
      width: 150,
      height: 2
    }).addChildTo(this);
    this.floor.setPosition(300, 400);
    this.floorb = this.layer.createBody({
      type: "static",
      shape: "box"
    }).attachTo(this.floor);
    this.floorb.friction = 1.0;
    this.backgroundColor = "black";
    this.side1 = RectangleShape({
      width: 2,
      height: 200
    }).addChildTo(this);
    this.side1.setPosition(375, 300);
    this.side1b = this.layer.createBody({
      type: "static",
      shape: "box"
    }).attachTo(this.side1);
    this.side2 = RectangleShape({
      width: 2,
      height: 200
    }).addChildTo(this);
    this.side2.setPosition(225, 300);
    this.side2b = this.layer.createBody({
      type: "static",
      shape: "box"
    }).attachTo(this.side2);
    this.backgroundColor = "black";
  },

  update: function(app) {
    this.time++;
    const keyboard = app.keyboard;
    if (Math.random() > 0.99) {
      const mikan = Sprite("mikan1").addChildTo(this);
      mikan.setPosition(Math.random() * 600, 10);
      mikan.alpha = 1.0;
      this.layer.createBody({
        type: "dynamic",
        shape: "circle"
      }).attachTo(mikan);
      this.mikan1l.push(mikan);
    } else if (Math.random() > 0.99) {
      const mikan2 = Sprite("mikan2").addChildTo(this);
      mikan2.setPosition(Math.random() * 600, 10);
      mikan2.alpha = 1.0;
      this.layer.createBody({
        type: "dynamic",
        shape: "box"
      }).attachTo(mikan2);
      this.mikan2l.push(mikan2);
    }
    this.score = 0;
    this.mikan1l.some((v, i) => {
      console.log(v.y);
      if (v.y >= 480) this.mikan1l.splice(i, 1);
      else if (Math.abs(v.x - this.floor.x) <= 75) this.score += 1;
    });
    this.mikan2l.some((v, i) => {
      if (v.y >= 480) this.mikan2l.splice(i, 1);
      else if (Math.abs(v.x - this.floor.x) <= 75) this.score += 3;
    });
    this.scorelabel.text = "" + this.score;
    // 左右移動
    if (keyboard.getKey("left")) {
      this.floorb.body.SetPosition(new phina.box2d.b2.Vec2(this.floorb.body.m_xf.position.x - 0.2, this.floorb.body.m_xf.position.y));
      this.side1b.body.SetPosition(new phina.box2d.b2.Vec2(this.side1b.body.m_xf.position.x - 0.2, this.side1b.body.m_xf.position.y));
      this.side2b.body.SetPosition(new phina.box2d.b2.Vec2(this.side2b.body.m_xf.position.x - 0.2, this.side2b.body.m_xf.position.y));
    }
    if (keyboard.getKey("right")) {
      this.floorb.body.SetPosition(new phina.box2d.b2.Vec2(this.floorb.body.m_xf.position.x + 0.2, this.floorb.body.m_xf.position.y));
      this.side1b.body.SetPosition(new phina.box2d.b2.Vec2(this.side1b.body.m_xf.position.x + 0.2, this.side1b.body.m_xf.position.y));
      this.side2b.body.SetPosition(new phina.box2d.b2.Vec2(this.side2b.body.m_xf.position.x + 0.2, this.side2b.body.m_xf.position.y));
    }
    if (this.time > 60 * 30) {
      this.exit({score: this.score});
    }
  }
});

phina.main(function() {
  const app = GameApp({
    startLabel: "タイトル",
    assets: ASSETS,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    fit: false,
    scenes: myscenes
  });
  app.run();
});
