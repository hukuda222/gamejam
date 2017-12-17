const titleInit = (stage) => {
  const back = new createjs.Bitmap(images["back"]);
  back.x = 0;
  back.y = 0;
  stage.addChild(back);
  const text = new createjs.Text("DTB", "80px Century Gothic", "Black");
  const text2 = new createjs.Text("動物に変えられてしまった勇者一行は、\nかくかくしかじかでヤギ1匹になってしまう \nそう、これはD(動物)T(たちの)B(冒険)のクライマックスである", "20px Century Gothic", "Black");
  text.x = 100;
  text.y = 100;
  text2.x = 100;
  text2.y = 200;
  stage.addChild(text);
  stage.addChild(text2);
  back.addEventListener("click", _ => {
    Manager.change("game");
  });
};

const titleTick = stage => {
  stage.update();
};
