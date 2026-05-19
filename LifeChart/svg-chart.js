/**
 * SVG Chart Module
 * 8分割扇形チャート + 中央の健康項目を水位表現で描画
 */

const SVGChart = {
  // 8項目の名前（円形チャートの外側）
  items: [
    '身近な人',
    '職場',
    '趣味',
    '学び',
    '生活環境',
    '資産',
    '貢献',
    '社会'
  ],

  // デフォルトカラーマッピング
  colorMap: {
    red: '#FF4444',
    blue: '#4488FF',
    yellow: '#FFCC00',
    green: '#44CC44',
    orange: '#FF8844',
    pink: '#FF66BB',
    purple: '#9944FF',
    cyan: '#44CCFF'
  },

  /**
   * チャートを描画
   * @param {string} svgId - SVG要素のID
   * @param {Object} data - {scores: [0-10], colors: ['red', ...], health: 0-10}
   * @param {number} size - SVGのサイズ（160または240）
   */
  draw(svgId, data, size = 160) {
    const svg = document.getElementById(svgId);
    if (!svg) return;

    // SVGをクリア
    svg.innerHTML = '';

    const center = size / 2;
    const outerRadius = size / 2 - 3;
    const healthRadius = 32;
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
      this.drawHealthCircle(svg, center, healthRadius, data.health, data.healthColor);
    }

    // ラベルを描画
    this.drawLabels(svg, center, innerRadius, outerRadius);

    // スコア数値を描画
    this.drawScores(svg, center, innerRadius, outerRadius, data.scores, data.health);

    // 中央に「健康」というテキストを描画
    const healthText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    healthText.setAttribute('x', center);
    healthText.setAttribute('y', center + 4);
    healthText.setAttribute('text-anchor', 'middle');
    healthText.setAttribute('font-size', '12');
    healthText.setAttribute('font-weight', '500');
    healthText.setAttribute('fill', '#666666');
    healthText.textContent = '健康';
    svg.appendChild(healthText);
  },

  /**
   * 背景グリッドを描画
   */
  drawBackground(svg, center, size, innerRadius, outerRadius) {
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    bg.setAttribute('id', 'background');

    // 外枠の円
    const outerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    outerCircle.setAttribute('cx', center);
    outerCircle.setAttribute('cy', center);
    outerCircle.setAttribute('r', outerRadius);
    outerCircle.setAttribute('fill', 'none');
    outerCircle.setAttribute('stroke', '#EEEEEE');
    outerCircle.setAttribute('stroke-width', '1');
    bg.appendChild(outerCircle);

    // 内側の円
    const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
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

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
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
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
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

    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('d', path);
    pathEl.setAttribute('fill', color);
    pathEl.setAttribute('opacity', '0.8');
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
  drawHealthCircle(svg, center, radius, health, healthColor) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('id', 'health-circle');

    // 水位の高さを計算
    const ratio = Math.max(0, Math.min(1, health / 10));
    const waterHeight = radius * 2 * ratio;
    const waterTop = center + radius - waterHeight;

    // 水位の矩形
    const water = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    water.setAttribute('x', center - radius);
    water.setAttribute('y', waterTop);
    water.setAttribute('width', radius * 2);
    water.setAttribute('height', waterHeight);
    water.setAttribute('fill', healthColor || '#4488FF');
    water.setAttribute('opacity', '0.8');
    group.appendChild(water);

    // クリップパスを適用して円形に
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    clipPath.setAttribute('id', 'health-clip');
    const clipCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    clipCircle.setAttribute('cx', center);
    clipCircle.setAttribute('cy', center);
    clipCircle.setAttribute('r', radius);
    clipPath.appendChild(clipCircle);
    defs.appendChild(clipPath);
    svg.appendChild(defs);

    // グループにクリップパスを適用
    group.setAttribute('clip-path', 'url(#health-clip)');

    svg.appendChild(group);
  },

  /**
   * 未入力の健康項目を描画
   */
  drawEmptyHealthCircle(svg, center, radius) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('id', 'health-circle');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', center);
    circle.setAttribute('cy', center);
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', '#F5F5F5');
    circle.setAttribute('stroke', '#DDDDDD');
    circle.setAttribute('stroke-width', '1');
    group.appendChild(circle);

    svg.appendChild(group);
  },

  /**
   * ラベルを描画
   */
  drawLabels(svg, center, innerRadius, outerRadius) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('id', 'labels');
    group.setAttribute('font-size', '10');
    group.setAttribute('text-anchor', 'middle');
    group.setAttribute('fill', '#666666');

    const labelRadius = (innerRadius + outerRadius) / 2;

    for (let i = 0; i < 8; i++) {
      // 項目と項目の間に配置（各セクションの中央）
      const angle = ((i + 0.5) / 8) * 2 * Math.PI - Math.PI / 2;
      const x = center + labelRadius * Math.cos(angle);
      const y = center + labelRadius * Math.sin(angle) + 3;

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', y);
      text.setAttribute('font-size', '9');
      text.textContent = this.items[i];
      group.appendChild(text);
    }

    svg.appendChild(group);
  },

  /**
   * スコア数値を描画
   */
  drawScores(svg, center, innerRadius, outerRadius, scores, health) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('id', 'scores');
    group.setAttribute('text-anchor', 'middle');
    group.setAttribute('fill', '#999999');

    const scoreRadius = (innerRadius + outerRadius) / 2;

    // 8項目のスコア
    for (let i = 0; i < 8; i++) {
      const angle = ((i + 0.5) / 8) * 2 * Math.PI - Math.PI / 2;
      const x = center + scoreRadius * Math.cos(angle);
      const y = center + scoreRadius * Math.sin(angle) + 13;

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', y);
      text.setAttribute('font-size', '8');
      text.setAttribute('fill', '#AAAAAA');
      text.textContent = scores[i] || '0';
      group.appendChild(text);
    }

    // 健康のスコア（中央）
    const healthText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    healthText.setAttribute('x', center);
    healthText.setAttribute('y', center + 24);
    healthText.setAttribute('font-size', '10');
    healthText.setAttribute('fill', '#AAAAAA');
    healthText.textContent = health || '0';
    group.appendChild(healthText);

    svg.appendChild(group);
  }
};
