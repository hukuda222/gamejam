/* global phina GameApp */

phina.globalize();

const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 480;

const ASSETS = {
  image: {
    "ground": "./ground.jpg",
    "picher": "./picher.png",
    "batter": "./batter.png",
    "target": "./target.png",
    "ball": "./ball.png"
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
    this.backgroundColor = "skyblue";
    const label = Label({
      text: "順番をまわすゲーム\n上下左右キーで移動して、\nEnterで打つよ\n\nEnter to start",
      fontSize: 40,
      fill: "white"
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(4));
    // .tweener.to({x: 150, y: 150}, 800).to({x: 300, y: 200}, 500).to({x: 250, y: 300}, 250).play();
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
    const ground = Sprite("ground").addChildTo(this);
    ground.origin.set(0, 0);
    ground.width = SCREEN_WIDTH;
    ground.height = SCREEN_HEIGHT;

    Label({
      text: "結果発表\n" + param.score + "対27\n" +
      (param.score >= 28 ? "優勝です！" : (param.score === 27 ? "延長戦で負けました" : "敗退です……")) +
      "\n\n press T to tweet.",
      fontSize: 50,
      fill: "white"
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(4));
  },
  update: function(app) {
    if (app.keyboard.getKey("T")) {
      let result = "甲子園の決勝戦は" + this.score + "対27 でした！" + " https://hukuda222.github.io/gamejam/jam0617/ ";
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
    this.score = 20;
    this.nageru = true;
    this.hit = false;
    this.rest = 3;
    const ground = Sprite("ground").addChildTo(this);
    ground.origin.set(0, 0);
    ground.width = SCREEN_WIDTH;
    ground.height = SCREEN_HEIGHT;

    const picher = Sprite("picher").addChildTo(this);
    picher.x = 300;
    picher.y = 250;
    picher.width = 80;
    picher.height = 100;

    const batter = Sprite("batter").addChildTo(this);
    batter.x = 210;
    batter.y = 340;
    batter.width = 100;
    batter.height = 120;

    this.target = Sprite("target").addChildTo(this);

    this.target.x = 280;
    this.target.y = 350;
    this.target.width = 75;
    this.target.height = 100;

    this.player = DisplayElement().addChildTo(this);
    // this.target.addChildTo(this.player);
    batter.addChildTo(this.player);

    Label({
      text: "27",
      fontsize: 15,
      x: 250,
      y: 170,
      fill: "white"
    }).addChildTo(this);

    this.ten = Label({
      text: "20",
      fontsize: 15,
      x: 350,
      y: 170,
      fill: "white"
    });
    this.ten.addChildTo(this);
    this.nokori = Label({
      text: "3",
      fontsize: 15,
      x: 300,
      y: 170,
      fill: "white"
    });
    this.nokori.addChildTo(this);

    this.ball = Sprite("ball").addChildTo(this);
    this.ball.x = 300;
    this.ball.y = 200;
    this.ball.height = 10;
    this.ball.width = 10;
    this.ball.tweener.wait(1000);
    // this.ball.tweener.to({x: 300, y: 600, width: 50, height: 50}, 4000, "swing").play();
    // this.ball.tweener.to({x: 250, y: 250, width: 25, height: 25}, 500)
    // .to({x: 300, y: 600, width: 50, height: 50}, 800).play().wait(1000).call((_) => {
    // });
    // this.ball.tweener.to({x: 300, y: 250, width: 25, height: 25}, 500, "swing")
    //  .to({x: 300, y: 600, width: 50, height: 50}, 1000, "swing").play();
  },

  update: function(app) {
    if (this.nageru) {
      this.nageru = false;
      this.hit = false;

      const rand = Math.random() + (this.score - 20) * 0.05;
      if (rand < 0.5) {
        this.ball.tweener.set({x: 300, y: 200, height: 10, width: 10})
          .to({x: 300, y: 600, width: 50, height: 50}, 500 + Math.random() * 1000, "swing").play();
      } else if (rand < 0.75) {
        this.ball.tweener.set({x: 300, y: 200, height: 10, width: 10})
          .to({x: 250 - Math.random() * 300, y: 250 + Math.random() * 50, width: 25, height: 25}, 500)
          .to({x: 300 + Math.random() * 50, y: 600, width: 50, height: 50}, 800, "swing").play();
      } else if (rand < 1) {
        this.ball.tweener.set({x: 300, y: 200, height: 10, width: 10})
          .to({x: 350 + Math.random() * 300, y: 250 + Math.random() * 50, width: 25, height: 25}, 500)
          .to({x: 300 - Math.random() * 50, y: 600, width: 50, height: 50}, 800, "swing")
          .play();
      } else {
        this.ball.tweener.set({x: 300, y: 200, height: 10, width: 10})
          .to({x: 250 - Math.random() * 200, y: 250 + Math.random() * 5, width: 25, height: 25}, 200)
          .to({x: 350 + Math.random() * 200, y: 300 + Math.random() * 5, width: 25, height: 25}, 200)
          .to({x: 250 - Math.random() * 200, y: 350 + Math.random() * 5, width: 25, height: 25}, 200)
          .to({x: 400 + Math.random() * 100, y: 600, width: 50, height: 50}, 400)
          .play();
      }
      this.ball.tweener.call((_) => {
        this.rest -= 1;
        this.nokori.text = this.rest;
        if (this.rest < 0) this.exit({score: this.score});
      }).wait(2000).call((_) => {
        this.nageru = true;
      });
    }
    var keyboard = app.keyboard;
    // 左右移動
    if (keyboard.getKey("left") && this.player.x >= -240) {
      this.player.x -= 8;
      this.target.x -= 8;
    }
    if (keyboard.getKey("right") && this.player.x <= 280) {
      this.player.x += 8;
      this.target.x += 8;
    }
    // 上下移動
    if (keyboard.getKey("up") && this.player.y >= 0) {
      this.player.y -= 8;
      this.target.y -= 8;
    }
    if (keyboard.getKey("down") && this.player.y <= 80) {
      this.player.y += 8;
      this.target.y += 8;
    }
    if (keyboard.getKey("enter") && this.ball.hitTestElement(this.target) && !this.hit) {
      this.ball.tweener.clear()
        .to({x: 300, y: -600, width: 0, height: 0}, 1000, "swing").play().wait(2000).call((_) => {
          this.nageru = true;
        });

      this.score += 1;
      this.ten.text = this.score;
    }
    if (keyboard.getKey("enter")) {
      this.hit = true;
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
