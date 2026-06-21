import { renderLoginForm, loginHandler } from './auth.js'
import { sendQuery } from './api.js'

renderLoginForm()
loginHandler()
sendQuery(`{
  transaction(where: { type: { _eq: "xp" } }) {
    amount
    createdAt
    path
  }
}`).then(data => console.log(data))