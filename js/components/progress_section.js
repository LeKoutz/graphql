export function createProgressSection(transaction) {
    const section = document.createElement('div');
    section.id = 'progress-section';
    section.classList.add('section');

    const heading = document.createElement('h2');
    heading.textContent = 'Progress';

    const level = document.createElement('p');
    const currentLevel = transaction[transaction.length - 1].amount;
    level.textContent = `Level: ${currentLevel}`;

    section.append(heading, level);
    return section;
}
