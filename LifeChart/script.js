/**
 * Life Chart Diagnosis App
 * Main Application Logic
 */

const ITEMS = [
  { id: 0, name: '身近な人・家族・友人', question: '今の身近な人・家族・友人との関係への満足度はどれくらいですか？' },
  { id: 1, name: '職場の人間関係', question: '今の職場の人間関係への満足度はどれくらいですか？' },
  { id: 2, name: '趣味・余暇', question: '今の趣味や余暇への満足度はどれくらいですか？' },
  { id: 3, name: '学び・成長・精神', question: '今の学び・成長・精神面への満足度はどれくらいですか？' },
  { id: 4, name: '生活環境・住居・通勤など', question: '今の生活環境への満足度はどれくらいですか？' },
  { id: 5, name: '資産・収入・貯蓄', question: '今の資産・収入・貯蓄への満足度はどれくらいですか？' },
  { id: 6, name: '会社や所属先への貢献', question: '今の会社や所属先への貢献への満足度はどれくらいですか？' },
  { id: 7, name: '社会貢献', question: '今の社会貢献への満足度はどれくらいですか？' }
];

const App = {
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

    // 項目タブ
    document.querySelectorAll('.item-tab').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const item = e.target.getAttribute('data-item');
        this.selectItem(item === 'health' ? 'health' : parseInt(item));
      });
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

    // 完成画面
    document.getElementById('btn-reflection').addEventListener('click', () => {
      this.showScreen('reflection');
    });

    // 振り返り画面
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
    // 前の項目のタブをクリア
    document.querySelectorAll('.item-tab').forEach((btn) => {
      btn.classList.remove('active');
    });

    // 新しい項目を選択
    const btn = document.querySelector(
      itemId === 'health'
        ? '.item-tab.health-btn'
        : `.item-tab[data-item="${itemId}"]`
    );
    if (btn) btn.classList.add('active');

    this.currentItem = itemId;
    this.currentColor = null;

    // UI更新
    this.updateQuestionDisplay();
    this.updateColorSelection();
    this.updateSliderDisplay();
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
    SVGChart.draw('chart-svg', this.currentData, 160);
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
    if (screenName === 'input') {
      this.updateChart();
    }
  },

  /**
   * 完成画面を描画
   */
  renderCompleteScreen() {
    SVGChart.draw('chart-final', this.currentData, 240);

    // 名前と日付を表示
    document.getElementById('complete-name').textContent = this.currentData.name;
    document.getElementById('complete-date').textContent = this.currentData.date;

    this.showScreen('complete');
  },

  /**
   * 入力を完了（完成画面へ）
   */
  completeInput() {
    if (this.isAllItemsComplete()) {
      this.renderCompleteScreen();
    } else {
      alert('すべての項目を入力してください');
    }
  },

  /**
   * 診断を完了
   */
  completeDiagnosis() {
    alert('診断が完了しました！');
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
    document.getElementById('reflection-q1').value = '';
    document.getElementById('reflection-q2').value = '';
    document.getElementById('reflection-q3').value = '';
    document.getElementById('reflection-q4').value = '';
    document.getElementById('memo').value = '';
    this.updateStartButton();
  }
};

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
