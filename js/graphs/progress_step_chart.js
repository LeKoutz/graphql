const svgNS = 'http://www.w3.org/2000/svg';

function generateAllMonths(transactions) {
    const first = new Date(transactions[0].createdAt);
    const last = new Date(transactions[transactions.length - 1].createdAt);

    const months = [];
    const cursor = new Date(first.getFullYear(), first.getMonth(), 1);
    const end = new Date(last.getFullYear(), last.getMonth(), 1);

    while (cursor <= end) {
        const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}`;
        months.push({ key, lastLevel: null });
        cursor.setMonth(cursor.getMonth() + 1);
    }

    return months;
}

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
    return allMonths.map(m => {
        const hasLevelUp = levelByMonth[m.key] !== undefined;
        if (hasLevelUp) lastLevel = levelByMonth[m.key];
        return { key: m.key, lastLevel, hasLevelUp: hasLevelUp };
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
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;

    const toX = i => padL + i * (chartW / (months.length - 1));
    const toY = level => H - padB - (level / maxLevel * chartH);

    const points = months.map((m, i) => ({
        x: toX(i),
        y: toY(m.lastLevel),
        month: m.key,
        lastLevel: m.lastLevel,
        hasLevelUp: m.hasLevelUp
    }));

    const container = document.createElement('div');
    container.id = 'level-step-chart';

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', '100%');

    // axes
    const yAxis = document.createElementNS(svgNS, 'line');
    yAxis.setAttribute('x1', padL); yAxis.setAttribute('y1', padT);
    yAxis.setAttribute('x2', padL); yAxis.setAttribute('y2', H - padB);
    yAxis.setAttribute('class', 'chart-axis');
    svg.appendChild(yAxis);

    const xAxis = document.createElementNS(svgNS, 'line');
    xAxis.setAttribute('x1', padL);     xAxis.setAttribute('y1', H - padB);
    xAxis.setAttribute('x2', W - padR); xAxis.setAttribute('y2', H - padB);
    xAxis.setAttribute('class', 'chart-axis');
    svg.appendChild(xAxis);

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', buildStepPath(points));
    path.setAttribute('class', 'step-path');
    svg.appendChild(path);

    points.forEach(p => {
        if (p.hasLevelUp) {
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
            levelLabel.textContent = p.lastLevel;
            svg.appendChild(levelLabel);
        }

        const xLabel = document.createElementNS(svgNS, 'text');
        xLabel.setAttribute('x', p.x);
        xLabel.setAttribute('y', H - padB + 20);
        xLabel.setAttribute('text-anchor', 'middle');
        xLabel.setAttribute('class', 'chart-label');
        xLabel.textContent = p.month.slice(2).replace('-', '/');
        svg.appendChild(xLabel);
    });

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