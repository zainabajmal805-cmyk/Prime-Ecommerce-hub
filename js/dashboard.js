import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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
      // Handled by Firebase approveApplication now
      if (typeof loadStudentsFromFirebase === 'function') {
        loadStudentsFromFirebase();
      }
    }
  }
  closeModal('admDetailModal');
  showToast(`${name} has been ${status.toLowerCase()}`);
}

// addApprovedToStudents removed as students are now loaded from Firebase

// ========================
// ADD COURSE FORM
// ========================
const addCourseForm = document.querySelector('#addCourseModal form');
if (addCourseForm) {
  addCourseForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input');
    const name   = inputs[0]?.value.trim();
    const dur    = inputs[1]?.value.trim();
    const fee    = inputs[2]?.value.trim();
    const status = this.querySelector('select')?.value || 'Active';
    if (!name || !dur || !fee) { showToast('Fill all required fields', 'error'); return; }
    
    try {
      const docRef = await addDoc(collection(db, "courses"), {
        name,
        duration: dur,
        fee: Number(fee),
        status,
        createdAt: serverTimestamp()
      });
      
      console.log("COURSE SAVED TO FIREBASE:", docRef.id);
      
      showToast(`Course "${name}" added`);
      closeModal('addCourseModal');
      this.reset();
      
      if (typeof loadCoursesFromFirebase === 'function') {
        loadCoursesFromFirebase();
      }
    } catch (err) {
      console.error("COURSE FIREBASE WRITE ERROR:", err);
      showToast('Error adding course', 'error');
    }
  });
}

// =====================================
// LOAD COURSES FROM FIREBASE
// =====================================
async function loadCoursesFromFirebase() {
  const tbody = document.querySelector('#sec-courses .db-table tbody');
  if (!tbody) return;

  tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Loading courses...</td></tr>`;

  try {
    const appsSnapshot = await getDocs(collection(db, "applications"));
    let courseStudentsCount = {};
    appsSnapshot.forEach(docSnap => {
      const data = docSnap.data();
      if ((data.status || "Pending") === "Approved" && data.course) {
        courseStudentsCount[data.course] = (courseStudentsCount[data.course] || 0) + 1;
      }
    });

    const coursesSnapshot = await getDocs(collection(db, "courses"));
    tbody.innerHTML = "";

    let courseCount = 0;
    if (coursesSnapshot.empty) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:30px;">No courses found</td></tr>`;
    } else {
      coursesSnapshot.forEach(docSnap => {
        const data = docSnap.data();
        courseCount++;
        const name = data.name || "-";
        const dur = data.duration || "-";
        const fee = data.fee || 0;
        const status = data.status || "Active";
        const studentsCount = courseStudentsCount[name] || 0;
        
        const cls = status === 'Active' ? 'green' : 'amber';
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${escapeHTML(name)}</td><td>${escapeHTML(dur)}</td><td>${Number(fee).toLocaleString()}</td><td>${studentsCount}</td>
          <td><span class="db-pill ${cls}">${escapeHTML(status)}</span></td>
          <td><button class="db-btn-sm" onclick="showModal('courseStudentsModal')">Students</button></td>`;
        tbody.appendChild(tr);
      });
    }

    const card = document.querySelector('.db-stat-clickable[data-goto="courses"] strong');
    if (card) {
      card.textContent = courseCount;
    }
  } catch (error) {
    console.error("Courses Firebase Error:", error);
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#dc2626;padding:30px;">Failed to load courses</td></tr>`;
  }
}

// ========================
// ISSUE CERTIFICATE FORM
// ========================
const issueCertForm = document.querySelector('#issueCertModal form');
if (issueCertForm) {
  issueCertForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const sels    = this.querySelectorAll('select');
    const student = sels[0]?.value;
    const course  = sels[1]?.value;
    const dateVal = this.querySelector('input[type="date"]')?.value;
    if (!dateVal) { showToast('Select issue date', 'error'); return; }
    
    const tbody = document.querySelector('#sec-certificates .db-table tbody');
    let cnt = 1;
    if (tbody) {
      cnt = tbody.querySelectorAll('tr').length + 1;
    }
    const cid = '#C' + String(cnt).padStart(3,'0');
    const ds  = new Date(dateVal).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });

    const certificateData = {
      student,
      course,
      issueDate: dateVal,
      formattedDate: ds,
      certificateId: cid,
      createdAt: serverTimestamp()
    };
    
    console.log("CERTIFICATE WRITE START", certificateData);
    
    try {
      const snap = await getDocs(collection(db, "certificates"));
      let isDuplicate = false;
      snap.forEach(docSnap => {
        const data = docSnap.data();
        if (data.student === student && data.course === course) {
          isDuplicate = true;
        }
      });
      
      if (isDuplicate) {
        showToast('Certificate already issued for this student and course', 'error');
        return;
      }
      
      const docRef = await addDoc(collection(db, "certificates"), certificateData);
      console.log("CERTIFICATE SAVED TO FIREBASE", docRef.id);
      
      showToast(`Certificate issued to ${student}`);
      closeModal('issueCertModal');
      this.reset();
      
      if (typeof loadCertificatesFromFirebase === 'function') {
        loadCertificatesFromFirebase();
      }
    } catch (error) {
      console.error("CERTIFICATE FIREBASE ERROR", error);
      showToast('Error issuing certificate', 'error');
    }
  });
}

// =====================================
// LOAD CERTIFICATES FROM FIREBASE
// =====================================
async function loadCertificatesFromFirebase() {
  const tbody = document.querySelector('#sec-certificates .db-table tbody');
  if (!tbody) return;

  tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Loading certificates...</td></tr>`;

  try {
    const snapshot = await getDocs(collection(db, "certificates"));
    tbody.innerHTML = "";
    
    let cnt = 1;
    
    if (snapshot.empty) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:30px;">No certificates found</td></tr>`;
      return;
    }
    
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const cid = data.certificateId || '#C' + String(cnt++).padStart(3,'0');
      const student = escapeHTML(data.student || '-');
      const course = escapeHTML(data.course || '-');
      const ds = escapeHTML(data.formattedDate || data.issueDate || '-');
      
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${cid}</td><td>${student}</td><td>${course}</td><td>${ds}</td>
        <td><span class="db-pill blue">Issued</span></td>
        <td><button class="db-btn-sm">Download</button></td>`;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Firebase Certificates Error:", error);
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#dc2626;padding:30px;">Failed to load certificates</td></tr>`;
  }
}

// ========================
// SAVE ATTENDANCE
// ========================
const saveAttBtn = document.querySelector('#sec-attendance .db-btn-primary');
if (saveAttBtn) {
  saveAttBtn.addEventListener('click', async () => {
    const selector = document.querySelector('#sec-attendance .db-select');
    const course = selector ? selector.value : '';
    const rows = document.querySelectorAll('#sec-attendance .db-table tbody tr[data-student-id]');
    
    if (!rows.length) { 
      showToast('No students in this course', 'info'); 
      return; 
    }

    const today = new Date().toLocaleDateString("en-GB");
    let presentCount = 0;
    
    saveAttBtn.disabled = true;
    saveAttBtn.textContent = 'Saving...';

    try {
      const promises = [];
      
      rows.forEach(r => {
        const studentId = r.getAttribute('data-student-id');
        const studentName = r.getAttribute('data-student-name');
        const attId = r.getAttribute('data-attendance-id');
        const isPresent = r.querySelector('input[type="checkbox"]').checked;
        
        if (isPresent) presentCount++;

        if (attId) {
          // Update existing
          promises.push(updateDoc(doc(db, "attendance", attId), { present: isPresent }));
        } else {
          // Create new
          const record = {
            studentId,
            studentName,
            course,
            date: today,
            present: isPresent,
            createdAt: serverTimestamp()
          };
          promises.push(addDoc(collection(db, "attendance"), record));
        }
      });
      
      await Promise.all(promises);
      
      showToast(`Attendance saved — ${presentCount}/${rows.length} present`);
      
      if (typeof loadAttendanceStudents === 'function') {
        loadAttendanceStudents();
      }
    } catch (error) {
      console.error("Save attendance error:", error);
      showToast('Failed to save attendance', 'error');
    } finally {
      saveAttBtn.disabled = false;
      saveAttBtn.textContent = 'Save Attendance';
    }
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
// LOAD STUDENTS FROM FIREBASE
// =====================================

async function loadStudentsFromFirebase() {
  const tbody = document.querySelector('#std-table tbody');

  if (!tbody) {
    console.error('Students table #std-table not found');
    return;
  }

  tbody.innerHTML = `
    <tr>
      <td colspan="7" style="text-align:center;">
        Loading students...
      </td>
    </tr>
  `;

  try {
    const snapshot = await getDocs(collection(db, "applications"));

    tbody.innerHTML = "";

    let studentCount = 0;

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      // Only approved applications become students
      if ((data.status || "Pending") !== "Approved") {
        return;
      }

      studentCount++;

      const studentId =
        data.enrollID ||
        "#S" + String(studentCount).padStart(3, "0");

      const name   = data.name || "-";
      const course = data.course || "-";
      const phone  = data.phone || "-";
      const email  = data.email || "-";
      const date   = data.applied || data.date || "-";

      const tr = document.createElement("tr");

      tr.setAttribute("data-txn", docSnap.id);
      tr.classList.add("student-row");

      tr.innerHTML = `
        <td>${escapeHTML(studentId)}</td>

        <td>${escapeHTML(name)}</td>

        <td>${escapeHTML(course)}</td>

        <td>${escapeHTML(phone)}</td>

        <td>${escapeHTML(date)}</td>

        <td>
          <span class="db-pill green">
            Active
          </span>
        </td>

        <td>
          <button class="db-btn-sm student-profile-btn">
            Profile
          </button>
        </td>
      `;

      const profileBtn = tr.querySelector(".student-profile-btn");

      profileBtn.addEventListener("click", () => {
        openStudentProfile(
          profileBtn,
          name,
          studentId,
          course,
          phone,
          email,
          date
        );
      });

      tbody.appendChild(tr);
    });

    if (studentCount === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center;color:#94a3b8;padding:30px;">
            No approved students yet
          </td>
        </tr>
      `;
    }

    // Update student stat card
    const card = document.querySelector(
      '.db-stat-clickable[data-goto="students"] strong'
    );

    if (card) {
      card.textContent = studentCount;
    }

    console.log("Firebase students loaded:", studentCount);

  } catch (error) {

    console.error("Students Firebase Error:", error);

    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center;color:#dc2626;padding:30px;">
          Failed to load students
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

    // Refresh admissions
    await loadAdmissions();

    // Refresh students
    await loadStudentsFromFirebase();
    
    // Refresh fees
    if (typeof loadFeeTable === 'function') loadFeeTable();

  } catch (error) {

    console.error("Approve application error:", error);

    alert("Could not approve application.");
  }
};

window.rejectApplication = async function(id) {
  try {

    await updateDoc(doc(db, "applications", id), {
      status: "Rejected"
    });

    alert("Application rejected!");

    await loadAdmissions();

    // Refresh students because rejected student
    // should not appear in Students section
    await loadStudentsFromFirebase();
    
    if (typeof loadFeeTable === 'function') loadFeeTable();

  } catch (error) {

    console.error("Reject application error:", error);

    alert("Could not reject application.");
  }
};

// =====================================
// START
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  loadAdmissions();
  loadStudentsFromFirebase();
  loadCoursesFromFirebase();
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
    if (typeof loadStudentsFromFirebase === 'function') {
      loadStudentsFromFirebase();
    }
  }

  // Refresh admissions table
  const admTbody = document.querySelector('#adm-table tbody');
  if (admTbody) admTbody.innerHTML = '';
  // Removed local loadWebsiteApplications(); since we use Firebase

  closeModal('editAdmModal');
  showToast('Application updated successfully');
}

// ========================
// FEE TABLE — AUTO POPULATE
// ========================
async function loadFeeTable() {
  const tbody  = document.querySelector('#fee-table tbody');
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Loading fees...</td></tr>`;

  try {
    const snapshot = await getDocs(collection(db, "applications"));
    tbody.innerHTML = '';

    if (snapshot.empty) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:#94a3b8;padding:30px;">No fee data available</td></tr>`;
      updateFeeStatsCards(0, 0);
      return;
    }

    let totalPaid = 0;
    let totalFee  = 0;
    let hasData = false;

    const courseFees = {
      'Shopify Mastery': 17000, 'Amazon FBA': 22000, 'Daraz Selling': 12000,
      'WordPress Pro': 19000, 'Freelancing': 15000, 'Digital Marketing': 12000,
      'AI Tools': 12000, 'SEO Basics': 12000, 'Store Management': 12000,
      'eBay Selling': 15000, 'Etsy Shop': 17000, 'Walmart Selling': 17000
    };

    snapshot.forEach(docSnap => {
      const app = docSnap.data();
      if (!app.course) return; // Skip if no course

      hasData = true;
      const fee       = courseFees[app.course] || parseInt(app.fee) || 0;
      
      // Determine if paid based on status and payment fields
      const isPaid = 
        app.status === 'Approved' || 
        (app.txn && app.txn !== 'N/A') || 
        (app.payment && app.payment.toLowerCase() !== 'pending' && app.payment !== '');
        
      const paid      = isPaid ? fee : 0;
      const remaining = fee - paid;
      const statusCls = isPaid ? 'green' : 'amber';
      const statusTxt = isPaid ? 'Paid' : 'Pending';

      totalFee  += fee;
      totalPaid += paid;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${escapeHTML(app.name || '-')}</td>
        <td>${escapeHTML(app.course)}</td>
        <td>PKR ${fee.toLocaleString()}</td>
        <td>PKR ${paid.toLocaleString()}</td>
        <td>PKR ${remaining.toLocaleString()}</td>
        <td>${escapeHTML(app.date || app.applied || '-')}</td>
        <td><span class="db-pill ${statusCls}">${statusTxt}</span></td>`;
      tbody.appendChild(tr);
    });

    if (!hasData) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:#94a3b8;padding:30px;">No fee data available</td></tr>`;
    }

    updateFeeStatsCards(totalFee, totalPaid);
  } catch (error) {
    console.error("Firebase Fees Error:", error);
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:#dc2626;padding:30px;">Failed to load fee data</td></tr>`;
  }
}

function updateFeeStatsCards(totalFee, totalPaid) {
  const feeStats = document.querySelectorAll('#sec-fees .db-stat-card > div strong');
  if (feeStats[0]) feeStats[0].textContent = 'PKR ' + totalFee.toLocaleString();
  if (feeStats[1]) feeStats[1].textContent = 'PKR ' + totalPaid.toLocaleString();
  if (feeStats[2]) feeStats[2].textContent = 'PKR ' + (totalFee - totalPaid).toLocaleString();
  const rate = totalFee > 0 ? Math.round((totalPaid / totalFee) * 100) : 0;
  if (feeStats[3]) feeStats[3].textContent = rate + '%';

  const ovStats = document.querySelectorAll('#sec-overview .db-stats-grid .db-stat-card > div strong');
  if (ovStats[3]) ovStats[3].textContent = 'PKR ' + totalPaid.toLocaleString();

  document.querySelectorAll('.db-quick-list li').forEach(li => {
    const span = li.querySelector('span');
    if (span && (span.textContent === 'Fee Collection' || span.textContent === 'Total Paid')) {
      const strong = li.querySelector('strong');
      if (strong) strong.textContent = 'PKR ' + totalPaid.toLocaleString();
    }
  });
}

// ========================
// MESSAGES NOTIFICATIONS
// ========================
async function loadMessages() {
  const msgEl = document.querySelector('#sec-messages .db-msg-list');
  const notifBell = document.querySelector('.db-notif');

  if (!msgEl) return;

  msgEl.innerHTML = `
    <li style="padding:36px;text-align:center;color:#94a3b8;">
      Loading messages...
    </li>
  `;

  try {
    const snapshot = await getDocs(collection(db, 'messages'));

    msgEl.innerHTML = '';

    if (snapshot.empty) {
      msgEl.innerHTML = `
        <li style="padding:36px;text-align:center;color:#94a3b8;">
          No messages yet
        </li>
      `;
      return;
    }

    let unreadCount = 0;

    snapshot.forEach((docSnap) => {
      const msg = docSnap.data();

      const name = msg.name || 'Unknown';
      const email = msg.email || '';
      const phone = msg.phone || '';
      const subject = msg.business || msg.interest || 'Website Message';
      const body = msg.message || '';
      const status = msg.status || 'unread';

      if (status === 'unread') unreadCount++;

      const initials = name
        .split(' ')
        .map(w => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

      const li = document.createElement('li');

      li.className = `db-msg-item ${status === 'unread' ? 'unread' : ''}`;

      li.style.cssText = `
        display:flex;
        align-items:center;
        gap:12px;
        padding:14px 16px;
        cursor:pointer;
        border-bottom:1px solid rgba(0,0,0,0.05);
        transition:background .2s;
      `;

      li.innerHTML = `
        <div style="
          width:40px;
          height:40px;
          border-radius:50%;
          background:linear-gradient(135deg,#8B0000,#D4AF37);
          display:flex;
          align-items:center;
          justify-content:center;
          color:#fff;
          font-weight:700;
          font-size:.8rem;
          flex-shrink:0;
        ">
          ${escapeHTML(initials)}
        </div>

        <div style="flex:1;min-width:0">

          <div style="
            font-weight:700;
            font-size:.88rem;
            color:#1e293b;
          ">
            ${escapeHTML(name)}

            ${
              status === 'unread'
                ? `<span style="
                    background:#8B0000;
                    color:#fff;
                    font-size:.65rem;
                    padding:2px 6px;
                    border-radius:10px;
                    margin-left:4px;
                  ">New</span>`
                : ''
            }
          </div>

          <div style="
            font-size:.78rem;
            color:#64748b;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          ">
            ${escapeHTML(subject)}
          </div>

          <div style="
            font-size:.72rem;
            color:#64748b;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          ">
            ${escapeHTML(body)}
          </div>

        </div>
      `;

      li.onmouseover = () => {
        li.style.background = '#f8fafc';
      };

      li.onmouseout = () => {
        li.style.background = '';
      };

      li.onclick = async () => {

        showMsg(
          li,
          name,
          subject,
          `
            <p><strong>Name:</strong> ${escapeHTML(name)}</p>
            <p><strong>Email:</strong> ${escapeHTML(email)}</p>
            <p><strong>Phone:</strong> ${escapeHTML(phone)}</p>
            <p><strong>Business:</strong> ${escapeHTML(msg.business || '—')}</p>
            <p><strong>Interest:</strong> ${escapeHTML(msg.interest || '—')}</p>
            <p><strong>Message:</strong> ${escapeHTML(body)}</p>
          `
        );

        // Mark message as read
        if (status === 'unread') {
          try {
            await updateDoc(
              doc(db, 'messages', docSnap.id),
              { status: 'read' }
            );
          } catch (err) {
            console.error('Read status error:', err);
          }
        }
      };

      msgEl.appendChild(li);
    });

    // Notification badge
    if (notifBell) {

      notifBell.style.position = 'relative';

      let badge = notifBell.querySelector('.notif-badge');

      if (unreadCount > 0) {

        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'notif-badge';
          notifBell.appendChild(badge);
        }

        badge.textContent = unreadCount;

        badge.style.cssText = `
          position:absolute;
          top:-4px;
          right:-4px;
          background:#8B0000;
          color:#fff;
          font-size:.6rem;
          font-weight:700;
          padding:2px 5px;
          border-radius:10px;
          min-width:16px;
          text-align:center;
        `;

      } else {

        if (badge) badge.remove();

      }
    }

    // Quick stat
    document.querySelectorAll('.db-quick-list li').forEach(li => {

      const span = li.querySelector('span');

      if (span?.textContent.trim() === 'Unread Messages') {

        const strong = li.querySelector('strong');

        if (strong) {
          strong.textContent = unreadCount;
        }

      }

    });

  } catch (error) {

    console.error('Firebase Messages Error:', error);

    msgEl.innerHTML = `
      <li style="
        padding:36px;
        text-align:center;
        color:#dc2626;
      ">
        Failed to load messages
      </li>
    `;
  }
}

// ========================
// ATTENDANCE — COURSE SELECTOR
// ========================
function loadAttendanceStudents() {
  const selector = document.querySelector('#sec-attendance .db-select');
  const tbody    = document.querySelector('#sec-attendance .db-table tbody');
  if (!selector || !tbody) return;

  async function renderAttForCourse(courseName) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Loading attendance...</td></tr>`;
    try {
      // Fetch applications
      const appsSnap = await getDocs(collection(db, "applications"));
      const courseStudents = [];
      appsSnap.forEach(docSnap => {
        const app = docSnap.data();
        if (app.status === 'Approved' && app.course === courseName) {
          courseStudents.push({ id: docSnap.id, ...app });
        }
      });

      if (!courseStudents.length) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#94a3b8;padding:24px">No enrolled students in this course</td></tr>`;
        return;
      }

      // Fetch attendance history for the course
      const attSnap = await getDocs(collection(db, "attendance"));
      const attendanceData = [];
      attSnap.forEach(docSnap => {
        const att = docSnap.data();
        if (att.course === courseName) {
          attendanceData.push({ id: docSnap.id, ...att });
        }
      });

      const today = new Date().toLocaleDateString("en-GB");

      tbody.innerHTML = '';
      courseStudents.forEach(app => {
        // Calculate history
        const uniqueDates = new Set(attendanceData.map(a => a.date));
        const totalDays = uniqueDates.size;
        
        // Count present days for this student
        const studentAtt = attendanceData.filter(a => a.studentId === app.id);
        const presentDays = studentAtt.filter(a => a.present).length;
        
        const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
        
        // Did student attend today?
        const todayRecord = studentAtt.find(a => a.date === today);
        const isPresentToday = todayRecord ? todayRecord.present : false;

        const tr = document.createElement('tr');
        tr.setAttribute('data-student-id', app.id);
        tr.setAttribute('data-student-name', app.name);
        if (todayRecord) {
            tr.setAttribute('data-attendance-id', todayRecord.id);
        }

        tr.innerHTML = `
          <td>${escapeHTML(app.name || '-')}</td>
          <td>
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
              <input type="checkbox" class="att-checkbox" style="width:16px;height:16px;accent-color:#8B0000" ${isPresentToday ? 'checked' : ''} /> 
              Present
            </label>
          </td>
          <td>${presentDays}/${totalDays}</td>
          <td>${percentage}%</td>`;
        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error("Failed to load attendance", error);
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#dc2626;padding:24px">Failed to load attendance</td></tr>`;
    }
  }

  // Ensure listener is only added once
  if (!selector.dataset.listenerAdded) {
    selector.addEventListener('change', () => renderAttForCourse(selector.value));
    selector.dataset.listenerAdded = 'true';
  }
  
  renderAttForCourse(selector.value);
}

// =====================================
// INTERNSHIPS — FIREBASE
// =====================================

async function loadInternships() {
  const tbody = document.querySelector('#intern-table tbody');

  if (!tbody) return;

  tbody.innerHTML = `
    <tr>
      <td colspan="6" style="text-align:center;">
        Loading internship applications...
      </td>
    </tr>
  `;

  try {
    const snapshot = await getDocs(
      collection(db, 'internshipApplications')
    );

    tbody.innerHTML = '';

    if (snapshot.empty) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6"
              style="text-align:center;color:#94a3b8;padding:30px;">
            No internship applications yet
          </td>
        </tr>
      `;
      return;
    }

    snapshot.forEach((docSnap) => {
      const app = docSnap.data();

      const name   = app.fullName || app.name || '-';
      const field  = app.internshipField || app.field || '-';
      const mode   = app.preferredMode || app.mode || '-';
      const date   = app.submissionDate || app.date || '-';
      const status = app.status || 'Pending';

      const statusCls =
        status === 'Approved' ? 'green' :
        status === 'Rejected' ? 'red'   : 'amber';

      const tr = document.createElement('tr');
      tr.setAttribute('data-intern-id', docSnap.id);

      tr.innerHTML = `
        <td>${escapeHTML(name)}</td>
        <td>${escapeHTML(field)}</td>
        <td>${escapeHTML(mode)}</td>
        <td>${escapeHTML(date)}</td>
        <td><span class="db-pill ${statusCls}">${escapeHTML(status)}</span></td>
        <td>
          <button class="db-btn-sm" onclick="viewFirebaseInternApp('${docSnap.id}')">View</button>
          ${status !== 'Approved' ? `<button class="db-btn-sm" onclick="approveFirebaseInternApp('${docSnap.id}')">Approve</button>` : ''}
          ${status !== 'Rejected' ? `<button class="db-btn-sm" onclick="rejectFirebaseInternApp('${docSnap.id}')">Reject</button>` : ''}
        </td>
      `;

      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error('Firebase Internship Error:', error);
    tbody.innerHTML = `
      <tr>
        <td colspan="6"
            style="text-align:center;color:#dc2626;padding:30px;">
          Failed to load internship applications
        </td>
      </tr>
    `;
  }
}

// =====================================
// VIEW INTERNSHIP APPLICATION
// =====================================

window.viewFirebaseInternApp = async function(id) {
  try {
    const snapshot = await getDocs(collection(db, 'internshipApplications'));
    const found = snapshot.docs.find(d => d.id === id);
    if (!found) { showToast('Application not found'); return; }

    const app = found.data();

    let modal = document.getElementById('internModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'internModal';
      modal.className = 'db-modal';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="db-modal-box">
        <div class="db-modal-head">
          <h3>Internship Application</h3>
          <button class="db-modal-close" onclick="closeModal('internModal')">✕</button>
        </div>
        <div style="padding:20px;line-height:2;">
          <p><strong>Name:</strong> ${escapeHTML(app.fullName || app.name || '-')}</p>
          <p><strong>WhatsApp:</strong> ${escapeHTML(app.whatsapp || '-')}</p>
          <p><strong>Email:</strong> ${escapeHTML(app.email || '-')}</p>
          <p><strong>City:</strong> ${escapeHTML(app.city || '-')}</p>
          <p><strong>Field:</strong> ${escapeHTML(app.internshipField || app.field || '-')}</p>
          <p><strong>Mode:</strong> ${escapeHTML(app.preferredMode || app.mode || '-')}</p>
          <p><strong>Reason:</strong> ${escapeHTML(app.reason || '—')}</p>
          <p><strong>Source:</strong> ${escapeHTML(app.source || '—')}</p>
          <p><strong>Date:</strong> ${escapeHTML(app.submissionDate || app.date || '-')} ${escapeHTML(app.submissionTime || '')}</p>
          <p><strong>Status:</strong> ${escapeHTML(app.status || 'Pending')}</p>
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

  } catch (error) {
    console.error('View internship error:', error);
    showToast('Could not open application');
  }
};

// =====================================
// APPROVE INTERNSHIP
// =====================================

window.approveFirebaseInternApp = async function(id) {
  try {
    await updateDoc(doc(db, 'internshipApplications', id), { status: 'Approved' });
    showToast('Internship application approved');
    await loadInternships();
  } catch (error) {
    console.error('Approve internship error:', error);
    showToast('Could not approve internship application');
  }
};

// =====================================
// REJECT INTERNSHIP
// =====================================

window.rejectFirebaseInternApp = async function(id) {
  try {
    await updateDoc(doc(db, 'internshipApplications', id), { status: 'Rejected' });
    showToast('Internship application rejected');
    await loadInternships();
  } catch (error) {
    console.error('Reject internship error:', error);
    showToast('Could not reject internship application');
  }
};

// ========================
// INIT ALL ON DOM READY
// ========================
document.addEventListener('DOMContentLoaded', function() {
  loadFeeTable();
  loadMessages();
  loadAttendanceStudents();
  loadInternships();
  
  if (typeof loadCertificatesFromFirebase === 'function') {
    loadCertificatesFromFirebase();
  }
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
