const dame = (stage, d) => {
  const damage = new createjs.Text(d, "50px Century Gothic", "Orange");
  damage.x = stage.width / 2;
  damage.y = stage.height / 2;
  createjs.Tween.get(count).to({
    scaleX: 2,
    scaleY: 2,
  }, 100, createjs.Ease.cubicInOut).call(_ => {
    stage.removeChild(damage);
  });
  stage.addChild(damage);
};
