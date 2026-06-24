/* ── FALLING GOLD PARTICLES ── */
const container = document.getElementById('particles');
for (let i = 0; i < 28; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  const size = Math.random() * 5 + 3;
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    width: ${size}px;
    height: ${size}px;
    animation-duration: ${Math.random() * 12 + 10}s;
    animation-delay: ${Math.random() * 15}s;
    opacity: ${Math.random() * 0.5 + 0.2};
    border-radius: ${Math.random() > 0.5 ? '50% 0 50% 0' : '0 50% 0 50%'};
  `;
  container.appendChild(p);
}

/* ── COUNTDOWN TIMER ── */
const wedding = new Date('2026-08-02T19:00:00');
const elDays  = document.getElementById('days');
const elHours = document.getElementById('hours');
const elMins  = document.getElementById('minutes');
const elSecs  = document.getElementById('seconds');

function pad(n) { return String(n).padStart(2, '0'); }

function flip(el, val) {
  if (el.textContent !== val) {
    el.classList.remove('flip');
    void el.offsetWidth; // force reflow to restart animation
    el.classList.add('flip');
    el.textContent = val;
  }
}

function tick() {
  const now  = new Date();
  const diff = wedding - now;

  if (diff <= 0) {
    [elDays, elHours, elMins, elSecs].forEach(el => el.textContent = '00');
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000)  / 60000);
  const s = Math.floor((diff % 60000)    / 1000);

  flip(elDays,  pad(d));
  flip(elHours, pad(h));
  flip(elMins,  pad(m));
  flip(elSecs,  pad(s));
}

tick();
setInterval(tick, 1000);

/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 120);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
