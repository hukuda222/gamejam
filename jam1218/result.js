const resultInit = (stage, any) => {
  const back = new createjs.Bitmap(images["back"]);
  back.x = 0;
  back.y = 0;
  stage.addChild(back);
  const winColorString = any.win == 0 ? "そばや" : "ヤギ";
  const winColor = any.win == 0 ? "Blue" : "Red";
  const text = new createjs.Text(winColorString + "のかち！", "100px Century Gothic", winColor);
  text.x = stage.w / 2 - 200;
  text.y = stage.h / 3;
  stage.addChild(back);
  stage.addChild(text);
};

const resultTick = stage => {
  stage.update();
};
