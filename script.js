function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const time = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  document.getElementById('datetime').textContent = `${time}  ${date}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

// Mobile: Overlay ein-/ausblenden mit Button
document.querySelectorAll('.project-card').forEach((card) => {
  const btn = card.querySelector('.mobile-info-btn');
  const overlay = card.querySelector('.overlay');
  const img = card.querySelector('img');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = btn.classList.toggle('active');

    if (isActive) {
      btn.textContent = 'Schließen';
      overlay.style.opacity = '1';
      img.style.filter = 'blur(4px)';
    } else {
      btn.textContent = 'Mehr erfahren';
      overlay.style.opacity = '0';
      img.style.filter = 'blur(0)';
    }
  });
});