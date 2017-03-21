let ctx;
let end = 0;
const input = {
    space: false
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
    ctx.clearRect(0, 0, 800, 600);
    if(end === 2000) {
        ctx.clearRect(0, 0, 800, 600);
        pick.push("");
        pick.push("your score:" + localStorage.getItem('count'));
    } else if(end < 2000) {
        ctx.fillText("Press space to start", 0, 20);
        for(let i = 0; i < pick.length && i * 100 < end; i += 1) {
            ctx.fillText(pick[i].substr(0, end - i * 100), 0, 50 + i * 30);
        }
        if(input.space) {
            end = 1;
            input.space = false;
            makeWindow(Math.random() * 1000, Math.random() * 600);
            //localStorage.setItem('count', parseInt(localStorage.getItem('count')));
        }
    } else if(end === 2020) {
        let result = "とにかくキーを叩くだけのゲーム。 Score:" + localStorage.getItem('count') + " https://hukuda222.github.io/gamejam/jam0321/ ";
        location.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(result) + "&hashtags=traP3jam";
    }
    if(end > 0 && end < 3000) end++;
};
const init = _ => {
    let canvas = document.getElementById("cv");
    ctx = canvas.getContext("2d");
    ctx.font = "20px 'Verdana'";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "#88DD88";
    ctx.fillStyle = "#44FF44";
};
const makeWindow = (left, top) => {
    window.open('window.html', null, 'width=400, height=300,left=' + left + ',top=' + top + ' menubar=no, toolbar=no,resizable=no ,scrollbars=no');
};
const KeyDown = (e) => { //キーが押されたらInputInfoに格納 ({}つけないと正常に動かなかった)
    if(e.key == " ") {
        input.space = true;
    }
};
document.addEventListener("keydown", KeyDown);
