import { sendQuery } from './api.js' 

async function fetchPersonalInfo() {
  const data = await sendQuery('{ user { login firstName lastName email campus } }');
  return data.user[0];
}

function renderPersonalInfo(user) {
  const profileView = document.getElementById('profile-view');

  const section = document.createElement('div');
  section.id = 'personal-info-section';

  const heading = document.createElement('h2');
  heading.textContent = 'Personal Info';

  const loginEl = document.createElement('p');
  loginEl.textContent = `Login: ${user.login}`;

  const nameEl = document.createElement('p');
  nameEl.textContent = `Name: ${user.firstName} ${user.lastName}`;

  const emailEl = document.createElement('p');
  emailEl.textContent = `Email: ${user.email}`;

  const campusEl = document.createElement('p');
  campusEl.textContent = `Campus: ${user.campus}`;

  section.append(heading, loginEl, nameEl, emailEl, campusEl);
  profileView.appendChild(section);
}

export async function loadPersonalInfo() {
  const user = await fetchPersonalInfo();
  renderPersonalInfo(user);
}