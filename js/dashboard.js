import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Expose globals for HTML inline events
Object.assign(window, {
  showModal: (id) => { const m = document.getElementById(id); if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; } },
  closeModal: (id) => { const m = document.getElementById(id); if (m) { m.classList.remove('open'); document.body.style.overflow = ''; } },
  filterTable: (s, t) => { const f = s.value.toLowerCase(); document.querySelectorAll(`#${t} tbody tr`).forEach(r => r.style.display = (!f || r.textContent.toLowerCase().includes(f)) ? '' : 'none'); },
  searchTable: (i, t) => { const f = i.value.toLowerCase(); document.querySelectorAll(`#${t} tbody tr`).forEach(r => r.style.display = r.textContent.toLowerCase().includes(f) ? '' : 'none'); }
});

/* ============================================================
   DASHBOARD.JS — Complete Working Version
   ============================================================ */

// ========================
// NAVIGATION
// ========================
const navLinks  = document.querySelectorAll('.db-nav-link');
const sections  = document.querySelectorAll('.db-section');
const pageTitle = document.getElementById('pageTitle');

function navigateTo(id) {
  navLinks.forEach(l => l.classList.remove('active'));
  const link = document.querySelector(`.db-nav-link[data-section="${id}"]`);
  if (link) link.classList.add('active');
  sections.forEach(s => s.classList.remove('active'));
  const sec = document.getElementById('sec-' + id);
  if (sec) sec.classList.add('active');
  if (pageTitle && link) pageTitle.textContent = link.textContent.trim();
  if (window.innerWidth <= 768) closeSidebar();
}

navLinks.forEach(l => l.addEventListener('click', e => {
  e.preventDefault();
  navigateTo(l.dataset.section);
}));

document.querySelectorAll('.db-stat-clickable').forEach(c => {
  c.addEventListener('click', () => navigateTo(c.dataset.goto));
});

// ========================
// SIDEBAR TOGGLE
// ========================
const sidebarToggle = document.getElementById('sidebarToggle');
const dbSidebar     = document.getElementById('dbSidebar');
const dbOverlay     = document.getElementById('dbOverlay');

function openSidebar()  { dbSidebar.classList.add('open');    dbOverlay.classList.add('show'); }
function closeSidebar() { dbSidebar.classList.remove('open'); dbOverlay.classList.remove('show'); }

if (sidebarToggle) sidebarToggle.addEventListener('click', () =>
  dbSidebar.classList.contains('open') ? closeSidebar() : openSidebar()
);
if (dbOverlay) dbOverlay.addEventListener('click', closeSidebar);

// ========================
// TOAST
// ========================
function showToast(msg, type = 'success') {
  let c = document.getElementById('toastContainer');
  if (!c) { c = document.createElement('div'); c.id = 'toastContainer'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = `db-toast db-toast-${type}`;
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  t.innerHTML = `<span>${icon}</span> ${msg}`;
  c.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2800);
}

function escapeHTML(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function refreshStudentCount() {
  const tbody = document.querySelector('#std-table tbody');
  if (!tbody) return;

  const rows = tbody.querySelectorAll('tr[data-txn], tr.student-row');

  const card = document.querySelector(
    '.db-stat-clickable[data-goto="students"] strong'
  );

  if (card) {
    card.textContent = rows.length;
  }
}

// ========================
// MODALS
// ========================
function showModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('db-modal')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ========================
// TABLE SEARCH
// ========================
function searchTable(input, tableId) {
  const f = input.value.toLowerCase();
  document.querySelectorAll(`#${tableId} tbody tr`).forEach(r => {
    r.style.display = r.textContent.toLowerCase().includes(f) ? '' : 'none';
  });
}

// ========================
// TABLE FILTER
// ========================
function filterTable(select, tableId) {
  const f = select.value.toLowerCase();
  document.querySelectorAll(`#${tableId} tbody tr`).forEach(r => {
    r.style.display = (!f || r.textContent.toLowerCase().includes(f)) ? '' : 'none';
  });
}

// ========================
// ADD STUDENT FORM
// ========================
const addStudentForm = document.querySelector('#addStudentModal form');
if (addStudentForm) {
  addStudentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input');
    const name   = inputs[0]?.value.trim();
    const phone  = inputs[1]?.value.trim();
    const email  = inputs[2]?.value.trim();
    const course = this.querySelector('select')?.value;
    if (!name || !phone || !email) { showToast('Please fill all fields', 'error'); return; }

    const tbody = document.querySelector('#std-table tbody');
    if (tbody) {
      // Remove empty state comment row if present
      tbody.querySelectorAll('tr').forEach(r => { if (!r.querySelector('td')) r.remove(); });
      const rows = tbody.querySelectorAll('tr').length;
      const id   = '#S' + String(rows + 1).padStart(3, '0');
      const date = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
      const tr   = document.createElement('tr');
      tr.classList.add('student-row');
      tr.innerHTML = `<td>${id}</td><td>${name}</td><td>${course}</td><td>${phone}</td><td>${date}</td>
        <td><span class="db-pill green">Active</span></td>
        <td><button class="db-btn-sm" onclick="openStudentProfile(this,'${name}','${id}','${course}','${phone}','${email}','${date}')">Profile</button></td>`;
      tbody.appendChild(tr);

      // Refresh overview student count
      refreshStudentCount();
    }
    showToast(`${name} added successfully`);
    closeModal('addStudentModal');
    this.reset();
  });
}

// ========================
// STUDENT PROFILE DYNAMIC
// ========================
function openStudentProfile(btn, name, id, course, phone, email, enrolled) {
  const modal = document.getElementById('studentProfileModal');
  if (!modal) return;
  const initials = name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  modal.querySelector('.db-avatar-lg').textContent      = initials;
  modal.querySelector('.db-profile-info h4').textContent = name;
  modal.querySelector('.db-profile-info p').textContent  = 'Student ID: ' + id;
  const dg = modal.querySelectorAll('.db-detail-grid div strong');
  if (dg[0]) dg[0].textContent = course;
  if (dg[1]) dg[1].textContent = phone;
  if (dg[2]) dg[2].textContent = email;
  if (dg[3]) dg[3].textContent = enrolled;
  if (dg[4]) dg[4].textContent = 'Pending';
  if (dg[5]) dg[5].textContent = '—';
  showModal('studentProfileModal');
}

// ========================
// ADMISSIONS — VIEW/REVIEW
// ========================
document.addEventListener('click', function(e) {
  const btn = e.target.closest('button.db-btn-sm');
  if (!btn) return;
  const row   = btn.closest('tr');
  const cells = row ? row.querySelectorAll('td') : [];
  if (!cells.length) return;

  const action = btn.textContent.trim();

  if (action === 'View' || action === 'Review') {
    const name   = cells[0]?.textContent.trim();
    const email  = cells[1]?.textContent.trim();
    const course = cells[2]?.textContent.trim();
    const date   = cells[3]?.textContent.trim();
    const status = cells[4]?.textContent.trim();
    openAdmissionDetail(name, email, course, date, status, row);
  }

  if (action === 'Issue') {
    const student = cells[1]?.textContent.trim();
    const course  = cells[2]?.textContent.trim();
    if (confirm(`Issue certificate to ${student} for "${course}"?`)) {
      const today = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
      cells[3].textContent  = today;
      cells[4].innerHTML    = '<span class="db-pill blue">Issued</span>';
      btn.textContent       = 'Download';
      showToast(`Certificate issued to ${student}`);
    }
  }

  if (action === 'Download') {
    const student = cells[1]?.textContent.trim();
    showToast(`Downloading certificate for ${student}`, 'info');
  }
});

function openAdmissionDetail(name, email, course, date, status, row) {
  let modal = document.getElementById('admDetailModal');
  if (!modal) { modal = document.createElement('div'); modal.id = 'admDetailModal'; modal.className = 'db-modal'; document.body.appendChild(modal); }
  const sCls = status.toLowerCase().includes('approv') ? 'green' : status.toLowerCase().includes('reject') ? 'red' : 'amber';
  const initials = name.split(' ').map(w=>w[0]).join('').slice(0,2);
  const isPending = status.toLowerCase().includes('pending');
  modal.innerHTML = `<div class="db-modal-box">
    <div class="db-modal-head"><h3>Application Detail</h3><button class="db-modal-close" onclick="closeModal('admDetailModal')">✕</button></div>
    <div class="db-profile-card"><div class="db-avatar-lg">${initials}</div><div class="db-profile-info"><h4>${name}</h4><p>${email}</p></div></div>
    <div class="db-detail-grid">
      <div><small>Course</small><strong>${course}</strong></div>
      <div><small>Applied</small><strong>${date}</strong></div>
      <div><small>Status</small><strong><span class="db-pill ${sCls}">${status}</span></strong></div>
    </div>
    ${isPending ? `<div style="display:flex;gap:10px;margin-top:20px">
      <button class="db-btn-primary" style="flex:1" onclick="updateAdmStatus('${name}','Approved','green',this)">✅ Approve</button>
      <button class="db-btn-danger"  style="flex:1" onclick="updateAdmStatus('${name}','Rejected','red',this)">❌ Reject</button>
    </div>` : ''}
  </div>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modal._row = row;
}

function updateAdmStatus(name, status, cls, btn) {
  const modal = document.getElementById('admDetailModal');
  if (modal?._row) {
    const cells = modal._row.querySelectorAll('td');
    if (cells[4]) cells[4].innerHTML = `<span class="db-pill ${cls}">${status}</span>`;
    const actionBtn = cells[5]?.querySelector('button');
    if (actionBtn) actionBtn.textContent = 'View';

    // Sync to localStorage
    const txn = modal._row.getAttribute('data-txn');
    if (txn) syncStatusToStorage(txn, status);

    // If Approved → add to Students table automatically
    if (status === 'Approved') {
      const app = JSON.parse(localStorage.getItem('ph_applications') || '[]')
                    .find(a => a.txn === txn);
      if (app) addApprovedToStudents(app);
    }
  }
  closeModal('admDetailModal');
  showToast(`${name} has been ${status.toLowerCase()}`);
}

// Add approved student to Students section
function addApprovedToStudents(app, updateCount = true) {
  const tbody = document.querySelector('#std-table tbody');
  if (!tbody) return;

  // Already added?
  if (tbody.querySelector(`[data-txn="${app.txn}"]`)) return;

  // Remove empty-state rows
  tbody.querySelectorAll('tr').forEach(r => {
    if (!r.querySelector('td') || r.textContent.includes('No students')) {
      r.remove();
    }
  });

  const existingRows = tbody.querySelectorAll('tr').length;
  const sid = '#S' + String(existingRows + 1).padStart(3, '0');

  const tr = document.createElement('tr');

  tr.setAttribute('data-txn', app.txn || '');

  tr.innerHTML = `
    <td>${escapeHTML(sid)}</td>
    <td>${escapeHTML(app.name || '')}</td>
    <td>${escapeHTML(app.course || '')}</td>
    <td>${escapeHTML(app.phone || '')}</td>
    <td>${escapeHTML(app.date || '')}</td>
    <td><span class="db-pill green">Active</span></td>
    <td>
      <button class="db-btn-sm student-profile-btn">
        Profile
      </button>
    </td>
  `;

  const profileBtn = tr.querySelector('.student-profile-btn');

  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      openStudentProfile(
        profileBtn,
        app.name || '',
        sid,
        app.course || '',
        app.phone || '',
        app.email || '',
        app.date || ''
      );
    });
  }

  tbody.appendChild(tr);

  // Only update count when a NEW student is actually added
  if (updateCount) {
    refreshStudentCount();
  }
}

// ========================
// ADD COURSE FORM
// ========================
const addCourseForm = document.querySelector('#addCourseModal form');
if (addCourseForm) {
  addCourseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input');
    const name   = inputs[0]?.value.trim();
    const dur    = inputs[1]?.value.trim();
    const fee    = inputs[2]?.value.trim();
    const status = this.querySelector('select')?.value || 'Active';
    if (!name || !dur || !fee) { showToast('Fill all required fields', 'error'); return; }
    const tbody = document.querySelector('#sec-courses .db-table tbody');
    if (tbody) {
      const cls = status === 'Active' ? 'green' : 'amber';
      const tr  = document.createElement('tr');
      tr.innerHTML = `<td>${name}</td><td>${dur}</td><td>${Number(fee).toLocaleString()}</td><td>0</td>
        <td><span class="db-pill ${cls}">${status}</span></td>
        <td><button class="db-btn-sm" onclick="showModal('courseStudentsModal')">Students</button></td>`;
      tbody.appendChild(tr);
    }
    updateStatCount('courses', +1);
    showToast(`Course "${name}" added`);
    closeModal('addCourseModal');
    this.reset();
  });
}

// ========================
// ISSUE CERTIFICATE FORM
// ========================
const issueCertForm = document.querySelector('#issueCertModal form');
if (issueCertForm) {
  issueCertForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const sels    = this.querySelectorAll('select');
    const student = sels[0]?.value;
    const course  = sels[1]?.value;
    const dateVal = this.querySelector('input[type="date"]')?.value;
    if (!dateVal) { showToast('Select issue date', 'error'); return; }
    const tbody = document.querySelector('#sec-certificates .db-table tbody');
    if (tbody) {
      const cnt   = tbody.querySelectorAll('tr').length + 1;
      const cid   = '#C' + String(cnt).padStart(3,'0');
      const ds    = new Date(dateVal).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
      const tr    = document.createElement('tr');
      tr.innerHTML = `<td>${cid}</td><td>${student}</td><td>${course}</td><td>${ds}</td>
        <td><span class="db-pill blue">Issued</span></td>
        <td><button class="db-btn-sm">Download</button></td>`;
      tbody.appendChild(tr);
    }
    showToast(`Certificate issued to ${student}`);
    closeModal('issueCertModal');
    this.reset();
  });
}

// ========================
// SAVE ATTENDANCE
// ========================
const saveAttBtn = document.querySelector('#sec-attendance .db-btn-primary');
if (saveAttBtn) {
  saveAttBtn.addEventListener('click', () => {
    const rows    = document.querySelectorAll('#sec-attendance .db-table tbody tr');
    let present   = 0;
    rows.forEach(r => { if (r.querySelector('input[type="checkbox"]:checked')) present++; });
    if (!rows.length) { showToast('No students in this course', 'info'); return; }
    showToast(`Attendance saved — ${present}/${rows.length} present`);
  });
}

// ========================
// MESSAGES
// ========================
function showMsg(item, from, subject, body) {
  item.classList.remove('unread');
  const badge = item.querySelector('.db-badge');
  if (badge) badge.remove();
  const msgView = document.getElementById('msgView');
  if (!msgView) return;
  const initials = from.split(' ').map(w=>w[0]).join('').slice(0,2);
  msgView.innerHTML = `
    <div class="db-card-head"><h3>Message</h3></div>
    <div class="db-msg-detail visible">
      <div class="db-msg-from">
        <div class="db-msg-avatar">${initials}</div>
        <div><strong>${from}</strong><small>${subject}</small></div>
      </div>
      <div class="db-msg-text">${body}</div>
      <div class="db-msg-reply">
        <input type="text" placeholder="Type a reply..." id="replyInput" />
        <button class="db-btn-primary" onclick="sendReply('${from}')">Send</button>
      </div>
    </div>`;
}

function sendReply(to) {
  const inp = document.getElementById('replyInput');
  if (!inp?.value.trim()) { showToast('Type a message first', 'error'); return; }
  showToast(`Reply sent to ${to}`);
  inp.value = '';
}

// ========================
// SETTINGS — PROFILE
// ========================
const profileForm = document.querySelector('#sec-settings .db-card:first-of-type form');
if (profileForm) profileForm.addEventListener('submit', e => { e.preventDefault(); showToast('Profile updated'); });

// ========================
// SETTINGS — PASSWORD
// ========================
const pwdForm = document.querySelector('#sec-settings .db-card-sm form');
if (pwdForm) {
  pwdForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input[type="password"]');
    if (!inputs[0]?.value) { showToast('Enter current password', 'error'); return; }
    if (!inputs[1]?.value || inputs[1].value.length < 6) { showToast('New password min 6 characters', 'error'); return; }
    if (inputs[1].value !== inputs[2]?.value) { showToast('Passwords do not match', 'error'); return; }
    showToast('Password updated');
    this.reset();
  });
}

// ========================
// DARK MODE
// ========================
const darkToggle = document.getElementById('darkModeToggle');
if (darkToggle) {
  if (localStorage.getItem('db-dark') === 'true') { document.body.classList.add('dark-mode'); darkToggle.checked = true; }
  darkToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
    localStorage.setItem('db-dark', this.checked);
  });
}

// ========================
// NOTIFICATION BELL
// ========================
document.querySelector('.db-notif')?.addEventListener('click', () => showToast('No new notifications', 'info'));

// ========================
// STAT COUNT HELPER
// ========================
function updateStatCount(type, delta) {
  const map = { students:'students', admissions:'admissions', courses:'courses' };
  const card = document.querySelector(`.db-stat-clickable[data-goto="${map[type]}"] strong`);
  if (card) {
    const cur = parseInt(card.textContent.replace(/\D/g,'')) || 0;
    card.textContent = cur + delta;
  }
  // Also update quick stats
  const qs = document.querySelector('.db-quick-list');
  if (qs && type === 'students') {
    const items = qs.querySelectorAll('li');
    // Active Courses item (index 2), Pending Apps (index 3)
  }
}


// ========================
// FREELANCING
// ========================
let flCounter = 0;

function addFreelancer() {
  const name     = document.getElementById('fl-name')?.value.trim();
  const phone    = document.getElementById('fl-phone')?.value.trim();
  const skill    = document.getElementById('fl-skill')?.value;
  const platform = document.getElementById('fl-platform')?.value;
  const projects = parseInt(document.getElementById('fl-proj')?.value) || 0;
  const earnings = parseInt(document.getElementById('fl-earn')?.value) || 0;
  const rating   = document.getElementById('fl-rat')?.value || '—';
  const status   = document.getElementById('fl-status')?.value || 'Active';

  if (!name || !phone) { showToast('Name and phone are required', 'error'); return; }

  flCounter++;
  const id      = '#FL' + String(flCounter).padStart(3, '0');
  const sCls    = status === 'Active' ? 'green' : 'amber';
  const tbody   = document.querySelector('#fl-table tbody');

  if (tbody) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${id}</td>
      <td>${name}</td>
      <td>${skill}</td>
      <td>${platform}</td>
      <td>${projects}</td>
      <td>${earnings.toLocaleString('en-PK')}</td>
      <td>${rating}</td>
      <td><span class="db-pill ${sCls}">${status}</span></td>
      <td><button class="db-btn-sm" onclick="openFreelancerProfile('${name}','${id}','${skill}','${platform}','${projects}','${earnings}','${rating}','${status}')">View</button></td>`;
    tbody.appendChild(tr);
  }

  // Update stat cards
  const totalEl    = document.getElementById('fl-total');
  const earningsEl = document.getElementById('fl-earnings');
  const projectsEl = document.getElementById('fl-projects');

  if (totalEl)    totalEl.textContent    = flCounter;
  if (projectsEl) projectsEl.textContent = (parseInt(projectsEl.textContent) || 0) + projects;
  if (earningsEl) {
    const prev = parseInt(earningsEl.textContent.replace(/\D/g,'')) || 0;
    earningsEl.textContent = 'PKR ' + (prev + earnings).toLocaleString('en-PK');
  }

  // Update platform counts
  const platMap = {
    'Upwork': 'pl-upwork',
    'Fiverr': 'pl-fiverr',
    'Freelancer.com': 'pl-freelancer',
    'LinkedIn': 'pl-linkedin',
    'Local Clients': 'pl-local'
  };
  const platEl = document.getElementById(platMap[platform]);
  if (platEl) platEl.textContent = (parseInt(platEl.textContent) || 0) + 1;

  // Update skills list
  const skillRows = document.querySelectorAll('#fl-skills-list li');
  const skillMap  = {
    'Shopify': 0, 'WordPress': 1, 'Amazon': 2,
    'Digital Marketing': 3, 'Daraz': 4, 'AI': 5,
    'Graphic Design': 6, 'SEO': 7
  };
  const skillIdx = skillMap[skill];
  if (skillIdx !== undefined && skillRows[skillIdx]) {
    const strong = skillRows[skillIdx].querySelector('strong');
    if (strong) strong.textContent = (parseInt(strong.textContent) || 0) + 1;
  }

  showToast(`${name} added as freelancer`);
  closeModal('addFreelancerModal');
  document.getElementById('addFreelancerForm')?.reset();
}

// Freelancer profile modal
function openFreelancerProfile(name, id, skill, platform, projects, earnings, rating, status) {
  let modal = document.getElementById('flProfileModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'flProfileModal';
    modal.className = 'db-modal';
    document.body.appendChild(modal);
  }
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const sCls     = status === 'Active' ? 'green' : 'amber';
  modal.innerHTML = `
    <div class="db-modal-box">
      <div class="db-modal-head">
        <h3>Freelancer Profile</h3>
        <button class="db-modal-close" onclick="closeModal('flProfileModal')">✕</button>
      </div>
      <div class="db-profile-card">
        <div class="db-avatar-lg" style="background:linear-gradient(135deg,#7c3aed,#4f46e5)">${initials}</div>
        <div class="db-profile-info">
          <h4>${name}</h4>
          <p>ID: ${id} &nbsp;·&nbsp; <span class="db-pill ${sCls}">${status}</span></p>
        </div>
      </div>
      <div class="db-detail-grid">
        <div><small>Primary Skill</small><strong>${skill}</strong></div>
        <div><small>Platform</small><strong>${platform}</strong></div>
        <div><small>Projects Done</small><strong>${projects}</strong></div>
        <div><small>Total Earnings</small><strong>PKR ${parseInt(earnings).toLocaleString('en-PK')}</strong></div>
        <div><small>Rating</small><strong>${rating}</strong></div>
        <div><small>Status</small><strong>${status}</strong></div>
      </div>
    </div>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}


// =====================================
// LOAD ADMISSIONS FROM FIREBASE
// =====================================

async function loadAdmissions() {
  const tbody = document.querySelector("#adm-table tbody");

  if (!tbody) return;

  tbody.innerHTML = `
    <tr>
      <td colspan="6" style="text-align:center;">
        Loading applications...
      </td>
    </tr>
  `;

  try {
    const snapshot = await getDocs(collection(db, "applications"));

    tbody.innerHTML = "";

    if (snapshot.empty) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center;">
            No applications yet
          </td>
        </tr>
      `;
      return;
    }

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${data.name || "-"}</td>
        <td>${data.email || "-"}</td>
        <td>${data.course || "-"}</td>
        <td>${data.applied || data.date || "-"}</td>

        <td>
          <span class="db-pill ${
            data.status === "Approved"
              ? "green"
              : data.status === "Rejected"
              ? "red"
              : "amber"
          }">
            ${data.status || "Pending"}
          </span>
        </td>

        <td>
          <button
            class="db-btn-sm"
            onclick="approveApplication('${docSnap.id}')">
            Approve
          </button>

          <button
            class="db-btn-sm"
            onclick="rejectApplication('${docSnap.id}')">
            Reject
          </button>
        </td>
      `;

      tbody.appendChild(row);
    });

  } catch (error) {
    console.error("Admissions error:", error);

    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;color:red;">
          Failed to load applications
        </td>
      </tr>
    `;
  }
}

// =====================================
// APPROVE / REJECT APPLICATIONS
// =====================================

window.approveApplication = async function(id) {
  try {
    await updateDoc(doc(db, "applications", id), {
      status: "Approved"
    });

    alert("Application approved!");
    loadAdmissions();

  } catch (error) {
    console.error(error);
    alert("Could not approve application.");
  }
};

window.rejectApplication = async function(id) {
  try {
    await updateDoc(doc(db, "applications", id), {
      status: "Rejected"
    });

    alert("Application rejected!");
    loadAdmissions();

  } catch (error) {
    console.error(error);
    alert("Could not reject application.");
  }
};

// =====================================
// START
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  loadAdmissions();
});

// Also update when status changes (after approve/reject)
const _origUpdateAdmStatus = window.updateAdmStatus;
if (typeof updateAdmStatus === 'function') {
  // patch already defined above — localStorage sync
}

// Re-save status changes back to localStorage
function syncStatusToStorage(txn, newStatus) {
  const apps = JSON.parse(localStorage.getItem('ph_applications') || '[]');
  const idx  = apps.findIndex(a => a.txn === txn);
  if (idx !== -1) { apps[idx].status = newStatus; localStorage.setItem('ph_applications', JSON.stringify(apps)); }
}


// ========================
// DELETE ADMISSION
// ========================
function deleteAdmission(txn) {
  if (!confirm('Delete this application? This cannot be undone.')) return;
  const apps = JSON.parse(localStorage.getItem('ph_applications') || '[]');
  const updated = apps.filter(a => a.txn !== txn);
  localStorage.setItem('ph_applications', JSON.stringify(updated));
  const row = document.querySelector(`[data-txn="${txn}"]`);
  if (row) row.remove();
  showToast('Application deleted');
  loadWebsiteApplications();
}

// ========================
// EDIT ADMISSION
// ========================
function editAdmission(txn) {
  const apps = JSON.parse(localStorage.getItem('ph_applications') || '[]');
  const app  = apps.find(a => a.txn === txn);
  if (!app) return;

  let modal = document.getElementById('editAdmModal');
  if (!modal) { modal = document.createElement('div'); modal.id = 'editAdmModal'; modal.className = 'db-modal'; document.body.appendChild(modal); }

  modal.innerHTML = `<div class="db-modal-box">
    <div class="db-modal-head"><h3>Edit Application — ${app.enrollID}</h3>
      <button class="db-modal-close" onclick="closeModal('editAdmModal')">✕</button></div>
    <form class="db-form" onsubmit="saveEditAdmission('${txn}',this);return false;">
      <div class="db-form-row">
        <div><label>Full Name</label><input type="text" name="name" value="${app.name}" required /></div>
        <div><label>Phone</label><input type="text" name="phone" value="${app.phone}" required /></div>
      </div>
      <div class="db-form-row">
        <div><label>Email</label><input type="email" name="email" value="${app.email}" required /></div>
        <div><label>Course</label><input type="text" name="course" value="${app.course}" required /></div>
      </div>
      <div class="db-form-row">
        <div><label>Payment Method</label><input type="text" name="payment" value="${app.payment}" /></div>
        <div><label>Transaction ID</label><input type="text" name="txn" value="${app.txn}" /></div>
      </div>
      <div><label>Status</label>
        <select name="status">
          <option value="Pending"  ${app.status==='Pending'  ?'selected':''}>Pending</option>
          <option value="Approved" ${app.status==='Approved' ?'selected':''}>Approved</option>
          <option value="Rejected" ${app.status==='Rejected' ?'selected':''}>Rejected</option>
        </select>
      </div>
      <button type="submit" class="db-btn-primary" style="width:100%;margin-top:12px">Save Changes</button>
    </form>
  </div>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function saveEditAdmission(txn, form) {
  const apps = JSON.parse(localStorage.getItem('ph_applications') || '[]');
  const idx  = apps.findIndex(a => a.txn === txn);
  if (idx === -1) return;

  const fd = new FormData(form);
  apps[idx].name    = fd.get('name');
  apps[idx].phone   = fd.get('phone');
  apps[idx].email   = fd.get('email');
  apps[idx].course  = fd.get('course');
  apps[idx].payment = fd.get('payment');
  apps[idx].status  = fd.get('status');
  localStorage.setItem('ph_applications', JSON.stringify(apps));

  if (apps[idx].status === 'Approved') {
    addApprovedToStudents(apps[idx], true);
  }

  // Refresh admissions table
  const admTbody = document.querySelector('#adm-table tbody');
  if (admTbody) admTbody.innerHTML = '';
  loadWebsiteApplications();

  closeModal('editAdmModal');
  showToast('Application updated successfully');
}

// ========================
// FEE TABLE — AUTO POPULATE
// ========================
function loadFeeTable() {
  const apps   = JSON.parse(localStorage.getItem('ph_applications') || '[]');
  const tbody  = document.querySelector('#fee-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  let totalPaid = 0;
  let totalFee  = 0;

  const courseFees = {
    'Shopify Mastery': 17000, 'Amazon FBA': 22000, 'Daraz Selling': 12000,
    'WordPress Pro': 19000, 'Freelancing': 15000, 'Digital Marketing': 12000,
    'AI Tools': 12000, 'SEO Basics': 12000, 'Store Management': 12000,
    'eBay Selling': 15000, 'Etsy Shop': 17000, 'Walmart Selling': 17000
  };

  apps.forEach(app => {
    const fee       = courseFees[app.course] || parseInt(app.fee) || 0;
    const isPaid    = app.status === 'Approved' || (app.txn && app.txn !== 'N/A');
    const paid      = isPaid ? fee : 0;
    const remaining = fee - paid;
    const statusCls = isPaid ? 'green' : 'amber';
    const statusTxt = isPaid ? 'Paid' : 'Pending';

    totalFee  += fee;
    totalPaid += paid;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${app.name}</td>
      <td>${app.course}</td>
      <td>PKR ${fee.toLocaleString()}</td>
      <td>PKR ${paid.toLocaleString()}</td>
      <td>PKR ${remaining.toLocaleString()}</td>
      <td>${app.date}</td>
      <td><span class="db-pill ${statusCls}">${statusTxt}</span></td>`;
    tbody.appendChild(tr);
  });

  // Update fee stats cards
  const feeStats = document.querySelectorAll('#sec-fees .db-stat-card > div strong');
  if (feeStats[0]) feeStats[0].textContent = 'PKR ' + totalFee.toLocaleString();
  if (feeStats[1]) feeStats[1].textContent = 'PKR ' + totalPaid.toLocaleString();
  if (feeStats[2]) feeStats[2].textContent = 'PKR ' + (totalFee - totalPaid).toLocaleString();
  const rate = totalFee > 0 ? Math.round((totalPaid / totalFee) * 100) : 0;
  if (feeStats[3]) feeStats[3].textContent = rate + '%';

  // Update overview fee card
  const ovStats = document.querySelectorAll('#sec-overview .db-stats-grid .db-stat-card > div strong');
  if (ovStats[3]) ovStats[3].textContent = 'PKR ' + totalPaid.toLocaleString();

  // Update quick stats fee collection
  document.querySelectorAll('.db-quick-list li').forEach(li => {
    const span = li.querySelector('span');
    if (span?.textContent === 'Fee Collection') {
      li.querySelector('strong').textContent = 'PKR ' + totalPaid.toLocaleString();
    }
  });
}

// ========================
// MESSAGES NOTIFICATIONS
// ========================
function loadMessages() {
  const apps   = JSON.parse(localStorage.getItem('ph_applications') || '[]');
  const msgEl  = document.querySelector('#sec-messages .db-msg-list');
  const notifBell = document.querySelector('.db-notif');
  if (!msgEl) return;

  const pending = apps.filter(a => a.status === 'Pending');
  msgEl.innerHTML = '';

  if (!apps.length) {
    msgEl.innerHTML = `<li class="db-msg-empty" style="padding:36px;text-align:center;color:#94a3b8;font-size:.88rem">No messages yet</li>`;
  } else {
    apps.forEach(app => {
      const isUnread = app.status === 'Pending';
      const li = document.createElement('li');
      li.className = `db-msg-item ${isUnread ? 'unread' : ''}`;
      li.style.cssText = 'display:flex;align-items:center;gap:12px;padding:14px 16px;cursor:pointer;border-bottom:1px solid rgba(0,0,0,0.05);transition:background .2s;';
      li.onmouseover = () => li.style.background = '#f8fafc';
      li.onmouseout  = () => li.style.background  = '';
      const initials = app.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
      const statusColor = app.status==='Approved'?'#16a34a':app.status==='Rejected'?'#dc2626':'#d97706';
      li.innerHTML = `
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#8B0000,#D4AF37);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:.8rem;flex-shrink:0">${initials}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:.88rem;color:#1e293b">${app.name} ${isUnread?'<span style="background:#8B0000;color:#fff;font-size:.65rem;padding:2px 6px;border-radius:10px;margin-left:4px">New</span>':''}</div>
          <div style="font-size:.78rem;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Enrolled: ${app.course}</div>
          <div style="font-size:.72rem;color:${statusColor};font-weight:600">${app.status} · ${app.date}</div>
        </div>`;
      li.onclick = () => showMsg(li, app.name, `Enrollment: ${app.course}`,
        `<p><strong>Name:</strong> ${app.name}</p>
         <p><strong>Phone:</strong> ${app.phone}</p>
         <p><strong>Email:</strong> ${app.email}</p>
         <p><strong>Course:</strong> ${app.course}</p>
         <p><strong>Payment:</strong> ${app.payment}</p>
         <p><strong>TXN ID:</strong> ${app.txn}</p>
         <p><strong>Date:</strong> ${app.date}</p>
         <p><strong>Status:</strong> <span style="color:${statusColor};font-weight:700">${app.status}</span></p>
         <p><strong>Enrollment ID:</strong> ${app.enrollID}</p>`);
      msgEl.appendChild(li);
    });
  }

  // Notification bell badge
  const unreadCount = pending.length;
  if (notifBell && unreadCount > 0) {
    notifBell.style.position = 'relative';
    let badge = notifBell.querySelector('.notif-badge');
    if (!badge) { badge = document.createElement('span'); badge.className = 'notif-badge'; notifBell.appendChild(badge); }
    badge.textContent = unreadCount;
    badge.style.cssText = 'position:absolute;top:-4px;right:-4px;background:#8B0000;color:#fff;font-size:.6rem;font-weight:700;padding:2px 5px;border-radius:10px;min-width:16px;text-align:center;';
  }

  // Update unread messages quick stat
  document.querySelectorAll('.db-quick-list li').forEach(li => {
    const span = li.querySelector('span');
    if (span?.textContent === 'Unread Messages') {
      li.querySelector('strong').textContent = unreadCount;
    }
  });

  // Notification bell click
  if (notifBell) {
    notifBell.onclick = () => {
      navigateTo('messages');
      showToast(`${unreadCount} pending enrollment${unreadCount !== 1 ? 's' : ''}`, 'info');
    };
  }
}

// ========================
// ATTENDANCE — COURSE SELECTOR
// ========================
function loadAttendanceStudents() {
  const selector = document.querySelector('#sec-attendance .db-select');
  const tbody    = document.querySelector('#sec-attendance .db-table tbody');
  if (!selector || !tbody) return;

  const apps = JSON.parse(localStorage.getItem('ph_applications') || '[]');

  function renderAttForCourse(courseName) {
    tbody.innerHTML = '';
    const courseStudents = apps.filter(a => a.course === courseName && a.status === 'Approved');
    if (!courseStudents.length) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#94a3b8;padding:24px">No enrolled students in this course</td></tr>`;
      return;
    }
    courseStudents.forEach(app => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${app.name}</td>
        <td><label style="display:flex;align-items:center;gap:6px;cursor:pointer"><input type="checkbox" style="width:16px;height:16px;accent-color:#8B0000" /> Present</label></td>
        <td>0</td>
        <td>0%</td>`;
      tbody.appendChild(tr);
    });
  }

  renderAttForCourse(selector.value);
  selector.addEventListener('change', () => renderAttForCourse(selector.value));
}

// ========================
// INIT ALL ON DOM READY
// ========================
document.addEventListener('DOMContentLoaded', function() {
  loadFeeTable();
  loadMessages();
  loadAttendanceStudents();
});

// ========================
// STUDENT REVIEWS — FIREBASE
// ========================

async function getFirebaseReviews() {
  const snapshot = await getDocs(collection(db, 'reviews'));
  return snapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
}

window.switchReviewTab = function(btn, status) {
  document.querySelectorAll('.db-rtab').forEach(tab => {
    tab.classList.remove('active');
  });
  if (btn) btn.classList.add('active');
  renderReviews(status);
};

async function renderReviews(status = 'pending') {
  const list = document.getElementById('reviews-list');
  if (!list) return;

  list.innerHTML = `<p style="color:#94a3b8;text-align:center;padding:32px 0;">Loading reviews...</p>`;

  try {
    const reviews = await getFirebaseReviews();

    // Update counts
    ['pending','approved','rejected'].forEach(s => {
      const el = document.getElementById('count-' + s);
      if (el) el.textContent = reviews.filter(r => (r.status || 'pending') === s).length;
    });

    const filtered = reviews.filter(r => (r.status || 'pending') === status);

    if (filtered.length === 0) {
      list.innerHTML = `<p style="color:#94a3b8;text-align:center;padding:32px 0;font-size:0.9rem;">No ${status} reviews.</p>`;
      return;
    }

    list.innerHTML = filtered.map(r => {
      const rating = Math.min(5, Math.max(1, parseInt(r.rating || 5)));
      const stars  = '★'.repeat(rating);
      return `
      <div style="border:1px solid #e2e8f0;border-radius:14px;padding:20px;margin-bottom:14px;background:#fafafa;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap;">
              <strong style="color:#0f172a;font-size:0.96rem;">${escapeHTML(r.name || 'Student')}</strong>
              <span style="background:#fff1f2;color:#e11d48;font-size:0.72rem;font-weight:700;padding:2px 8px;border-radius:5px;">${escapeHTML(r.course || '')}</span>
              <span style="color:#D4AF37;font-size:0.9rem;">${stars}</span>
            </div>
            <p style="color:#475569;font-size:0.88rem;line-height:1.65;margin:0 0 8px;">"${escapeHTML(r.review || '')}"</p>
            <span style="color:#94a3b8;font-size:0.76rem;">${escapeHTML(r.date || '')}</span>
          </div>
          <div style="display:flex;gap:8px;flex-shrink:0;flex-wrap:wrap;">
            ${status === 'pending' ? `
              <button onclick="approveReview('${r.id}')" style="padding:7px 14px;border-radius:8px;background:#16a34a;color:#fff;border:none;font-size:0.8rem;font-weight:700;cursor:pointer;">Approve</button>
              <button onclick="rejectReview('${r.id}')" style="padding:7px 14px;border-radius:8px;background:#dc2626;color:#fff;border:none;font-size:0.8rem;font-weight:700;cursor:pointer;">Reject</button>
            ` : ''}
            ${status === 'approved' ? `
              <button onclick="rejectReview('${r.id}')" style="padding:7px 14px;border-radius:8px;background:#dc2626;color:#fff;border:none;font-size:0.8rem;font-weight:700;cursor:pointer;">Reject</button>
            ` : ''}
            ${status === 'rejected' ? `
              <button onclick="approveReview('${r.id}')" style="padding:7px 14px;border-radius:8px;background:#16a34a;color:#fff;border:none;font-size:0.8rem;font-weight:700;cursor:pointer;">Approve</button>
            ` : ''}
            <button onclick="deleteReview('${r.id}')" style="padding:7px 14px;border-radius:8px;background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0;font-size:0.8rem;font-weight:700;cursor:pointer;">Delete</button>
          </div>
        </div>
      </div>`;
    }).join('');

  } catch (error) {
    console.error('Firebase Reviews Error:', error);
    list.innerHTML = `<p style="color:#dc2626;text-align:center;padding:32px;">Failed to load reviews.</p>`;
  }
}

window.approveReview = async function(id) {
  try {
    await updateDoc(doc(db, 'reviews', id), { status: 'approved' });
    showToast('Review approved ✓', 'success');
    renderReviews('pending');
  } catch (error) {
    console.error('Approve review error:', error);
    showToast('Could not approve review', 'error');
  }
};

window.rejectReview = async function(id) {
  try {
    await updateDoc(doc(db, 'reviews', id), { status: 'rejected' });
    showToast('Review rejected', 'error');
    renderReviews('pending');
  } catch (error) {
    console.error('Reject review error:', error);
    showToast('Could not reject review', 'error');
  }
};

window.deleteReview = async function(id) {
  if (!confirm('Delete this review permanently?')) return;
  try {
    await deleteDoc(doc(db, 'reviews', id));
    showToast('Review deleted', 'error');
    renderReviews('pending');
  } catch (error) {
    console.error('Delete review error:', error);
    showToast('Could not delete review', 'error');
  }
};

// Load reviews when section is opened
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.db-nav-link[data-section="reviews"]')?.addEventListener('click', () => {
    setTimeout(() => renderReviews('pending'), 50);
  });
});
