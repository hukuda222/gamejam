/* global phina GameApp Label Box2dLayer RectangleShape Sprite */

phina.globalize();

const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 480;

const ASSETS = {
  image: {
    "sensei": "./sensei.png",
    "maru": "./maru.png",
    "batu": "./batu.png"
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
    this.backgroundColor = "green";
    Label({
      text: "でぃーぷらーにんぐするゲーム\n\n\nEnter to start",
      fontSize: 40,
      fill: "white"
    }).addChildTo(this).setPosition(this.gridX.center()-20, this.gridY.span(4));
    const sensei = Sprite("sensei").addChildTo(this);
    sensei.setPosition(500, 340);
    sensei.setSize(100, 150);
  },
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
    this.score = parseInt(Math.pow(param.correct/param.num,3)*param.correct*1000);
    this.mes ="";
    if(param.correct/param.num<0.6){
      this.mes="乱数と大差ない分類機";
    }else if(param.num<=10){
      this.mes="実行時間に難のある分類機";
    }else if(this.score<5000){
      this.mes="ポンコツ分類機";
    }else if(this.score<10000){
      this.mes="技術書の最初の方の分類機";
    }else if(this.score<15000){
      this.mes="技術書の中盤あたりの分類機";
    }else if(this.score<20000){
      this.mes="技術書の最後の方の分類機";
    }else if(this.score<25000){
      this.mes="コンペでよく使われる分類機";
    }else{
      this.mes="実質人工知能";
    }
    this.scorelabel = Label({
      text: "スコア:" + this.score + "\n\nあなたは、\n "+this.mes+"です！\n\nPress T to Tweet.",
      fontsize: 15,
      x: 250,
      y: 170,
      fill: "white"
    }).addChildTo(this);
    this.backgroundColor = "green";
    const sensei = Sprite("sensei").addChildTo(this);
    sensei.setPosition(500, 340);
    sensei.setSize(100, 150);
  },
  update: function(app) {
    if (app.keyboard.getKey("T")) {
      let result = "スコア:" + this.score + "で、私は"+this.mes+"でした！" + " https://hukuda222.github.io/gamejam/jam0916/ ";
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
    this.backgroundColor = "green";
    this.ans=-1;
    this.dots=[];
    this.num=0;
    this.correct=0;
    this.is_ready=true;
    this.time=0;
    this.res;
    this.lasttime=0;

    for(let i=0;i<3;i++){
      RectangleShape({
        x:80+(120*i),
        y:150,
        fill:'white',
        width:110,
        height:110
      }).addChildTo(this); 
      RectangleShape({
        x:80+(120*i),
        y:300,
        fill:'white',
        width:110,
        height:110
      }).addChildTo(this); 
    }
    RectangleShape({
      x:490,
      y:225,
      fill:'white',
      width:110,
      height:110
    }).addChildTo(this); 

    Label({
      text: "↑A",
      fontsize: 20,
      x: 490,
      y: 120,
      fill: "blue"
    }).addChildTo(this);

    Label({
      text: "↓B ",
      fontsize: 20,
      x: 490,
      y: 330,
      fill: "red"
    }).addChildTo(this);

    Label({
      text: "正しいグループを選んでね",
      fontsize: 20,
      x: 250,
      y: 30,
      fill: "white"
    }).addChildTo(this);

    this.scorelabel = Label({
      text: "0/0",
      fontsize: 30,
      x: 500,
      y: 60,
      fill: "white"
    }).addChildTo(this);
  },

  update: function(app) {
    this.time++;
    if(this.ans==-1)this.remake();
    const keyboard = app.keyboard;
    if(this.res && this.time-this.lasttime>10){
      this.res.remove();
    }

    if (keyboard.getKey("up")&&this.is_ready) {
      this.correct+=this.ans==0?1:0;
      this.num++;
      this.scorelabel.text = this.correct+"/"+this.num;
      this.is_ready=false;
      if(this.res)this.res.remove();
      if(this.ans==0){
        this.res = Sprite("maru").addChildTo(this);
        this.res.setPosition(500, 420);
      }else{
        this.res = Sprite("batu").addChildTo(this);
        this.res.setPosition(500, 420);
      }
      this.lasttime=this.time;
      this.dots.forEach(e=>{e.remove();});  
      this.dots=[];
      this.remake();
    }
    else if (keyboard.getKey("down")&&this.is_ready) {
      this.correct+=this.ans==1?1:0;
      this.num++;
      this.scorelabel.text = this.correct+"/"+this.num;
      this.is_ready=false;
      if(this.res)this.res.remove();
      if(this.ans==1){
        this.res = Sprite("maru").addChildTo(this);
        this.res.setPosition(500, 420);
      }else{
        this.res = Sprite("batu").addChildTo(this);
        this.res.setPosition(500, 420);
      }
      this.lasttime=this.time;
      this.dots.forEach(e=>{e.remove();});  
      this.dots=[];
      this.remake();
    }else if(!keyboard.getKey("up")&&!keyboard.getKey("down")){
      this.is_ready=true;
    }
    console.log(this.time);
    if (this.time > 60*8) {
      this.exit({correct: this.correct,num:this.num});
    }
  },
  remake: function(app){
    this.ans=Math.random()>=0.5 ? 0 :1;
    const delta=Math.random()*Math.PI;
    const noise=5+Math.random()*10;
    const keisu1=[Math.random()*10,Math.random()*10];
    const keisu2=[Math.random()*10,Math.random()*10];

    for(let k=0;k<2;k++){
      for(let i=0;i<3;i++){
        for(let t=0;t<=100;t++){
          this.dots.push(CircleShape({
            x:80+(120*i)+40*Math.cos(keisu1[k]*2*Math.PI*t/100)+Math.random()*noise, 
            y:150*(k+1)+40*Math.sin((keisu2[k]*2*Math.PI*t/100)+delta)+Math.random()*noise,
            radius: 2,
            fill: k==0?'blue':'red' ,
            strokeWidth:0
          }).addChildTo(this)); 
        }
      }
    }
    for(let t=0;t<=100;t++){
      this.dots.push(CircleShape({
        x:490+40*Math.cos(keisu1[this.ans]*2*Math.PI*t/100)+Math.random()*noise, 
        y:225+40*Math.sin((keisu2[this.ans]*2*Math.PI*t/100)+delta)+Math.random()*(5+Math.random()*10),
        radius: 2,
        fill: 'green' ,
        strokeWidth:0
      }).addChildTo(this)); 
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
