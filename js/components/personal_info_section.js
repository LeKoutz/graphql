export function createPersonalInfoSection(user) {
    const section = document.createElement('div');
    section.id = 'personal-info-section';
    section.classList.add('section');

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
