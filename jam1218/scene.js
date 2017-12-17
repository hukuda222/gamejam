class Scene {
    constructor(label, initFunc, tickFunc, endFunc) {
        this.stage = new createjs.Stage("myCanvas");
        this.stage.enableMouseOver(60);
        this.stage.w = 800;
        this.stage.h = 600;
        this.kill = _ => {
            this.stage.removeAllChildren();
            this.stage.removeAllEventListeners();
        };
        this.init = (any = {}) => {
            initFunc(this.stage, any);
        };
        this.label = label;
        this.tick = _ => {
            tickFunc(this.stage);
        };
        this.end = _ => {
            endFunc(this.stage);
            this.kill(); //別に分離する必要はなかった
        }
    }
}

class SceneManager{
    constructor(){
        this.scenes = {};
        this.now = null;
    }
    add(scene){
        this.scenes[scene.label] = scene;
    }
    set(label){
        this.now = this.scenes[label]
        this.now.init();
    }
    change(nextlabel,any={}){
        //前のシーンの画像を持ってきてフェードインっぽくする
        const beforeImg = new createjs.Bitmap(document.getElementById('myCanvas').toDataURL());
        createjs.Tween.get(beforeImg).to({alpha:0},500,createjs.Ease.cubicInOut);
        this.now.end();
        this.now = this.scenes[nextlabel];
        this.now.init(any);
        this.now.stage.addChild(beforeImg);
    }
    tick(){
        if(this.now !== null)this.now.tick();
    }
}
