export function createProgressSection(transaction) {
    const section = document.createElement('div');
    section.id = 'level-section';
    section.classList.add('section');

    const heading = document.createElement('h2');
    heading.textContent = 'Progress';

    const level = document.createElement('p');
    level.textContent = `Level: ${transaction.amount}`;

    section.append(heading, level);
    return section;
}
