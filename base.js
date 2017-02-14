let ctx;
let girl;
let isCount = false; //trueだと計測中
let startCount = 0;
let endCount = 0;
let nowMes = 0;
let nowChar = 0;
const limit = 5;
let interval = 0;
let resetCount=0;
let mouse = {
    x: 0,
    y: 0
}

function init() {
    let canvas = document.getElementById("cv");
    ctx = canvas.getContext("2d");
    ctx.font = "30px 'Times New Roman'"
    ctx.fillStyle = "#FFFFFF";

     $("<img id='girl' src='girl.png' >").appendTo("canvas");
     girl=document.getElementById("girl");
}

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

function TouchEventFunc(e){

			// イベント名を出力
			console.log("type:" + e.type);
            if(e.type="touchstart")input.left=true;
            else if(e.type="touchend")input.left=false;
			// TouchList オブジェクトを取得
			var touch_list = e.changedTouches;

			// 中身に順番にアクセス
			var i;
			var num = touch_list.length;
			for(i=0;i < num;i++){

				// Touch オブジェクトを取得
				var touch = touch_list[i];
                mouse.x=touch.clientX;
                mouse.y=touch.clientY;
			}

			// キャンセルに対応している
			if(e.cancelable){
				// デフォルトのタッチ操作を無効化する
				e.preventDefault();
			}
}



document.addEventListener('mousedown', MouseDown, false);
document.addEventListener('mouseup', MouseUp, false);
document.addEventListener("touchstart",TouchEventFunc);
document.addEventListener("touchend",TouchEventFunc);


function message(mes) { //mesは48以下
    ctx.fillStyle = "#eaead6";
    ctx.fillRect(100, 400, 500, 150);
    ctx.fillStyle = "#000000";
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

function watch() {
    ctx.fillStyle = "#eaead6";
    ctx.fillRect(500, 200, 150, 150);
    ctx.fillStyle = "#000000";
    //ctx.fillRect(500, 300, 140, 40);
    if (input.left && mouse.x > 500 && mouse.x < 640 && mouse.y > 290 && mouse.y < 340) {
        if (isCount) {
            isCount = false;
            endCount = new Date();
            resetCount++;
        } else {
            startCount = new Date();
            isCount = true;
        }
        input.left = false;
    }

    if (!isCount) {
        ctx.fillText("スタート", 510, 320);
        ctx.fillText(endCount - startCount, 530, 250);
    } else {
        ctx.fillText("ストップ", 510, 320);
        ctx.fillText("計測中", 530, 250);
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
 line("「時間とはなんだろうか」")+line("こんなことを考えた人は")+line("多いようでやはり多い"),
 line("アインシュタインの相対性理論、")+line("これは難しげだが")+line("要はこういうことらしい"),
 line("『可愛い子と一緒にいる時間は")+line("短く感じる』"),
 line("そして今の僕の時間は1時間が")+line("1秒にすら感じている"),
 line("……というのは流石に言い過ぎで")+line("精々55分くらいだ"),
 "現状を確認すると、高校の合宿の行きのバスで、クラスでおそらく一番可愛い子と隣になったのである",
 "大体想像がつくと思うが、もちろん合宿の班も一緒だ",
 "別に、交際がしたいというわけではないけども、折角なので彼女と楽しい思い出を作りたい",
 "さて、僕と彼女の間に会話はないがどうしたものか",
 "状況としては出発後3時間が経過しており車内の空気もだらけきっている感じだ",
 "少し前まで隣の子と話していた斜め前の席の女子も、別のことに目を向けている",
 "話しかけるなら今がチャンスだ。",
 "「ま、〇〇って確かおかし作りが趣味なんだっけ？どんなの作ってるの？」",
 "〇〇「え……、そうだね、ケーキとかクッキーとかかな」",
 line("「ふーん」")+"(何と無く聞いたはいいけど、ここからどうやって会話繋げるんだ)",
 "「ケーキとかクッキーって市販のより安く作れたりするの？」(聞く内容が残念すぎるなぁ)",
 "〇〇「……。ものにもよるけど、お菓子屋さんで売ってるのよりは大抵安く作れるよ」",
 line("「そっか、意外とお得なんだな。")+"よく聞くけど、バターとマーガリンってどのくらい違うの？」",
 "(楽しい？会話が5分ほど続いた)",
 "いつの間にか、女子だけで人狼が始まってた。さすがに入りにくかったので俺は参加するのはやめておいた",
 "女子だけでやる友情崩壊ゲームは割とシャレにならない気がする",
 line("暇だし、あれやるか……"),
 "アレとは腕時計のストップウォッチ機能を利用したゲームだ",
 line("今回は5秒を目標にやってみるか")+"(ストップウォッチを止めてからシナリオを進めてね)",//24
 line("〇〇ちゃんと楽しく過ごせたエンド"),
 line("当たり障りなく過ごせたエンド"),
 line("〇〇ちゃんと気まずい関係になったエンド"),
 "雑なゲームを最後までやってくれてありがとう"    
 ]

function ManageMes() {
    if(nowChar!=me[nowMes].length && input.left && mouse.x > 100 && mouse.x < 500 && mouse.y > 400 && mouse.y < 650){
        input.left=false;
        nowChar=me[nowMes].length;
    }
    if(nowChar==me[nowMes].length && input.left && mouse.x > 100 && mouse.x < 500 && mouse.y > 400 && mouse.y < 650){
        if(nowMes<me.length-1){
            if(nowMes<23)nowMes++;
            else if(nowMes==23){
                if(endCount-startCount==5000)nowMes++;
                else if(Math.pow(endCount-startCount-5000,2)<5000)nowMes+=2;
                else if(endCount-startCount==0)nowMes+=0;
                else nowMes+=3;                
            }
            else {
                nowMes=27;
            }
            nowChar=0;
        }
        input.left=false;
        
    }
    
    mes = me[nowMes].substr(0, nowChar);
    if (me[nowMes].length > nowChar) {
        interval++;
        if (interval >= limit) {
            nowChar++;
            while(me[nowMes][nowChar]==" "){
                nowChar++
            }
            interval = 0;
        }
    }
}

let mes = "";

let main = function loop() {
    //背景をクリア
    ctx.fillStyle = "#e1ffeb";
    
    ctx.clearRect(0, 0, 800, 600);
    ctx.fillRect(0, 0, 800, 600);
    if(nowMes>=12&&nowMes<=18)ctx.drawImage(girl,200,30,200,400);
    if(nowMes==23)watch();
    ManageMes();
    message(mes);

}　　　　
