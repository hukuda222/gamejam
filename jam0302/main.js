/* global phina GameApp */

phina.globalize();

const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 480;

const is_cross = (a, b, c, d) => {
  const a0 = (b.y - a.y) / (b.x - a.x);
  const a1 = (d.y - c.y) / (d.x - c.x);

  const x = (a0 * a.x - a.y - a1 * c.x + c.y) / (a0 - a1);
  const y = (b.y - a.y) / (b.x - a.x) * (x - a.x) + a.y;
  if (Math.abs(a0) === Math.abs(a1)) return false;

  if (x > Math.max(a.x, b.x) || x > Math.max(c.x, d.x) ||
             y > Math.max(a.y, b.y) || y > Math.max(c.y, d.y) ||
                     x < Math.min(a.x, b.x) || x < Math.min(c.x, d.x) ||
                             x < Math.min(a.x, b.x) || y < Math.min(c.y, d.y)) return false;

  return { x: x, y: y };
};

const is_in = (vecs, x, y) => {
  let count = 0;
  const ten = {x: x, y: y};
  const po = {x: 114514, y: y};
  for (let i = 0; i < vecs.length - 1; i++) {
    if (is_cross(vecs[i], vecs[i + 1], ten, po))count += 1;
  }
  return count % 2 === 1;
};

const ASSETS = {
  image: {
    "sakura": "./sakura.png",
    "kokuhaku": "./kokuhaku.png",
    "player": "./player.png",
    "sumaho": "./sumaho.png",
    "chari": "./chari.png",
    "gal": "./gal.png"
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
    this.backgroundColor = "pink";
    const label = Label({
      text: "ときどきメモリアル",
      fontSize: 50,
      fill: "white"
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(1));
    const label2 = Label({
      text: "君は主人公の親友だ。\n桜の樹の下の告白を成功させよう。\n十字キーで移動し、" +
      "\n四方から来る人をせき止めるんだ！\n\n\nEnter to start",
      fontSize: 30,
      fill: "white"
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(5));
  }, // タッチ開始
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
    this.score = param.score - 1;
    this.backgroundColor = "pink";

    Label({
      text: "せき止めたのは" + (param.score - 1) + "人。\nTキーでツイート",
      fontSize: 50,
      fill: "white"
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(4));
  },
  update: function(app) {
    if (app.keyboard.getKey("T")) {
      let result = "せき止めた人数は" + String(this.score) + "人でした！" + " https://hukuda222.github.io/gamejam/jam0302/ ";
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
    this.backgroundColor = "skyblue";
    this.count = 50;

    const piza = Sprite("sakura").addChildTo(this);
    piza.x = 300;
    piza.y = 260;
    piza.width = 200;
    piza.height = 200;

    this.kokuhaku = Sprite("kokuhaku").addChildTo(this);
    this.kokuhaku.x = 300;
    this.kokuhaku.y = 310;
    this.kokuhaku.width = 100;
    this.kokuhaku.height = 150;

    this.group = DisplayElement().addChildTo(this);

    const player = Sprite("player").addChildTo(this.group);
    player.x = 30;
    player.y = 30;
    player.width = 50;
    player.height = 75;

    this.enemys = [];
  },

  update: function(app) {
    const keyboard = app.keyboard;
    // 左右移動
    if (keyboard.getKey("left")) {
      this.group.children.each((g) => {
        g.x -= 20;
      });
    }
    if (keyboard.getKey("right")) {
      this.group.children.each((g) => {
        g.x += 20;
      });
    }
    // 上下移動
    if (keyboard.getKey("up")) {
      this.group.children.each((g) => {
        g.y -= 20;
      });
    }
    if (keyboard.getKey("down")) {
      this.group.children.each((g) => {
        g.y += 20;
      });
    }
    this.count -= 1;
    if (this.count === 0) {
      this.count = 100;
      let type = "";
      if (Math.random() > 0.33)type = "sumaho";
      else if (Math.random() > 0.33)type = "gal";
      else type = "chari";
      let e = Sprite(type);
      e.type = type;
      if (type != "chari")e.width = 50;
      else e.width = 75;
      e.height = 75;
      e.is_in = false;
      e.addChildTo(this);

      let x0 = Math.random() * SCREEN_WIDTH;
      let y0 = Math.random() * SCREEN_HEIGHT;
      let x1 = Math.random() * SCREEN_WIDTH;
      let y1 = Math.random() * SCREEN_HEIGHT;
      if (Math.random() <= 0.25)x0 = 1;
      else if (Math.random() <= 0.25)x0 = SCREEN_WIDTH - 1;
      else if (Math.random() <= 0.25)y0 = 1;
      else y0 = SCREEN_HEIGHT - 1;

      if (Math.random() <= 0.25)x1 = -1;
      else if (Math.random() <= 0.25)x1 = SCREEN_WIDTH + 1;
      else if (Math.random() <= 0.25)y1 = -1;
      else y1 = SCREEN_HEIGHT + 1;

      if (Math.random() < 0.5) {
        e.tweener.set({x: x0, y: y0}).to({x: 250 + 100 * Math.random(), y: 260 + 100 * Math.random()},
          1500 + Math.random() * 1000)
          .to({x: x1, y: y1}, 1500 + (Math.random() * 1000), "swing").play();
      } else {
        e.tweener.set({x: x0, y: y0})
          .to({x: x1, y: y1}, 2500 + (Math.random() * 1000), "swing").play();
      }
      this.enemys.push(e);
    }
    const adds = [];
    this.enemys.forEach((e) => {
      let end = false;
      this.group.children.each((g) => {
        if (e.hitTestElement(g) && !end) {
          e.is_in = true;
          let ne = Sprite(e.type);
          if (e.type !== "chari")ne.width = 50;
          else ne.width = 75;
          ne.height = 75;
          ne.x = (e.x + g.x) / 2;
          ne.y = (e.y + g.y) / 2;
          adds.push(ne);
          end = true;
        }
      });
    });
    adds.forEach((e) => {
      e.addChildTo(this.group);
    });
    this.enemys = this.enemys.filter((e) => {
      if (e.is_in || e.x < 0 || e.x > SCREEN_WIDTH || e.y < 0 || e.y > SCREEN_HEIGHT) {
        e.remove();
        return false;
      };
      return true;
    });

    this.group.children.each((g) => {
      if (g.hitTestElement(this.kokuhaku)) {
        this.exit({score: this.group.children.length});
      }
    });
    this.enemys.forEach((e) => {
      if (e.hitTestElement(this.kokuhaku)) {
        this.exit({score: this.group.children.length});
      }
    });
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
