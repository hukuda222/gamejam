let input = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    right: false,
    left: false,
    up: false
}

function KeyDown(e) { //キーが押されたらInputInfoに格納 ({}つけないと正常に動かなかった)
    if (e.key == "ArrowLeft" || e.code == 37) {
        input.left = true;
    }
    if (e.key == "ArrowRight" || e.code == 39) {
        input.right = true;
    }
    if (e.key == "ArrowUp" || e.code == 38) {
        input.up = true;
    }
    if (e.key == "w") {
        input.w = true;
    }
    if (e.key == "a") {
        input.a = true;
    }
    if (e.key == "s") {
        input.s = true;
    }
    if (e.key == "d") {
        input.d = true;
    }
    if (e.key == " ") {
        input.space = true;
    }
}

function KeyUp(e) { //キーが離されたら、InputInfoから除去
    if (e.key == "ArrowLeft" || e.code == 37) {
        input.left = false;
    }
    if (e.key == "ArrowRight" || e.code == 39) {
        input.right = false;
    }
    if (e.key == "ArrowUp" || e.code == 38) {
        input.up = false;
    }
    if (e.key == "w") {
        input.w = false;
    }
    if (e.key == "a") {
        input.a = false;
    }
    if (e.key == "s") {
        input.s = false;
    }
    if (e.key == "d") {
        input.d = false;
    }
    if (e.key == " ") {
        input.space = false;
    }
}
//////////////////////////////////////
let ctx;
let clk=[];
let boom=[];
let count = 0;

function init() {
    let canvas = document.getElementById("cv");
    ctx = canvas.getContext("2d");
    ctx.font = "30px 'Times New Roman'"
    ctx.fillStyle = "#FFFFFF";

    $("<img id='clk1' src='clk1.png' >").appendTo("canvas");
     clk[0] = document.getElementById("clk1");
    $("<img id='clk2' src='clk2.png' >").appendTo("canvas");
     clk[1] = document.getElementById("clk2");
    $("<img id='clk3' src='clk3.png' >").appendTo("canvas");
     clk[2] = document.getElementById("clk3");

    $("<img id='boom1' src='boom1.png' >").appendTo("canvas");
     boom[0] = document.getElementById("boom1");
    $("<img id='boom2' src='boom15.png' >").appendTo("canvas");
     boom[1] = document.getElementById("boom2");
    $("<img id='boom3' src='boom2.png' >").appendTo("canvas");
     boom[2] = document.getElementById("boom3");
    $("<img id='boom4' src='boom3.png' >").appendTo("canvas");
     boom[3] = document.getElementById("boom4");
    $("<img id='boom5' src='boom4.png' >").appendTo("canvas");
     boom[4] = document.getElementById("boom5");
}


const s = {
    stand: 0,
    air: 1
}

const Scene = {
    play: 0,
    boom:1,
    end: 2
}
let now = Scene.play;
const gravity = 0.7;
let blocks = [];
let blocknum = [];
let bcount=0;
for (let i = 1; i <= 20; i++) {
    blocknum.push(i);
}

function makeBlock(id, x, y) {
    this.pos = {
        x: x,
        y: y
    }; //中心
    this.id = id;
    this.speed = 3.0+Math.random()*0.4;
    this.move = function () {
        this.pos.y += this.speed;
        ctx.fillRect(this.pos.x - 30, this.pos.y - 20, 60, 40);
        if (Math.abs(pl.pos.x - this.pos.x) < 30 &&
            this.pos.y - pl.pos.y < 40 && this.pos.y - pl.pos.y > 20 && pl.state !== s.stand) {
            pl.col("block", this.id);
        }
        if (this.pos.y > 620) {
            this.pos.y=-114514;
            blocknum.push(this.id);
            //delete this;
        }
    }

}

blocks[0] = new makeBlock(0, 400, 0);

function makePlayer() {
    this.pos = {
        x: 400,
        y: -40
    };
    this.state = s.stand;
    this.speed = 0;
    this.ride = blocks[0];
    this.goright = true;
    this.goleft = true;

    this.move = function () {
        if (this.state === s.air) {
            this.speed += gravity;
            this.pos.y += this.speed;
        } else if (input.up && this.state === s.stand) {
            this.speed = -15;
            this.state = s.air;
            this.pos.y += this.speed;
            input.up = false;
        } else if (!input.up && this.state === s.stand) {
            this.speed = 0;
            this.pos.y = this.ride.pos.y - 40;
            if (Math.abs(this.pos.x - this.ride.pos.x) > 30) {
                this.state = s.air;
                this.speed = 0.2;
            }
        }

        if (input.left && this.goleft　&& this.state==s.stand) this.pos.x -= 4;
        else if (input.left && this.goleft　&& this.state==s.air) this.pos.x -= 6;
        if (input.right && this.goright && this.state==s.stand) this.pos.x += 4;
        else if (input.right && this.goright && this.state==s.air) this.pos.x += 6;
        this.goleft = true;
        this.goright = true;
        if(this.pos.y>620 || (this.state==s.stand&&this.ride.pos.y>610)) {
            now=Scene.boom;
        }

        if(this.state==s.air && this.speed <0){ctx.drawImage(clk[2],this.pos.x - 20, this.pos.y - 20,40,40);}
        else if(this.state==s.air && this.speed >=0){ctx.drawImage(clk[1],this.pos.x - 20, this.pos.y - 20,40,40);}
        else{ctx.drawImage(clk[0],this.pos.x - 20, this.pos.y - 20,40,40);}
    }
    this.col = function (what, id) {
        switch (what) {
            case "block":
                this.state = s.stand;
                this.ride = blocks[id];
                break;
        }
    }
}

function blockAdd(p) {
     let newid = blocknum.pop();
    console.log(p);
   // if(Math.random()>0.2){
    if(p==80)blocks[newid] = new makeBlock(newid, Math.random() * 150 + 30, -20);
    else if(p==40||p==120)blocks[newid] = new makeBlock(newid, Math.random() * 150 + 180, -20);
    else if(p==160||p==0)blocks[newid] = new makeBlock(newid, Math.random() * 150 + 340, -20);
    else if(p==200||p==280)blocks[newid] = new makeBlock(newid, Math.random() * 150 + 500, -20);
    else if(p==240)blocks[newid] = new makeBlock(newid, Math.random() * 150 + 620, -20);
  //  }
//    else blocks[newid]= new makeBlock(newid, Math.random() * 730 + 30, -20);
}
const pl = new makePlayer();

document.addEventListener("keydown", KeyDown);
document.addEventListener("keyup", KeyUp);


let main = function loop() {
    //背景をクリア
    ctx.fillStyle = "#CC3333";
    if (now == Scene.play) {
        ctx.clearRect(0, 0, 800, 600);
        ctx.fillRect(0,0,800,600)
        count++;
        blocks.forEach(function (obj) {
            if(obj)obj.move();
        });
        pl.move();
        if (count % 40 == 0 && blocknum.length > 2) {
            blockAdd(count%320);
        }
    }
    else if(now == Scene.boom){
        ctx.clearRect(0, 0, 800, 600);
        ctx.fillText("ゲームオーバー", 510, 320);
        if(count<634)ctx.fillText("スコアは、"+count+"です", 510, 360);
        ctx.drawImage(boom[Math.floor(bcount/10)],pl.pos.x-110,450,200,200);
        if(bcount< 49)bcount++;
        else {now=Scene.end;bcount=0;}
    }
    else{
         ctx.clearRect(0, 0, 800, 600);
        ctx.fillText("ゲームオーバー", 510, 320);
        ctx.fillText("スコアは、"+count+"です", 510, 360);
    }
}　　　
