let ctx;
let life = 100;
let ngCode = new Array(9);
let goodCode = new Array(9);
let input = -1;
const main = _ => {
    ctx.clearRect(0, 0, 800, 600);
    ctx.fillText("ngcode:", 0, 20);
    for(let i = 0; i < 6; i++) {
        ctx.fillText(String.fromCharCode(parseInt(ngCode[i])), 50, 20 + (i + 1) * 30);
    }
    if(input !== -1) {
        input.w = false;
        makeWindow(Math.random() * 1000, Math.random() * 600);
        let point = 5;
        for(let i = 0; i < 6; i++) {
            if(input === ngCode[i]) point = -15;
            else if(input === goodCode[i]) point += 10;
        }
        localStorage.setItem('count', parseInt(localStorage.getItem('count')) + point);
        window.open('', '_self')
            .close();
    } else {
        //life--;
        if(life <= 0) window.open('', '_self')
            .close();
    }
};
const init = () => {
    let canvas = document.getElementById("cv");
    ctx = canvas.getContext("2d");
    ctx.font = "20px 'Verdana'";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "#88DD88";
    ctx.fillStyle = "#44FF44";
    for(let i = 0; i < 4; i++) {
        goodCode[i] = 33 + 20 * i + Math.floor(Math.random() * 20);
    }
    for(let i = 0; i < 4; i++) {
        let kari = Math.floor(Math.random() * 20);
        ngCode[i] = goodCode[i] === kari ? 33 + 20 * i + (kari + 1) % 20 : 33 + 20 * i + kari;
    }
};
const makeWindow = (left, top) => {
    window.open('window.html', null, 'width=400, height=300,left=' + left + ',top=' + top + ' menubar=no, toolbar=no,resizable=no ,scrollbars=no');
};
const KeyDown = (e) => { //キーが押されたらInputInfoに格納 ({}つけないと正常に動かなかった)
    if(e.keyCode >= 33 && e.keyCode <= 33 + 126) input = e.keyCode;
};
const KeyUp = (e) => { //キーが離されたら、InputInfoから除去
    if(input === e.keyCode) input = -1;
};
document.addEventListener("keydown", KeyDown);
document.addEventListener("keyup", KeyUp);;
