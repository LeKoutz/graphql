import { logout } from './auth.js'
import { fetchUser } from './user.js'

export async function renderProfileDashboard() {
  const content = document.querySelector('#content')
  content.innerHTML = ''
  const user = await fetchUser();
  renderTopBar();

  const welcome = document.createElement('h2')
  welcome.id = 'welcome'
  welcome.textContent = `Welcome ${user.login}`

  const auditSection = document.createElement('div')
  auditSection.id = 'audit-section'

  content.append(welcome)
}

function renderTopBar(user) {
  const info = document.createElement('button')
  info.classList.add('topBar-btn')
  info.textContent = 'Info'

  const audits = document.createElement('button')
  audits.classList.add('topBar-btn')
  audits.textContent = 'Audits'

  const progress = document.createElement('button')
  progress.classList.add('topBar-btn')
  progress.textContent = 'Progress'

  const logoutBtn = document.createElement('button')
  logoutBtn.classList.add('topBar-btn')
  logoutBtn.textContent = 'Log out'
  logoutBtn.addEventListener('click', logout)

  document.querySelector('#topBar').append(info, audits, progress, logoutBtn)
}