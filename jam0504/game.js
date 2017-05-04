let ctx;
let nowState;
let endMes;
const images={
    player:0,
    money:1,
    card:2,
    toge:3
}
const input = {
    right:false,
    left:false,
    down:false,
    enter:false
};
const state = {
    Title:0,
    Play:1,
    Result:2
};
const player = {
    score:0,
    x:300,
    vel:1,
    acc:0
};
//単位は億
class Money {
    constructor() {
        this.pos = {x:0,y:0};
        this.value = 0;
        this.exist = false;
    }
    get move(){
        if(this.exist){
            this.pos.y -= player.vel;
            ctx.drawImage(images.money,this.pos.x,this.pos.y,50,50);
            if(this.pos.y < 0) this.exist = false;
        }
    }
    get col(){
        if(this.exist && Math.pow(player.x-this.pos.x,2) + Math.pow(this.pos.y-100,2) < 10000){
            player.score += this.value;
            player.acc += this.value;
            this.exist = false;
        }
    }
    get reset(){
        this.pos.x = 25+Math.random()*500;
        this.pos.y = 600;
        this.value = Math.ceil(Math.random()*Math.floor(10+player.score))*10;
        this.exist = true;
    }
    get empty(){
        return this.exist;
    }
}
class Card {
    constructor() {
        this.pos = {x:0,y:0};
        this.exist = false;
    }
    get move(){
        if(this.exist){
            this.pos.y -= player.vel;
            ctx.drawImage(images.card,this.pos.x,this.pos.y,50,50);
            if(this.pos.y < 0) this.exist = false;
        }
    }
    get col(){
        if(this.exist && Math.pow(player.x-this.pos.x,2) + Math.pow(this.pos.y-100,2) < 10000){
            player.acc = 0;
            this.exist = false;
        }
    }
    get reset(){
        this.pos.x = 25+Math.random()*500;
        this.pos.y = 600;
        this.exist = true;
    }
    get empty(){
        return this.exist;
    }
}
class Toge {
    constructor() {
        this.pos = {x:0,y:0};
        this.exist = false;
    }
    get move(){
        if(this.exist){
            this.pos.y -= player.vel;
            ctx.drawImage(images.toge,this.pos.x,this.pos.y,50,50);
            if(this.pos.y < 0) this.exist = false;
        }
    }
    get col(){
        if(this.exist && Math.pow(player.x-this.pos.x,2) + Math.pow(this.pos.y-100,2) < 5000){
            nowState = state.Result;
            endMes = "針に刺さった"
            this.exist = false;
        }
    }
    get reset(){
        this.pos.x = 25+Math.random()*500;
        this.pos.y = 600;
        this.exist = true;
    }
    get empty(){
        return this.exist;
    }
}
let moneys = [];
for(let i=0;i<10;i++)moneys[i] = new Money();
const card = new Card();
const toge = new Toge();
const main = _ => {
    ctx.clearRect(0, 0, 800, 600);
    ctx.fillStyle = "#DDDDDD";
    ctx.fillRect(0,0,800,600);
    switch(nowState){
        case state.Title:
            ctx.fillStyle = "#000000";
            ctx.font = "30px 'Verdana'";
            ctx.fillText("Gravity of 5 Quadrillion yen",100,200);
            ctx.font = "20px 'Verdana'";
            ctx.fillText("お金：増えるほど嬉しいが、重くなるので加速度が増える",150,250);
            ctx.fillText("クレジットカード：お金を預けて、加速度を0にリセットできる",150,300);
            ctx.fillText("とげ：刺さると痛い",150,350);
            ctx.font = "30px 'Verdana'";
            ctx.fillText("Enterで始まるよ",150,400);
            if(input.enter){
                nowState = state.Play;
                moneys[0].reset;
            }
            break;
        case state.Play:
            ctx.fillStyle = "#000000";
            ctx.font = "20px 'Verdana'";
            if(player.score>=10000){
                ctx.fillText(Math.floor(player.score/10000)+"兆"+player.score%10000+"億円",30,50);
            }else{
                ctx.fillText(player.score+"億円",30,50);
            }
            let isMake = Math.random()>0.99;
            for(let i=0;i<10 && isMake;i++){
                if(!moneys[i].empty){
                    moneys[i].reset;
                    isMake = false;
                }
            }
            for(let i=0;i<10;i++){
                moneys[i].move;
                moneys[i].col;
            }
            if(Math.random()>0.999 && !card.empty)card.reset;
            if(Math.random()>0.999 && !toge.empty)toge.reset;
            card.move;
            card.col;
            toge.move;
            toge.col;
            if(player.vel<300){
              player.vel += player.acc/500000;
            }else{
                nowState=state.Result;
                endMes="早すぎて燃え尽きた";
            }
            if(input.left)player.x-=8;
            else if(input.right)player.x+=8;
            if(player.x < 50)player.x = 50
            else if(player.x > 750)player.x = 750
            ctx.drawImage(images.player,player.x,100,100,100);
            break;
        case state.Result:
            ctx.fillStyle = "#000000";
            ctx.font = "20px 'Verdana'";
            ctx.fillText("GameOver",400,300);
            ctx.fillText(endMes,400,350);
            ctx.fillText("Press T to Tweet",400,400);
            if(input.t) {
                let s="";
                if(player.score>=10000){
                    s=Math.floor(player.score/10000)+"兆"+player.score%10000+"億円";
                }else{
                    s=player.score+"億円";
                }
                let result = "5000兆円稼ぐゲーム。 稼いだのは" + s + " https://hukuda222.github.io/gamejam/jam0504/ ";
                location.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(result) + "&hashtags=traP3jam";
            }
            break;

    }
};
const init = _ => {
    let canvas = document.getElementById("cv");
    ctx = canvas.getContext("2d");
    ctx.font = "20px 'Verdana'";
    ctx.shadowBlur = 0;
    ctx.shadowColor = "#88DD88";
    ctx.fillStyle = "#44FF44";
    nowState = state.Title;
    images.player = new Image();
    images.player.src = "player.png";
    images.money = new Image();
    images.money.src = "money.png";
    images.card = new Image();
    images.card.src = "card.png";
    images.toge = new Image();
    images.toge.src = "toge.png";
    player.acc=0;
    player.score=0;
    player.vel=1;
    player.x=300;
};
const KeyDown = (e) => { //キーが押されたらInputInfoに格納 ({}つけないと正常に動かなかった)
    if(e.keyCode === 37) input.left = true;
    else if(e.keyCode === 39) input.right = true;
    else if(e.keyCode === 40) input.down = true;
    else if(e.keyCode === 13) input.enter = true;
    else if(e.keyCode === 84) input.t = true;
};

const KeyUp = (e) => { //キーが離されたら、InputInfoから除去
  if(e.keyCode === 37) input.left = false;
  else if(e.keyCode === 39) input.right = false;
  else if(e.keyCode === 40) input.down = false;
  else if(e.keyCode === 13) input.enter = false;
  else if(e.keyCode === 84) input.t = false;
};
document.addEventListener("keyup", KeyUp);
document.addEventListener("keydown", KeyDown);
