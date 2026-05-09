// ============================================================
//  CONFIG — ここを編集して質問・結果文・CTAリンクを変更できます
// ============================================================

const CONFIG = {
  topLabel: "さぁ、楽しんで見つけよう！",
  title: "あなたの強みは、\nどんな場面で動き出す？",
  subtitle: "5つの質問に直感で答えるだけ。\n今のあなたに近い「強みのあらわれ方」が見えてきます。\n\n正解探しではなく、\nあなたらしさを楽しく見つけるセルフチェックです。",
  startButtonText: "さっそく見つける",
  retryButtonText: "もう一度診断する",

  // ---- ぼかしセクションのテキスト ----
  blurIntroText: "ここから先が、あなただけの話です。\n\n同じタイプでも、強みがズレやすい場面も\n今の自分に必要な次の一歩も、\nその人の状況によって変わります。\n\nあなたの場合は、どうでしょう？",
  blurOverlayText: "ここから先は、\n個別セッションで詳しくお伝えします",

  // ---- CTA前テキスト（全タイプ共通） ----
  ctaMessage: "「これ、私だ」と感じた感覚——\nそこには、まだ言葉になっていない\nあなたの強みがあります。\n\n個別セッションでは、\nその感覚をもっと深めて、\nあなた自身の活かし方を一緒に見つけていきます。",

  // ---- 質問 ----
  questions: [
    {
      text: "新しいことを始めるとき、\nあなたが一番力を発揮しやすいのは？",
      options: [
        { type: "A", text: "アイデアや可能性が広がってきたとき" },
        { type: "B", text: "全体の流れや手順が見えてきたとき" },
        { type: "C", text: "誰かと話しながら方向性が見えてきたとき" },
        { type: "D", text: "まず少し試してみながら感覚をつかむとき" },
      ],
    },
    {
      text: "仕事や活動で「私らしさ」が\n出やすいのはどんなとき？",
      options: [
        { type: "A", text: "新しい視点や切り口を思いついたとき" },
        { type: "B", text: "情報を整理して、わかりやすく伝えられたとき" },
        { type: "C", text: "相手の気持ちや背景に寄り添えたとき" },
        { type: "D", text: "自分の体験や実践からリアルに伝えられたとき" },
      ],
    },
    {
      text: "逆に、止まりやすいのは\nどんなとき？",
      options: [
        { type: "A", text: "アイデアはあるのに、何から形にすればいいかわからないとき" },
        { type: "B", text: "もっと整えてから出したくなって、なかなか動けないとき" },
        { type: "C", text: "人の反応が気になって、自分の本音がわからなくなるとき" },
        { type: "D", text: "動いてはいるけれど、振り返りがなく次につながらないとき" },
      ],
    },
    {
      text: "人から頼られやすいのは、\nどんな場面？",
      options: [
        { type: "A", text: "新しい可能性や未来のイメージを出すとき" },
        { type: "B", text: "ごちゃごちゃした話を整理するとき" },
        { type: "C", text: "話を聞いたり、その人らしさを引き出すとき" },
        { type: "D", text: "まずやってみる流れを作ったり、場を動かすとき" },
      ],
    },
    {
      text: "今のあなたが一番ほしい感覚に\n近いものは？",
      options: [
        { type: "A", text: "広がったアイデアを、自分らしい形にしたい" },
        { type: "B", text: "考えすぎず、整えながら前に進みたい" },
        { type: "C", text: "人とつながりながら、自分の軸も大切にしたい" },
        { type: "D", text: "やってきた経験を、強みとして言葉にしたい" },
      ],
    },
  ],

  // ---- 結果文（仮テキスト・あとから自由に変更してください） ----
  results: {
    A: {
      typeName: "ひらめきで未来を描くタイプ",
      typeLabel: "Type A",
      icon: "✦",
      colorClass: "type-a",
      appeal:
        "直感と豊かな想像力で、まだ誰も気づいていない可能性を描き出せる方です。あなたの言葉にはいつも「まだ見ぬ何か」への扉を開く力があります。既成概念にとらわれない発想で、周囲にインスピレーションを与えることが自然とできています。",
      strength:
        "新しいプロジェクトや企画の立ち上げ期、ビジョンを語る場面、誰かの背中をそっと押すひと言が求められるとき。あなたのひらめきが場を動かし、未来への扉を開きます。",
      weakness:
        "アイデアが広がりすぎて何から手をつければいいか見えなくなるとき。「完璧な形になってから」と思うほど、スタートが遠のいてしまうことがあります。",
      nextStep:
        "アイデアをひとつだけ選んで、「最小限の形」にしてみることがブレイクスルーへの鍵です。完璧さより「小さくても動くもの」を世に出す経験が、あなたの次のステージを開きます。",
      ctaMessage: "",
    },
    B: {
      typeName: "整えて流れをつくるタイプ",
      typeLabel: "Type B",
      icon: "◈",
      colorClass: "type-b",
      appeal:
        "複雑な情報を整理し、誰もがわかる流れをつくることができる方です。あなたがいると場が落ち着き、物事がスムーズに動き始めます。「ちゃんと伝える」という誠実さが、あなたへの信頼につながっています。",
      strength:
        "仕組みや手順を設計するとき、情報をわかりやすくまとめるとき、混乱した状況を整理して前進させるとき。あなたの「整える力」は、周囲の安心感を生む確かな強みです。",
      weakness:
        "「もっと整えてから」と思うあまり、動き出すタイミングを逃してしまうことがあります。完成度を上げようとするほど、出すことへの怖さが増してしまうことも。",
      nextStep:
        "「70点で出して、反応を見ながら磨く」感覚を少しずつ練習してみましょう。整える力はそのままに、リリースのスピードが上がると、あなたの世界が一気に広がります。",
      ctaMessage: "",
    },
    C: {
      typeName: "つながりから力を生むタイプ",
      typeLabel: "Type C",
      icon: "❋",
      colorClass: "type-c",
      appeal:
        "人との関わりの中でエネルギーが高まり、相手の本音や可能性を自然に引き出せる方です。あなたの存在が場の温度を上げ、誰かの「もっと自分らしく」を後押しします。",
      strength:
        "人の話をていねいに聴くとき、その人らしさを言語化するとき、コミュニティや関係性の中で動くとき。あなたの「つながる力」は、人を動かす最も温かい強みのひとつです。",
      weakness:
        "相手を優先しすぎて自分の意見が言えなくなるとき、人の反応が気になって自分の軸を見失うことがあります。「つながり」を大切にするあまり、自分が後回しになってしまいがちです。",
      nextStep:
        "まず「自分はどうしたいか」を、自分自身に問いかけてみましょう。あなたの本音と軸が定まったとき、あなたの言葉はもっと力強く、多くの人の心に届くようになります。",
      ctaMessage: "",
    },
    D: {
      typeName: "試しながら形にするタイプ",
      typeLabel: "Type D",
      icon: "◎",
      colorClass: "type-d",
      appeal:
        "実践の中から学び、動きながら答えを見つけていく力がある方です。あなたの経験談は「リアルな地図」として、誰かにとってかけがえのない道しるべになります。",
      strength:
        "実際に動いて試すとき、現場のリアルを語るとき、仮説を立てて検証しながら前へ進むとき。行動力と現場感覚が、あなたの最大の武器です。",
      weakness:
        "動き続けているけれど振り返りが少なく、「何が自分の強みなのか」が自分でも見えにくくなることがあります。経験は十分なのに、言葉にする機会がないままになっていることも。",
      nextStep:
        "「やってきたこと」を棚卸しして、言語化してみましょう。あなたの実践の積み重ねは、すでに唯一無二の強みになっています。それを届ける言葉を持つことが、次のステップです。",
      ctaMessage: "",
    },
  },

  // ---- CTAボタン ----
  cta: {
    main: {
      text: "個別セッションで自分の場合を相談する",
      url: "https://example.com/session",
    },
    sub: {
      text: "I'sオープンクラスで自己理解を体験する",
      url: "https://example.com/open-class",
    },
  },
};


// ============================================================
//  アプリケーション本体
// ============================================================

const state = {
  currentQuestion: 0,
  answers: [],
  isAnimating: false,
};

const screens = {
  start: document.getElementById("screen-start"),
  question: document.getElementById("screen-question"),
  result: document.getElementById("screen-result"),
};

document.addEventListener("DOMContentLoaded", () => {
  renderStart();
  showScreen("start");
});

function showScreen(name) {
  Object.values(screens).forEach((el) => {
    el.classList.remove("active");
    el.classList.remove("fade-in");
  });
  const target = screens[name];
  target.classList.add("active");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => target.classList.add("fade-in"));
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ----- スタート画面 -----
function renderStart() {
  const s = screens.start;
  s.innerHTML = `
    <div class="start-inner">
      <p class="start-top-label">${CONFIG.topLabel}</p>
      <h1 class="start-title">${CONFIG.title.replace(/\n/g, "<br>")}</h1>
      <div class="start-decoration">
        <span class="deco-dot"></span>
        <span class="deco-line"></span>
        <span class="deco-dot"></span>
      </div>
      <p class="start-subtitle">${CONFIG.subtitle.replace(/\n/g, "<br>")}</p>
      <p class="start-desc">全5問・約2分　選択肢を選ぶだけで完了します</p>
      <button class="btn-primary" id="btn-start">${CONFIG.startButtonText}</button>
    </div>
  `;
  document.getElementById("btn-start").addEventListener("click", startQuiz);
}

// ----- クイズ開始 -----
function startQuiz() {
  state.currentQuestion = 0;
  state.answers = [];
  state.isAnimating = false;
  renderQuestion();
  showScreen("question");
}

// ----- 問題画面 -----
function renderQuestion() {
  const idx = state.currentQuestion;
  const q = CONFIG.questions[idx];
  const total = CONFIG.questions.length;
  const progressPct = (idx / total) * 100;

  screens.question.innerHTML = `
    <div class="q-wrapper">
      <div class="q-header">
        <div class="progress-wrap">
          <div class="progress-track">
            <div class="progress-fill" style="width: ${progressPct}%"></div>
          </div>
          <span class="progress-label">${idx + 1} <span class="progress-sep">/</span> ${total}</span>
        </div>
      </div>
      <div class="q-body" id="q-body">
        <p class="q-num">Q${idx + 1}</p>
        <h2 class="q-text">${q.text.replace(/\n/g, "<br>")}</h2>
        <div class="options-grid">
          ${q.options
            .map(
              (opt) => `
            <button class="option-card" data-type="${opt.type}">
              <span class="option-label">${opt.type}</span>
              <span class="option-text">${opt.text}</span>
            </button>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const body = document.getElementById("q-body");
      if (body) body.classList.add("slide-in");
    });
  });

  document.querySelectorAll(".option-card").forEach((card) => {
    card.addEventListener("click", () => selectOption(card));
  });
}

// ----- 選択肢クリック -----
function selectOption(card) {
  if (state.isAnimating) return;
  state.isAnimating = true;

  document.querySelectorAll(".option-card").forEach((c) =>
    c.classList.remove("selected")
  );
  card.classList.add("selected");

  const type = card.dataset.type;

  setTimeout(() => {
    advance(type);
  }, 600);
}

// ----- 次の問へ / 結果へ -----
function advance(type) {
  state.answers.push(type);
  state.currentQuestion++;

  if (state.currentQuestion < CONFIG.questions.length) {
    const body = document.getElementById("q-body");
    if (body) {
      body.classList.add("slide-out");
      setTimeout(() => {
        state.isAnimating = false;
        renderQuestion();
      }, 250);
    } else {
      state.isAnimating = false;
      renderQuestion();
    }
  } else {
    const resultKey = calcResult();
    renderResult(resultKey);
    showScreen("result");
  }
}

// ----- 結果計算 -----
function calcResult() {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  state.answers.forEach((t) => counts[t]++);

  const maxCount = Math.max(...Object.values(counts));
  const topTypes = Object.entries(counts)
    .filter(([, c]) => c === maxCount)
    .map(([t]) => t);

  if (topTypes.length === 1) return topTypes[0];

  // 同点: 最後に選んだタイプを優先
  for (let i = state.answers.length - 1; i >= 0; i--) {
    if (topTypes.includes(state.answers[i])) return state.answers[i];
  }
  return topTypes[0];
}

// ----- 結果画面 -----
function renderResult(typeKey) {
  const r = CONFIG.results[typeKey];

  screens.result.innerHTML = `
    <div class="result-inner ${r.colorClass}">

      <div class="result-hero">
        <div class="result-hero-icon">${r.icon}</div>
        <p class="result-type-label">${r.typeLabel}</p>
        <h2 class="result-type-name">${r.typeName}</h2>
        <div class="result-hero-line"></div>
      </div>

      <div class="result-sections">

        <div class="result-section">
          <h3 class="section-title">
            <span class="section-mark">◇</span>このタイプの魅力
          </h3>
          <p class="section-body">${r.appeal}</p>
        </div>

        <div class="result-section">
          <h3 class="section-title">
            <span class="section-mark">◇</span>強みが活きているとき
          </h3>
          <p class="section-body">${r.strength}</p>
        </div>

        <p class="blur-intro">${CONFIG.blurIntroText.replace(/\n/g, "<br>")}</p>

        <div class="blur-section-wrapper">
          <div class="result-section">
            <h3 class="section-title">
              <span class="section-mark">◇</span>強みがズレるとき
            </h3>
            <p class="section-body section-body--blurred">${r.weakness}</p>
          </div>

          <div class="result-section result-section--highlight">
            <h3 class="section-title">
              <span class="section-mark">◈</span>今のあなたに必要な一歩
            </h3>
            <p class="section-body section-body--blurred">${r.nextStep}</p>
          </div>

          <div class="blur-overlay">
            <p class="blur-overlay-text">${CONFIG.blurOverlayText.replace(/\n/g, "<br>")}</p>
          </div>
        </div>

      </div>

      <div class="result-cta-block">
        <p class="cta-message">${CONFIG.ctaMessage.replace(/\n/g, "<br>")}</p>
        <a href="${CONFIG.cta.main.url}" class="btn-cta-main" target="_blank" rel="noopener noreferrer">
          ${CONFIG.cta.main.text}
        </a>
        <div class="btn-cta-sub-wrap">
          <span class="btn-cta-sub-label">まずは場の雰囲気を知りたい方は</span>
          <a href="${CONFIG.cta.sub.url}" class="btn-cta-sub" target="_blank" rel="noopener noreferrer">${CONFIG.cta.sub.text}</a>
        </div>
        <button class="btn-retry" id="btn-retry">${CONFIG.retryButtonText}</button>
      </div>

    </div>
  `;

  document.getElementById("btn-retry").addEventListener("click", startQuiz);
}
