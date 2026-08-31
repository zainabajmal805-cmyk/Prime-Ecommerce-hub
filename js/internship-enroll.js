// ============================================
// INTERNSHIP-ENROLL.JS — Firebase Save
// ============================================

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

// ========================
// INTERNSHIP FORM SUBMIT
// ========================

window.submitInternship = async function() {

  // 1. Gather inputs
  const fullName        = document.getElementById('int-fullname').value.trim();
  const whatsapp        = document.getElementById('int-phone').value.trim();
  const email           = document.getElementById('int-email').value.trim();
  const city            = document.getElementById('int-city').value.trim();
  const internshipField = document.getElementById('int-field').value;
  const preferredMode   = document.getElementById('int-mode').value;
  const reason          = document.getElementById('int-reason').value.trim();
  const source          = document.getElementById('int-source').value;

  // 2. Clear previous error highlights
  ['int-fullname','int-phone','int-email','int-city','int-field','int-mode'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.borderColor = '';
  });

  // 3. Validation
  let hasError = false;

  function showError(id) {
    const el = document.getElementById(id);
    if (el) el.style.borderColor = '#e11d48';
    hasError = true;
  }

  if (!fullName)        showError('int-fullname');
  if (!city)            showError('int-city');
  if (!internshipField) showError('int-field');
  if (!preferredMode)   showError('int-mode');

  // WhatsApp validation
  const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
  if (!whatsapp || !phoneRegex.test(whatsapp)) showError('int-phone');

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) showError('int-email');

  if (hasError) {
    alert('Please fill all required fields correctly.');
    return;
  }

  // 4. Disable button to prevent double submit
  const btn = document.querySelector('[onclick="submitInternship()"]');
  if (btn) { btn.disabled = true; btn.textContent = 'Submitting...'; }

  // 5. Save to Firebase Firestore
  try {
    await addDoc(collection(db, "internshipApplications"), {
      fullName:        fullName,
      whatsapp:        whatsapp,
      email:           email,
      city:            city,
      internshipField: internshipField,
      preferredMode:   preferredMode,
      reason:          reason,
      source:          source,
      status:          "Pending",
      submissionDate:  new Date().toLocaleDateString("en-GB"),
      submissionTime:  new Date().toLocaleTimeString("en-PK"),
      createdAt:       serverTimestamp()
    });

    // 6. Show success panel
    document.getElementById('ap-step-1').style.display = 'none';
    document.getElementById('ap-step-success').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

  } catch (error) {
    console.error("Firebase internship error:", error);
    alert("There was an error submitting your application. Please try again.");
    if (btn) { btn.disabled = false; btn.textContent = 'Apply for Internship'; }
  }
};
