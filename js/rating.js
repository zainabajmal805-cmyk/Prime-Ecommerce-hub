/**
 * FOOTER STAR RATING
 * — Hover & click turns stars yellow
 * — On submit saves to Firestore "siteRatings" collection
 * — Shows thank-you message, disables re-rating for 24h (localStorage)
 */

import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import { getFirestore, addDoc, collection, serverTimestamp }
  from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

const FIREBASE_CONFIG = {
  apiKey:            'AIzaSyAiqN9v4p7MoS7vbH3vFXBwQd3MLcLeXfo',
  authDomain:        'primeecommercehub.firebaseapp.com',
  projectId:         'primeecommercehub',
  storageBucket:     'primeecommercehub.firebasestorage.app',
  messagingSenderId: '658801275706',
  appId:             '1:658801275706:web:451eea614f832ffe881603'
};

// Reuse existing app if already initialized
const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
const db  = getFirestore(app);

const LABELS = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
const EMOJIS = ['', '😞', '😐', '😊', '😄', '🌟'];
const STORAGE_KEY = 'peh_rated_at';
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

(function initRating() {
  const wrap   = document.getElementById('footerStars');
  const msgEl  = document.getElementById('footerRatingMsg');
  const btnEl  = document.getElementById('footerRatingSubmit');
  if (!wrap) return;

  const stars = wrap.querySelectorAll('span[data-val]');
  let selected = 0;

  // ── Check cooldown ─────────────────────────────────
  const lastRated = localStorage.getItem(STORAGE_KEY);
  if (lastRated && (Date.now() - Number(lastRated)) < COOLDOWN_MS) {
    showThanks(msgEl, btnEl);
    stars.forEach(s => s.style.pointerEvents = 'none');
    return;
  }

  // ── Hover ───────────────────────────────────────────
  stars.forEach(s => {
    s.addEventListener('mouseover', () => highlight(stars, +s.dataset.val));
    s.addEventListener('mouseout',  () => highlight(stars, selected));

    // ── Click ──────────────────────────────────────────
    s.addEventListener('click', () => {
      selected = +s.dataset.val;
      highlight(stars, selected);
      stars.forEach(st => st.classList.toggle('fr-selected', +st.dataset.val === selected));
      if (msgEl) {
        msgEl.textContent = LABELS[selected] + ' ' + EMOJIS[selected];
        msgEl.style.opacity = '1';
      }
      if (btnEl) {
        btnEl.style.display = 'inline-flex';
        btnEl.style.opacity = '1';
      }
    });
  });

  // ── Submit ──────────────────────────────────────────
  if (btnEl) {
    btnEl.addEventListener('click', async () => {
      if (!selected) return;
      btnEl.disabled = true;
      btnEl.textContent = 'Submitting…';

      const page = window.location.pathname.split('/').pop() || 'index.html';

      try {
        await addDoc(collection(db, 'siteRatings'), {
          rating:    selected,
          label:     LABELS[selected],
          page:      page,
          userAgent: navigator.userAgent.slice(0, 120),
          createdAt: serverTimestamp()
        });
      } catch (err) {
        console.warn('Rating save error (non-critical):', err);
      }

      localStorage.setItem(STORAGE_KEY, String(Date.now()));
      showThanks(msgEl, btnEl);
      stars.forEach(s => s.style.pointerEvents = 'none');
    });
  }
})();

function highlight(stars, val) {
  stars.forEach(s => {
    const n = +s.dataset.val;
    s.classList.toggle('fr-active', n <= val);
  });
}

function showThanks(msgEl, btnEl) {
  if (msgEl) {
    msgEl.textContent = 'Thank you for your rating! 🙏';
    msgEl.style.opacity = '1';
    msgEl.style.color = '#4ade80';
  }
  if (btnEl) btnEl.style.display = 'none';
}
