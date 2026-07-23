function createLevelSection(transaction) {
    const section = document.createElement('div');
    section.id = 'level-section';

    const level = document.createElement('p')
    level.textContent = `Level: ${transaction.amount}`

    section.append(level);
    return section;
}
