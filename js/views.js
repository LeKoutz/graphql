import { fetchUser } from './api/api.user.js';
import { createLoginForm } from './components/login_form.js';
import { clearJWT } from './auth.js';
import { createTopBar } from './components/topbar.js';
import { createPersonalInfoSection } from'./components/personal_info_section.js';
import { createAuditRatioSection } from './components/audits_section.js';

export async function enterProfile() {
    const user = await fetchUser();
    renderProfileDashboard(user);
}

function renderProfileDashboard(user) {
    document.body.innerHTML = '';

    document.body.append(
        createTopBar(user),
        createPersonalInfoSection(user),
        createAuditRatioSection(user),
    );
    /*
  const infoSection = document.createElement('div')
  infoSection.id = 'personal-info-section'
  renderPersonalInfo(user);

  const auditsSection = document.createElement('div')
  auditsSection.id = 'audit-section'

  const progressSection = document.createElement('div')
  progressSection.id = 'progress-section'

  content.append(welcomeSection, infoSection, auditsSection, progressSection)
  */
}

export function logout() {
    clearJWT();
    document.body.innerHTML = '';
    document.body.append(createLoginForm());
}
