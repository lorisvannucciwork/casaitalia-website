const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const legalDir = path.join(publicDir, 'legal');
const htmlOutputFile = path.join(legalDir, 'casa-italia-policies.html');
const pdfOutputFilePublic = path.join(publicDir, 'Casa_Italia_Legal_Policies_EN.pdf');

// Ensure directories exist
if (!fs.existsSync(legalDir)) {
  fs.mkdirSync(legalDir, { recursive: true });
}

// Read SVG logo if available
let logoSvg = '';
const logoPath = path.join(publicDir, 'logo', 'logo-01.svg');
if (fs.existsSync(logoPath)) {
  logoSvg = fs.readFileSync(logoPath, 'utf8');
  logoSvg = logoSvg.replace(/<\?xml[^>]*\?>/gi, '').trim();
}

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Casa Italia - Legal Policies &amp; Dining Terms Compendium</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* CSS Reset */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --gold: #ba935a;
      --gold-dark: #8c6c39;
      --gold-deep: #705429;
      --gold-light: #faf5ed;
      --gold-border: #d8c29d;
      --charcoal: #1a1816;
      --charcoal-light: #2b2723;
      --body-text: #3d3832;
      --muted: #6b6359;
      --border-gray: #e4ded7;
      --bg-cream: #faf7f2;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: var(--body-text);
      background-color: #555555;
      line-height: 1.48;
      font-size: 8.8pt;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* Page Sheet Layout (Exact A4 Dimensions) */
    .page-sheet {
      width: 210mm;
      height: 297mm;
      margin: 15px auto;
      background: #ffffff;
      padding: 13mm 16mm 11mm 16mm;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.18);
    }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    @media print {
      body {
        background: transparent !important;
      }
      .page-sheet {
        margin: 0 !important;
        box-shadow: none !important;
        page-break-after: always;
        break-after: page;
        height: 297mm !important;
        max-height: 297mm !important;
        width: 210mm !important;
      }
      .page-sheet:last-child {
        page-break-after: avoid !important;
        break-after: avoid !important;
      }
    }

    /* Typography */
    h1, h2, h3, h4, .serif {
      font-family: 'Cormorant Garamond', Georgia, serif;
      color: var(--charcoal);
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    /* Running Header */
    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--gold-border);
      padding-bottom: 5px;
      margin-bottom: 11px;
      font-size: 7.2pt;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
    }
    .running-header strong {
      color: var(--charcoal);
      font-weight: 700;
    }
    .running-header .tag-gold {
      color: var(--gold-dark);
      font-weight: 600;
    }

    /* Running Footer */
    .running-footer {
      border-top: 1px solid var(--gold-border);
      padding-top: 6px;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.2pt;
      color: var(--muted);
    }
    .running-footer strong {
      color: var(--charcoal);
    }
    .page-number-pill {
      background: var(--gold-light);
      border: 1px solid var(--gold-border);
      color: var(--gold-dark);
      padding: 1px 8px;
      font-weight: 700;
      font-size: 7pt;
      letter-spacing: 0.04em;
    }

    /* Cover / Page 1 Header */
    .brand-cover-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 2px solid var(--gold);
      padding-bottom: 12px;
      margin-bottom: 14px;
    }
    .brand-logo-wrap {
      width: 170px;
    }
    .brand-logo-wrap svg {
      width: 100%;
      height: auto;
      display: block;
    }
    .brand-header-meta {
      text-align: right;
      font-size: 7.6pt;
      color: var(--muted);
      line-height: 1.35;
    }
    .brand-header-meta strong {
      color: var(--charcoal);
      font-size: 8.4pt;
    }

    /* Page 1 Hero Banner */
    .hero-banner {
      background: linear-gradient(135deg, #1a1816 0%, #29241f 100%);
      border-left: 5px solid var(--gold);
      padding: 18px 22px;
      color: #ffffff;
      margin-bottom: 12px;
    }
    .hero-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 8px;
    }
    .hero-badge {
      display: inline-block;
      padding: 2px 7px;
      background: rgba(186, 147, 90, 0.22);
      border: 1px solid var(--gold);
      color: #f7e7ce;
      font-size: 6.8pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .hero-banner h1 {
      color: #ffffff;
      font-size: 21pt;
      line-height: 1.15;
      margin-bottom: 4px;
    }
    .hero-subtitle {
      font-size: 9.5pt;
      color: #dfd3c3;
      margin-bottom: 8px;
      font-weight: 300;
    }
    .hero-meta-strip {
      font-size: 7.2pt;
      color: #bfae9c;
      border-top: 1px solid rgba(186, 147, 90, 0.35);
      padding-top: 6px;
      display: flex;
      justify-content: space-between;
    }
    .hero-meta-strip strong {
      color: #ffffff;
    }

    /* Executive Callout */
    .exec-box {
      background: var(--gold-light);
      border: 1px solid var(--gold-border);
      border-left: 3.5px solid var(--gold);
      padding: 9px 13px;
      font-size: 8.3pt;
      color: var(--body-text);
      line-height: 1.45;
      margin-bottom: 12px;
    }
    .exec-box strong {
      color: var(--charcoal);
    }

    /* Table of Contents Grid */
    .toc-card {
      border: 1px solid var(--border-gray);
      background: #ffffff;
      padding: 11px 14px;
      margin-bottom: 12px;
    }
    .toc-title {
      font-size: 9.5pt;
      font-weight: 700;
      color: var(--charcoal);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      border-bottom: 1px solid var(--gold-light);
      padding-bottom: 4px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .toc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 16px;
      font-size: 8pt;
    }
    .toc-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px dotted #dcd5cc;
      padding-bottom: 2px;
    }
    .toc-part-tag {
      color: var(--gold-dark);
      font-weight: 700;
      margin-right: 4px;
      font-size: 7.5pt;
    }
    .toc-label {
      color: var(--charcoal);
      font-weight: 500;
    }
    .toc-page {
      font-size: 7pt;
      color: var(--muted);
      font-weight: 600;
    }

    /* Core Principles 3-col on Cover */
    .principles-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin-bottom: 10px;
    }
    .principle-card {
      background: var(--bg-cream);
      border: 1px solid var(--border-gray);
      border-top: 2px solid var(--gold);
      padding: 8px 10px;
      font-size: 7.8pt;
      line-height: 1.4;
    }
    .principle-card h5 {
      font-family: 'Inter', sans-serif;
      font-size: 8pt;
      font-weight: 700;
      color: var(--charcoal);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 3px;
    }

    /* Scope pill bar on Cover */
    .scope-bar {
      border: 1px dashed var(--gold-border);
      padding: 7px 11px;
      font-size: 7.6pt;
      color: var(--muted);
      background: #ffffff;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .scope-bar strong {
      color: var(--charcoal);
    }

    /* Section Headers on Pages 2, 3, 4 */
    .part-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1.5px solid var(--gold);
      padding-bottom: 5px;
      margin-bottom: 10px;
    }
    .part-pill {
      background: var(--gold);
      color: #ffffff;
      font-size: 8pt;
      font-weight: 700;
      padding: 2px 8px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .part-title-text {
      font-size: 15pt;
      color: var(--charcoal);
      font-weight: 700;
      line-height: 1.15;
    }
    .part-subtext {
      font-size: 7.5pt;
      color: var(--muted);
      margin-left: auto;
      text-align: right;
    }

    /* Clause Blocks */
    .clause-card {
      border: 1px solid var(--border-gray);
      background: #ffffff;
      padding: 8px 12px;
      margin-bottom: 8px;
    }
    .clause-head {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin-bottom: 4px;
    }
    .clause-id {
      color: var(--gold-dark);
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 11pt;
      font-weight: 700;
    }
    .clause-title {
      font-size: 9.8pt;
      font-weight: 700;
      color: var(--charcoal);
    }
    .clause-card p {
      font-size: 8.2pt;
      margin-bottom: 5px;
      line-height: 1.45;
      text-align: justify;
    }
    .clause-card p:last-child {
      margin-bottom: 0;
    }

    /* Legal Bullet Lists */
    ul.legal-bullets {
      list-style: none;
      padding-left: 0;
      margin: 4px 0;
      font-size: 8.1pt;
    }
    ul.legal-bullets li {
      position: relative;
      padding-left: 14px;
      margin-bottom: 3.5px;
      line-height: 1.42;
    }
    ul.legal-bullets li::before {
      content: "▪";
      color: var(--gold);
      font-size: 9pt;
      position: absolute;
      left: 2px;
      top: -1px;
    }
    ul.legal-bullets strong {
      color: var(--charcoal);
    }

    /* Entity Strip */
    .entity-strip {
      background: var(--bg-cream);
      border-left: 3px solid var(--gold);
      padding: 6px 10px;
      margin: 5px 0;
      font-size: 7.8pt;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 3px 10px;
    }
    .entity-strip strong {
      color: var(--charcoal);
    }

    /* 4-card grid for Legal Grounds */
    .grounds-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin: 5px 0;
    }
    .ground-box {
      background: var(--bg-cream);
      border: 1px solid var(--border-gray);
      border-top: 2px solid var(--gold);
      padding: 6px 8px;
      font-size: 7.7pt;
      line-height: 1.38;
    }
    .ground-box strong {
      display: block;
      color: var(--charcoal);
      font-size: 8pt;
      margin-bottom: 2px;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }

    /* Critical Allergen Alert Box */
    .alert-allergen {
      background: #fffcf7;
      border: 1.5px solid #d49537;
      border-left: 4.5px solid #b86e12;
      padding: 9px 13px;
      margin: 7px 0;
    }
    .alert-top {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #945307;
      font-weight: 700;
      font-size: 7.4pt;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      margin-bottom: 3px;
    }
    .alert-allergen h4 {
      font-size: 10.5pt;
      color: #4f2c00;
      margin-bottom: 3px;
    }
    .alert-allergen p {
      font-size: 8.1pt;
      color: #573e23;
      line-height: 1.42;
    }

    /* Tables */
    .cookie-table {
      width: 100%;
      border-collapse: collapse;
      margin: 6px 0;
      font-size: 7.6pt;
    }
    .cookie-table th, .cookie-table td {
      border: 1px solid var(--border-gray);
      padding: 5px 7px;
      text-align: left;
      vertical-align: top;
    }
    .cookie-table th {
      background: var(--bg-cream);
      color: var(--charcoal);
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 8.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1.5px solid var(--gold);
    }
    .cookie-table code {
      font-family: Consolas, monospace;
      color: var(--gold-deep);
      background: #fdfbf8;
      border: 1px solid #eadbc8;
      padding: 1px 4px;
      font-size: 7.4pt;
      font-weight: 600;
    }

    /* Official Sign-off Stamp */
    .signoff-card {
      border: 1px solid var(--gold-border);
      background: var(--bg-cream);
      padding: 9px 13px;
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .signoff-info h4 {
      font-size: 10.5pt;
      color: var(--charcoal);
      margin-bottom: 2px;
    }
    .signoff-info p {
      font-size: 7.6pt;
      color: var(--muted);
      line-height: 1.35;
    }
    .stamp-box {
      border: 1.5px dashed var(--gold);
      padding: 6px 12px;
      text-align: center;
      background: #ffffff;
      color: var(--gold-dark);
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-weight: 700;
      font-size: 7.6pt;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      line-height: 1.25;
    }
  </style>
</head>
<body>

  <!-- ========================================================================= -->
  <!-- PAGE 1: COVER, EXECUTIVE SUMMARY, TABLE OF CONTENTS, & REGULATORY SCOPE   -->
  <!-- ========================================================================= -->
  <div class="page-sheet">
    <div>
      <!-- Top Brand Header -->
      <header class="brand-cover-header">
        <div class="brand-logo-wrap">
          ${logoSvg}
        </div>
        <div class="brand-header-meta">
          <strong>CASA ITALIA RISTORANTE</strong><br>
          Marina Promenade • Porto Ghalib Waterfront<br>
          Marsa Alam, Red Sea Governorate, Egypt<br>
          <span>https://casaitaliarestaurants.com</span>
        </div>
      </header>

      <!-- Main Document Hero -->
      <div class="hero-banner">
        <div class="hero-badges">
          <span class="hero-badge">Official Policy Dossier</span>
          <span class="hero-badge">EU GDPR (2016/679)</span>
          <span class="hero-badge">Egyptian Law No. 151/2020</span>
          <span class="hero-badge">ePrivacy Directive</span>
        </div>
        <h1>COMPENDIUM OF LEGAL POLICIES &amp; DINING TERMS</h1>
        <div class="hero-subtitle">Privacy Policy • Terms &amp; Conditions of Hospitality • Cookie Policy • Food Safety</div>
        <div class="hero-meta-strip">
          <div>Document ID: <strong>CI-LEG-EN-2026-V1</strong> &nbsp;|&nbsp; Language: <strong>English (Only)</strong></div>
          <div>Effective Date: <strong>September 12, 2026</strong> &nbsp;|&nbsp; Version: <strong>1.0 (Active)</strong></div>
        </div>
      </div>

      <!-- Executive Overview -->
      <div class="exec-box">
        <strong>Executive Commitment to Hospitality &amp; Integrity:</strong> Casa Italia Ristorante operates at the intersection of authentic Italian culinary tradition and transparent guest hospitality. This unified compendium sets out the legally binding provisions governing in-person dining, waterfront table reservations, digital table interaction (via table QR code digital systems), and online website access. Patrons and visitors are invited to familiarize themselves with these standards.
      </div>

      <!-- Table of Contents -->
      <div class="toc-card">
        <div class="toc-title">
          <span>Table of Contents &amp; Section Directory</span>
          <span style="font-size: 7.2pt; color: var(--gold-dark); font-weight: 600;">Complete 4-Part Unified Document</span>
        </div>
        <div class="toc-grid">
          <div class="toc-row">
            <span><span class="toc-part-tag">PART I</span> <span class="toc-label">Privacy Policy &amp; Data Protection</span></span>
            <span class="toc-page">Page 2</span>
          </div>
          <div class="toc-row">
            <span><span class="toc-part-tag">PART II</span> <span class="toc-label">Terms &amp; Conditions of Service</span></span>
            <span class="toc-page">Page 3</span>
          </div>
          <div class="toc-row">
            <span><span class="toc-part-tag">NOTICE</span> <span class="toc-label">Food Allergens &amp; Dietary Safety</span></span>
            <span class="toc-page">Page 3</span>
          </div>
          <div class="toc-row">
            <span><span class="toc-part-tag">PART III</span> <span class="toc-label">Cookie Policy &amp; Digital Tracking</span></span>
            <span class="toc-page">Page 4</span>
          </div>
          <div class="toc-row">
            <span><span class="toc-part-tag">INDEX</span> <span class="toc-label">Authorized Third Parties &amp; Edge CDN</span></span>
            <span class="toc-page">Page 2 &amp; 4</span>
          </div>
          <div class="toc-row">
            <span><span class="toc-part-tag">PART IV</span> <span class="toc-label">Corporate Inquiries &amp; Certification</span></span>
            <span class="toc-page">Page 4</span>
          </div>
        </div>
      </div>

      <!-- Core Hospitality Principles Grid -->
      <div class="principles-grid">
        <div class="principle-card">
          <h5>1. Data Minimalism</h5>
          We collect solely the minimum data required to facilitate reservations, dietary safety, and responsive digital table ordering.
        </div>
        <div class="principle-card">
          <h5>2. Zero Data Monetization</h5>
          We never sell, broker, or rent patron personal data or dining histories to commercial advertising networks.
        </div>
        <div class="principle-card">
          <h5>3. Culinary Authenticity</h5>
          Handcrafted daily preparation with prime local Red Sea seafood and imported Italian DOCG and DOP ingredients.
        </div>
      </div>

      <!-- Applicability Bar -->
      <div class="scope-bar">
        <strong>Binding Scope:</strong>
        <span>This document applies equally to walk-in patrons, reservation holders, visitors browsing casaitaliarestaurants.com, and guests dining via table QR digital menus.</span>
      </div>
    </div>

    <!-- Page 1 Running Footer -->
    <footer class="running-footer">
      <div><strong>Casa Italia Ristorante</strong> • Waterfront Promenade, Porto Ghalib Marina, Red Sea, Egypt</div>
      <div class="page-number-pill">Page 1 of 4</div>
    </footer>
  </div>


  <!-- ========================================================================= -->
  <!-- PAGE 2: PART I — PRIVACY POLICY & PERSONAL DATA PROTECTION                -->
  <!-- ========================================================================= -->
  <div class="page-sheet">
    <div>
      <!-- Running Header -->
      <div class="running-header">
        <span><strong>Casa Italia Ristorante</strong> • Legal Compendium</span>
        <span class="tag-gold">PART I: PRIVACY POLICY &amp; DATA PROTECTION</span>
        <span>CI-LEG-EN-2026-V1</span>
      </div>

      <!-- Section Title Banner -->
      <div class="part-banner">
        <span class="part-pill">PART I</span>
        <div>
          <h2 class="part-title-text">Privacy Policy &amp; Personal Data Protection</h2>
        </div>
        <div class="part-subtext">EU GDPR (Regulation 2016/679) &amp;<br>Egypt Law No. 151/2020</div>
      </div>

      <!-- Clause 1.1: Data Controller -->
      <div class="clause-card">
        <div class="clause-head">
          <span class="clause-id">01.</span>
          <h3 class="clause-title">Data Controller Identification</h3>
        </div>
        <p>
          This Privacy Policy describes how <strong>Casa Italia Ristorante</strong> ("the Restaurant", "we", "us", or "our") processes, preserves, and protects personal data gathered through our waterfront hospitality operations, digital table services, and online platforms.
        </p>
        <div class="entity-strip">
          <span><strong>Designated Entity:</strong></span> <span>Casa Italia Ristorante (Porto Ghalib Marina)</span>
          <span><strong>Physical Address:</strong></span> <span>Marina Promenade, Port Ghalib, Marsa Alam, Red Sea Governorate, Egypt</span>
          <span><strong>Privacy Desk Email:</strong></span> <span>info@casaitaliarestaurants.com</span>
          <span><strong>Official Website:</strong></span> <span>https://casaitaliarestaurants.com</span>
        </div>
      </div>

      <!-- Clause 1.2: Categories of Data -->
      <div class="clause-card">
        <div class="clause-head">
          <span class="clause-id">02.</span>
          <h3 class="clause-title">Categories of Personal Data Collected</h3>
        </div>
        <p>We process only data strictly necessary to deliver high-quality dining, reservations, and digital services:</p>
        <ul class="legal-bullets">
          <li><strong>Reservations &amp; Concierge:</strong> Guest full name, WhatsApp/telephone contact number, requested dining date and seating time, guest headcount, table preferences (e.g. marina waterfront), and declared medical allergies or dietary restrictions.</li>
          <li><strong>Digital Dining &amp; Table Interaction:</strong> Table identification token (generated when scanning table QR codes), chosen language preference token (English or Italian), and active menu viewing state. No credit card information is collected or stored on this website.</li>
          <li><strong>Security &amp; Edge Telemetry:</strong> Anonymized IP addresses, browser specifications, and aggregated operational metrics transmitted through Cloudflare edge network infrastructure for cyber security, bot management, and latency minimization.</li>
        </ul>
      </div>

      <!-- Clause 1.3: Legal Grounds & Purposes -->
      <div class="clause-card">
        <div class="clause-head">
          <span class="clause-id">03.</span>
          <h3 class="clause-title">Purposes &amp; Legal Bases for Processing</h3>
        </div>
        <p>Processing is conducted strictly under Article 6 of the EU GDPR and Egyptian Law 151/2020 on the following legal bases:</p>
        <div class="grounds-grid">
          <div class="ground-box">
            <strong>Service Delivery (Art. 6(1)(b))</strong>
            Managing table reservations, arrival coordination, seating logistics, and personalized dining services.
          </div>
          <div class="ground-box">
            <strong>Health &amp; Food Safety (Vital)</strong>
            Relaying critical medical allergens, celiac protocols, and dietary constraints directly to our executive chef.
          </div>
          <div class="ground-box">
            <strong>Cybersecurity (Legitimate)</strong>
            Shielding our digital dining interfaces against automated scraping, bot manipulation, and DDoS attacks.
          </div>
          <div class="ground-box">
            <strong>Explicit Consent (Art. 6(1)(a))</strong>
            Administering non-essential cookie choices and voluntary interactions with external navigation or review maps.
          </div>
        </div>
      </div>

      <!-- Clause 1.4: Third-Party Service Providers -->
      <div class="clause-card">
        <div class="clause-head">
          <span class="clause-id">04.</span>
          <h3 class="clause-title">Authorized Third-Party Service Providers &amp; Infrastructure</h3>
        </div>
        <p><strong>Zero Data Selling Commitment:</strong> Personal data is never sold, leased, or rented. Transfers occur strictly with verified partners:</p>
        <ul class="legal-bullets">
          <li><strong>Cloudflare Inc. (Workers, D1 &amp; Edge):</strong> Global content distribution, TLS/SSL 256-bit encryption, distributed D1 database, and bot/DDoS defense.</li>
          <li><strong>Cloudflare Web Analytics:</strong> Non-intrusive, privacy-first performance analytics operating with zero tracking cookies and no cross-site profiling.</li>
          <li><strong>Upstash Inc. (Redis):</strong> Ephemeral IP-hash rate limiting solely to prevent automated DDoS floods and API abuse.</li>
          <li><strong>Google Maps (Alphabet Inc.):</strong> Interactive geographic mapping to facilitate turn-by-turn guest navigation to our marina premises.</li>
          <li><strong>TripAdvisor LLC:</strong> Direct portal connection to authentic, verified international traveler reviews and community ratings.</li>
          <li><strong>WhatsApp Concierge (Meta):</strong> Rapid, encrypted direct communication between guests and our front-of-house hospitality team.</li>
        </ul>
      </div>

      <!-- Clause 1.5: Your Legal Rights -->
      <div class="clause-card">
        <div class="clause-head">
          <span class="clause-id">05.</span>
          <h3 class="clause-title">Guest Rights Under GDPR &amp; Applicable Data Protection Laws</h3>
        </div>
        <p>
          You retain the unconditional right to request: (a) <strong>Access</strong> to your stored personal data; (b) <strong>Rectification</strong> of inaccurate contact information; (c) <strong>Erasure ("Right to be Forgotten")</strong> of contact details post-dining; and (d) <strong>Restriction or Revocation</strong> of optional processing. All requests may be lodged at <strong>info@casaitaliarestaurants.com</strong> and are addressed within thirty (30) business days without charge.
        </p>
      </div>
    </div>

    <!-- Page 2 Running Footer -->
    <footer class="running-footer">
      <div><strong>Casa Italia Ristorante</strong> • Privacy Desk: info@casaitaliarestaurants.com</div>
      <div class="page-number-pill">Page 2 of 4</div>
    </footer>
  </div>


  <!-- ========================================================================= -->
  <!-- PAGE 3: PART II — TERMS & CONDITIONS OF SERVICE & ALLERGEN SAFETY         -->
  <!-- ========================================================================= -->
  <div class="page-sheet">
    <div>
      <!-- Running Header -->
      <div class="running-header">
        <span><strong>Casa Italia Ristorante</strong> • Legal Compendium</span>
        <span class="tag-gold">PART II: TERMS &amp; CONDITIONS OF SERVICE</span>
        <span>CI-LEG-EN-2026-V1</span>
      </div>

      <!-- Section Title Banner -->
      <div class="part-banner">
        <span class="part-pill">PART II</span>
        <div>
          <h2 class="part-title-text">Terms &amp; Conditions of Hospitality Service</h2>
        </div>
        <div class="part-subtext">Restaurant Operations, Table Bookings &amp;<br>Digital Menu Systems</div>
      </div>

      <!-- Clause 2.1: Scope -->
      <div class="clause-card">
        <div class="clause-head">
          <span class="clause-id">01.</span>
          <h3 class="clause-title">General Scope &amp; Contractual Acceptance</h3>
        </div>
        <p>
          These Terms &amp; Conditions govern all dining, table reservations, and digital ordering platforms (including website browsing and table QR codes) provided by <strong>Casa Italia Ristorante</strong> at Porto Ghalib Marina, Red Sea Governorate, Egypt. By dining with us, reserving a table, or accessing our digital dining platforms, patrons agree to be bound by these provisions.
        </p>
      </div>

      <!-- Clause 2.2: Reservation Policies -->
      <div class="clause-card">
        <div class="clause-head">
          <span class="clause-id">02.</span>
          <h3 class="clause-title">Reservation &amp; Seating Policies</h3>
        </div>
        <ul class="legal-bullets">
          <li><strong>Grace Period (15 Minutes):</strong> Table reservations are held for a maximum of 15 minutes past the designated booking time. Beyond this window without prior notification of delay, tables may be reallocated to waiting walk-in patrons.</li>
          <li><strong>Waterfront &amp; Marina Seating:</strong> While we endeavor to satisfy all requests for waterfront tables along the marina boardwalk, table allocation remains subject to availability and prevailing marine sea breezes.</li>
          <li><strong>Large Parties &amp; Special Celebrations:</strong> Dining parties consisting of eight (8) or more guests require advance coordination and confirmation via our official WhatsApp or phone concierge to ensure optimal kitchen pacing.</li>
          <li><strong>Modifications &amp; Cancellations:</strong> We kindly request at least two (2) hours prior notice for booking cancellations or party size adjustments.</li>
        </ul>
      </div>

      <!-- CRITICAL NOTICE: ALLERGENS & DIETARY REQUIREMENTS -->
      <div class="alert-allergen">
        <div class="alert-top">
          <span>⚠️ Critical Safety Notice • Allergens &amp; Dietary Guidelines</span>
        </div>
        <h4>Handcrafted Culinary Environment &amp; Cross-Contact Advisory</h4>
        <p>
          Our culinary team prepares handcrafted pasta, Red Sea seafood, dairy, artisanal cheeses, and classic Italian desserts daily within a shared commercial kitchen. While we implement strict food hygiene protocols and separation practices, <strong>we cannot guarantee an absolute allergen-free environment</strong> against indirect cross-contact with gluten, crustacean shellfish, tree nuts, eggs, or dairy.
        </p>
        <p style="margin-top: 4px; font-weight: 600; color: #402200;">
          <strong>Mandatory Patron Duty:</strong> Any patron with severe or life-threatening food allergies is strictly required to verbally notify the floor supervisor and waitstaff before placing an order.
        </p>
      </div>

      <!-- Clause 2.3: Menu Pricing & Taxes -->
      <div class="clause-card">
        <div class="clause-head">
          <span class="clause-id">03.</span>
          <h3 class="clause-title">Menu Pricing, Statutory Taxes &amp; Market Availability</h3>
        </div>
        <ul class="legal-bullets">
          <li><strong>Currency:</strong> Menu prices are officially denominated in Egyptian Pounds (EGP). Secondary price indications in Euros (€) are provided strictly for the convenience of international travelers.</li>
          <li><strong>Statutory Taxes &amp; Service:</strong> All applicable value-added taxes (VAT) and statutory hospitality service charges conform strictly with official regulations of the Arab Republic of Egypt.</li>
          <li><strong>Fresh Catch &amp; Import Availability:</strong> In keeping with our quality standards, daily catch-of-the-day seafood and artisanal imported Italian DOCG wines or DOP cheeses are subject to seasonal marine harvest and direct Italian shipments.</li>
        </ul>
      </div>

      <!-- Clause 2.4: IP & Governing Law -->
      <div class="clause-card">
        <div class="clause-head">
          <span class="clause-id">04.</span>
          <h3 class="clause-title">Intellectual Property &amp; Governing Jurisdiction</h3>
        </div>
        <p>
          <strong>Proprietary Assets:</strong> All "Casa Italia" trademarks, brand logotypes, graphic visual identities, dish photography, culinary compositions, and software architectures remain the exclusive intellectual property of Casa Italia Ristorante.
        </p>
        <p style="margin-top: 4px;">
          <strong>Governing Law:</strong> These Terms are governed by and construed in accordance with the legal statutes of the Red Sea Governorate, Arab Republic of Egypt. Any legal disputes shall be subject to the exclusive jurisdiction of the competent Egyptian courts.
        </p>
      </div>
    </div>

    <!-- Page 3 Running Footer -->
    <footer class="running-footer">
      <div><strong>Casa Italia Ristorante</strong> • Concierge &amp; Reservations: Porto Ghalib Marina Waterfront</div>
      <div class="page-number-pill">Page 3 of 4</div>
    </footer>
  </div>


  <!-- ========================================================================= -->
  <!-- PAGE 4: PART III — COOKIE POLICY & DIGITAL PREFERENCES + CERTIFICATION    -->
  <!-- ========================================================================= -->
  <div class="page-sheet">
    <div>
      <!-- Running Header -->
      <div class="running-header">
        <span><strong>Casa Italia Ristorante</strong> • Legal Compendium</span>
        <span class="tag-gold">PART III: COOKIE POLICY &amp; CERTIFICATION</span>
        <span>CI-LEG-EN-2026-V1</span>
      </div>

      <!-- Section Title Banner -->
      <div class="part-banner">
        <span class="part-pill">PART III</span>
        <div>
          <h2 class="part-title-text">Cookie Policy &amp; Digital Preferences</h2>
        </div>
        <div class="part-subtext">ePrivacy Directive &amp; Technical<br>Storage Specifications</div>
      </div>

      <!-- Clause 3.1: What are Cookies -->
      <div class="clause-card">
        <div class="clause-head">
          <span class="clause-id">01.</span>
          <h3 class="clause-title">What are Cookies &amp; Local Storage Tokens?</h3>
        </div>
        <p>
          Cookies and local storage tokens are compact data packets placed on your device (smartphone, computer, or tablet) during web browsing or table QR ordering. They allow our dining system to remember your preferences (such as English or Italian language selection, table assignment session, and consent preferences) across your visit without needing repeated prompts.
        </p>
      </div>

      <!-- Clause 3.2: Cookie Inventory Table -->
      <div class="clause-card">
        <div class="clause-head">
          <span class="clause-id">02.</span>
          <h3 class="clause-title">Comprehensive Technical Cookie Inventory</h3>
        </div>
        <p>Casa Italia maintains a privacy-first platform without third-party advertising trackers. Our cookies are detailed below:</p>
        
        <table class="cookie-table">
          <thead>
            <tr>
              <th style="width: 28%;">Cookie Name</th>
              <th style="width: 22%;">Classification</th>
              <th style="width: 36%;">Purpose &amp; Technical Function</th>
              <th style="width: 14%;">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>casaItaliaLanguage</code></td>
              <td>First-Party / Essential</td>
              <td>Stores chosen language preference (English / Italian) across menu navigation.</td>
              <td>1 Year</td>
            </tr>
            <tr>
              <td><code>casa_italia_cookie_consent</code></td>
              <td>First-Party / Essential</td>
              <td>Stores guest cookie consent choices and compliance timestamp.</td>
              <td>6 Months</td>
            </tr>
            <tr>
              <td><code>casa_italia_pwa_dismissed</code></td>
              <td>First-Party / Local Storage</td>
              <td>Stores "Never show again" choice or temporary dismissal for the App prompt (re-triggerable from website footer).</td>
              <td>7 Days / Persistent (Local)</td>
            </tr>
            <tr>
              <td><code>casa-italia-media-v2 / static-v2</code></td>
              <td>First-Party / Cache Storage</td>
              <td>Stores cached dish images, hero video, and dining menu data from your last online activity for offline browsing.</td>
              <td>Until Cache Update / Clear</td>
            </tr>
            <tr>
              <td><code>__cf_bm</code> / <code>cf_clearance</code></td>
              <td>Cloudflare / Security</td>
              <td>Cloudflare bot detection, DDoS traffic mitigation, and request verification.</td>
              <td>Session / 30m</td>
            </tr>
            <tr>
              <td><code>Cloudflare Analytics</code></td>
              <td>Edge Telemetry / Privacy</td>
              <td>Aggregated, privacy-preserving performance telemetry (Zero tracking cookies).</td>
              <td>Cookie-less</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Clause 3.3: Managing Cookies -->
      <div class="clause-card">
        <div class="clause-head">
          <span class="clause-id">03.</span>
          <h3 class="clause-title">Managing, Modifying &amp; Disabling Cookies</h3>
        </div>
        <p>
          Patrons may reconfigure cookie settings at any time using the <strong>Cookie Settings</strong> link on our website or via browser preferences:
        </p>
        <ul class="legal-bullets">
          <li><strong>Google Chrome:</strong> Settings &gt; Privacy and security &gt; Third-party cookies &gt; Block third-party cookies.</li>
          <li><strong>Apple Safari (macOS / iOS):</strong> Settings &gt; Safari &gt; Advanced &gt; Block All Cookies / Prevent Cross-Site Tracking.</li>
          <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Enhanced Tracking Protection &gt; Strict.</li>
          <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions &gt; Manage and delete cookies and site data.</li>
        </ul>
      </div>

      <!-- Clause 3.4: Table QR & PWA Architecture -->
      <div class="clause-card">
        <div class="clause-head">
          <span class="clause-id">04.</span>
          <h3 class="clause-title">Contactless Table QR &amp; Progressive Web App (PWA) Architecture</h3>
        </div>
        <p>
          Physical QR codes on dining tables contain read-only encrypted URLs pointing directly to our digital dining hub. Scanning a table QR code does not extract device data or install unauthorized software. Our Progressive Web App (PWA) optionally enables offline menu browsing and instantaneous table Wi-Fi concierge access.
        </p>
      </div>

      <!-- PART IV: OFFICIAL CERTIFICATION & CORPORATE SIGN-OFF -->
      <div class="signoff-card">
        <div class="signoff-info">
          <h4>CASA ITALIA RISTORANTE • OFFICIAL CERTIFICATION</h4>
          <p>Marina Waterfront Promenade, Port Ghalib, Marsa Alam, Red Sea Governorate, Egypt</p>
          <p>Official Legal Inquiries: <strong>info@casaitaliarestaurants.com</strong> &nbsp;|&nbsp; Web: <strong>https://casaitaliarestaurants.com</strong></p>
        </div>
        <div class="stamp-box">
          OFFICIALLY VERIFIED<br>
          <span style="font-size: 6pt; font-weight: normal; letter-spacing: 0.05em;">CASA ITALIA MANAGEMENT</span><br>
          PORT GHALIB • EGYPT
        </div>
      </div>
    </div>

    <!-- Page 4 Running Footer -->
    <footer class="running-footer">
      <div>© ${new Date().getFullYear()} Casa Italia Ristorante. All rights reserved. • Printed in English (EN)</div>
      <div class="page-number-pill">Page 4 of 4</div>
    </footer>
  </div>

</body>
</html>
`;

// 1. Write HTML file
fs.writeFileSync(htmlOutputFile, htmlContent, 'utf8');
console.log('HTML document written to:', htmlOutputFile);

// 2. Locate Microsoft Edge
const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

const edgeExe = edgePaths.find(p => fs.existsSync(p));

if (!edgeExe) {
  console.error('Microsoft Edge executable not found in standard paths.');
  process.exit(1);
}

console.log('Using Edge executable:', edgeExe);

try {
  // Command to print to PDF
  const cmd = `"${edgeExe}" --headless --disable-gpu --run-all-compositor-stages-before-draw --no-pdf-header-footer --print-to-pdf="${pdfOutputFilePublic}" "file:///${htmlOutputFile.replace(/\\/g, '/')}"`;
  console.log('Running Edge headless export command...');
  execSync(cmd, { stdio: 'inherit' });

  if (fs.existsSync(pdfOutputFilePublic)) {
    const stats = fs.statSync(pdfOutputFilePublic);
    console.log(`PDF successfully created in public folder: ${pdfOutputFilePublic} (${stats.size} bytes)`);
  } else {
    console.error('PDF file was not generated.');
    process.exit(1);
  }
} catch (err) {
  console.error('Error generating PDF:', err);
  process.exit(1);
}
