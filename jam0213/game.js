function human(i, point, w, h) {
    this.image = i;
    this.x = Math.random() * 800; //x;
    this.y = Math.random() * 600; //y
    this.l = 5 + Math.random() * 20;
    this.count = 0;
    this.kaku = 0;
    this.point = point;
    this.move = _ => {
        if (this.count > 0) {
            this.count--;

            this.x += this.l * Math.cos(this.kaku * Math.PI / 180);
            this.y += this.l * Math.sin(this.kaku * Math.PI / 180);
            if (this.x < 0) {
                this.x = 0;
                this.count = 0;
            }
            if (this.x > 800) {
                this.x = 800;
                this.count = 0;
            }
            if (this.y < 0) {
                this.y = 0;
                this.count = 0;
            }
            if (this.y > 600) {
                this.y = 600;
                this.count = 0;
            }
        } else {
            this.count = Math.floor(2 + Math.random() * 10);
            this.kaku = Math.random() * 360;
        }
    }
    this.draw = _ => {
        ctx.drawImage(this.image, this.x - w / 2, this.y - h / 2, 100, 100);
    }
    this.camera = mouse => {
        if (this.x + w / 2 > mouse.x - 150 + 41 && this.y + w / 2 > mouse.y - 100 + 33 &&
            this.x - h / 2 < mouse.x - 150 + 264 && this.y - h / 2 < mouse.y - 100 + 163) {
            return this.point;
        } else return 0;
    }

}

const gameMain = (mouse) => {
    let point = 0;
    ctx.drawImage(img.camera, mouse.x - 300 / 2, mouse.y - 200 / 2, 300, 200);
    //(41,33)→(264,163)
    ctx.fillStyle = "#d1d1d1";
    ctx.fillText("貢献度数:" + totalPoint, 500, 30);
    ctx.fillText("撮影回数:" + totalCount, 500, 60);
    humans.forEach((e) => {
        e.draw();
        e.move();
    });
    if (input.left) {
        point = 0;
        humans.forEach((e) => {
            point += e.camera(mouse);
        });
        input.left = false;
        totalPoint += point;
        totalCount++;
    }
};
const gameResult = _ => {
    ctx.fillStyle = "#d1d1d1";
    ctx.font = "60px 'Times New Roman'"
    ctx.fillText("貢献度数:" + totalPoint, 30, 80);
    ctx.fillText("撮影回数:" + totalCount, 30, 150);
    ctx.font = "30px 'Times New Roman'"
    let result = "貢献度数:" + totalPoint + ",撮影回数:" + totalCount;
    if (totalPoint / totalCount > 4) {
        ctx.fillText("これは昇進間違いなしだな", 40, 200);
        result += " これは昇進間違いなしだな";
    } else if (totalPoint / totalCount > 3) {
        ctx.fillText("かなり上々だ", 40, 200);
        result += " かなり上々だ。特定の人物を狙うと評価が上がるようだ";
    } else if (totalPoint / totalCount > 2) {
        ctx.fillText("悪くはないな", 40, 200);
        result += " 悪くはないな";
    } else if (totalPoint / totalCount > 1) {
        ctx.fillText("まぁ良しとしよう", 40, 200);
        result += " まぁ良しとしよう";
    } else if (totalPoint / totalCount > 0.5) {
        ctx.fillText("......これはクビ切られるかも", 40, 200);
        result += " ......これはクビ切られるかも";
    } else if (totalPoint < 0) {
        ctx.fillText("俺、イヌの可愛さに目覚めたわ", 40, 200);
        result += " 俺、イヌの可愛さに目覚めたわ";
    } else {
        ctx.fillText("もう、おうちかえりゅー", 40, 200);
        result += " もう、おうちかえりゅー";
    }

    ctx.fillText("右クリックでツイートができるぞ", 40, 300);
    if (input.right) {
        location.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(result) + "&hashtags=traP3jam";
        init2();
    }
};