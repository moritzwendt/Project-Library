function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('de-DE', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const time = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('datetime').textContent = `${date} — ${time}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        alert(`Hier öffnet sich später Projekt ${index + 1}`);
    });
});