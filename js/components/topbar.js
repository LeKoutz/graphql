import { logout } from '../views.js'

export function createTopBar(user) {
    const topBar = document.createElement('nav')
    topBar.id = 'topBar'

    const welcome = document.createElement('h2')
    welcome.textContent = `Welcome, ${user.login}`

    /*const info = document.createElement('button')
    info.classList.add('topBar-btn')
    info.textContent = 'Info'

    const audits = document.createElement('button')
    audits.classList.add('topBar-btn')
    audits.textContent = 'Audits'

    const progress = document.createElement('button')
    progress.classList.add('topBar-btn')
    progress.textContent = 'Progress'*/

    const logoutBtn = document.createElement('button')
    logoutBtn.classList.add('topBar-btn')
    logoutBtn.textContent = 'Log out'
    logoutBtn.addEventListener('click', logout)

    topBar.append(welcome, logoutBtn)
    return topBar;
}
