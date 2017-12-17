const obj = {};
const images = {};
const Manager = new SceneManager();

createjs.Ticker.setFPS(60);

const init = _ => {
  Manager.add(new Scene("title", titleInit, titleTick, _ => {}));
  Manager.add(new Scene("game", gameInit, gameLoop, gameEnd));
  Manager.add(new Scene("end", resultInit, resultTick, _ => {}));
  Manager.set("title");
  createjs.Ticker.addEventListener("tick", tick);
};

const tick = _ => {
  Manager.tick();
};
