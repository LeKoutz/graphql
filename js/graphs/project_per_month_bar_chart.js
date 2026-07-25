import { svgNS, generateAllMonths, makeChartLayout, renderAxes, renderXLabels } from './graph_utils.js';

function groupByMonth(allMonths, transactions) {
    const dataByMonth = {};

    transactions.forEach(tx => {
        const date = new Date(tx.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const dayKey = tx.createdAt.slice(0, 10);
        const isCheckpoint = tx.path.includes('/checkpoint/');
        const name = tx.path.split('/').pop();

        if (!dataByMonth[monthKey]) {
            dataByMonth[monthKey] = { events: [], checkpointDays: {} };
        }

        if (isCheckpoint) {
            if (!dataByMonth[monthKey].checkpointDays[dayKey]) {
                dataByMonth[monthKey].checkpointDays[dayKey] = [];
                dataByMonth[monthKey].events.push({
                    type: 'checkpoint',
                    day: dayKey,
                    items: dataByMonth[monthKey].checkpointDays[dayKey]
                });
            }
            dataByMonth[monthKey].checkpointDays[dayKey].push(name);
        } else {
            dataByMonth[monthKey].events.push({ type: 'project', name, amount: tx.amount });
        }
    });

    return allMonths.map(key => ({
        key,
        count: dataByMonth[key] ? dataByMonth[key].events.length : 0,
        events: dataByMonth[key] ? dataByMonth[key].events : []
    }));
}

export function createProjectCountBarChart(transactions) {
    const allMonths = generateAllMonths(transactions);
    const months = groupByMonth(allMonths, transactions);
    const maxCount = Math.max(...months.map(m => m.count));

    const W = 800, H = 400;
    const padL = 60, padR = 40, padT = 40, padB = 60;
    const { chartH, slotW, toX } = makeChartLayout(allMonths.length, W, H, padL, padR, padT, padB);

    const toY = count => H - padB - (count / maxCount * chartH);
    const toBarH = count => count / maxCount * chartH;
    const barW = slotW * 0.6;

    const container = document.createElement('div');
    container.id = 'xp-bar-chart';

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', '100%');

    renderAxes(svg, padL, padR, padT, padB, W, H);

    for (let i = 0; i <= maxCount; i++) {
        const yLabel = document.createElementNS(svgNS, 'text');
        yLabel.setAttribute('x', padL - 10);
        yLabel.setAttribute('y', toY(i) + 4);
        yLabel.setAttribute('text-anchor', 'end');
        yLabel.setAttribute('class', 'chart-label');
        yLabel.textContent = i;
        svg.appendChild(yLabel);
    }

    months.forEach((m, i) => {
        if (m.count === 0) return;

        const cx = toX(i);
        const barHeight = toBarH(m.count);
        const barX = cx - barW / 2;
        const barY = toY(m.count);

        const title = document.createElementNS(svgNS, 'title');
        title.textContent = m.events
            .map(e => e.type === 'checkpoint'
                ? `checkpoint: ${e.items.join(', ')}`
                : `${e.name} — ${e.amount} XP`)
            .join('\n');

        const bar = document.createElementNS(svgNS, 'rect');
        bar.setAttribute('x', barX);
        bar.setAttribute('y', barY);
        bar.setAttribute('width', barW);
        bar.setAttribute('height', barHeight);
        bar.setAttribute('class', 'chart-bar');
        bar.appendChild(title);
        svg.appendChild(bar);

        const countLabel = document.createElementNS(svgNS, 'text');
        countLabel.setAttribute('x', cx);
        countLabel.setAttribute('y', barY - 6);
        countLabel.setAttribute('text-anchor', 'middle');
        countLabel.setAttribute('class', 'chart-label');
        countLabel.textContent = m.count;
        svg.appendChild(countLabel);
    });

    renderXLabels(svg, allMonths, toX, H - padB + 20);

    container.appendChild(svg);
    return container;
}