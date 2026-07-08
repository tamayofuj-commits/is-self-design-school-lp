/**
 * Life Chart Diagnosis App
 * Main Application Logic
 */

const ITEMS = [
  { id: 0, name: '家族・パートナー', question: '今の家族・パートナーとの関係への満足度はどれくらいですか？' },
  { id: 1, name: '人間関係', question: '今の人間関係への満足度はどれくらいですか？' },
  { id: 2, name: '趣味・余暇', question: '今の趣味や余暇への満足度はどれくらいですか？' },
  { id: 3, name: '学び・成長', question: '今の学び・成長への満足度はどれくらいですか？' },
  { id: 4, name: '生活環境', question: '今の生活環境への満足度はどれくらいですか？' },
  { id: 5, name: '資産・収入・貯蓄', question: '今の資産・収入・貯蓄への満足度はどれくらいですか？' },
  { id: 6, name: '仕事での貢献', question: '今の仕事での貢献への満足度はどれくらいですか？' },
  { id: 7, name: '社会貢献', question: '今の社会貢献への満足度はどれくらいですか？' }
];

const App = {
  // 履歴保存用のキー
  HISTORY_KEY: 'lifechart_history',

  // 現在の入力状態
  currentData: {
    name: '',
    date: new Date().toISOString().split('T')[0],
    scores: [0, 0, 0, 0, 0, 0, 0, 0],
    colors: [null, null, null, null, null, null, null, null],
    health: 0,
    healthColor: null
  },

  currentItem: 0,
  currentColor: null,

  /**
   * 初期化
   */
  init() {
    this.setupEventListeners();
    this.showScreen('welcome');
    this.updateDateDisplay();
    this.updateStartButton();
  },

  /**
   * イベントリスナーを設定
   */
  setupEventListeners() {
    // ようこそ画面
    document.getElementById('name-input').addEventListener('input', (e) => {
      this.currentData.name = e.target.value;
      this.updateStartButton();
    });

    document.getElementById('btn-start').addEventListener('click', () => {
      this.startDiagnosis();
    });

    // 入力画面
    document.getElementById('btn-back').addEventListener('click', () => {
      this.showScreen('welcome');
    });

    // チャートの項目を直接タップして選択
    document.getElementById('chart-svg').addEventListener('click', (e) => {
      const target = e.target.closest('[data-item]');
      if (!target) return;
      const item = target.getAttribute('data-item');
      this.selectItem(item === 'health' ? 'health' : parseInt(item));
    });

    // 色選択
    document.querySelectorAll('.color-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.selectColor(e.target.getAttribute('data-color'));
      });
    });

    // スライダー
    document.getElementById('satisfaction-slider').addEventListener('input', (e) => {
      this.updateSliderValue(parseInt(e.target.value));
    });

    // 完成ボタン
    document.getElementById('btn-complete-input').addEventListener('click', () => {
      this.completeInput();
    });

    // 完成画面：診断を完了する
    document.getElementById('btn-complete').addEventListener('click', () => {
      this.completeDiagnosis();
    });
  },

  /**
   * スタートボタンの有効/無効を更新
   */
  updateStartButton() {
    const btn = document.getElementById('btn-start');
    btn.disabled = !this.currentData.name.trim();
  },

  /**
   * 日付を表示
   */
  updateDateDisplay() {
    const today = new Date();
    const formatted = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
    // ようこそ画面に日付を追加する場合はここに実装
  },

  /**
   * 診断を開始
   */
  startDiagnosis() {
    this.currentData.date = new Date().toISOString().split('T')[0];
    this.showScreen('input');
    this.selectItem(0);
  },

  /**
   * 項目を選択
   */
  selectItem(itemId) {
    this.currentItem = itemId;
    this.currentColor = null;

    // UI更新
    this.updateQuestionDisplay();
    this.updateColorSelection();
    this.updateSliderDisplay();
    // チャートの選択ハイライトを更新
    this.updateChart();
  },

  /**
   * 質問文を更新
   */
  updateQuestionDisplay() {
    const questionEl = document.getElementById('question-text');
    if (this.currentItem === 'health') {
      questionEl.textContent = '今の健康への満足度はどれくらいですか？';
    } else {
      const item = ITEMS[this.currentItem];
      questionEl.textContent = item.question;
    }
  },

  /**
   * 色選択UI を更新
   */
  updateColorSelection() {
    document.querySelectorAll('.color-btn').forEach((btn) => {
      btn.classList.remove('active');
    });

    // 現在の項目の選択済み色を表示
    let selectedColor = null;
    if (this.currentItem === 'health') {
      selectedColor = this.currentData.healthColor;
    } else {
      selectedColor = this.currentData.colors[this.currentItem];
    }

    if (selectedColor) {
      const btn = document.querySelector(`.color-btn[data-color="${selectedColor}"]`);
      if (btn) btn.classList.add('active');
      this.currentColor = selectedColor;
    }
  },

  /**
   * 色を選択
   */
  selectColor(color) {
    this.currentColor = color;

    // 色を保存
    if (this.currentItem === 'health') {
      this.currentData.healthColor = color;
    } else {
      this.currentData.colors[this.currentItem] = color;
    }

    // UI更新
    document.querySelectorAll('.color-btn').forEach((btn) => {
      btn.classList.remove('active');
    });
    document.querySelector(`.color-btn[data-color="${color}"]`).classList.add('active');

    // スライダーを有効化
    document.getElementById('satisfaction-slider').disabled = false;

    // チャートに色を即時反映
    this.updateChart();
  },

  /**
   * スライダーの表示を更新
   */
  updateSliderDisplay() {
    const slider = document.getElementById('satisfaction-slider');
    const valueDisplay = document.getElementById('slider-value');

    // 現在の値を取得
    let currentScore = 0;
    if (this.currentItem === 'health') {
      currentScore = this.currentData.health;
    } else {
      currentScore = this.currentData.scores[this.currentItem];
    }

    // スライダーの値を更新
    slider.value = currentScore;

    // 表示を更新
    if (currentScore === 0) {
      valueDisplay.textContent = 'まだ入力していません';
    } else {
      valueDisplay.textContent = currentScore;
    }

    // 色が選択されている場合のみスライダーを有効化
    slider.disabled = !this.currentColor;
  },

  /**
   * スライダーの値を更新
   */
  updateSliderValue(value) {
    // スコアを保存
    if (this.currentItem === 'health') {
      this.currentData.health = value;
    } else {
      this.currentData.scores[this.currentItem] = value;
    }

    // 表示を更新
    const valueDisplay = document.getElementById('slider-value');
    if (value === 0) {
      valueDisplay.textContent = 'まだ入力していません';
    } else {
      valueDisplay.textContent = value;
    }

    // チャートをリアルタイム更新
    this.updateChart();

    // 進捗を更新
    this.updateProgress();
  },

  /**
   * チャートを更新
   */
  updateChart() {
    SVGChart.draw('chart-svg', this.currentData, 300, {
      interactive: true,
      selectedItem: this.currentItem
    });
  },

  /**
   * 進捗を更新
   */
  updateProgress() {
    const completedCount = [
      ...this.currentData.scores,
      this.currentData.health
    ].filter(s => s > 0).length;

    document.getElementById('progress-text').textContent = `進捗: ${completedCount}/9`;

    // 完成ボタンの有効/無効を制御
    const btn = document.getElementById('btn-complete-input');
    btn.disabled = !this.isAllItemsComplete();
  },

  /**
   * 全項目入力をチェック
   */
  isAllItemsComplete() {
    // 8項目 + 健康
    for (let i = 0; i < 8; i++) {
      if (this.currentData.scores[i] === 0 || !this.currentData.colors[i]) {
        return false;
      }
    }
    return this.currentData.health > 0 && this.currentData.healthColor;
  },

  /**
   * スクリーンを表示
   */
  showScreen(screenName) {
    document.querySelectorAll('.screen').forEach((screen) => {
      screen.classList.remove('active');
    });
    document.getElementById(`screen-${screenName}`).classList.add('active');

    // スクリーン表示時の初期化
    if (screenName === 'complete') {
      this.renderCompleteScreen();
    } else if (screenName === 'input') {
      this.updateChart();
    }
  },

  /**
   * 完成画面の内容を描画（画面切り替えは showScreen('complete') が行う）
   */
  renderCompleteScreen() {
    SVGChart.draw('chart-final', this.currentData, 300);

    // 見出しを「○○さんのライフチャート」に（名前がなければ汎用文言）
    const heading = document.getElementById('complete-heading');
    heading.textContent = '';
    const name = this.currentData.name.trim();
    if (name) {
      heading.appendChild(document.createTextNode(`${name}さんの`));
      heading.appendChild(document.createElement('br'));
      heading.appendChild(document.createTextNode('ライフチャートが完成しました'));
    } else {
      heading.textContent = 'ライフチャートが完成しました';
    }

    // 日付を表示
    document.getElementById('complete-date').textContent = this.formatDate(this.currentData.date);

    // 過去のライフチャート（最大3回分）を表示
    this.renderHistory();
  },

  /**
   * 入力を完了（完成画面へ）
   */
  completeInput() {
    if (this.isAllItemsComplete()) {
      this.showScreen('complete');
    } else {
      alert('すべての項目を入力してください');
    }
  },

  /**
   * 日付を「YYYY年M月D日」形式に整形
   */
  formatDate(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    if (!y || !m || !d) return iso;
    return `${y}年${parseInt(m, 10)}月${parseInt(d, 10)}日`;
  },

  /**
   * 履歴を読み込む（新しい順の配列）
   */
  loadHistory() {
    try {
      const raw = localStorage.getItem(this.HISTORY_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  },

  /**
   * 現在のチャートを履歴に保存（先頭に追加、最大10件保持）
   */
  saveToHistory(entry) {
    const history = this.loadHistory();
    history.unshift(entry);
    try {
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history.slice(0, 10)));
    } catch (e) {
      // 保存できない環境（プライベートモード等）でも診断は続行
    }
  },

  /**
   * 過去のライフチャート（最大3回分）を結果画面に描画
   */
  renderHistory() {
    const section = document.getElementById('history-section');
    const list = document.getElementById('history-list');
    list.innerHTML = '';

    const history = this.loadHistory().slice(0, 3);
    if (history.length === 0) {
      section.style.display = 'none';
      return;
    }
    section.style.display = 'block';

    history.forEach((entry, idx) => {
      const item = document.createElement('div');
      item.className = 'history-item';

      const dateEl = document.createElement('p');
      dateEl.className = 'history-date';
      dateEl.textContent = this.formatDate(entry.date);
      item.appendChild(dateEl);

      const svgId = `history-chart-${idx}`;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('id', svgId);
      svg.setAttribute('viewBox', '0 0 200 200');
      svg.setAttribute('class', 'history-chart');
      item.appendChild(svg);

      if (entry.comment) {
        const commentEl = document.createElement('p');
        commentEl.className = 'history-comment';
        commentEl.textContent = entry.comment;
        item.appendChild(commentEl);
      }

      list.appendChild(item);
      SVGChart.draw(svgId, entry, 200);
    });
  },

  /**
   * 診断を完了（コメントとともに履歴へ保存）
   */
  completeDiagnosis() {
    const comment = document.getElementById('complete-comment').value.trim();
    this.saveToHistory({
      date: this.currentData.date,
      name: this.currentData.name,
      scores: [...this.currentData.scores],
      colors: [...this.currentData.colors],
      health: this.currentData.health,
      healthColor: this.currentData.healthColor,
      comment
    });

    alert('診断が完了しました！お疲れさまでした。');
    // 初期状態にリセット
    this.resetData();
    this.showScreen('welcome');
  },

  /**
   * データをリセット
   */
  resetData() {
    this.currentData = {
      name: '',
      date: new Date().toISOString().split('T')[0],
      scores: [0, 0, 0, 0, 0, 0, 0, 0],
      colors: [null, null, null, null, null, null, null, null],
      health: 0,
      healthColor: null
    };
    this.currentItem = 0;
    this.currentColor = null;
    document.getElementById('name-input').value = '';
    document.getElementById('complete-comment').value = '';
    this.updateStartButton();
  }
};

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
