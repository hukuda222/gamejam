let ctx;
let nowState;
let endMes;
const images = {
  ossan: 0,
  neko: 1,
  dorobo: 2
};
const input = {
  click: false,
  t: false,
  left: false,
  right: false,
  down: false,
  enter: false
};
const state = {
  Title: 0,
  Neko: 1,
  Dorobo: 2,
  Ossan: 3,
  Bag: 4,
  Result: 5
};
let count = 0;
let end = false;

const main = (_) => {
  ctx.clearRect(0, 0, 800, 600);
  ctx.fillStyle = "#DDDDDD";
  ctx.fillRect(0, 0, 800, 600);
  count++;
  switch (nowState) {
    case state.Title:
      ctx.fillStyle = "#FF0000";
      ctx.font = "100px 'Verdana'";
      ctx.fillText("STOP !!!", 100, 200);
      ctx.font = "30px 'Verdana'";
      ctx.fillText("Click to start.", 150, 400);
      if (input.click) {
        nowState = state.Neko;
        count = 0;
      }
      break;
    case state.Neko:
      ctx.fillStyle = "#EEAAAA";
      ctx.fillRect(0, 0, 800, 600);
      ctx.fillStyle = "#000000";
      ctx.font = "50px 'Verdana'";
      ctx.drawImage(images.neko, 300, 200 + Math.pow(40 - (count % 20), 1.1) * 5, 100, 100);
      if (input.click && count > 20) {
        alert("猫アレルギーにより動作を停止しました。");
        end = true;
      } else if (count > 300 && !end) {
        nowState = state.Dorobo;
        count = 0;
      }
      break;
    case state.Dorobo:
      ctx.fillStyle = "#555588";
      ctx.fillRect(0, 0, 800, 600);
      ctx.fillStyle = "#000000";
      ctx.font = "50px 'Verdana'";
      ctx.drawImage(images.dorobo, 800 - Math.pow(count, 1.3), 300 + Math.pow(40 - (count % 20), 1.2), 150, 150);
      if (input.click && count > 20) {
        alert("泥棒に心を盗まれたため、動作を停止しました。");
        end = true;
      } else if (count > 250 && !end) {
        nowState = state.Ossan;
        count = 0;
      }
      break;
    case state.Ossan:
      ctx.drawImage(images.ossan, 300, 200, 300, 400);

      ctx.fillStyle = "#C0C0C0";
      ctx.fillRect(100, 400, 600, 150);

      ctx.fillStyle = "#000000";
      ctx.font = "25px 'Verdana'";
      ctx.fillText("やぁ、ここまで大変だったね。", 110, 450);
      ctx.fillText("でももう大丈夫。", 110, 480);

      if (input.click && count > 20) {
        alert("このおじさんが黒幕だったため、動作を停止しました。");
        end = true;
      } else if (count > 400 && !end) {
        nowState = state.Result;
        count = 0;
      }
      break;
    case state.Result:
      ctx.fillStyle = "#00CC55";
      ctx.font = "40px 'Verdana'";
      ctx.fillText("You had stopped !!", 400, 300);
      ctx.font = "30px 'Verdana'";
      ctx.fillText("Press T to Tweet", 400, 400);
      if (input.t) {
        let result = "クリアしました！ https://hukuda222.github.io/gamejam/jam0504_2018/ ";
        location.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(result) + "&hashtags=traP3jam";
      }
      break;
  }
};
const init = (_) => {
  let canvas = document.getElementById("cv");
  ctx = canvas.getContext("2d");
  ctx.font = "20px 'Verdana'";
  ctx.shadowBlur = 0;
  ctx.shadowColor = "#88DD88";
  ctx.fillStyle = "#44FF44";
  nowState = state.Title;
  images.neko = new Image();
  images.neko.src = "neko.png";
  images.dorobo = new Image();
  images.dorobo.src = "dorobo.png";
  images.ossan = new Image();
  images.ossan.src = "ossan.png";
  images.error = new Image();
  images.error.src = "error.jpeg";
};

const MouseUp = (e) => {
  input.click = false;
};

const MouseDown = (e) => {
  input.click = true;
};

const KeyDown = (e) => { // キーが押されたらInputInfoに格納 ({}つけないと正常に動かなかった)
  if (e.keyCode === 37) input.left = true;
  else if (e.keyCode === 39) input.right = true;
  else if (e.keyCode === 40) input.down = true;
  else if (e.keyCode === 13) input.enter = true;
  else if (e.keyCode === 84) input.t = true;
};

const KeyUp = (e) => { // キーが離されたら、InputInfoから除去
  if (e.keyCode === 37) input.left = false;
  else if (e.keyCode === 39) input.right = false;
  else if (e.keyCode === 40) input.down = false;
  else if (e.keyCode === 13) input.enter = false;
  else if (e.keyCode === 84) input.t = false;
};

document.addEventListener("keyup", KeyUp);
document.addEventListener("keydown", KeyDown);
document.addEventListener("mousedown", MouseDown);
document.addEventListener("mouseup", MouseUp);
