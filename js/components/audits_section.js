export function createAuditRatioSection(user) {
    const section = document.createElement('div');
    section.id = 'audits-section';
    section.classList.add('section');

    const heading = document.createElement('h2');
    heading.textContent = 'Audit Ratio';

    const upEl = document.createElement('p');
    const upLabel = document.createElement('span');
    upLabel.textContent = 'Given';
    const upValue = document.createElement('span');
    upValue.textContent = `${Math.round(user.totalUp / 1000)} kB`;

    const downEl = document.createElement('p');
    const downLabel = document.createElement('span');
    downLabel.textContent = 'Received';
    const downValue = document.createElement('span');
    downValue.textContent = `${Math.round(user.totalDown / 1000)} kB`;

    upEl.append(upLabel, upValue);
    downEl.append(downLabel, downValue);

    section.append(heading, upEl, downEl);
    return section;
}
