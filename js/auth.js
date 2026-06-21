export function renderLoginForm() {
  const loginView = document.getElementById('login-view');

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
  loginView.appendChild(form);
}
