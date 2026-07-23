export function createLevelSection(transaction) {
    const section = document.createElement('div');
    section.id = 'level-section';
    section.classList.add('section');

    const level = document.createElement('p');
    level.textContent = `Level: ${transaction.amount}`;

    section.append(level);
    return section;
}
