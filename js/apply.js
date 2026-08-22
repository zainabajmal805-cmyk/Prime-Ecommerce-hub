// ============================================
// APPLY.JS — Professional Admission & Payment Flow
// ============================================

const COURSES_DATA = {
  "Shopify Mastery": {
    name: "Shopify Mastery",
    title: "Shopify E-Commerce Mastery & Store Automation",
    fee: "15000",
    dur: "3 Months (48 Hours)",
    mode: "Online Live & On-Campus Lab",
    badge: "🔥 Best Seller",
    instructor: "Engr. Ali Hassan (Certified Shopify Partner & 7-Figure Store Owner)",
    batches: ["🌅 Morning (10:00 AM - 12:00 PM)", "🌇 Evening (05:00 PM - 07:00 PM)", "🌙 Night (08:00 PM - 10:00 PM)"],
    syllabus: [
      "Unit 1: Shopify Store Setup, Custom Domain & Premium Liquid Themes",
      "Unit 2: Winning Product Research (Local Sourcing & AliExpress Dropshipping)",
      "Unit 3: Payment Gateway Setup (PayFast, EasyPaisa & COD Automation)",
      "Unit 4: High-Converting Facebook, TikTok & Instagram Ads Scaling Strategies",
      "Unit 5: Order Management, Customer Support & Logistics (Trax, PostEx, Leopard)"
    ],
    cert: "Official E-Commerce Specialist Certificate Included"
  },
  "Amazon FBA": {
    name: "Amazon FBA",
    title: "Amazon FBA Private Label & Wholesale Mastery",
    fee: "25000",
    dur: "4 Months (64 Hours)",
    mode: "Online Live & Hands-on Lab",
    badge: "⭐ Global Business",
    instructor: "Muhammad Usama (Senior Amazon Brand Manager & FBA Consultant)",
    batches: ["🌇 Evening (06:00 PM - 08:00 PM)", "🗓️ Weekend (Sat-Sun 03:00 PM)"],
    syllabus: [
      "Unit 1: Product Hunting with Helium 10, Jungle Scout & MerchantWords",
      "Unit 2: Patent Check, Profit Margin Calculation & Sourcing from Alibaba",
      "Unit 3: Supplier Negotiation, Inspection & FBA Shipment Creation",
      "Unit 4: Amazon Seller Central Account Setup & Listing Optimization",
      "Unit 5: Amazon PPC Campaigns, Rank Strategy & Brand Registry"
    ],
    cert: "Verified Amazon Seller Certificate Included"
  },
  "WordPress Pro": {
    name: "WordPress Pro",
    title: "WordPress Pro & WooCommerce Web Development",
    fee: "12000",
    dur: "2 Months (32 Hours)",
    mode: "Online Live & On-Campus",
    badge: "💻 High Demand",
    instructor: "Shahzaib Ahmed (Senior Web Developer & Agency Owner)",
    batches: ["🌅 Morning (11:00 AM - 01:00 PM)", "🌇 Evening (04:00 PM - 06:00 PM)"],
    syllabus: [
      "Unit 1: WordPress Core, Hosting Setup & Custom Theme Installation",
      "Unit 2: Elementor Pro Page Building & Responsive Design Layouts",
      "Unit 3: WooCommerce Store Setup, Product Catalog & Payment Integration",
      "Unit 4: Web Security, Speed Optimization & On-Page SEO",
      "Unit 5: Client Pitching, Upwork Gigs & Project Management"
    ],
    cert: "Professional Web Developer Certificate Included"
  },
  "Digital Marketing": {
    name: "Digital Marketing",
    title: "Digital Marketing & Performance Ads Specialist",
    fee: "10000",
    dur: "2 Months (32 Hours)",
    mode: "Online Live & On-Campus",
    badge: "📈 Career Booster",
    instructor: "Zainab Malik (Meta & Google Certified Growth Marketer)",
    batches: ["🌇 Evening (05:00 PM - 07:00 PM)", "🌙 Night (08:00 PM - 10:00 PM)"],
    syllabus: [
      "Unit 1: Facebook & Instagram Meta Ads Manager Deep Dive",
      "Unit 2: Audience Targeting, Pixel Setup & Custom Conversion Funnels",
      "Unit 3: Google Search, Display & Shopping PPC Ads",
      "Unit 4: Social Media Strategy, Copywriting & Canva Graphics Design",
      "Unit 5: Analytics, ROAS Calculation & Client Retainer Contracts"
    ],
    cert: "Performance Marketer Certificate Included"
  },
  "Daraz Selling": {
    name: "Daraz Selling",
    title: "Daraz Store Launch & Order Fulfillment Masterclass",
    fee: "8000",
    dur: "1 Month (16 Hours)",
    mode: "Online Live Classes",
    badge: "🇵🇰 Local E-Com",
    instructor: "Bilal Raza (Top Rated Daraz Gold Seller)",
    batches: ["🌇 Evening (05:00 PM - 07:00 PM)", "🗓️ Weekend Batch"],
    syllabus: [
      "Unit 1: Daraz Seller Account Registration & Identity Verification",
      "Unit 2: High-Demand Local Product Sourcing & Catalog Listing",
      "Unit 3: Daraz SEO Keyword Optimization & Image Standards",
      "Unit 4: Joining Daraz Campaigns, Flash Sales & Seller Vouchers",
      "Unit 5: Order Packaging, Fulfillment by Daraz (FBD) & Review Management"
    ],
    cert: "Daraz Merchant Certificate Included"
  },
  "Freelancing": {
    name: "Freelancing",
    title: "Freelance Career Accelerator (Upwork, Fiverr & LinkedIn)",
    fee: "12000",
    dur: "2 Months (32 Hours)",
    mode: "Online Live Sessions",
    badge: "💸 Earn Online",
    instructor: "Hamza Tariq (Top Rated Freelancer & Agency Founder)",
    batches: ["🌙 Night (08:00 PM - 10:00 PM)", "🗓️ Weekend (Sat-Sun 04:00 PM)"],
    syllabus: [
      "Unit 1: Fiverr Profile Creation, Keyword Research & Gig SEO Ranking",
      "Unit 2: Upwork 100% Profile Setup, Connects Strategy & Winning Proposals",
      "Unit 3: LinkedIn B2B Client Outreach & Direct Email Cold Pitching",
      "Unit 4: Pricing Strategies, Client Communication & Milestone Delivery",
      "Unit 5: Bank Withdrawal Setup (Payoneer, Wise, Direct Bank Transfer)"
    ],
    cert: "Professional Freelancer Certificate Included"
  },
  "AI Tools": {
    name: "AI Tools",
    title: "AI Tools, ChatGPT & Business Automation Masterclass",
    fee: "8000",
    dur: "6 Weeks (24 Hours)",
    mode: "Online Live Classes",
    badge: "🤖 Next-Gen Skill",
    instructor: "Dr. Danish Khan (AI Solutions Architect)",
    batches: ["🗓️ Weekend (Sat-Sun 05:00 PM)", "🌙 Night (08:30 PM - 10:00 PM)"],
    syllabus: [
      "Unit 1: ChatGPT & Claude Advanced Prompt Engineering for Business",
      "Unit 2: Midjourney, DALL-E & AI Graphic Design Workflow",
      "Unit 3: AI Copywriting, Content Creation & Video Generation (ElevenLabs/HeyGen)",
      "Unit 4: Workflow Automation with Zapier, Make & AI Chatbots",
      "Unit 5: Monetizing AI Skills for Freelancing & Agency Work"
    ],
    cert: "AI Specialist Certificate Included"
  },
  "SEO Basics": {
    name: "SEO Basics",
    title: "SEO & Google Web Traffic Growth Specialist",
    fee: "6000",
    dur: "6 Weeks (24 Hours)",
    mode: "Online Live Classes",
    badge: "🎯 Traffic Growth",
    instructor: "Usman Ghani (Senior SEO Strategist)",
    batches: ["🌇 Evening (06:00 PM - 07:30 PM)"],
    syllabus: [
      "Unit 1: Keyword Research, Search Intent & Competitor Analysis",
      "Unit 2: On-Page SEO, Content Optimization & Technical Audits",
      "Unit 3: Off-Page Backlink Building & Digital PR Outreach",
      "Unit 4: E-Commerce SEO for Shopify, WordPress & Amazon",
      "Unit 5: Google Search Console, Google Analytics 4 & Performance Tracking"
    ],
    cert: "SEO Specialist Certificate Included"
  },
  "Store Management": {
    name: "Store Management",
    title: "E-Commerce Store Operations & Management Specialist",
    fee: "10000",
    dur: "2 Months (32 Hours)",
    mode: "Online Live Classes",
    badge: "⚙️ Operations",
    instructor: "Asad Mehmood (Operations Director)",
    batches: ["🌅 Morning (10:00 AM)", "🌇 Evening (05:00 PM)"],
    syllabus: [
      "Unit 1: Daily Order Fulfillment & Logistics Management",
      "Unit 2: Inventory Control, Stock Alert Systems & Supplier Reordering",
      "Unit 3: Customer Relationship Management (CRM) & Ticket Resolution",
      "Unit 4: Financial Bookkeeping, Cash Flow & Profit/Loss Statements",
      "Unit 5: Store Analytics & Growth Optimization"
    ],
    cert: "Store Manager Certificate Included"
  }
};

// ========================
// DOM INITIALIZATION
// ========================
document.addEventListener('DOMContentLoaded', function() {
  initCourseFromURL();
  // Listen to course radio changes
  document.querySelectorAll('input[name="ap-course"]').forEach(radio => {
    radio.addEventListener('change', function() {
      renderCourseBanner(this.value);
      updateSidebarPreview(this.value, this.dataset.fee, this.dataset.dur);
    });
  });
});

function initCourseFromURL() {
  const urlParams   = new URLSearchParams(window.location.search);
  const courseParam = urlParams.get('course');
  if (courseParam) {
    const key = Object.keys(COURSES_DATA).find(k =>
      k.toLowerCase() === courseParam.toLowerCase() ||
      courseParam.toLowerCase().includes(k.toLowerCase())
    );
    if (key) {
      const radio = Array.from(document.querySelectorAll('input[name="ap-course"]'))
                         .find(r => r.value.toLowerCase() === key.toLowerCase());
      if (radio) {
        radio.checked = true;
        renderCourseBanner(key);
        updateSidebarPreview(key, radio.dataset.fee, radio.dataset.dur);
      }
    }
  }
}

function renderCourseBanner(courseName) {
  const data      = COURSES_DATA[courseName];
  const container = document.getElementById('ap-course-banner-wrap');
  if (!container) return;

  if (!data) { container.innerHTML = ''; return; }

  const syllabusHTML = data.syllabus.map(s =>
    `<li><span class="ap-syll-icon">&#10003;</span> ${s}</li>`
  ).join('');

  container.innerHTML = `
    <div class="ap-course-banner">
      <div class="ap-cb-header">
        <div>
          <span class="ap-cb-badge">${data.badge}</span>
          <h2>${data.title}</h2>
          <p class="ap-cb-subtitle"><strong>${data.instructor}</strong></p>
        </div>
      </div>
      <div class="ap-cb-meta-row">
        <div class="ap-cb-meta-item"><strong>Mode</strong><span>${data.mode}</span></div>
        <div class="ap-cb-meta-item"><strong>Certificate</strong><span>${data.cert}</span></div>
      </div>
      <div class="ap-cb-syllabus">
        <h3>Course Syllabus</h3>
        <ul class="ap-syll-grid">${syllabusHTML}</ul>
      </div>
    </div>`;

  updateSidebarPreview(courseName, data.fee, data.dur);
}

function updateSidebarPreview(name, fee, dur) {
  const preview = document.getElementById('ap-selected-preview');
  if (preview) {
    preview.style.display = 'block';
    const el = document.getElementById('prev-name');
    if (el) el.textContent = name;
    // fee and dur removed intentionally
    const ef = document.getElementById('prev-fee');
    const ed = document.getElementById('prev-dur');
    if (ef) ef.style.display = 'none';
    if (ed) ed.style.display = 'none';
  }
}

function updateOrderSummary() {
  // Summary box removed — nothing to update
  // keeping function to avoid errors from other callers
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✓ Copied!';
    btn.style.background = '#059669';
    btn.style.color = '#fff';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; }, 2000);
  });
}
function copyAccountText(text, btn) { copyText(text, btn); }

// ========================
// STEP NAVIGATION
// ========================
function goStep(num) {
  const cur = getCurrentStep();
  if (num > cur) {
    if (!validateStep(cur)) return;
  }
  goStepDirect(num);
}

// Allow clicking step buttons to go back to already-visited steps
function tryGoStep(targetStep) {
  const cur = getCurrentStep();

  if (targetStep === cur) return; // already on this step

  if (targetStep < cur) {
    // Always allow going back
    goStepDirect(targetStep);
    return;
  }

  // Going forward — validate each step between current and target
  for (let s = cur; s < targetStep; s++) {
    if (!validateStep(s)) return; // stop if any step fails
  }

  goStepDirect(targetStep);
}

function goStepDirect(num) {
  for (let i = 1; i <= 4; i++) {
    const ind = document.getElementById('step-ind-' + i);
    if (!ind) continue;
    ind.classList.remove('active', 'done');
    if (i < num) ind.classList.add('done');
    if (i === num) ind.classList.add('active');
  }

  document.querySelectorAll('.ap-step-panel').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('ap-step-' + num);
  if (target) target.classList.add('active');

  if (num === 3) updateOrderSummary();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getCurrentStep() {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById('ap-step-' + i);
    if (el && el.classList.contains('active')) return i;
  }
  return 1;
}

// ========================
// VALIDATION
// ========================
function validateStep(step) {
  if (step === 1) {
    const name  = document.getElementById('ap-fullname')?.value.trim();
    const phone = document.getElementById('ap-phone')?.value.trim();
    const email = document.getElementById('ap-email')?.value.trim();
    const cnic  = document.getElementById('ap-cnic')?.value.trim();
    const city  = document.getElementById('ap-city')?.value.trim();

    if (!name)  { highlight('ap-fullname', 'Full name is required'); return false; }
    if (!phone) { highlight('ap-phone',    'Phone number is required'); return false; }
    if (!email || !email.includes('@')) { highlight('ap-email', 'Valid email is required'); return false; }
    if (!cnic)  { highlight('ap-cnic', 'CNIC is required for certificate registration'); return false; }
    if (!city)  { highlight('ap-city', 'City is required'); return false; }
    return true;
  }
  if (step === 2) {
    const sel = document.querySelector('input[name="ap-course"]:checked');
    if (!sel) { showApAlert('Please select a course to continue.'); return false; }
    return true;
  }
  if (step === 3) {
    const pay = document.querySelector('input[name="ap-payment"]:checked');
    const txn = document.getElementById('ap-txn')?.value.trim();
    if (!pay) { showApAlert('Please select a payment method.'); return false; }
    if (!txn) { highlight('ap-txn', 'Transaction ID is required for payment verification'); return false; }
    return true;
  }
  return true;
}

function highlight(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = '#ef4444';
  el.style.boxShadow   = '0 0 0 3px rgba(239,68,68,.15)';
  el.focus();
  showApAlert(msg);
  el.addEventListener('input', () => {
    el.style.borderColor = '';
    el.style.boxShadow   = '';
  }, { once: true });
}

function showApAlert(msg) {
  let al = document.getElementById('ap-alert');
  if (!al) {
    al = document.createElement('div');
    al.id = 'ap-alert';
    al.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#ef4444;color:#fff;padding:12px 22px;border-radius:12px;font-size:.88rem;font-weight:600;z-index:9999;box-shadow:0 8px 24px rgba(239,68,68,.3);transition:opacity .3s';
    document.body.appendChild(al);
  }
  al.textContent = '⚠️ ' + msg;
  al.style.opacity = '1';
  clearTimeout(al._t);
  al._t = setTimeout(() => { al.style.opacity = '0'; }, 2800);
}

function updateOrderSummary() {
  const sel = document.querySelector('input[name="ap-course"]:checked');
  if (!sel) return;

  const data = COURSES_DATA[sel.value] || { title: sel.value, dur: sel.dataset.dur, fee: sel.dataset.fee };
  document.getElementById('pay-course-name').textContent = data.title || sel.value;
  document.getElementById('pay-course-dur').textContent  = data.dur || sel.dataset.dur;
  document.getElementById('pay-course-fee').textContent  = 'PKR ' + parseInt(data.fee || sel.dataset.fee).toLocaleString('en-PK');
}

function copyAccountText(text, btnEl) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btnEl.textContent;
    btnEl.textContent = '✓ Copied!';
    btnEl.style.background = '#059669';
    btnEl.style.color = '#fff';
    setTimeout(() => {
      btnEl.textContent = orig;
      btnEl.style.background = '';
      btnEl.style.color = '';
    }, 2000);
  });
}

// ========================
// SUBMIT APPLICATION
// ========================
function submitApplication() {
  if (!validateStep(3)) return;

  const name     = document.getElementById('ap-fullname').value.trim();
  const phone    = document.getElementById('ap-phone').value.trim();
  const email    = document.getElementById('ap-email').value.trim();
  const cnic     = document.getElementById('ap-cnic').value.trim();
  const city     = document.getElementById('ap-city')?.value.trim() || '';
  const about    = document.getElementById('ap-about')?.value.trim() || '';
  const course   = document.querySelector('input[name="ap-course"]:checked');
  const payment  = document.querySelector('input[name="ap-payment"]:checked');
  const txn      = document.getElementById('ap-txn').value.trim();
  const today    = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
  const enrollID = 'PH-2026-' + Math.floor(1000 + Math.random() * 9000);

  const application = {
    enrollID, name, phone, email, cnic, city, about,
    course:  course.value,
    fee:     course.dataset.fee,
    payment: payment.value,
    txn, date: today,
    status: 'Pending'
  };

  const existing = JSON.parse(localStorage.getItem('ph_applications') || '[]');
  existing.push(application);
  localStorage.setItem('ph_applications', JSON.stringify(existing));

  showConfirmation(application);
  goStep(4);
}

function showConfirmation(app) {
  const box = document.getElementById('ap-confirm-details');
  if (!box) return;
  box.innerHTML = `
    <div class="ap-slip-header">
      <div class="ap-slip-brand">PRIME ECOMMERCE HUB — ADMISSION SLIP</div>
      <div class="ap-slip-id">Enrollment ID: <strong>${app.enrollID}</strong></div>
    </div>
    <div class="ap-sum-row"><span>Student Name</span><strong>${app.name}</strong></div>
    <div class="ap-sum-row"><span>CNIC</span><strong>${app.cnic}</strong></div>
    <div class="ap-sum-row"><span>Phone</span><strong>${app.phone}</strong></div>
    <div class="ap-sum-row"><span>Course</span><strong>${app.course}</strong></div>
    <div class="ap-sum-row"><span>Course Fee</span><strong>PKR ${parseInt(app.fee).toLocaleString('en-PK')}</strong></div>
    <div class="ap-sum-row"><span>Payment Method</span><strong>${app.payment}</strong></div>
    <div class="ap-sum-row"><span>Transaction ID</span><strong>${app.txn}</strong></div>
    <div class="ap-sum-row"><span>Date</span><strong>${app.date}</strong></div>
    <div class="ap-sum-row"><span>Status</span><strong style="color:#d97706">Verification Pending (Within 24 Hours)</strong></div>`;
}

// ========================
// SUBMIT WITHOUT PAYMENT
// ========================
function submitWithoutPayment() {
  // Only validate steps 1 and 2 — no payment required
  if (!validateStep(1)) { goStepDirect(1); return; }
  if (!validateStep(2)) { goStepDirect(2); return; }

  const name   = document.getElementById('ap-fullname').value.trim();
  const phone  = document.getElementById('ap-phone').value.trim();
  const email  = document.getElementById('ap-email').value.trim();
  const cnic   = document.getElementById('ap-cnic').value.trim();
  const city   = document.getElementById('ap-city')?.value.trim() || '';
  const about  = document.getElementById('ap-about')?.value.trim() || '';
  const course = document.querySelector('input[name="ap-course"]:checked');
  const today  = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
  const enrollID = 'PH-2026-' + Math.floor(1000 + Math.random() * 9000);

  const application = {
    enrollID, name, phone, email, cnic, city, about,
    course:  course.value,
    fee:     course.dataset.fee,
    payment: 'Pay Later (Pending)',
    txn:     'N/A',
    date:    today,
    status:  'Pending'
  };

  const existing = JSON.parse(localStorage.getItem('ph_applications') || '[]');
  existing.push(application);
  localStorage.setItem('ph_applications', JSON.stringify(existing));

  showConfirmation(application);
  goStepDirect(4);
}

function applyAnother() {
  document.querySelectorAll('input[type=text],input[type=email],input[type=tel],input[type=number],textarea')
    .forEach(el => el.value = '');
  document.querySelectorAll('input[type=radio]').forEach(el => el.checked = false);
  document.getElementById('ap-selected-preview').style.display = 'none';
  document.getElementById('ap-course-banner-wrap').style.display = 'none';
  goStep(1);
}
