const loadInit = _ => {
  // LoadQueueのインスタンス作成
  // 引数にfalseを指定するとXHRを使わずtagによる読み込みを行います
  const queue = new createjs.LoadQueue(true);
  queue.installPlugin(createjs.Sound);

  // 読み込むファイルの登録。
  const manifest = [
    {
      "src": "./src/hiyoko2.png",
      "id": "hiyoko"
    },
    {
      "src": "./src/kame2.png",
      "id": "kame"
    },
    {
      "src": "./src/kirin2.png",
      "id": "kirin"
    },
    {
      "src": "./src/rakuda2.png",
      "id": "rakuda"
    },
    {
      "src": "./src/sai2.png",
      "id": "sai"
    },
    {
      "src": "./src/shirokuma2.png",
      "id": "shirokuma"
    },
    {
      "src": "./src/yagi2.png",
      "id": "yagi"
    },
    {
      "src": "./src/zou2.png",
      "id": "zou"
  }, {
      "src": "./src/sobaya.png",
      "id": "sobaya"
  }, {
      "src": "./src/back.jpg",
      "id": "back"
  }
    ];

  // ファイルが1つ読込完了すると呼ばれる。引数にファイルの読込結果を含むオブジェクトが渡される
  const handleFileLoad = (event) => {
    const item = event.item;
    if (item.type === createjs.LoadQueue.IMAGE) {
      images[item.id] = event.result;
    }
  }

  // ファイルがすべて読込完了すると呼ばれる
  const handleComplete = (event) => {
    init();
  }
  // ファイルが1つ読込完了するたびにfileloadイベントが発生
  // fileloadイベントにメソッドを割り当てる
  queue.addEventListener("fileload", handleFileLoad);
  // 全ファイルの読み込みが終わった時completeイベントが発生する
  queue.addEventListener("complete", handleComplete);
  // manifestの読込
  queue.loadManifest(manifest, true);

}
