/* ============================================================
   Question Data (編集可能な定数)
   ============================================================ */
const QUESTIONS = [
  {
    id: 1,
    text: "新しい場所に行くとき",
    options: [
      { type: "V", text: "地図や写真を見て、道順や雰囲気をイメージしたい" },
      { type: "A", text: "行き方を言葉で説明してもらうと安心する" },
      { type: "K", text: "実際に歩いてみると、感覚で覚えやすい" }
    ]
  },
  {
    id: 2,
    text: "新しいことを学ぶとき",
    options: [
      { type: "V", text: "図やスライド、全体像があると理解しやすい" },
      { type: "A", text: "説明を聞いたり、話しながら整理すると理解しやすい" },
      { type: "K", text: "実際にやってみたり、手を動かすと理解しやすい" }
    ]
  },
  {
    id: 3,
    text: "考えごとを整理するとき",
    options: [
      { type: "V", text: "紙に書き出したり、図にすると整理しやすい" },
      { type: "A", text: "誰かに話したり、自分の言葉にすると整理しやすい" },
      { type: "K", text: "歩いたり、手を動かしたりしているうちに整理されてくる" }
    ]
  },
  {
    id: 4,
    text: "これからのことを考えるとき",
    options: [
      { type: "V", text: "理想の場面や景色が浮かぶと考えやすい" },
      { type: "A", text: "未来の自分の言葉や、誰かとの会話を想像すると考えやすい" },
      { type: "K", text: "その未来にいる自分の安心感や高揚感を感じると進みたくなる" }
    ]
  },
  {
    id: 5,
    text: "人の話を聞いていて印象に残りやすいのは？",
    options: [
      { type: "V", text: "場面が浮かぶ具体的なエピソード" },
      { type: "A", text: "心に残る言葉やフレーズ" },
      { type: "K", text: "その人の感情や空気感が伝わる話" }
    ]
  },
  {
    id: 6,
    text: "何かを決めるとき",
    options: [
      { type: "V", text: "候補を書き出して、見比べながら決めたい" },
      { type: "A", text: "誰かに話したり、言葉にしながら決めたい" },
      { type: "K", text: "しっくりくるか、違和感があるかを感じながら決めたい" }
    ]
  },
  {
    id: 7,
    text: "講座や説明で「わかりやすい」と感じるのは？",
    options: [
      { type: "V", text: "スライド、図解、写真などで流れが見える" },
      { type: "A", text: "説明がわかりやすく、言葉がしっくりくる" },
      { type: "K", text: "ワークや体験があって、自分の中で腑に落ちる" }
    ]
  },
  {
    id: 8,
    text: "身近な人の変化に気づくとき",
    options: [
      { type: "V", text: "表情、姿勢、服装、持ち物など、見た目の変化で気づく" },
      { type: "A", text: "声のトーン、言葉づかい、会話の変化で気づく" },
      { type: "K", text: "空気感、距離感、なんとなくの違和感で気づく" }
    ]
  },
  {
    id: 9,
    text: "自分を整えたいときに効きやすいのは？",
    options: [
      { type: "V", text: "きれいな景色を見る、部屋を整える、好きなものを眺める" },
      { type: "A", text: "音楽を聴く、安心する言葉をもらう、話を聞いてもらう" },
      { type: "K", text: "お風呂、散歩、マッサージ、温かい飲み物など身体がゆるむこと" }
    ]
  },
  {
    id: 10,
    text: "行動に移しやすくなるのは？",
    options: [
      { type: "V", text: "ゴールや手順が見えていると動きやすい" },
      { type: "A", text: "「これをやればいい」と言葉で整理されると動きやすい" },
      { type: "K", text: "まず少しやってみて、感覚がつかめると動きやすい" }
    ]
  }
];

/* ============================================================
   Result Comments (編集可能な定数)
   ============================================================ */
const RESULT_COMMENTS = {
  primary: {
    V: `Vが高めのあなたは、見える情報やイメージから理解しやすい傾向があります。

図、写真、表、全体像、未来の場面などがあると、
頭の中で整理しやすくなります。

何かを考えるときも、
「どんな景色が見えるか」
「全体像はどうなっているか」
「ゴールはどこにあるか」
が見えると動きやすくなります。

一方で、頭の中のイメージだけで進めると，
言葉や行動に落とす前に止まりやすいこともあります。

見えたものを言葉にする。
実際に小さく試してみる。

この2つを足すと、より現実が動きやすくなります。`,

    A: `Aが高めのあなたは、言葉や会話を通して理解しやすい傾向があります。

説明を聞く、誰かと話す、自分の言葉にする，
しっくりくるフレーズを見つけることで整理が進みます。

何かを考えるときも，
「どう言えばしっくりくるか」
「自分は本当は何と言いたいのか」
「どんな言葉なら納得できるか」
が大切になりやすいタイプです。

一方で、言葉だけで考えすぎると，
頭の中でぐるぐるしやすいこともあります。

図にして外に出す。
身体の感覚に戻る。

この2つを足すと、より深い納得につながりやすくなります。`,

    K: `Kが高めのあなたは、感覚や体験を通して納得しやすい傾向があります。

実際にやってみる、身体の反応を見る，
空気感を感じる、安心感や違和感を大事にすることで，
自分の本音に近づきやすくなります。

何かを考えるときも，
「軽い感じがするか」
「違和感があるか」
「身体が前に進む感じがあるか」
が大切になりやすいタイプです。

一方で、感覚のままだと，
人に説明しづらかったり、行動に落としにくいこともあります。

感じたことを書き出す。
自分の言葉にしてみる。

この2つを足すと、自分にも相手にも伝わりやすくなります。`
  },

  combination: {
    "V+A": `見える化して、言葉で整える

あなたは、見える化してから言葉で整理すると理解が深まりやすい傾向があります。

図や全体像を見たうえで，
自分の言葉にしていくと納得しやすくなります。`,

    "V+K": `イメージと感覚でつかむ

あなたは，イメージと感覚を行き来しながら理解する傾向があります。

未来の場面を思い浮かべたり，
身体の反応を感じたりすることで，
自分の本音に近づきやすくなります。`,

    "A+V": `言葉で整理し、全体像をつかむ

あなたは、言葉で整理しながら全体像をつかむ傾向があります。

話したり書いたりしたあとに，
図や流れとして見えると、さらに理解が深まりやすくなります。`,

    "A+K": `対話しながら、感覚に落とし込む

あなたは、対話しながら感覚に落とし込む傾向があります。

話しているうちに，
自分の違和感や安心感に気づきやすいタイプです。`,

    "K+V": `感覚から入り、イメージで広げる

あなたは、感覚から入り、イメージで広げる傾向があります。

まず身体の反応や違和感を手がかりにし，
そのあと未来の場面を描くと進みやすくなります。`,

    "K+A": `体感を言葉にして納得する

あなたは、体感したことを言葉にすると納得が深まりやすい傾向があります。

なんとなく感じていることを少しずつ言葉にしていくことで，
自分の軸が見えやすくなります。`,

    "balance": `あなたは、V・A・Kを比較的バランスよく使っている傾向があります。

見る、聞く、体感するという複数の入口を使えるので，
場面に応じて理解の仕方を切り替えやすいタイプです。`
  },

  footer: `この結果は，あなたを固定的に分類するものではありません。

場面や相手、コンディションによって，
使いやすい感覚は変わります。

大切なのは，
「私はこういう入口だと理解しやすいんだ」
「人によって，伝わりやすい入口は違うんだ」
と知ることです。

自分を整えるときにも，
誰かと接するときにも，
見える化・言葉での整理・体験や感覚の3つの入口を意識してみてください。

伝わらないときは、相手が悪いのではなく，
入口が合っていないだけかもしれません。

自分にも相手にも，
伝わる入口を増やしていくためのヒントとして使ってみてください。`
};

/* ============================================================
   Global State
   ============================================================ */
let currentQuestion = 0;
let answers = {};

/* ============================================================
   Initialize
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {
  showStartScreen();
});

/* ============================================================
   Render Functions
   ============================================================ */
function showStartScreen() {
  const html = `
    <div class="start-image-hero">
      <img src="VAKimage.png" alt="VAK イメージ" class="start-image">
    </div>
    <div class="start-inner">
      <h1 class="start-title">わたしの「わかる」入口診断</h1>
      <p class="start-subtitle">見てわかる？聞いてわかる？やってわかる？</p>
      <div class="start-desc">
        <div class="start-desc-line">あなたは、どんなときに「わかった！」と感じますか？</div>
        <div class="start-desc-line">この診断では、あなたの「わかりやすい入口」を3つの感覚からチェックします。</div>
      </div>
      <div class="start-desc">
        <div class="start-desc-sub">V＝図やイメージでわかる</div>
        <div class="start-desc-sub">A＝言葉や会話でわかる</div>
        <div class="start-desc-sub">K＝体験や感覚でわかる</div>
      </div>
      <div class="start-desc">
        自分の学び方や、人に伝えるときのヒントにしてみてください。
      </div>
      <div class="start-desc-label">
        <strong>回答方法</strong><br>
        ◎ 一番近いものを必ず1つ選んでください。<br>
        ○ 二番目に近いものは、選べる場合だけで大丈夫です。
      </div>
      <button class="btn-primary" onclick="startQuiz()">チェックをはじめる</button>
    </div>
  `;

  const screen = document.getElementById('screen-start');
  screen.innerHTML = html;
  hideAllScreens();
  screen.style.display = 'flex';
}

function showQuestionScreen(questionIndex) {
  const question = QUESTIONS[questionIndex];
  const totalQuestions = QUESTIONS.length;
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  let optionsHtml = '';
  question.options.forEach((option, idx) => {
    const answer = answers[question.id] || {};
    const isSelectedFirst = answer.first === idx;
    const isSelectedSecond = answer.second === idx;
    const selectedClass = isSelectedFirst ? 'selected-first' : '';

    optionsHtml += `
      <div class="option-card type-${option.type.toLowerCase()} ${selectedClass}">
        <div class="option-text">${option.text}</div>
        <div class="option-buttons">
          <button class="btn-option ${isSelectedFirst ? 'active' : ''}"
                  onclick="selectFirst(${question.id}, ${idx})">◎ 一番近い</button>
          <button class="btn-option ${isSelectedSecond ? 'active' : ''}"
                  onclick="selectSecond(${question.id}, ${idx})">○ 二番目</button>
        </div>
      </div>
    `;
  });

  const hasFirstAnswer = answers[question.id]?.first !== undefined;
  const buttonClass = hasFirstAnswer ? 'enabled' : '';
  const buttonText = questionIndex === totalQuestions - 1 ? '結果を見る' : '次へ';

  const html = `
    <div class="q-wrapper">
      <div class="q-header">
        <div class="progress-wrap">
          <div class="progress-track">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <div class="progress-label">${questionIndex + 1} / ${totalQuestions}</div>
        </div>
      </div>
      <div class="q-body slide-in">
        <div class="q-num">Q${question.id}</div>
        <h2 class="q-text">${question.text}</h2>
        <div class="options-grid">
          ${optionsHtml}
        </div>
      </div>
      <div class="q-footer">
        <button class="btn-next ${buttonClass}" onclick="nextQuestion()">
          ${buttonText}
        </button>
      </div>
    </div>
  `;

  const screen = document.getElementById('screen-question');
  screen.innerHTML = html;
  hideAllScreens();
  screen.style.display = 'flex';
}

function showResultScreen() {
  const scores = { V: 0, A: 0, K: 0 };

  QUESTIONS.forEach(question => {
    const answer = answers[question.id];
    if (!answer) return;

    if (answer.first !== undefined) {
      const type = question.options[answer.first].type;
      scores[type] += 2;
    }

    if (answer.second !== undefined) {
      const type = question.options[answer.second].type;
      scores[type] += 1;
    }
  });

  const total = scores.V + scores.A + scores.K;
  let percentages = {
    V: Math.round((scores.V / total) * 100),
    A: Math.round((scores.A / total) * 100),
    K: Math.round((scores.K / total) * 100)
  };

  const sum = percentages.V + percentages.A + percentages.K;
  if (sum !== 100) {
    const diff = 100 - sum;
    const types = ["V", "A", "K"];
    const sorted = types.sort((a, b) => scores[b] - scores[a]);
    percentages[sorted[0]] += diff;
  }

  const result = analyzeResult(percentages);

  let scoresHtml = '';
  const types = ["V", "A", "K"];
  const labels = ["見てつかむ", "聞いて・言葉で整理する", "体感して納得する"];
  const icons = ["👁️", "👂", "✨"];

  types.forEach((type, idx) => {
    const pct = percentages[type];
    scoresHtml += `
      <div class="score-item score-${type.toLowerCase()}">
        <div class="score-header">
          <div class="score-label">
            <div class="score-label-icon">${icons[idx]}</div>
            <div>${type}：${labels[idx]}</div>
          </div>
          <div class="score-percentage">${pct}%</div>
        </div>
        <div class="score-bar">
          <div class="score-bar-fill" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  });

  let commentsHtml = '';

  const primaryComment = RESULT_COMMENTS.primary[result.primary];
  const primaryClass = `highlight-${result.primary.toLowerCase()}`;
  commentsHtml += `
    <div class="comment-section comment-section--highlight ${primaryClass}">
      <div class="comment-title">${result.primary}が強い傾向</div>
      <div class="comment-body">${primaryComment}</div>
    </div>
  `;

  if (!result.isBalance) {
    const combKey = `${result.primary}+${result.secondary}`;
    const combComment = RESULT_COMMENTS.combination[combKey] || '';
    const combClass = `highlight-${result.primary.toLowerCase()}`;
    commentsHtml += `
      <div class="comment-section comment-section--highlight ${combClass}">
        <div class="comment-title">上位2つの組み合わせ</div>
        <div class="comment-body">${combComment}</div>
      </div>
    `;
  } else {
    const balanceComment = RESULT_COMMENTS.combination.balance;
    commentsHtml += `
      <div class="comment-section comment-section--highlight highlight-balance">
        <div class="comment-title">バランス型</div>
        <div class="comment-body">${balanceComment}</div>
      </div>
    `;
  }

  const html = `
    <div class="result-inner">
      <div class="result-image-hero">
        <img src="VAKimage.png" alt="VAK イメージ" class="result-image">
      </div>
      <div class="result-hero">
        <h1 class="result-title">あなたのVAKバランス</h1>
      </div>
      <div class="result-scores">
        ${scoresHtml}
      </div>
      <div class="result-comments">
        ${commentsHtml}
      </div>
      <div class="result-footer">
        <div class="footer-message">${RESULT_COMMENTS.footer}</div>
      </div>
      <div class="result-cta">
        <button class="btn-retry" onclick="resetQuiz()">もう一度チェックする</button>
      </div>
    </div>
  `;

  const screen = document.getElementById('screen-result');
  screen.innerHTML = html;
  hideAllScreens();
  screen.style.display = 'flex';
}

function hideAllScreens() {
  document.getElementById('screen-start').style.display = 'none';
  document.getElementById('screen-question').style.display = 'none';
  document.getElementById('screen-result').style.display = 'none';
}

/* ============================================================
   Event Handlers
   ============================================================ */
function startQuiz() {
  currentQuestion = 0;
  answers = {};
  showQuestionScreen(currentQuestion);
}

function selectFirst(questionId, optionIndex) {
  if (!answers[questionId]) {
    answers[questionId] = { first: undefined, second: undefined };
  }
  answers[questionId].first = optionIndex;

  if (answers[questionId].second === optionIndex) {
    answers[questionId].second = undefined;
  }

  showQuestionScreen(currentQuestion);
}

function selectSecond(questionId, optionIndex) {
  if (!answers[questionId]) {
    answers[questionId] = { first: undefined, second: undefined };
  }

  if (optionIndex === answers[questionId].first) {
    return;
  }

  answers[questionId].second = optionIndex;
  showQuestionScreen(currentQuestion);
}

function nextQuestion() {
  const question = QUESTIONS[currentQuestion];

  if (answers[question.id]?.first === undefined) {
    alert('◎ 一番近いものを選んでください');
    return;
  }

  if (currentQuestion < QUESTIONS.length - 1) {
    currentQuestion++;
    showQuestionScreen(currentQuestion);
  } else {
    showResultScreen();
  }
}

function resetQuiz() {
  showStartScreen();
}

/* ============================================================
   Analysis Functions
   ============================================================ */
function analyzeResult(percentages) {
  const types = ["V", "A", "K"];
  const scores = { V: 0, A: 0, K: 0 };

  QUESTIONS.forEach(question => {
    const answer = answers[question.id];
    if (!answer) return;

    if (answer.first !== undefined) {
      const type = question.options[answer.first].type;
      scores[type] += 2;
    }

    if (answer.second !== undefined) {
      const type = question.options[answer.second].type;
      scores[type] += 1;
    }
  });

  const sorted = types.sort((a, b) => scores[b] - scores[a]);
  const primary = sorted[0];
  const secondary = sorted[1];
  const minDiff = percentages[primary] - percentages[sorted[2]];
  const isBalance = minDiff <= 15;

  return { primary, secondary, isBalance };
}
