import { logout } from './auth.js'
import { fetchUser } from './user.js'

export async function enterProfile() {
  const user = await fetchUser();
  renderProfileDashboard(user);
}

function renderProfileDashboard(user) {
  const content = document.querySelector('#content')
  content.innerHTML = ''
  renderTopBar();

  const welcomeSection = document.createElement('div')
  welcomeSection.id = 'welcome-section'
  const welcome = document.createElement('h2')
  welcome.textContent = `Welcome ${user.login}`
  welcomeSection.append(welcome)

  const auditsSection = document.createElement('div')
  auditsSection.id = 'audit-section'

  const progressSection = document.createElement('div')
  progressSection.id = 'progress-section'

  content.append(welcomeSection, auditsSection, progressSection)
}

function renderTopBar() {
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