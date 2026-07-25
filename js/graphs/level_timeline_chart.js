import { svgNS } from './graph_utils.js';

const MAX_LEVEL = 60;

export function createLevelTimelineChart(transactions) {
    const currentLevel = transactions[transactions.length - 1].amount;
    const clampedLevel = Math.min(currentLevel, MAX_LEVEL);

    const W = 800, H = 80;
    const padL = 60, padR = 60;
    const chartW = W - padL - padR;
    const cy = H / 2;

    const toX = level => padL + (level / MAX_LEVEL) * chartW;

    const container = document.createElement('div');
    container.id = 'level-timeline-chart';

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', '100%');

    const bgLine = document.createElementNS(svgNS, 'line');
    bgLine.setAttribute('x1', padL);
    bgLine.setAttribute('y1', cy);
    bgLine.setAttribute('x2', W - padR);
    bgLine.setAttribute('y2', cy);
    bgLine.setAttribute('class', 'timeline-track');
    svg.appendChild(bgLine);

    const fillLine = document.createElementNS(svgNS, 'line');
    fillLine.setAttribute('x1', padL);
    fillLine.setAttribute('y1', cy);
    fillLine.setAttribute('x2', toX(clampedLevel));
    fillLine.setAttribute('y2', cy);
    fillLine.setAttribute('class', 'timeline-fill');
    svg.appendChild(fillLine);

    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('cx', toX(clampedLevel));
    dot.setAttribute('cy', cy);
    dot.setAttribute('r', 6);
    dot.setAttribute('class', 'timeline-dot');
    svg.appendChild(dot);

    const levelLabel = document.createElementNS(svgNS, 'text');
    levelLabel.setAttribute('x', toX(currentLevel));
    levelLabel.setAttribute('y', cy - 14);
    levelLabel.setAttribute('text-anchor', 'middle');
    levelLabel.setAttribute('class', 'timeline-value');
    levelLabel.textContent = currentLevel;
    svg.appendChild(levelLabel);

    const labelZero = document.createElementNS(svgNS, 'text');
    labelZero.setAttribute('x', padL);
    labelZero.setAttribute('y', cy + 18);
    labelZero.setAttribute('text-anchor', 'middle');
    labelZero.setAttribute('class', 'chart-label');
    labelZero.textContent = '0';
    svg.appendChild(labelZero);

    const labelMax = document.createElementNS(svgNS, 'text');
    labelMax.setAttribute('x', W - padR);
    labelMax.setAttribute('y', cy + 18);
    labelMax.setAttribute('text-anchor', 'middle');
    labelMax.setAttribute('class', 'chart-label');
    labelMax.textContent = currentLevel >= MAX_LEVEL ? '' : MAX_LEVEL;
    svg.appendChild(labelMax);

    container.appendChild(svg);
    return container;
}