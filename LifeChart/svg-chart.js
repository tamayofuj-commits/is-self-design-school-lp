/**
 * SVG Chart Module
 * 8分割扇形チャート + 中央の健康項目を水位表現で描画
 */

const NS = 'http://www.w3.org/2000/svg';

const SVGChart = {
  // 8項目の名前（円形チャートの外側）
  items: [
    '家族・パートナー',
    '人間関係',
    '趣味・余暇',
    '学び・成長',
    '生活環境',
    '資産',
    '仕事での貢献',
    '社会貢献'
  ],

  // デフォルトカラーマッピング（12色）
  colorMap: {
    red: '#FF4444',
    orange: '#FF8844',
    yellow: '#FFCC00',
    lime: '#A3D53A',
    green: '#44CC44',
    teal: '#22C1A5',
    cyan: '#44CCFF',
    blue: '#4488FF',
    purple: '#9944FF',
    pink: '#FF66BB',
    rose: '#FF8FB3',
    brown: '#B07A54'
  },

  /**
   * チャートを描画
   * @param {string} svgId - SVG要素のID
   * @param {Object} data - {scores: [0-10], colors: ['red', ...], health: 0-10}
   * @param {number} size - SVGのサイズ（描画座標系）
   * @param {Object} options - {interactive: bool, selectedItem: 0-7|'health'}
   */
  draw(svgId, data, size = 160, options = {}) {
    const svg = document.getElementById(svgId);
    if (!svg) return;

    // SVGをクリア
    svg.innerHTML = '';

    // 基準サイズ160に対する拡大率（フォントや線幅を相対的に調整）
    const scale = size / 160;
    const center = size / 2;
    const outerRadius = size / 2 - 4 * scale;
    const healthRadius = 34 * scale;
    const innerRadius = healthRadius;

    // グループの背景（グリッド）
    this.drawBackground(svg, center, size, innerRadius, outerRadius);

    // 8つの扇形を描画
    for (let i = 0; i < 8; i++) {
      const score = data.scores && data.scores[i] ? data.scores[i] : 0;
      const color = data.colors && data.colors[i] ? this.colorMap[data.colors[i]] : '#EEEEEE';
      this.drawSegment(svg, i, center, innerRadius, outerRadius, score, color);
    }

    // 健康項目（中央）を描画
    if (data.health !== undefined && data.health > 0) {
      this.drawHealthCircle(svg, center, healthRadius, data.health, data.healthColor, svgId);
    }

    // ラベルと各項目のスコアを描画
    this.drawLabels(svg, center, innerRadius, outerRadius, scale, data.scores);

    // 中央（健康）のスコア数値を描画
    this.drawHealthScore(svg, center, data.health, scale);

    // 中央に「健康」というテキストを描画
    const healthText = document.createElementNS(NS, 'text');
    healthText.setAttribute('x', center);
    healthText.setAttribute('y', center - 2 * scale);
    healthText.setAttribute('text-anchor', 'middle');
    healthText.setAttribute('font-size', 12 * scale);
    healthText.setAttribute('font-weight', '500');
    healthText.setAttribute('fill', '#666666');
    healthText.setAttribute('pointer-events', 'none');
    healthText.textContent = '健康';
    svg.appendChild(healthText);

    // タップ選択用の当たり判定（インタラクティブ時のみ）
    if (options.interactive) {
      this.drawHitAreas(svg, center, innerRadius, outerRadius, scale, options.selectedItem);
    }
  },

  /**
   * 背景グリッドを描画
   */
  drawBackground(svg, center, size, innerRadius, outerRadius) {
    const bg = document.createElementNS(NS, 'g');
    bg.setAttribute('id', 'background');

    // 外枠の円
    const outerCircle = document.createElementNS(NS, 'circle');
    outerCircle.setAttribute('cx', center);
    outerCircle.setAttribute('cy', center);
    outerCircle.setAttribute('r', outerRadius);
    outerCircle.setAttribute('fill', 'none');
    outerCircle.setAttribute('stroke', '#EEEEEE');
    outerCircle.setAttribute('stroke-width', '1');
    bg.appendChild(outerCircle);

    // 内側の円
    const innerCircle = document.createElementNS(NS, 'circle');
    innerCircle.setAttribute('cx', center);
    innerCircle.setAttribute('cy', center);
    innerCircle.setAttribute('r', innerRadius);
    innerCircle.setAttribute('fill', 'none');
    innerCircle.setAttribute('stroke', '#EEEEEE');
    innerCircle.setAttribute('stroke-width', '1');
    bg.appendChild(innerCircle);

    // 放射線を描画
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * 2 * Math.PI - Math.PI / 2;
      const x1 = center + innerRadius * Math.cos(angle);
      const y1 = center + innerRadius * Math.sin(angle);
      const x2 = center + outerRadius * Math.cos(angle);
      const y2 = center + outerRadius * Math.sin(angle);

      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.setAttribute('stroke', '#EEEEEE');
      line.setAttribute('stroke-width', '1');
      bg.appendChild(line);
    }

    svg.appendChild(bg);
  },

  /**
   * 1つの扇形セグメントを描画
   */
  drawSegment(svg, index, center, innerRadius, outerRadius, score, color) {
    const group = document.createElementNS(NS, 'g');
    group.setAttribute('id', `segment-${index}`);

    // スコア（1-10）を割合に変換（0-1）
    const ratio = Math.max(0, Math.min(1, score / 10));

    // 実際の塗りつぶし半径を計算
    const fillInnerRadius = innerRadius;
    const fillOuterRadius = innerRadius + (outerRadius - innerRadius) * ratio;

    // 角度を計算（8分割）
    const startAngle = (index / 8) * 2 * Math.PI - Math.PI / 2;
    const endAngle = ((index + 1) / 8) * 2 * Math.PI - Math.PI / 2;

    // 扇形のパスを生成
    const path = this.createSegmentPath(
      center,
      startAngle,
      endAngle,
      fillInnerRadius,
      fillOuterRadius
    );

    const pathEl = document.createElementNS(NS, 'path');
    pathEl.setAttribute('d', path);
    pathEl.setAttribute('fill', color);
    pathEl.setAttribute('opacity', '0.8');
    pathEl.setAttribute('pointer-events', 'none');
    group.appendChild(pathEl);

    svg.appendChild(group);
  },

  /**
   * 扇形のパスを生成
   */
  createSegmentPath(center, startAngle, endAngle, innerRadius, outerRadius) {
    const x1Inner = center + innerRadius * Math.cos(startAngle);
    const y1Inner = center + innerRadius * Math.sin(startAngle);
    const x2Inner = center + innerRadius * Math.cos(endAngle);
    const y2Inner = center + innerRadius * Math.sin(endAngle);

    const x1Outer = center + outerRadius * Math.cos(startAngle);
    const y1Outer = center + outerRadius * Math.sin(startAngle);
    const x2Outer = center + outerRadius * Math.cos(endAngle);
    const y2Outer = center + outerRadius * Math.sin(endAngle);

    const largeArc = 0;

    return `
      M ${x1Inner} ${y1Inner}
      L ${x1Outer} ${y1Outer}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}
      L ${x2Inner} ${y2Inner}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1Inner} ${y1Inner}
      Z
    `;
  },

  /**
   * 健康項目（中央の円）を水位で塗りつぶし
   */
  drawHealthCircle(svg, center, radius, health, healthColor, svgId) {
    const group = document.createElementNS(NS, 'g');
    group.setAttribute('id', 'health-circle');
    // 同一ページに複数チャートを描くためクリップIDを一意にする
    const clipId = `health-clip-${svgId || 'default'}`;

    // 水位の高さを計算
    const ratio = Math.max(0, Math.min(1, health / 10));
    const waterHeight = radius * 2 * ratio;
    const waterTop = center + radius - waterHeight;

    // 水位の矩形
    const water = document.createElementNS(NS, 'rect');
    water.setAttribute('x', center - radius);
    water.setAttribute('y', waterTop);
    water.setAttribute('width', radius * 2);
    water.setAttribute('height', waterHeight);
    water.setAttribute('fill', this.colorMap[healthColor] || healthColor || '#4488FF');
    water.setAttribute('opacity', '0.8');
    water.setAttribute('pointer-events', 'none');
    group.appendChild(water);

    // クリップパスを適用して円形に
    const defs = document.createElementNS(NS, 'defs');
    const clipPath = document.createElementNS(NS, 'clipPath');
    clipPath.setAttribute('id', clipId);
    const clipCircle = document.createElementNS(NS, 'circle');
    clipCircle.setAttribute('cx', center);
    clipCircle.setAttribute('cy', center);
    clipCircle.setAttribute('r', radius);
    clipPath.appendChild(clipCircle);
    defs.appendChild(clipPath);
    svg.appendChild(defs);

    // グループにクリップパスを適用
    group.setAttribute('clip-path', `url(#${clipId})`);

    svg.appendChild(group);
  },

  /**
   * テキスト要素を作成して親に追加するヘルパー
   */
  addText(parent, x, y, content, fontSize, fill) {
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', x);
    t.setAttribute('y', y);
    t.setAttribute('font-size', fontSize);
    t.setAttribute('fill', fill);
    t.textContent = content;
    parent.appendChild(t);
  },

  /**
   * ラベル（長い項目名は「・」で2行に分割）と各項目のスコアを描画
   */
  drawLabels(svg, center, innerRadius, outerRadius, scale, scores) {
    const group = document.createElementNS(NS, 'g');
    group.setAttribute('id', 'labels');
    group.setAttribute('text-anchor', 'middle');
    group.setAttribute('pointer-events', 'none');

    const labelRadius = (innerRadius + outerRadius) / 2;
    const labelFont = 7.5 * scale;
    const scoreFont = 8 * scale;
    const lineH = labelFont * 1.05;

    for (let i = 0; i < 8; i++) {
      const angle = ((i + 0.5) / 8) * 2 * Math.PI - Math.PI / 2;
      const lx = center + labelRadius * Math.cos(angle);
      const ly = center + labelRadius * Math.sin(angle);

      // 長い項目名は「・」で2行に分割して収める
      const parts = this.items[i].includes('・')
        ? this.items[i].split('・')
        : [this.items[i]];

      let scoreY;
      if (parts.length === 2) {
        this.addText(group, lx, ly - lineH * 0.35, parts[0], labelFont, '#666666');
        this.addText(group, lx, ly + lineH * 0.75, parts[1], labelFont, '#666666');
        scoreY = ly + lineH * 0.75 + scoreFont * 1.3;
      } else {
        this.addText(group, lx, ly + labelFont * 0.2, parts[0], labelFont, '#666666');
        scoreY = ly + labelFont * 0.2 + scoreFont * 1.4;
      }

      const val = (scores && scores[i]) || '0';
      this.addText(group, lx, scoreY, val, scoreFont, '#AAAAAA');
    }

    svg.appendChild(group);
  },

  /**
   * 中央（健康）のスコア数値を描画
   */
  drawHealthScore(svg, center, health, scale) {
    const group = document.createElementNS(NS, 'g');
    group.setAttribute('id', 'scores');
    group.setAttribute('text-anchor', 'middle');
    group.setAttribute('pointer-events', 'none');
    this.addText(group, center, center + 16 * scale, health || '0', 10 * scale, '#AAAAAA');
    svg.appendChild(group);
  },

  /**
   * タップ選択用の当たり判定（透明な扇形）を描画。
   * 選択中の項目はうっすらハイライトする。
   */
  drawHitAreas(svg, center, innerRadius, outerRadius, scale, selectedItem) {
    const group = document.createElementNS(NS, 'g');
    group.setAttribute('id', 'hit-areas');

    // 8項目の扇形（塗りが0でもタップできるよう全域をカバー）
    for (let i = 0; i < 8; i++) {
      const startAngle = (i / 8) * 2 * Math.PI - Math.PI / 2;
      const endAngle = ((i + 1) / 8) * 2 * Math.PI - Math.PI / 2;
      const d = this.createSegmentPath(center, startAngle, endAngle, innerRadius, outerRadius);

      const el = document.createElementNS(NS, 'path');
      el.setAttribute('d', d);
      el.setAttribute('data-item', i);
      const isSelected = selectedItem === i;
      el.setAttribute('fill', isSelected ? 'rgba(212,181,160,0.20)' : 'transparent');
      el.setAttribute('stroke', isSelected ? '#B89A82' : 'none');
      el.setAttribute('stroke-width', isSelected ? 2 * scale : 0);
      el.style.cursor = 'pointer';
      group.appendChild(el);
    }

    // 健康（中央円）
    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('cx', center);
    circle.setAttribute('cy', center);
    circle.setAttribute('r', innerRadius);
    circle.setAttribute('data-item', 'health');
    const healthSelected = selectedItem === 'health';
    circle.setAttribute('fill', healthSelected ? 'rgba(212,181,160,0.20)' : 'transparent');
    circle.setAttribute('stroke', healthSelected ? '#B89A82' : 'none');
    circle.setAttribute('stroke-width', healthSelected ? 2 * scale : 0);
    circle.style.cursor = 'pointer';
    group.appendChild(circle);

    svg.appendChild(group);
  }
};
