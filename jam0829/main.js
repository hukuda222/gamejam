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
    "piza": "./pizza.png"
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
      text: "ピザを分けるゲーム\nクリック&ドラッグで切るよ\n\nEnter to start",
      fontSize: 40,
      fill: "white"
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(4));
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
    this.score = param.score;
    this.backgroundColor = "skyblue";
    /* const ground = Sprite("ground").addChildTo(this);
    ground.origin.set(0, 0);
    ground.width = SCREEN_WIDTH;
    ground.height = SCREEN_HEIGHT; */

    Label({
      text: "スコアは" + param.score + "です\nTキーでツイートするよ",
      fontSize: 50,
      fill: "white"
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(4));
  },
  update: function(app) {
    if (app.keyboard.getKey("T")) {
      let result = "ピザ切りのスコアは" + this.score + "でした！" + " https://hukuda222.github.io/gamejam/jam0829/ ";
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
    this.backgroundColor = "skyblue";
    this.vecs = [];
    this.part = null;
    this.stop = false;
    const piza = Sprite("piza").addChildTo(this);
    piza.x = 300;
    piza.y = 260;
    piza.width = 400;
    piza.height = 400;

    this.label = Label({
      text: "1/8を切り出そう",
      fontsize: 15,
      x: 200,
      y: 40,
      fill: "white"
    }).addChildTo(this);

    let elem = PlainElement({
      width: this.gridX.width,
      height: this.gridY.width
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    // canvasパラメータ指定
    elem.canvas.context.strokeStyle = "blue";
    elem.canvas.context.lineWidth = 4;
    // 参照用
    this.elem = elem;
  },
  onpointstart: function(e) {
    // タッチされた位置を記憶
    this.vecs = [];
    this.prev = Vector2(e.pointer.x, e.pointer.y);
  },
  // タッチ移動中
  onpointmove: function(e) {
    // 現在のタッチ位置を記憶
    const current = Vector2(e.pointer.x, e.pointer.y);
    // 前の位置から現在の位置まで線を引く
    if (this.stop === false) {
      this.elem.canvas.drawLine(this.prev.x, this.prev.y, current.x, current.y);

      // 閉じたかどうかチェック
      if (Math.abs(this.prev.x - current.x) + Math.abs(this.prev.y - current.y) > 30 &&
     Math.abs((this.prev.x * current.y) - (this.prev.y * current.x)) > 10.0) {
        for (let i = 0; i < this.vecs.length - 3; i++) {
          const cross_vec = is_cross(this.vecs[i], this.vecs[i + 1], this.prev, current);
          if (cross_vec) {
            this.prev = null;
            this.stop = true;
            const line = [];
            this.vecs.push(current);
            line.push(Vector2(cross_vec.x, cross_vec.y));
            for (let j = i + 1; j < this.vecs.length - 1; j++) {
              line.push(Vector2(this.vecs[j].x, this.vecs[j].y));
            }
            line.push(Vector2(cross_vec.x, cross_vec.y));
            this.elem.canvas.context.clearRect(0, 0, this.elem.canvas.width, this.elem.canvas.height);

            if (line.length > 3) {
              this.part = line;
              for (let k = 0; k < this.part.length - 1; k++) {
                this.elem.canvas.drawLine(this.part[k].x, this.part[k].y, this.part[k + 1].x, this.part[k + 1].y);
              }
            }
            i = this.vecs.length;
          }
        }

        // 前の位置を現在の位置に更新
      }
      this.prev = current;
      this.vecs.push(current);
    }
  },
  // タッチ終了
  onpointend: function() {
    // 位置情報をクリア
    if (this.stop === false) {
      for (let p = this.vecs.length - 1; p >= 2; p--) {
        for (let i = 0; i < p; i++) {
          const cross_vec = is_cross(this.vecs[i], this.vecs[i + 1], this.vecs[p - 1], this.vecs[p]);
          if (cross_vec) {
            this.stop = true;
            const line = [];
            line.push(Vector2(cross_vec.x, cross_vec.y));
            for (let j = i + 1; j < this.vecs.length - 1; j++) {
              line.push(Vector2(this.vecs[j].x, this.vecs[j].y));
            }
            line.push(Vector2(cross_vec.x, cross_vec.y));
            this.elem.canvas.context.clearRect(0, 0, this.elem.canvas.width, this.elem.canvas.height);
            if (line.length > 3) {
              this.part = line;
              for (let k = 0; k < this.part.length - 1; k++) {
                this.elem.canvas.drawLine(this.part[k].x, this.part[k].y, this.part[k + 1].x, this.part[k + 1].y);
              }
            }
            i = this.vecs.length;
          }
        }
      }
    }
    this.prev = null;
    this.vecs = [];
  },

  update: function(app) {
    if (this.stop) {
      let bunbo = 0;
      let bunsi = 0;
      for (let x = 100; x <= 500; x++) {
        for (let y = 60; y <= 460; y++) {
          if (Math.pow(x - 300, 2) + Math.pow(y - 260, 2) <= Math.pow(200, 2)) {
            bunbo++;
            if (is_in(this.part, x, y)) {
              bunsi++;
            }
          }
        }
      }
      console.log(bunsi / bunbo);
      this.exit({score: Math.ceil(1 / Math.abs((bunsi / bunbo) - (1 / 8)))});
      this.stop = false;
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
