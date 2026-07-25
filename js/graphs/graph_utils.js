export const svgNS = 'http://www.w3.org/2000/svg';

export function generateAllMonths(transactions) {
    const first = new Date(transactions[0].createdAt);
    const last = new Date(transactions[transactions.length - 1].createdAt);

    const months = [];
    const cursor = new Date(first.getFullYear(), first.getMonth(), 1);
    const end = new Date(last.getFullYear(), last.getMonth(), 1);

    while (cursor <= end) {
        const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}`;
        months.push(key);
        cursor.setMonth(cursor.getMonth() + 1);
    }

    return months;
}

export function makeChartLayout(monthCount, W, H, padL, padR, padT, padB) {
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;
    const slotW = chartW / monthCount;
    const toX = i => padL + slotW / 2 + i * slotW;
    return { chartW, chartH, slotW, toX };
}

export function renderAxes(svg, padL, padR, padT, padB, W, H) {
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
}

export function renderXLabels(svg, months, toX, yBaseline) {
    months.forEach((key, i) => {
        const label = document.createElementNS(svgNS, 'text');
        label.setAttribute('x', toX(i));
        label.setAttribute('y', yBaseline);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('class', 'chart-label');
        label.textContent = key.slice(2).replace('-', '/');
        svg.appendChild(label);
    });
}