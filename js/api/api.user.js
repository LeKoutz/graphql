import { sendQuery } from './api.js';

export async function fetchUser() {
    const data = await sendQuery(`{
    user {
      login firstName lastName email campus auditRatio totalUp totalDown
    }
  }`);
    return data.user[0];
}
