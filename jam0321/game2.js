let ctx;
let life = 100;
let ngCode = new Array(9);
let goodCode = new Array(9);
let input = -1;
const main2 = _ => {
    ctx.clearRect(0, 0, 200, 150);
    ctx.fillText("ngcode:", 0, 20);
    for(let i = 0; i < 6; i++) {
        ctx.fillText(String.fromCharCode(parseInt(ngCode[i])), 50, 20 + (i + 1) * 30);
    }
    if(input !== -1) {
        makeWindow(Math.random() * 1000, Math.random() * 600);
        let point = 5;
        for(let i = 0; i < 6; i++) {
            if(input === ngCode[i]) point = -15;
            else if(input === goodCode[i]) point += 10;
        }
        life = 0;
        localStorage.setItem('count', parseInt(localStorage.getItem('count')) + point);
        window.open('', '_self')
            .close();
    } else {
        life--;
        if(life <= 0 || localStorage.getItem('end') >= 2000) {
            window.open('', '_self')
                .close();
        }
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
        goodCode[i] = 65 + 6 * i + Math.floor(Math.random() * 6);
    }
    for(let i = 0; i < 4; i++) {
        let kari = Math.floor(Math.random() * 6);
        ngCode[i] = goodCode[i] === kari ? 65 + 6 * i + (kari + 1) % 6 : 65 + 6 * i + kari;
    }
};
const makeWindow = (left, top) => {
    window.open('window.html', null, 'width=400, height=300,left=' + left + ',top=' + top + ' menubar=no, toolbar=no,resizable=no ,scrollbars=no');
};
const KeyDown = (e) => { //キーが押されたらInputInfoに格納 ({}つけないと正常に動かなかった)
    if(e.keyCode >= 65 && e.keyCode <= 90) input = e.keyCode;
};
const KeyUp = (e) => { //キーが離されたら、InputInfoから除去
    if(input === e.keyCode) input = -1;
};
document.addEventListener("keydown", KeyDown);
document.addEventListener("keyup", KeyUp);;
