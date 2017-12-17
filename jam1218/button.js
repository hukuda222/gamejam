class Button {
  constructor(stage, x, y, w, h, size, color1, color2, color3, text, clickFunc) {
    this.w = w;
    this.h = h;
    this.button = new createjs.Shape();
    this.button.graphics.setStrokeStyle(5);
    const changeColor = (color) => {
      this.button.graphics.clear().beginFill(color).drawRoundRect(x - w / 2, y - h * 3 / 4, this.w, this.h, 10);
      this.button.graphics.beginStroke("Black").drawRoundRect(x - w / 2, y - h * 3 / 4, this.w, this.h, 10);
    };
    changeColor(color1);
    this.button.addEventListener("click", _ => {
      clickFunc();
    });
    this.button.addEventListener("mouseover", _ => {
      changeColor(color3);
    });
    this.button.addEventListener("mouseout", _ => {
      changeColor(color1);
    });
    this.text = new createjs.Text(text, size + "px Century Gothic", color2);
    this.text.x = 5 + x - w / 2;
    this.text.y = y - h / 2;
  }
  include(stage) {
    stage.addChild(this.button);
    stage.addChild(this.text);
  }
  remove(stage) {
    stage.removeChild(this.button);
    stage.removeChild(this.text);
  }
};
