import { logout } from '../views.js';

export function createTopBar(user) {
    const topBar = document.createElement('nav');
    topBar.id = 'topBar';

    const welcome = document.createElement('h2');
    welcome.textContent = `Welcome, ${user.login}`;

    const platform = document.createElement('a');
    platform.id = 'platform-button';
    platform.classList.add('topBar-btn');
    platform.href = `https://platform.zone01.gr/intra/`;
    platform.target = '_blank';
    platform.textContent = 'Zone01';

    const gitea = document.createElement('a');
    gitea.id = 'gitea-button';
    gitea.classList.add('topBar-btn');
    gitea.href = `https://platform.zone01.gr/git/${user.login}`;
    gitea.target = '_blank';
    gitea.textContent = 'Gitea';

    const logoutBtn = document.createElement('button');
    logoutBtn.classList.add('topBar-btn');
    logoutBtn.textContent = 'Log out';
    logoutBtn.addEventListener('click', logout);

    topBar.append(welcome, platform, gitea, logoutBtn);
    return topBar;
}
