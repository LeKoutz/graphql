export function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-GB', {
        month: 'short',
        year: 'numeric'
    });
}