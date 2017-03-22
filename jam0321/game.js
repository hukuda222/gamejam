let ctx;
const input = {
    space: false,
    other: -1
};
const pick = [
  "init(s,t)",
"  char s[]; {",
"  extern symbuf, namsiz;",
"  char symbuf[], sp[];",
"  int np[], i;",
"	i = namsiz;",
"	sp = symbuf;",
"	while(i--)",
"   if(( * sp++ = * s++) == '\0') --s;",
"	np = lookup();",
"* np++ = 1;",
"  press password:",
"    I am the bone of my sword. ",
"    Steel is my body, and fire is my blood. ",
"    Unknown to Death. ",
"    Nor known to Life. ",
"    Have withstood pain to create many weapons. ",
"    Yet, those hands will never hold anything. ",
"    So as I pray, UNLIMITED BLADE WORKS. "
];
const main = _ => {
    ctx.clearRect(0, 0, 800, 700);
    if(window.end >= 2000) {
        pick[19] = "your score:" + localStorage.getItem('count');
        pick[20] = "Press space to tweet";
        for(let i = 0; i < pick.length; i += 1) {
            ctx.fillText(pick[i], 0, 50 + i * 30);
        }
        if(input.space) {
            let result = "とにかくキーを叩くだけのゲーム。 Score:" + localStorage.getItem('count') + " https://hukuda222.github.io/gamejam/jam0321/ ";
            location.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(result) + "&hashtags=traP3jam";
        }
    } else if(window.end < 2000) {
        ctx.fillText("Press space to start", 0, 20);
        for(let i = 0; i < pick.length && i * 100 < window.end; i += 1) {
            ctx.fillText(pick[i].substr(0, window.end - i * 100), 0, 50 + i * 30);
        }
        if(input.space && window.end <= 0) {
            window.end = 1;
            input.space = false;
            makeWindow(Math.random() * 1000, Math.random() * 600);
        } else if(input.other > 0 && window.end > 0) {
            input.other = -1;
            makeWindow(Math.random() * 1000, Math.random() * 600);
        }
    }
    if(window.end > 0) {
        window.end++;
    }
};
const init = _ => {
    let canvas = document.getElementById("cv");
    ctx = canvas.getContext("2d");
    ctx.font = "20px 'Verdana'";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "#88DD88";
    ctx.fillStyle = "#44FF44";
    window.end = 0;
};
const makeWindow = (left, top) => {
    window.open('window.html', null, 'width=400, height=300,left=' + left + ',top=' + top + ' menubar=no, toolbar=no,resizable=no ,scrollbars=no');
};
const KeyDown = (e) => { //キーが押されたらInputInfoに格納 ({}つけないと正常に動かなかった)
    console.log(e.keyCode);
    if(e.key == " ") {
        input.space = true;
    } else if(e.keyCode >= 65 && e.keyCode <= 90) {
        input.other = e.keyCode;
    }
};
const KeyUp = (e) => { //キーが離されたら、InputInfoから除去
    if(input.other === e.keyCode) input.other = -1;
    else if(e.key == " ") {
        input.space = false;
    }
};
document.addEventListener("keyup", KeyUp);;
document.addEventListener("keydown", KeyDown);
