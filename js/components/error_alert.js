export function createErrorAlert(message) {
    const existing = document.querySelector('.error-alert');
    if (existing) {
        setTimeout(() => existing.remove(), 500);
    }

    const alert = document.createElement('div');
    alert.className = 'error-alert';

    const text = document.createElement('p');
    text.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.className = 'error-alert-close';
    closeBtn.addEventListener('click', () => alert.remove());

    alert.append(text, closeBtn);
    return alert;
}