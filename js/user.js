import { sendQuery } from './api.js' 


export async function fetchUser() {
  const data = await sendQuery(`{
    user {
      login firstName lastName email campus auditRatio totalUp totalDown
    }
  }`)
  return data.user[0]
}

export function createPersonalInfoSection(user) {
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
  return section;
}

export function createAuditRatioSection(user) {
  const section = document.createElement('div')
  section.id = 'audits-section'

  const heading = document.createElement('h2')
  heading.textContent = 'Audit Ratio'

  const ratioEl = document.createElement('p')
  const ratioLabel = document.createElement('span')
  ratioLabel.textContent = 'Ratio'
  const ratioValue = document.createElement('span')
  ratioValue.textContent = user.auditRatio

  const upEl = document.createElement('p')
  const upLabel = document.createElement('span')
  upLabel.textContent = 'Given'
  const upValue = document.createElement('span')
  upValue.textContent = `${Math.round(user.totalUp / 1000)} kB`

  const downEl = document.createElement('p')
  const downLabel = document.createElement('span')
  downLabel.textContent = 'Received'
  const downValue = document.createElement('span')
  downValue.textContent = `${Math.round(user.totalDown / 1000)} kB`

  ratioEl.append(ratioLabel, ratioValue)
  upEl.append(upLabel, upValue)
  downEl.append(downLabel, downValue)

  section.append(heading, ratioEl, upEl, downEl)
  return section;
}

export async function loadUserSections() {
  const user = await fetchUser();
  renderPersonalInfo(user);
  renderAuditRatio(user)
}