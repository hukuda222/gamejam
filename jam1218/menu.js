class Button{
    constructor(stage,x,y,w,h,size,color1,color2,color3,text,clickFunc) {
        this.w = w;
        this.h = h;
        this.container = new createjs.Container();
        this.container.x = x;
        this.container.y = y;
        this.button = new createjs.Shape();
        const changeColor = (color) => {this.button.graphics.clear().beginFill(color).drawRoundRect(x-w/2,y-h*3/4,this.w,this.h,10);};
        changeColor(color1);
        this.button.addEventListener("click",_=>{clickFunc();createjs.Sound.play("click");});
        this.button.addEventListener("mouseover",_ =>{changeColor(color3);});
        this.button.addEventListener("mouseout",_ =>{changeColor(color1);});
        this.text = new createjs.Text(text, size+"px Century Gothic", color2);
        this.text.x=x-w/2;
        this.text.y=y-h/2;
    }
    include(stage){
        stage.addChild(this.container);
        stage.addChild(this.button);
        stage.addChild(this.text);
    }
    remove(stage){
        stage.removeChild(this.container);
    }
}

const menuInit = (stage) => {
    const b1 = new Button(stage,250,300,250,100,35,"White","Black","Red","ふたりであそぶ",_=>{Manager.change("game",{type:"double"});});
    const b2 = new Button(stage,550,300,250,100,35,"White","Black","Red","ひとりであそぶ",_=>{b1.remove(stage);b2.remove(stage);b3.include(stage);b4.include(stage);});
    const b3 = new Button(stage,250,300,250,100,40,"White","Black","Red","よわいあいて",_=>{Manager.change("game",{type:"easy"});});
    const b4 = new Button(stage,550,300,250,100,40,"White","Black","Red","つよいあいて",_=>{Manager.change("game",{type:"hard"});});
    b1.include(stage);
    b2.include(stage);
};

const menuTick = stage => {
    stage.update();
};
