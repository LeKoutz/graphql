import { svgNS, generateAllMonths, makeChartLayout, renderAxes, renderXLabels } from './graph_utils.js';

function mergeWithLevelData(allMonths, transactions) {
    const levelByMonth = {};
    transactions.forEach(tx => {
        const date = new Date(tx.createdAt);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!levelByMonth[key] || tx.amount > levelByMonth[key]) {
            levelByMonth[key] = tx.amount;
        }
    });

    let lastLevel = 0;
    return allMonths.map(key => {
        const hasLevelUp = levelByMonth[key] !== undefined;
        if (hasLevelUp) lastLevel = levelByMonth[key];
        return { key, lastLevel, hasLevelUp };
    });
}

function buildStepPath(points) {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        d += ` L ${points[i].x} ${points[i - 1].y}`;
        d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
}

export function createLevelStepChart(transactions) {
    const allMonths = generateAllMonths(transactions);
    const months = mergeWithLevelData(allMonths, transactions);
    const maxLevel = Math.max(...months.map(m => m.lastLevel));

    const W = 800, H = 400;
    const padL = 60, padR = 40, padT = 40, padB = 60;
    const { chartH, toX } = makeChartLayout(allMonths.length, W, H, padL, padR, padT, padB);

    const toY = level => H - padB - (level / maxLevel * chartH);

    const points = [
        { x: padL, y: toY(0), hasLevelUp: false, lastLevel: 0 },
        ...months.map((m, i) => ({
            x: toX(i),
            y: toY(m.lastLevel),
            hasLevelUp: m.hasLevelUp,
            lastLevel: m.lastLevel,
            month: m.key
        }))
    ];

    const container = document.createElement('div');
    container.id = 'level-step-chart';

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', '100%');

    renderAxes(svg, padL, padR, padT, padB, W, H);

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', buildStepPath(points));
    path.setAttribute('class', 'step-path');
    svg.appendChild(path);

    months.forEach((m, i) => {
        const p = points[i + 1];

        if (m.hasLevelUp) {
            const circle = document.createElementNS(svgNS, 'circle');
            circle.setAttribute('cx', p.x);
            circle.setAttribute('cy', p.y);
            circle.setAttribute('r', 4);
            circle.setAttribute('class', 'step-dot');
            svg.appendChild(circle);

            const levelLabel = document.createElementNS(svgNS, 'text');
            levelLabel.setAttribute('x', p.x);
            levelLabel.setAttribute('y', p.y - 10);
            levelLabel.setAttribute('text-anchor', 'middle');
            levelLabel.setAttribute('class', 'chart-label');
            levelLabel.textContent = m.lastLevel;
            svg.appendChild(levelLabel);
        }
    });

    renderXLabels(svg, allMonths, toX, H - padB + 20);

    for (let lvl = 0; lvl <= maxLevel; lvl += 5) {
        const yLabel = document.createElementNS(svgNS, 'text');
        yLabel.setAttribute('x', padL - 10);
        yLabel.setAttribute('y', toY(lvl) + 4);
        yLabel.setAttribute('text-anchor', 'end');
        yLabel.setAttribute('class', 'chart-label');
        yLabel.textContent = lvl;
        svg.appendChild(yLabel);
    }

    container.appendChild(svg);
    return container;
}