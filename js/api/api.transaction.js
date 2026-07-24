import { sendQuery } from './api.js';

export async function fetchLevelHistory() {
    const data = await sendQuery(`{
        transaction(
            where: {
                type: { _eq: "level" }
                path: { _like: "%/div-01/%" }
                _not: { path: { _like: "%/piscine-%/%" } }
            }
            order_by: { createdAt: asc }
        ) {
            amount
            createdAt
        }
    }`);
    return data.transaction;
}
