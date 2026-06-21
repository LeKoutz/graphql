import { renderLoginForm, loginHandler } from './auth.js'
import { sendQuery } from './api.js'

renderLoginForm()
loginHandler()
sendQuery('{ user { id } }').then(data => console.log(data))