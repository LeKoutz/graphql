import { getJWT } from "./auth.js";

const GRAPHQL_ENDPOINT = 'https://platform.zone01.gr/api/graphql-engine/v1/graphql'

async function sendQuery(query) {
  const token = getJWT()

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ query })
  })

  const result = await response.json()
  return result.data
}
