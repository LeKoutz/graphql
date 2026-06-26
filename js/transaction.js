import { sendQuery } from './api.js' 

async function fetchLevel() {
    const data = await sendQuery(`{
        transaction(
        where: { type: { _eq: "level" } }
        order_by: { createdAt: desc }
        limit: 1
        ) { amount }
    }`)
    return data.transaction[0]
}

function renderLevel(transaction) {
    const content = document.getElementById('profile-content');

    const section = document.createElement('div');
    section.id = 'level-section';

    const level = document.createElement('p')
    level.textContent = `Level: ${transaction.amount}`

    section.append(level);
    content.appendChild(section);
}

export async function loadLevel() {
    const level = await fetchLevel()
    renderLevel(level)
}