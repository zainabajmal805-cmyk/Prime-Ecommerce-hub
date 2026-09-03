// ============================================
// APPLY.JS — Professional Admission & Payment Flow
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

// ============================================================
// CANONICAL COURSE DATA — single source of truth for fees.
// Fees MUST match apply.html radio data-fee attributes,
// course-detail.js fee objects, and dashboard courseFees.
// Online fee is stored in Firestore; physical is shown for info.
// ============================================================
const COURSES_DATA = {
  "Shopify Mastery": {
    name: "Shopify Mastery",
    title: "Shopify E-Commerce Mastery & Store Automation",
    fee: "17000",          // Online fee (matches radio data-fee)
    feePhysical: "20000",
    dur: "1.5 Months + 15 Days Internship",
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
    fee: "22000",          // Online fee
    feePhysical: "25000",
    dur: "1.5 Months + 15 Days Internship",
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
    fee: "19000",          // Online fee
    feePhysical: "22000",
    dur: "1.5 Months + 15 Days Internship",
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
    fee: "12000",          // Online fee
    feePhysical: "15000",
    dur: "1.5 Months + 15 Days Internship",
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
    fee: "12000",          // Online fee
    feePhysical: "15000",
    dur: "1.5 Months + 15 Days Internship",
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
    fee: "15000",          // Online fee
    feePhysical: "18000",
    dur: "1.5 Months + 15 Days Internship",
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
    fee: "12000",          // Online fee
    feePhysical: "15000",
    dur: "1.5 Months + 15 Days Internship",
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
    fee: "12000",          // Online fee
    feePhysical: "15000",
    dur: "1.5 Months + 15 Days Internship",
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
    fee: "12000",          // Online fee
    feePhysical: "15000",
    dur: "1.5 Months + 15 Days Internship",
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
  },
  "eBay Selling": {
    name: "eBay Selling",
    title: "eBay Global Seller & International Marketplace Mastery",
    fee: "15000",          // Online fee
    feePhysical: "18000",
    dur: "1.5 Months + 15 Days Internship",
    mode: "Online Live & On-Campus",
    badge: "🌐 Global Selling",
    instructor: "Expert Marketplace Team",
    batches: ["🌇 Evening (05:00 PM - 07:00 PM)"],
    syllabus: [
      "Unit 1: eBay Seller Account Setup & Payoneer Integration from Pakistan",
      "Unit 2: Winning Product Research & Local / Alibaba Sourcing",
      "Unit 3: Listing Optimization & eBay Cassini Search SEO",
      "Unit 4: Auction vs Fixed Price Strategies & Promotions",
      "Unit 5: International Shipping, Customs & Top Rated Seller Management"
    ],
    cert: "eBay Certified Merchant Certificate Included"
  },
  "Etsy Shop": {
    name: "Etsy Shop",
    title: "Etsy Shop Setup, Handmade & Digital Products Mastery",
    fee: "17000",          // Online fee
    feePhysical: "20000",
    dur: "1.5 Months + 15 Days Internship",
    mode: "Online Live & On-Campus",
    badge: "🎨 Creative Business",
    instructor: "Certified Etsy Specialist",
    batches: ["🌅 Morning (11:00 AM)", "🌇 Evening (06:00 PM)"],
    syllabus: [
      "Unit 1: Etsy Account Opening & Shop Branding Strategy",
      "Unit 2: Niche Research & Passive Income Digital Product Creation",
      "Unit 3: Etsy SEO — 13 Tag Optimization & Conversion Copywriting",
      "Unit 4: Etsy Ads, Offsite Marketing & Pinterest Traffic",
      "Unit 5: Customer Service, Payoneer Payments & Scaling to Multiple Shops"
    ],
    cert: "Etsy E-Commerce Specialist Certificate Included"
  },
  "Walmart Selling": {
    name: "Walmart Selling",
    title: "Walmart Marketplace Seller & US Expansion Masterclass",
    fee: "17000",          // Online fee
    feePhysical: "20000",
    dur: "1.5 Months + 15 Days Internship",
    mode: "Online Live Classes",
    badge: "🇺🇸 US Market",
    instructor: "US Marketplace Specialist",
    batches: ["🌙 Night (08:00 PM - 10:00 PM)"],
    syllabus: [
      "Unit 1: Walmart Seller Account Registration & Verification Requirements",
      "Unit 2: Winning Product Research for the US Retail Consumer",
      "Unit 3: Listing Creation, SEO & Buy Box Winning Strategies",
      "Unit 4: Walmart Sponsored Products & PPC Ad Campaigns",
      "Unit 5: Inventory Management, WFS Fulfillment & Performance Standards"
    ],
    cert: "Walmart Marketplace Specialist Certificate Included"
  }
};

// ========================
// DOM INITIALIZATION
// ========================
document.addEventListener('DOMContentLoaded', function () {
  initCourseFromURL();
  // Listen to course radio changes
  document.querySelectorAll('input[name="ap-course"]').forEach(radio => {
    radio.addEventListener('change', function () {
      renderCourseBanner(this.value);
      updateSidebarPreview(this.value, this.dataset.fee, this.dataset.dur);
    });
  });
});

function resolveApplyCourseName(input) {
  if (!input) return null;
  const clean = input.trim().toLowerCase();
  
  // Direct match
  const directKey = Object.keys(COURSES_DATA).find(k => k.toLowerCase() === clean);
  if (directKey) return directKey;

  const aliases = {
    'shopify': 'Shopify Mastery',
    'shopify mastery': 'Shopify Mastery',
    'amazon': 'Amazon FBA',
    'amazon fba': 'Amazon FBA',
    'daraz': 'Daraz Selling',
    'daraz selling': 'Daraz Selling',
    'wordpress': 'WordPress Pro',
    'wordpress pro': 'WordPress Pro',
    'freelancing': 'Freelancing',
    'freelance': 'Freelancing',
    'digital marketing': 'Digital Marketing',
    'marketing': 'Digital Marketing',
    'ai': 'AI Tools',
    'ai tools': 'AI Tools',
    'seo': 'SEO Basics',
    'seo basics': 'SEO Basics',
    'e-commerce seo': 'SEO Basics',
    'ecommerce seo': 'SEO Basics',
    'store': 'Store Management',
    'store management': 'Store Management',
    'ebay': 'eBay Selling',
    'ebay selling': 'eBay Selling',
    'etsy': 'Etsy Shop',
    'etsy shop': 'Etsy Shop',
    'walmart': 'Walmart Selling',
    'walmart selling': 'Walmart Selling'
  };

  return aliases[clean] || null;
}

function initCourseFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const courseParam = urlParams.get('course');
  if (courseParam) {
    const key = resolveApplyCourseName(courseParam) || Object.keys(COURSES_DATA).find(k =>
      k.toLowerCase() === courseParam.toLowerCase() ||
      courseParam.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(courseParam.toLowerCase())
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
  const data = COURSES_DATA[courseName];
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
  if (!preview) return;
  preview.style.display = 'block';

  // Always pull fee from COURSES_DATA to guarantee consistency
  const courseData = COURSES_DATA[name];
  const canonicalFee = courseData ? courseData.fee : (fee || '0');
  const canonicalDur = courseData ? courseData.dur : (dur || '—');

  const el = document.getElementById('prev-name');
  if (el) el.textContent = name;

  const ef = document.getElementById('prev-fee');
  if (ef) {
    ef.textContent = 'PKR ' + parseInt(canonicalFee).toLocaleString('en-PK') + ' (Online)';
    ef.style.display = 'block';
    ef.style.color = '#e11d48';
    ef.style.fontWeight = '700';
    ef.style.fontSize = '0.85rem';
    ef.style.marginTop = '4px';
  }

  const ed = document.getElementById('prev-dur');
  if (ed) {
    ed.textContent = canonicalDur;
    ed.style.display = 'block';
    ed.style.color = '#64748b';
    ed.style.fontSize = '0.78rem';
    ed.style.marginTop = '2px';
  }
}

function updateOrderSummary() {
  const selectedCourse = document.querySelector('input[name="ap-course"]:checked');
  const summaryBox = document.getElementById('ap-payment-summary-box');
  if (summaryBox && selectedCourse) {
    const courseName = selectedCourse.value;
    // Always use COURSES_DATA as canonical fee source
    const fee = COURSES_DATA[courseName]
      ? COURSES_DATA[courseName].fee
      : (selectedCourse.dataset.fee || '0');
    const feePhysical = COURSES_DATA[courseName]
      ? COURSES_DATA[courseName].feePhysical
      : null;

    summaryBox.innerHTML = `
      <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:12px; padding:14px 18px; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
          <div>
            <span style="font-size:0.75rem; color:#64748b; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; display:block;">Selected Course</span>
            <strong style="font-size:1rem; color:#0f172a;">${escapeHTML(courseName)}</strong>
          </div>
          <div style="text-align:right;">
            <span style="font-size:0.75rem; color:#64748b; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; display:block;">Payable Amount (Online)</span>
            <strong style="font-size:1.15rem; color:#e11d48;">PKR ${parseInt(fee).toLocaleString('en-PK')}</strong>
            ${feePhysical ? `<span style="display:block;font-size:0.73rem;color:#64748b;margin-top:2px;">Physical class: PKR ${parseInt(feePhysical).toLocaleString('en-PK')}</span>` : ''}
          </div>
        </div>
        <div style="margin-top:10px;padding-top:10px;border-top:1px solid #e2e8f0;font-size:0.78rem;color:#64748b;">
          &#9432; Transfer exactly <strong style="color:#0f172a;">PKR ${parseInt(fee).toLocaleString('en-PK')}</strong> to the account below, then enter your Transaction ID.
        </div>
      </div>
    `;
    summaryBox.style.display = 'block';
  }
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

function tryGoStep(targetStep) {
  const cur = getCurrentStep();

  if (targetStep === cur) return;

  if (targetStep < cur) {
    goStepDirect(targetStep);
    return;
  }

  for (let s = cur; s < targetStep; s++) {
    if (!validateStep(s)) return;
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
    const name = document.getElementById('ap-fullname')?.value.trim();
    const phone = document.getElementById('ap-phone')?.value.trim();
    const email = document.getElementById('ap-email')?.value.trim();
    const cnic = document.getElementById('ap-cnic')?.value.trim();
    const city = document.getElementById('ap-city')?.value.trim();

    if (!name || name.length < 2) {
      highlight('ap-fullname', 'Please enter your full name');
      return false;
    }

    const phoneClean = (phone || '').replace(/[\s\-]/g, '');
    const phoneRegex = /^((\+92)|(0092)|(92)|(0))?3[0-9]{9}$/;
    if (!phone || !phoneRegex.test(phoneClean)) {
      highlight('ap-phone', 'Please enter a valid Pakistani mobile number (e.g. 0300-1234567)');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      highlight('ap-email', 'Please enter a valid email address (e.g. name@example.com)');
      return false;
    }

    const cnicClean = (cnic || '').replace(/[\s\-]/g, '');
    if (!cnic || cnicClean.length !== 13 || !/^\d{13}$/.test(cnicClean)) {
      highlight('ap-cnic', 'Please enter a valid 13-digit CNIC / B-Form number (e.g. 35202-1234567-1)');
      return false;
    }

    if (!city || city.length < 2) {
      highlight('ap-city', 'Please enter your city name');
      return false;
    }

    return true;
  }

  if (step === 2) {
    const sel = document.querySelector('input[name="ap-course"]:checked');
    if (!sel) {
      showApAlert('Please select a course to continue.');
      return false;
    }
    return true;
  }

  if (step === 3) {
    const pay = document.querySelector('input[name="ap-payment"]:checked');
    const txn = document.getElementById('ap-txn')?.value.trim();
    const screenshotFile = document.getElementById('ap-screenshot')?.files[0];

    if (!pay) {
      showApAlert('Please select a payment method.');
      return false;
    }
    if (!txn || txn.length < 3) {
      highlight('ap-txn', 'Please enter the transaction reference ID from your receipt');
      return false;
    }

    // Screenshot: validate type/size if provided
    if (screenshotFile) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(screenshotFile.type)) {
        showApAlert('Payment screenshot must be an image file (JPG, PNG, GIF or WebP).');
        return false;
      }
      if (screenshotFile.size > 5 * 1024 * 1024) {
        showApAlert('Payment screenshot must be smaller than 5MB.');
        return false;
      }
    }
    return true;
  }
  return true;
}

function highlight(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = '#ef4444';
  el.style.boxShadow = '0 0 0 3px rgba(239,68,68,.15)';
  el.focus();
  showApAlert(msg);
  el.addEventListener('input', () => {
    el.style.borderColor = '';
    el.style.boxShadow = '';
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

// Global submission lock
let isSubmittingApplication = false;

// ========================
// SUBMIT APPLICATION
// ========================
async function submitApplication() {
  if (isSubmittingApplication) return;
  if (!validateStep(3)) return;

  const name    = document.getElementById('ap-fullname').value.trim();
  const phone   = document.getElementById('ap-phone').value.trim();
  const email   = document.getElementById('ap-email').value.trim();
  const cnic    = document.getElementById('ap-cnic').value.trim();
  const city    = document.getElementById('ap-city')?.value.trim() || '';
  const about   = document.getElementById('ap-about')?.value.trim() || '';
  const course  = document.querySelector('input[name="ap-course"]:checked');
  const payment = document.querySelector('input[name="ap-payment"]:checked');
  const txn     = document.getElementById('ap-txn').value.trim();

  // Screenshot — validate type/size but note: file is NOT uploaded to Firebase Storage.
  // It is the student's local proof. The txn ID is the verifiable reference.
  const screenshotFile = document.getElementById('ap-screenshot')?.files[0];
  if (screenshotFile) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(screenshotFile.type)) {
      showApAlert('Payment screenshot must be an image file (JPG, PNG, GIF or WebP).');
      return;
    }
    if (screenshotFile.size > 5 * 1024 * 1024) {
      showApAlert('Payment screenshot must be smaller than 5MB.');
      return;
    }
  }

  const today    = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const enrollID = 'PH-2026-' + Math.floor(1000 + Math.random() * 9000);

  // Use COURSES_DATA as the authoritative fee source.
  // Fall back to radio data-fee only if course key is missing.
  const courseKey     = course.value;
  const canonicalFee  = COURSES_DATA[courseKey]
    ? COURSES_DATA[courseKey].fee
    : (course.dataset.fee || '0');

  const submitBtn     = document.querySelector('#ap-step-3 .ap-btn-primary');
  const origBtnText   = submitBtn ? submitBtn.textContent : 'Submit Enrollment';

  isSubmittingApplication = true;
  if (submitBtn) {
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Processing Enrollment...';
  }

  const application = {
    enrollID,
    name,
    phone,
    email,
    cnic,
    city,
    about,
    course: courseKey,
    fee: canonicalFee,           // authoritative online fee
    payment: payment.value,
    txn,
    screenshotNote: screenshotFile
      ? `Student submitted screenshot: ${screenshotFile.name} (${(screenshotFile.size / 1024).toFixed(0)} KB). File is held locally by student.`
      : 'No screenshot provided',
    date: today,
    createdAt: serverTimestamp(),
    status: 'Pending'
  };

  try {
    await addDoc(collection(db, "applications"), application);
    showConfirmation(application);
    goStepDirect(4);
    // Mark all previous steps as done in the indicator
    for (let i = 1; i <= 3; i++) {
      const ind = document.getElementById('step-ind-' + i);
      if (ind) { ind.classList.remove('active'); ind.classList.add('done'); }
    }
    const ind4 = document.getElementById('step-ind-4');
    if (ind4) { ind4.classList.add('active'); }
  } catch (error) {
    console.error("Firebase Error:", error);
    showApAlert("Submission failed. Please check your internet connection and try again. Your application was NOT saved.");
  } finally {
    isSubmittingApplication = false;
    if (submitBtn) {
      submitBtn.disabled    = false;
      submitBtn.textContent = origBtnText;
    }
  }
}

function escapeHTML(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showConfirmation(app) {
  const box = document.getElementById('ap-confirm-details');
  if (!box) return;
  box.innerHTML = `
    <div class="ap-slip-header">
      <div class="ap-slip-brand">PRIME ECOMMERCE HUB — ADMISSION SLIP</div>
      <div class="ap-slip-id">Enrollment ID: <strong>${escapeHTML(app.enrollID)}</strong></div>
    </div>
    <div class="ap-sum-row"><span>Student Name</span><strong>${escapeHTML(app.name)}</strong></div>
    <div class="ap-sum-row"><span>CNIC</span><strong>${escapeHTML(app.cnic)}</strong></div>
    <div class="ap-sum-row"><span>Phone</span><strong>${escapeHTML(app.phone)}</strong></div>
    <div class="ap-sum-row"><span>Course</span><strong>${escapeHTML(app.course)}</strong></div>
    <div class="ap-sum-row"><span>Course Fee (Online)</span><strong>PKR ${parseInt(app.fee).toLocaleString('en-PK')}</strong></div>
    <div class="ap-sum-row"><span>Payment Method</span><strong>${escapeHTML(app.payment)}</strong></div>
    ${app.txn && app.txn !== 'N/A'
      ? `<div class="ap-sum-row"><span>Transaction ID</span><strong>${escapeHTML(app.txn)}</strong></div>`
      : `<div class="ap-sum-row"><span>Payment</span><strong>Pay Later — Team will contact within 24hrs</strong></div>`}
    <div class="ap-sum-row"><span>Date</span><strong>${escapeHTML(app.date)}</strong></div>
    <div class="ap-sum-row"><span>Status</span><strong style="color:#d97706">&#9203; Verification Pending (Within 24 Hours)</strong></div>`;
}

// ========================
// SUBMIT WITHOUT PAYMENT
// ========================
async function submitWithoutPayment() {
  if (isSubmittingApplication) return;
  if (!validateStep(1)) { goStepDirect(1); return; }
  if (!validateStep(2)) { goStepDirect(2); return; }

  const name    = document.getElementById('ap-fullname').value.trim();
  const phone   = document.getElementById('ap-phone').value.trim();
  const email   = document.getElementById('ap-email').value.trim();
  const cnic    = document.getElementById('ap-cnic').value.trim();
  const city    = document.getElementById('ap-city')?.value.trim() || '';
  const about   = document.getElementById('ap-about')?.value.trim() || '';
  const course  = document.querySelector('input[name="ap-course"]:checked');
  const today   = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const enrollID = 'PH-2026-' + Math.floor(1000 + Math.random() * 9000);

  // Use COURSES_DATA as authoritative fee source
  const courseKey    = course.value;
  const canonicalFee = COURSES_DATA[courseKey]
    ? COURSES_DATA[courseKey].fee
    : (course.dataset.fee || '0');

  const payLaterBtn  = document.querySelector('.ap-paylater-btn');
  const origText     = payLaterBtn ? payLaterBtn.textContent : 'Apply Now, Pay Later';

  isSubmittingApplication = true;
  if (payLaterBtn) {
    payLaterBtn.disabled    = true;
    payLaterBtn.textContent = 'Submitting Application...';
  }

  const application = {
    enrollID,
    name,
    phone,
    email,
    cnic,
    city,
    about,
    course: courseKey,
    fee: canonicalFee,
    payment: 'Pay Later (Pending)',
    txn: 'N/A',
    screenshotNote: 'No screenshot — Pay Later submission',
    date: today,
    createdAt: serverTimestamp(),
    status: 'Pending'
  };

  try {
    await addDoc(collection(db, "applications"), application);
    showConfirmation(application);
    // Mark steps 1-3 done, activate step 4
    for (let i = 1; i <= 3; i++) {
      const ind = document.getElementById('step-ind-' + i);
      if (ind) { ind.classList.remove('active'); ind.classList.add('done'); }
    }
    const ind4 = document.getElementById('step-ind-4');
    if (ind4) { ind4.classList.remove('done'); ind4.classList.add('active'); }
    document.querySelectorAll('.ap-step-panel').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('ap-step-4');
    if (target) target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    console.error("Firebase Error:", error);
    showApAlert("Submission failed. Please check your connection and try again. Your application was NOT saved.");
  } finally {
    isSubmittingApplication = false;
    if (payLaterBtn) {
      payLaterBtn.disabled    = false;
      payLaterBtn.textContent = origText;
    }
  }
}

function applyAnother() {
  document.querySelectorAll('input[type=text],input[type=email],input[type=tel],input[type=number],textarea')
    .forEach(el => el.value = '');
  document.querySelectorAll('input[type=radio]').forEach(el => el.checked = false);
  document.getElementById('ap-selected-preview').style.display = 'none';
  document.getElementById('ap-course-banner-wrap').style.display = 'none';
  goStep(1);
}

// Expose functions to window
window.tryGoStep = tryGoStep;
window.goStep = goStep;
window.copyText = copyText;
window.copyAccountText = copyAccountText;
window.submitApplication = submitApplication;
window.submitWithoutPayment = submitWithoutPayment;
window.applyAnother = applyAnother;

