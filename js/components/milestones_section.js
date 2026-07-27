import { formatDate } from "../utils.js";

function getPiscineStatus(piscine) {
    const timeNow = new Date();
    const startAt = new Date(piscine.startAt);
    const endAt = new Date(piscine.endAt);

    if (startAt > timeNow) return 'Starting soon';
    if (startAt < timeNow && endAt > timeNow) return 'In Progress';
    if (endAt < timeNow) {
        if (piscine.progresses[0].grade === null) return 'Awaiting selection';
        return piscine.progresses[0].grade >= 1 ? 'Succeeded' : 'Failed';
    }
}

export function createPiscineCards(events) {
    const cards = document.createElement('div');
    cards.id = 'piscine-cards';

    events.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('piscine-card');

        const name = document.createElement('h3');
        name.textContent = event.object.name;

        const status = getPiscineStatus(event);
        const statusEl = document.createElement('p');
        statusEl.dataset.style = "divider"
        statusEl.dataset.status = `piscine-status--${status.toLowerCase().replace(' ', '-')}`;
        statusEl.textContent = status;

        const detailEl = document.createElement('div');
        detailEl.classList.add('piscine-card-details')
        detailEl.dataset.style = "divider"

        const start = document.createElement('div');
        const startHeading = document.createElement('h4');
        startHeading.textContent = 'Start';
        const dateStart = document.createElement('p');
        dateStart.textContent = formatDate(event.startAt);
        start.append(startHeading, dateStart);

        const end = document.createElement('div');
        const endHeading = document.createElement('h4');
        endHeading.textContent = 'End';
        const dateEnd = document.createElement('p');
        dateEnd.textContent = formatDate(event.endAt);
        end.append(endHeading, dateEnd);

        detailEl.append(start, end);
        card.append(name, statusEl, detailEl);
        cards.append(card);
    });
    return cards;
}

export function createMilestonesSection() {
    const section = document.createElement('div');
    section.id = 'milestones-section';
    section.classList.add('section');

    const heading = document.createElement('h2');
    heading.textContent = 'Milestones';

    section.append(heading);
    return section;
}