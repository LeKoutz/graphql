// api/api.event.js
import { sendQuery } from './api.js';

export async function fetchPiscineData() {
    const data = await sendQuery(`{
        event(
            where: {
                campus: {_eq: "athens"}, 
                object: {type: {_eq: "piscine"}}, 
                progresses: {id: {}}
            }
            order_by: {startAt: asc}
        ) {
            path
            startAt
            endAt
            object {
                name
            }
            progresses {
                isDone
                grade
            }
        }
    }`);

    return data.event;
}