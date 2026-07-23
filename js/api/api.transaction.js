import { sendQuery } from './api.js';

export async function fetchLevel() {
    const data = await sendQuery(`{
        transaction(
        where: { type: { _eq: "level" } }
        order_by: { createdAt: desc }
        limit: 1
        ) { amount }
    }`);
    return data.transaction[0];
}