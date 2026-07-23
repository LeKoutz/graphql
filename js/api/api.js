import { getJWT } from "../auth.js";

const GRAPHQL_ENDPOINT = 'https://platform.zone01.gr/api/graphql-engine/v1/graphql';

export async function sendQuery(query) {
    const token = getJWT();

    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ query })
    });

    const result = await response.json();
    if (result.errors) throw new Error(result.errors[0].message);
    return result.data;
}
