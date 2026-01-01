const splashScreen = document.getElementById("splash-screen");
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", () => {
  splashScreen.style.display = "none"; // オーバーレイ非表示
});
console.log("tarot script loaded");

// ============================
// DOM取得
// ============================
const title = document.getElementById("title");
const cardImage = document.getElementById("cardImage");
const cardText = document.getElementById("cardText");
const nextButton = document.getElementById("nextButton");

// ============================
// 大アルカナ22枚 定義
// 画像名ルール：
// card/XX_name.png
// description/XX_name_up_1.png
// description/XX_name_up_2.png
// description/XX_name_rev_1.png
// description/XX_name_rev_2.png
// ============================
const tarotCards = [
  { id:"00_fool", name:"愚者" },
  { id:"01_magician", name:"魔術師" },
  { id:"02_high_priestess", name:"女教皇" },
  { id:"03_empress", name:"女帝" },
  { id:"04_emperor", name:"皇帝" },
  { id:"05_hierophant", name:"法王" },
  { id:"06_lovers", name:"恋人" },
  { id:"07_chariot", name:"戦車" },
  { id:"08_strength", name:"力" },
  { id:"09_hermit", name:"隠者" },
  { id:"10_wheel", name:"運命の輪" },
  { id:"11_justice", name:"正義" },
  { id:"12_hanged_man", name:"吊るされた男" },
  { id:"13_death", name:"死神" },
  { id:"14_temperance", name:"節制" },
  { id:"15_devil", name:"悪魔" },
  { id:"16_tower", name:"塔" },
  { id:"17_star", name:"星" },
  { id:"18_moon", name:"月" },
  { id:"19_sun", name:"太陽" },
  { id:"20_judgement", name:"審判" },
  { id:"21_world", name:"世界" }
].map(card => ({
  name: card.name,
  cardImage: `images/card/${card.id}.png`,
  description: {
    upright: [
      `images/description/${card.id}_up_1.png`,
      `images/description/${card.id}_up_2.png`
    ],
    reversed: [
      `images/description/${card.id}_rev_1.png`,
      `images/description/${card.id}_rev_2.png`
    ]
  }
}));

// ============================
// エンディング画像
// ============================
const endingImages = [
  "images/ending/end_1.png",
  "images/ending/end_2.png",
  "images/ending/end_3.png"
];

// ============================
// 状態管理
// cover → card → desc1 → desc2 → ending
// ============================
let phase = "cover";
let currentCard = null;
let isReversed = false;

// ============================
// 初期表示
// ============================
resetToCover();

// ============================
// ボタン制御
// ============================
nextButton.addEventListener("click", () => {
  if (phase === "cover") drawCard();
  else if (phase === "card") showDescription(0);
  else if (phase === "desc1") showDescription(1);
  else if (phase === "desc2") showEnding();
  else if (phase === "ending") resetToCover();
});

// ============================
// 表紙（タイトル画像）
// ============================
function resetToCover() {
  phase = "cover";
  title.textContent = "タロット占い";

  cardImage.src = "images/title.png";   // 表紙画像
  cardImage.className = "description";
  cardImage.classList.remove("reversed");

  cardText.textContent = "";
  nextButton.textContent = "占う";
}

// ============================
// カードを引く
// ============================
function drawCard() {
  currentCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
  isReversed = Math.random() < 0.5;

  phase = "card";
  title.textContent = "カード結果";

  cardImage.src = currentCard.cardImage;
  cardImage.className = "card";
  cardImage.classList.toggle("reversed", isReversed);

  cardText.textContent =
    `${currentCard.name}（${isReversed ? "逆位置" : "正位置"}）`;

  nextButton.textContent = "次へ";
}

// ============================
// 説明画像①・②
// ============================
function showDescription(index) {
  phase = index === 0 ? "desc1" : "desc2";

  const list = isReversed
    ? currentCard.description.reversed
    : currentCard.description.upright;

  cardImage.src = list[index];
  cardImage.className = "description";
  cardImage.classList.remove("reversed");

  cardText.textContent = "";
  nextButton.textContent = "次へ";
}

// ============================
// エンディング
// ============================
function showEnding() {
  phase = "ending";

  cardImage.src =
    endingImages[Math.floor(Math.random() * endingImages.length)];
  cardImage.className = "description";

  cardText.textContent = "お疲れさまでした";
  nextButton.textContent = "最初に戻る";
}
