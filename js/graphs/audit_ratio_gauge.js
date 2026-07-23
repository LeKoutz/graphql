const svgNS = 'http://www.w3.org/2000/svg';

function ratioToPoint(ratio, maxRatio, cx, cy, r) {
    const angle = 180 - (ratio / maxRatio) * 180;
    const rad = angle * (Math.PI / 180);
    return {
        x: cx + r * Math.cos(rad),
        y: cy - r * Math.sin(rad)
    };
}

function getRatioClass(ratio) {
    if (ratio >= 1.3) return 'gauge-value--green';
    if (ratio >= 0.9) return 'gauge-value--orange';
    return 'gauge-value--red';
}

export function createAuditRatioGauge(user) {
    const cx = 200, cy = 160, r = 120;
    const displayRatio = Math.round(user.auditRatio * 10) / 10;
    const clampedRatio = Math.min(2, Math.max(0.5, user.auditRatio));

    const container = document.createElement('div');
    container.id = 'audit-gauge';

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 400 200');
    svg.setAttribute('width', '100%');

    const ratioClass = getRatioClass(displayRatio);

    const bgArc = document.createElementNS(svgNS, 'path');
    bgArc.setAttribute('d', `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`);
    bgArc.setAttribute('class', 'gauge-bg');

    const point = ratioToPoint(clampedRatio, 2, cx, cy, r);
    const fgArc = document.createElementNS(svgNS, 'path');
    fgArc.setAttribute('d', `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${point.x} ${point.y}`);
    fgArc.setAttribute('class', `gauge-fill ${ratioClass}`);

    const valueText = document.createElementNS(svgNS, 'text');
    valueText.setAttribute('x', cx);
    valueText.setAttribute('y', cy - 20);
    valueText.setAttribute('text-anchor', 'middle');
    valueText.setAttribute('class', `gauge-value ${ratioClass}`);
    valueText.textContent = displayRatio;

    svg.append(bgArc, fgArc, valueText);
    container.appendChild(svg);
    return container;
}