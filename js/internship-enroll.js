// ============================================================
// INTERNSHIP-ENROLL.JS
// Handles internship application form → Firebase Firestore
// Collection: internshipApplications
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAiqN9v4p7MoS7vbH3vFXBwQd3MLcLeXfo",
  authDomain: "primeecommercehub.firebaseapp.com",
  projectId: "primeecommercehub",
  storageBucket: "primeecommercehub.firebasestorage.app",
  messagingSenderId: "658801275706",
  appId: "1:658801275706:web:451eea614f832ffe881603",
  measurementId: "G-Q6JG26T3LC"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

const form      = document.getElementById('internshipForm');
const submitBtn = document.getElementById('ia-submit-btn');
const statusEl  = document.getElementById('ia-status');
const formSec   = document.getElementById('ia-form-section');
const successEl = document.getElementById('ia-success');

function showStatus(msg, type) {
  statusEl.textContent  = msg;
  statusEl.className    = `ia-status ${type}`;
  statusEl.style.display = 'block';
}

if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name      = document.getElementById('ia-name')?.value.trim();
    const phone     = document.getElementById('ia-phone')?.value.trim();
    const email     = document.getElementById('ia-email')?.value.trim();
    const city      = document.getElementById('ia-city')?.value.trim();
    const education = document.getElementById('ia-education')?.value;
    const interest  = document.getElementById('ia-interest')?.value;
    const reason    = document.getElementById('ia-reason')?.value.trim();

    // Validation
    if (!name || !phone || !email || !education || !interest || !reason) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    submitBtn.disabled    = true;
    submitBtn.textContent = 'Submitting...';

    try {
      await addDoc(collection(db, 'internshipApplications'), {
        name:      name,
        phone:     phone,
        email:     email,
        city:      city      || '',
        education: education,
        interest:  interest,
        reason:    reason,
        status:    'Pending',
        createdAt: serverTimestamp()
      });

      // Show success screen
      if (formSec)   formSec.style.display   = 'none';
      if (successEl) successEl.style.display = 'block';

    } catch (error) {
      console.error('Internship application error:', error);
      showStatus('Submission failed. Please try again.', 'error');
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Submit Application';
    }
  });
}
