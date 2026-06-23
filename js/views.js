import { resetLoginForm, logout } from './auth.js'
import { loadPersonalInfo } from './profile.js'

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

export function showProfileView() {
  document.getElementById('login-view').style.display = 'none'
  document.getElementById('profile-view').style.display = 'block'
  resetLoginForm()
}

export function showLoginView() {
  document.getElementById('profile-view').style.display = 'none'
  document.getElementById('login-view').style.display = 'block'
}

export async function renderProfileView() {
  renderHeader()
  await loadPersonalInfo()
  showProfileView()
}