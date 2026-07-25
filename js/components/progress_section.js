export function createProgressSection() {
    const section = document.createElement('div');
    section.id = 'progress-section';
    section.classList.add('section');

    const heading = document.createElement('h2');
    heading.textContent = 'Progress';

    section.append(heading);
    return section;
}
