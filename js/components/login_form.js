import { createErrorAlert } from "./error_alert.js";
import { requestJWT, saveJWT } from "../auth.js";
import { enterProfile } from "../views.js";

export function createLoginForm() {
    const container = document.createElement('div');
    container.id = 'login-container';

    const form = document.createElement('form');
    form.id = 'login-form';

    const identifierInput = document.createElement('input');
    identifierInput.type = 'text';
    identifierInput.id = 'identifier';
    identifierInput.placeholder = 'Username or Email';
    identifierInput.required = true;

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.required = true;

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Log in';

    const errorMsg = document.createElement('p');
    errorMsg.id = 'login-error';

    form.append(identifierInput, passwordInput, submitBtn, errorMsg);
    container.append(form);
    form.addEventListener('submit', handleLoginSubmit);
    return container;
}

async function handleLoginSubmit(event) {
    event.preventDefault();
    const identifier = document.getElementById('identifier').value;
    const password = document.getElementById('password').value;
    try {
        const token = await requestJWT(identifier, password);
        saveJWT(token);
        await enterProfile();
    } catch (err) {
        document.body.prepend(createErrorAlert(err.message));
    }
}
