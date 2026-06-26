import { resetLoginForm, logout } from './auth.js'
import { loadUserSections } from './user.js'
import { loadLevel } from './transaction.js'

function renderHeader() {
  const header = document.createElement('header')
  header.id = 'profile-header'

  const logoutBtn = document.createElement('button')
  logoutBtn.textContent = 'Log out'
  logoutBtn.id = 'logout-btn'
  logoutBtn.addEventListener('click', logout)

  header.appendChild(logoutBtn)
  document.getElementById('profile-view').appendChild(header)
}

function renderContent() {
  const content = document.createElement('div')
  content.id = 'profile-content'
  document.getElementById('profile-view').appendChild(content)
}

export function showProfileView() {
  document.getElementById('login-view').style.display = 'none'
  document.getElementById('profile-view').style.display = 'block'
  resetLoginForm()
}

export function showLoginView() {
  document.getElementById('profile-view').style.display = 'none'
  document.getElementById('login-view').style.display = 'flex'
}

export async function renderProfileView() {
  renderHeader()
  renderContent()
  await loadUserSections()
  await loadLevel()
  showProfileView()
}