import { renderLoginForm, loginHandler } from './auth.js'
import { sendQuery } from './api.js'

renderLoginForm()
loginHandler()
sendQuery('{ result { grade user { login } } }').then(data => console.log(data))