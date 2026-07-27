import { fetchUser } from './api/api.user.js';
import { fetchLevelHistory, fetchXPHistory  } from './api/api.transaction.js';
import { createLoginForm } from './components/login_form.js';
import { clearJWT } from './auth.js';
import { createTopBar } from './components/topbar.js';
import { createPersonalInfoSection } from'./components/personal_info_section.js';
import { createAuditRatioSection } from './components/audits_section.js';
import { createProgressSection } from './components/progress_section.js';
import { createMilestonesSection, createPiscineCards } from './components/milestones_section.js';
import { createErrorAlert } from './components/error_alert.js';
import { createAuditRatioGauge } from './graphs/audit_ratio_gauge.js';
import { createLevelStepChart } from './graphs/progress_step_chart.js';
import { createProjectCountBarChart } from './graphs/project_per_month_bar_chart.js';
import { createLevelTimelineChart } from './graphs/level_timeline_chart.js';
import { fetchPiscineData } from './api/api.event.js';

export async function enterProfile() {
    try {
        const user = await fetchUser();
        const levelHistory = await fetchLevelHistory();
        const xpHistory = await fetchXPHistory();
        const piscineData = await fetchPiscineData();
        renderProfileDashboard(user, levelHistory, xpHistory, piscineData);
    } catch (err) {
        document.body.prepend(createErrorAlert(err.message));
    }
}

function renderProfileDashboard(user, levelHistory, xpHistory, piscineData) {
    document.body.innerHTML = '';

    const grid = document.createElement('div');
    grid.id = 'dashboard-grid';
    grid.append(
        createPersonalInfoSection(user),
        createAuditRatioSection(user),
        createProgressSection(),
        createMilestonesSection()
    );

    document.body.append(
        createTopBar(user),
        grid
    );

    document.querySelector('#audits-section').append(
        createAuditRatioGauge(user)
    );

    document.querySelector('#progress-section').append(
        createLevelTimelineChart(levelHistory),
        createLevelStepChart(levelHistory),
        createProjectCountBarChart(xpHistory)
    );

    document.querySelector('#milestones-section').append(
        createPiscineCards(piscineData)
    );
}

export function logout() {
    clearJWT();
    document.body.innerHTML = '';
    document.body.append(createLoginForm());
}
