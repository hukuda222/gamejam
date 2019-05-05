/* global phina GameApp Label Box2dLayer RectangleShape Sprite */

phina.globalize();

const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 480;

const ASSETS = {
  image: {
    "ue": "./ue.png",
    "sita": "./sita.png"
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
    this.backgroundColor = "green";
    Label({
      text: "礼をするゲーム\nAで起立、Dで礼。\n赤玉を左に青玉を右に送ろう\n\nEnter to start",
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
      text: "スコアは" + param.score + "\nPress T to Tweet.",
      fontsize: 15,
      x: 250,
      y: 170,
      fill: "white"
    }).addChildTo(this);
    this.backgroundColor = "green";
  },
  update: function(app) {
    if (app.keyboard.getKey("T")) {
      let result = "スコアは" + this.score + "！" + " https://hukuda222.github.io/gamejam/jam0505/ ";
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

    Label({
      text: "Aで起立 Dで礼 赤は左で 青は右",
      fontsize: 15,
      x: 250,
      y: 20,
      fill: "black"
    }).addChildTo(this);

    this.scorelabel = Label({
      text: "0",
      fontsize: 15,
      x: 250,
      y: 60,
      fill: "black"
    }).addChildTo(this);

    this.layer = Box2dLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    }).addChildTo(this);

    // 床
    this.floor = RectangleShape({
      width: 2000,
      height: 100
    }).addChildTo(this);
    this.floor.fill = "gray";
    this.floor.setPosition(SCREEN_WIDTH / 2, 400);
    this.layer.createBody({
      type: "static",
      shape: "box"
    }).attachTo(this.floor);

    // 人間
    const sita = Sprite("sita").addChildTo(this);
    sita.setPosition(320, 340);
    sita.alpha = 1.0;

    const ue = Sprite("ue").addChildTo(this);
    ue.setPosition(320, 250);
    ue.alpha = 1.0;
    this.ueb = this.layer.createBody({
      type: "kinematic",
      shape: "box"
    }).attachTo(ue);

    this.rota = 0;
    this.backgroundColor = "white";
    this.mikans = [];
    this.score = 0;
  },

  update: function(app) {
    this.time++;
    const keyboard = app.keyboard;
    if (this.time % 60 === 1 || Math.random() > 0.99) {
      const mikan = CircleShape({
        radius: 50 + (Math.random() * 40)
      }).addChildTo(this);
      mikan.setPosition(320 + (Math.random() * 50), 0);
      mikan.alpha = 1.0;
      this.layer.createBody({
        type: "dynamic",
        shape: "circle"
      }).attachTo(mikan);
      if (Math.random() > 0.5) {
        mikan.type = "red";
      } else {
        mikan.type = "blue";
      }
      mikan.fill = mikan.type;
      this.mikans.push(mikan);
    }
    this.mikans.some((v, i) => {
      if (v.x < 0 && v.type === "red") this.score += 100;
      else if (v.x < 0 && v.type === "blue") this.score -= 20;
      if (v.x > 640 && v.type === "red") this.score -= 20;
      else if (v.x > 640 && v.type === "blue") this.score += 100;
      if (v.y > 480 || v.x < 0 || v.x > 640) this.mikans.splice(i, 1);
    });

    this.scorelabel.text = "" + this.score;

    if (keyboard.getKey("a")) {
      this.rota = Math.min(this.rota + 10, 90);
      this.ueb.body.SetPosition(new phina.box2d.b2.Vec2((320 + (70 * Math.sin(Math.degToRad(this.rota)))) / 50, (250 + 70 - (70 * Math.cos(Math.degToRad(this.rota)))) / 50));
      this.ueb.body.SetAngle(Math.degToRad(this.rota));
    }
    if (keyboard.getKey("d")) {
      this.rota = Math.max(this.rota - 10, -90);
      this.ueb.body.SetPosition(new phina.box2d.b2.Vec2((320 + (70 * Math.sin(Math.degToRad(this.rota)))) / 50, (250 + 70 - (70 * Math.cos(Math.degToRad(this.rota)))) / 50));
      this.ueb.body.SetAngle(Math.degToRad(this.rota));
    }
    if (this.time > 60 * 15) {
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
