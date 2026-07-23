import { fetchUser } from './api/api.user.js';
import { fetchLevel } from './api/api.transaction.js';
import { createLoginForm } from './components/login_form.js';
import { clearJWT } from './auth.js';
import { createTopBar } from './components/topbar.js';
import { createPersonalInfoSection } from'./components/personal_info_section.js';
import { createAuditRatioSection } from './components/audits_section.js';
import { createLevelSection } from './components/level_section.js';

export async function enterProfile() {
    const user = await fetchUser();
    const level = await fetchLevel();
    renderProfileDashboard(user, level);
}

function renderProfileDashboard(user, level) {
    document.body.innerHTML = '';

    document.body.append(
        createTopBar(user),
        createPersonalInfoSection(user),
        createAuditRatioSection(user),
        createLevelSection(level)
    );
}

export function logout() {
    clearJWT();
    document.body.innerHTML = '';
    document.body.append(createLoginForm());
}
