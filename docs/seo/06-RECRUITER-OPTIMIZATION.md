# Technical Recruiter & Engineering Leader Conversion Optimization
**Entity**: Vedant Singh  
**Primary Domain**: `https://www.sshconnect.space/`  
**Document**: 06-RECRUITER-OPTIMIZATION.md  
**Audience**: Technical Sourcing Specialists, Recruitment Partners, Engineering Directors  

---

## 1. The 10-Second Recruiter Evaluation Framework

Technical recruiters and hiring managers spend an average of 6 to 15 seconds scanning an engineering portfolio before deciding whether to advance a candidate or bounce. They look for 5 specific signals:
1. **Identity & Role Match**: Who is this candidate, and what is their primary engineering archetype? (Software Engineer · Python Backend & Generative AI).
2. **Current Seniority & Employer Context**: Where do they currently work? (Wipro · Associate Analyst, previously GET).
3. **Proof of Hands-on Code**: Can I see real repositories, or is it just marketing claims? (GitHub `@vineetvedant` with active repositories and deep case studies).
4. **Relevant Tech Stack**: Do they know the frameworks we need? (FastAPI, Docker, ChromaDB, RAG, Linux, PyTorch, Scikit-learn).
5. **Frictionless Action Channels**: How do I download their resume or contact them immediately? (Prominent Résumé folder and direct email CTAs).

---

## 2. Information Architecture & Content Hierarchy

The website layout strictly follows the recruiter discovery funnel:

```
[ Top Navigation Bar ]
  ├── Brand: Vedant Singh (SE / AI)
  ├── Fast Anchor Links: Work | Live Tools | Repositories | Experience | Certs | About
  └── High-Priority Action Pills: [ Résumé ↗ ] | [ Let's talk ↗ ]

[ Hero Section — 0-5 seconds ]
  ├── Location & Focus Tag: [ SOFTWARE ENGINEER · DELHI, INDIA ]
  ├── Semantic H1: Building software that does the work
  ├── Positioning: Python backend systems, APIs, automation pipelines, and applied AI
  └── Direct Action: [ Explore featured work ↓ ] | [ GitHub Profile ↗ ]

[ Live Tools & Production Deployments — Proof of Execution ]
  ├── Real production subdomain tools (e.g. Word to HTML at wordtohtml1.0.sshconnect.space)
  └── Concrete telemetry metrics: Zero retention, <40ms edge latency, Docker proxy

[ Featured Case Studies — Technical Depth ]
  ├── 4 deep case studies detailing architecture, tradeoffs, challenges, and code
  └── Direct link to verified GitHub repositories

[ Experience Timeline — Career Trajectory ]
  ├── 2026 — Present: Wipro (Associate Analyst)
  ├── 2025: Altair Engineering (HPC Intern)
  ├── 2024 — 2025: Proeffico Solutions (Machine Learning Engineer)
  ├── 2024: Tata Motors (Engineering Intern)
  └── 2023: CRIS (Summer Intern)

[ Certifications & Research — Academic & Credential Rigor ]
  ├── ICAIN 2025 · Springer LNNS Research Publication
  └── Verified credentials (NPTEL Cloud Computing, Cisco Cybersecurity, IBM Analytics, NCC 'C')

[ Footer — Permanent Conversion Station ]
  ├── Massive Headline: "Have something worth building?"
  ├── Direct email mailto:singhvineetvedant@gmail.com
  ├── Résumé Google Drive folder
  └── Direct LinkedIn & GitHub links
```

---

## 3. Recruiter Conversion Funnel Optimization

### A. Résumé Accessibility
- **Current Location**: Linked in the floating top navigation bar (`.header-resume-btn`), mobile navigation drawer, hero section, and footer CTA row.
- **Destination**: Direct link to verified Google Drive official documents repository: `https://drive.google.com/drive/folders/14rNZ_D5y9wB7CdtefBWi-kn0mF7DUnfV`.
- **UX Enhancement**: `target="_blank"` with `rel="noopener"` prevents losing the visitor's place on the portfolio site.

### B. Contact Accessibility
- **Primary Channel**: `mailto:singhvineetvedant@gmail.com`.
- **Pre-filled Subject Recommendation**:
  Recruiters can click the button directly from desktop or mobile to launch their mail client with zero friction.
- **Location Transparency**: "Delhi, India" is explicitly highlighted alongside relocation readiness and remote-friendly availability.

### C. GitHub Repository Verification
- Unlike portfolios with broken or empty GitHub links, every project links directly to its verified repository under `github.com/vineetvedant`.
- Each project card features star counts, confirmed technologies, and explicit case study documentation.

---

## 4. Mobile Recruiter Experience
- Over 45% of recruiter outreach starts on mobile devices (LinkedIn app, email links).
- **Sticky Pill Navigation**: Minimalist floating header with accessible hamburger toggle (`aria-expanded`, `aria-controls="primaryNav"`).
- **Touch Targets**: All navigation links, buttons, and case study triggers meet or exceed the W3C 44×44px minimum touch target size.
- **Fast Scrolling**: Smooth CSS scroll snapping and zero render-blocking layout shifts (CLS < 0.05).
