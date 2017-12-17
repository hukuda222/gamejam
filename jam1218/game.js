const coms1 = {};
const coms2 = {};
let player;
let enemy;
let log;
let state = 1;
let wait = 0;
const set = (coms, stage) => {
  Object.keys(coms).forEach((c, i) => {
    coms[c].include(stage);
  });
};
const del = (coms, stage) => {
  Object.keys(coms).forEach((c, i) => {
    console.log(c);
    coms[c].remove(stage);
  });
};
const gameInit = (stage, any) => {
  const img = new createjs.Bitmap(images["back"]);
  img.x = 0;
  img.y = 0;
  stage.addChild(img);
  log = new initLog(stage);
  player = new Player(stage, 50, "ヤギ");
  enemy = new Enemy(stage, 500, "そばや");
  coms1.fight = new Button(stage, stage.w - 80, stage.h - 120 + 50 * 0, 100, 40, 25, "White", "Black", "Pink", "戦う", _ => {
    del(coms1, stage);
    coms1.fight.remove(stage);
    set(coms2, stage);
    state = 2;
  });
  coms1.escape = new Button(stage, stage.w - 80, stage.h - 120 + 50 * 1, 100, 40, 25, "White", "Black", "Pink", "逃げる", _ => {
    log.put("そばや:それは逃げだよ");
    log.put("逃げられない！");
  });
  coms2.attack = new Button(stage, stage.w - 80, stage.h - 120 + 50 * 0, 100, 40, 25, "White", "Black", "Pink", "攻撃", _ => {
    del(coms2, stage);
    player.attack(log, enemy, 100);
    state = 3;
    wait = 30;
  });
  coms2.skill = new Button(stage, stage.w - 80, stage.h - 120 + 50 * 1, 100, 40, 25, "White", "Black", "Pink", "スキル", _ => {
    log.put("そばや:スキルは逃げだよ");
    log.put("スキルを選べない！");
  });
  coms2.guard = new Button(stage, stage.w - 80, stage.h - 120 + 50 * 2, 100, 40, 25, "White", "Black", "Pink", "防御", _ => {
    log.put("そばや:守るのは逃げだよ");
    log.put("防御できない！");
  });
  set(coms1, stage);
  log.put("ヤギはどうする？");
};

const gameEnd = stage => {};
const gameLoop = stage => {
  if (player.hp <= 0) Manager.change("end", {
    win: 0
  });
  else if (enemy.hp <= 0) Manager.change("end", {
    win: 1
  });
  if (wait == 0 && state == 3) {
    enemy.attack(log, player, 100);
    wait = 30;
    state = 0;
  } else if (wait == 0 && state == 0) {
    set(coms1, stage);
    state = 1;
  } else if (wait > 0) wait--;

  stage.update();
};
