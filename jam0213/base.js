var ctx;
let nowMes = 0;
let nowChar = 0;
const limit = 5;
let interval = 0;
var img = {};
let mouse = {
    x: 0,
    y: 0
}
var humans = [];
var totalPoint = 0;
var totalCount = 0;
let startTime = 0;


function init2() {
    ctx.font = "30px 'Times New Roman'"
    ctx.fillStyle = "#FFFFFF";
    startTime = 0;
    totalPoint = 0;
    totalCount = 0;
    nowMes = 0;
    nowChar = 0;
    interval = 0;
};

function init() {
    let canvas = document.getElementById("cv");
    ctx = canvas.getContext("2d");
    ctx.font = "30px 'Times New Roman'"
    ctx.fillStyle = "#FFFFFF";

    img.camera = new Image();
    img.camera.src = "camera.png";
    img.dog = new Image();
    img.dog.src = "dog.png";
    img.human = [];
    for (let i = 0; i < 5; i++) {
        img.human[i] = new Image();
        img.human[i].src = "human" + (i + 1) + ".png";
    }
    humans.push(new human(img.dog, -2, 100, 100));
    humans.push(new human(img.dog, -2, 100, 100));
    humans.push(new human(img.human[0], 1, 40, 100));
    humans.push(new human(img.human[0], 1, 40, 100));
    humans.push(new human(img.human[1], 1, 40, 100));
    humans.push(new human(img.human[1], 1, 40, 100));
    humans.push(new human(img.human[2], 2, 40, 100));
    humans.push(new human(img.human[2], 2, 40, 100));
    humans.push(new human(img.human[3], 1, 40, 70));
    humans.push(new human(img.human[3], 1, 40, 70));
    humans.push(new human(img.human[4], 3, 30, 60));
    humans.push(new human(img.human[4], 3, 30, 60));

};

let input = {
    right: false,
    left: false
}

function MouseDown(e) { //キーが押されたらInputInfoに格納
    if (e.button == 0) {
        input.left = true;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }
    if (e.button == 2) {
        input.right = true;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }
}

function MouseUp(e) { //キーが離されたらInputInfoに格納
    if (e.button == 0) {
        input.left = false;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }
    if (e.button == 2) {
        input.right = false;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }
}

function MouseMove(e) { //キーが離されたらInputInfoに格納
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

document.addEventListener('mousedown', MouseDown, false);
document.addEventListener('mouseup', MouseUp, false);
document.addEventListener('mousemove', MouseMove, false);


function message(mes) { //mesは48以下
    ctx.fillStyle = "#d1d1d1";
    let leng = mes.length;
    if (leng > 16) {
        ctx.fillText(mes.substr(0, 16), 110, 440);
    } else {
        ctx.fillText(mes.substr(0, leng), 110, 440);
    }

    if (leng > 32) {
        ctx.fillText(mes.substr(16, 16), 110, 480);
        ctx.fillText(mes.substr(32, leng - 32), 110, 520);
    } else {
        ctx.fillText(mes.substr(16, leng - 16), 110, 480);
    }
}

function line(mes, num) { //mesは16以下
    let leng = mes.length;
    if (leng < 16) {
        leng = 16 - leng;
    }
    for (let i = 0; i < leng; i++) {
        mes += " ";
    }
    return mes
}

let me = [
 "私はこの惑星の住民から見ると宇宙人だ。",
 "この星には調査のためにやってきた",
 "どうやら、この星には高度に知的な生命体がいるらしく、",
 "彼らの画像を星に送ることで調査するのだ。",
 "捕獲すればいい話なのだが、宇宙法第114条で禁じられている。",
 "また、私は地球上の紫外線に大変弱いので",
 "防護服を着ていても10秒しか外に出ることができない。",
 "それから、4足歩行のイヌとかいう生物は",
 "我々の天敵イヌゥに酷似しており、写すと不快な気持ちになる。",
 "さて、それでは撮影に取り掛かるとしよう。",
 "クリックで撮影して、10秒間は何回でも撮影できるぞ。"
 ]

function ManageMes() {
    if (nowChar != me[nowMes].length && input.left) {
        input.left = false;
        nowChar = me[nowMes].length;
    } else if (nowChar == me[nowMes].length && input.left) {
        nowMes++;
        nowChar = 0;
        input.left = false;
    }
    if (nowMes < me.length) {
        mes = me[nowMes].substr(0, nowChar);
        if (me[nowMes].length > nowChar) {
            interval++;
            if (interval >= limit) {
                nowChar++;
                while (me[nowMes][nowChar] == " ") {
                    nowChar++
                }
                interval = 0;
            }
        }
    }
}

let mes = "";

let main = function loop() {
    //背景をクリア
    ctx.fillStyle = "#404040";
    ctx.clearRect(0, 0, 800, 600);
    ctx.fillRect(0, 0, 800, 600);
    if (nowMes < 11) {
        ctx.fillStyle = "#7b7b70";
        ctx.fillRect(100, 400, 500, 150);
        ManageMes();
        message(mes);
    } else if (startTime == 0) {
        startTime = new Date();
    } else if (new Date - startTime < 10000) {
        gameMain(mouse, img);
    } else {
        gameResult();
    }
}　　　　