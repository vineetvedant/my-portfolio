# Privacy-Conscious Analytics, Search Console & Recruiter Conversion Tracking
**Target URL**: `https://www.sshconnect.space/`  
**Engineer**: Vedant Singh  
**Document**: 10-ANALYTICS-SETUP.md  
**Scope**: Search Console Setup, Webmaster Verification, Conversion Telemetry & Reporting  

---

## 1. Search Engine Verification Architecture

To establish official ownership in search index databases without injecting heavy third-party tracking scripts, follow these verified setup steps:

### A. Google Search Console (GSC) Setup
1. **Property Type**: Add a **Domain Property** (`sshconnect.space`).
   - *Why*: A Domain Property automatically aggregates search performance across `https://www.sshconnect.space`, `https://sshconnect.space`, and subdomains (`wordtohtml1.0.sshconnect.space`).
2. **Verification Method (Recommended)**: DNS TXT Record via Domain Registrar (Namecheap, Cloudflare, GoDaddy).
   - Value: `google-site-verification=[TOKEN_PROVIDED_BY_GOOGLE]`
3. **Alternative HTML Tag Verification**:
   If DNS access is temporarily unavailable, insert this verification meta tag into `index.html` `<head>`:
   ```html
   <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_TOKEN" />
   ```
4. **Sitemap Submission**:
   Once verified, submit:
   `https://www.sshconnect.space/sitemap.xml`

---

### B. Bing Webmaster Tools & IndexNow
1. **Import from GSC**: Use Bing Webmaster Tools' direct GSC integration to automatically sync verified domain properties.
2. **IndexNow Integration**:
   - IndexNow alerts Bing, Yandex, and Naver instantaneously whenever a page or project case study is published or updated, bypassing weeks of crawler polling delay.
   - Setup: Generate an IndexNow API key file (e.g. `[KEY].txt`) in the site root.

---

## 2. Privacy-Conscious Conversion Telemetry

Rather than embedding invasive third-party analytics trackers that degrade Core Web Vitals, the website architecture is prepared for **Cloudflare Web Analytics** (zero cookies, zero tracking IDs, fully compliant with GDPR/CCPA) or **Google Analytics 4 (Minimal Consent Mode)**.

### Custom Recruiter Telemetry Schema

The site's interactive CTAs are equipped with standardized `data-analytics-event` attributes to enable automatic event capturing:

| Event Name | Trigger Element | Recruiter Intent Captured |
|---|---|---|
| `recruiter_resume_click` | `.header-resume-btn`, `.mobile-drawer-btn`, `.footer-action-row a[href*="drive.google"]` | Strongest hiring intent signal: downloading or viewing candidate credentials. |
| `recruiter_contact_click` | `.header-talk-btn`, `.footer-giant-btn` | High-value intent: initiating direct email conversation. |
| `github_profile_visit` | `.hero-cta-group a[href*="github"]`, `.footer-links-stack a[href*="github"]` | Codebase verification intent. |
| `linkedin_profile_visit` | `.footer-links-stack a[href*="linkedin"]` | Professional network & mutual connection verification. |
| `case_study_read` | `.card-action-pills a[href*="projects/"]` | Deep engineering evaluation. |
| `live_tool_launch` | `.bento-card--flagship`, `.bento-cta-btn` | Interactive product validation. |

---

## 3. 30 / 60 / 90-Day KPI Measurement Framework

### Baseline Period (Days 1–30)
- **Primary Focus**: Complete Google Search Console & Bing verification; verify indexing of all 5 canonical URLs.
- **Target Metrics**:
  - GSC Index Status: 100% of sitemap URLs submitted and indexed.
  - 0 Mobile Usability errors.
  - 0 Structured Data parsing errors in GSC Rich Results report.
  - Branded Impression Baseline: Establish search volume for "Vedant Singh", "Vedant Singh Software Engineer".

### Growth Period (Days 31–60)
- **Primary Focus**: Query expansion into Python backend and Generative AI role terms.
- **Target Metrics**:
  - Appearance in long-tail technical queries (e.g., "ChromaDB DeepSeek R1 Python", "FastAPI idempotent API").
  - Organic CTR > 5% on branded queries.
  - Recruiter Actions: Minimum 15–25 outbound resume folder accesses per month.
  - Citation Tracking: First appearances in ChatGPT Search or Perplexity AI source citations.

### Authority Period (Days 61–90)
- **Primary Focus**: Recruiter inbound acquisition and engineering publication distribution.
- **Target Metrics**:
  - Consistent top-tier rankings for "Vedant Singh Software Engineer", "Vedant Singh Wipro", "Vedant Singh Python".
  - Knowledge Panel formation or rich snippet breadcrumbs appearing in Google search results.
  - Inbound recruiter interview requests directly referencing case studies or GitHub repositories.
