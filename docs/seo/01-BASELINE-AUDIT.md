# Baseline Technical SEO, Crawlability & Entity Audit
**Website**: `https://www.sshconnect.space/`  
**Engineer / Entity**: Vedant Singh (GitHub: [@vineetvedant](https://github.com/vineetvedant))  
**Audit Date**: October 23, 2026  
**Auditor**: Principal Technical SEO Engineer & Search Architect  

---

## 1. Executive Summary

A comprehensive baseline audit of `https://www.sshconnect.space/` reveals a high-quality visual portfolio with strong engineering substance, but significant structural deficiencies in search engine crawlability, machine discoverability, canonical integrity, and entity resolution. 

While the aesthetic and user experience are well crafted, search engines (Google, Bing) and AI search engines (ChatGPT Search, Perplexity, Google AI Overviews) currently struggle to identify, parse, and rank Vedant Singh's engineering credentials due to:
1. Canonical URL divergence between the apex domain (`sshconnect.space` returning HTTP 308) and `www.sshconnect.space` (HTTP 200).
2. Complete absence of canonical `<link rel="canonical">` tags on the homepage and case study pages.
3. Complete absence of Schema.org JSON-LD structured data (`Person`, `WebSite`, `WebPage`, `TechArticle`, `SoftwareSourceCode`, `BreadcrumbList`).
4. An incomplete XML sitemap (`sitemap.xml`) referencing the redirected apex domain and omitting all 4 deep technical project case studies.
5. Incomplete Open Graph and Twitter Card metadata across all project case studies.
6. Absence of machine-readable AI indexing protocols (`/llms.txt`).

---

## 2. Technical Audit Findings by Category

### A. Crawlability & Canonical Host Routing (P0 — Critical)
| Check | Baseline State | Evaluation | Impact |
|---|---|---|---|
| **Primary Domain HTTP Status** | `https://www.sshconnect.space` returns HTTP 200 OK | ✅ Healthy | Serves content directly. |
| **Apex Domain HTTP Status** | `https://sshconnect.space` returns HTTP 308 Permanent Redirect | ⚠️ Redirect Active | Permanent redirect to `www.sshconnect.space`. |
| **robots.txt Sitemap Directive** | Points to `https://sshconnect.space/sitemap.xml` (apex) | ❌ Critical Defect | Directs bots to redirected domain, creating redirect chain for crawler. |
| **sitemap.xml `<loc>` tags** | Uses `https://sshconnect.space/` (apex) | ❌ Critical Defect | Contradicts canonical host. Search engines treat sitemap entries as self-referential canonical declarations. |
| **Canonical Tags in HTML** | **NONE** present in `index.html` or case studies | ❌ Critical Defect | Search engines must guess canonical URL; risk of duplicate indexing across CDN subdomains and preview URLs. |

### B. Indexability & XML Sitemap Coverage (P0 — Critical)
| URL Path | In sitemap.xml? | Crawl Depth from Root | Status |
|---|---|---|---|
| `/` (Homepage) | Yes (as apex) | Level 0 | Needs canonical host update |
| `/projects/gold-price-assistant.html` | **NO** | Level 1 | ❌ Orphaned from XML sitemap |
| `/projects/smart-email-automation.html` | **NO** | Level 1 | ❌ Orphaned from XML sitemap |
| `/projects/railway-accessibility.html` | **NO** | Level 1 | ❌ Orphaned from XML sitemap |
| `/projects/predictive-analytics.html` | **NO** | Level 1 | ❌ Orphaned from XML sitemap |
| `https://wordtohtml1.0.sshconnect.space/` | Yes | External Subdomain | Active live tool |

### C. Search Metadata & Social Graph (P1 — High Impact)
| Element | Baseline Homepage (`index.html`) | Baseline Project Pages (`projects/*.html`) | Defect Summary |
|---|---|---|---|
| **Title Tag** | `Vedant Singh — Software Engineer` (33 chars) | E.g. `Gold Price AI Assistant — Case Study \| Vedant Singh` | Homepage title is generic and lacks keyword clustering (Python Backend, Generative AI). |
| **Meta Description** | 165 chars, reasonable | 150–160 chars | Needs precise entity alignment and recruiter search triggers. |
| **Canonical Link** | **Missing** | **Missing** | High risk of duplicate content indexing. |
| **Open Graph (og:*)** | Only `og:title`, `og:description`, `og:type` | **Completely Missing** | Broken link previews on LinkedIn, Twitter, Slack, Discord. |
| **Twitter Card (twitter:*)** | **Missing** | **Missing** | Large preview cards fail to generate on X/Twitter. |
| **Robots Directive** | **Missing** | **Missing** | Defaults to generic crawler behavior instead of `max-image-preview:large`. |

### D. Structured Data & Entity Disambiguation (P0 — Critical)
| Schema Type | Expected Properties | Baseline Presence | Diagnostic Note |
|---|---|---|---|
| `Person` | `name`, `jobTitle`, `alumniOf`, `worksFor`, `knowsAbout`, `sameAs` | ❌ **0% Implemented** | Google cannot form a Knowledge Graph entity for "Vedant Singh". |
| `WebSite` | `url`, `name`, `author`, `potentialAction` | ❌ **0% Implemented** | Lacks authoritative site identity node. |
| `WebPage` | `isPartOf`, `about`, `description` | ❌ **0% Implemented** | Document entity context missing. |
| `TechArticle` | `headline`, `author`, `proficiencyLevel`, `dependencies` | ❌ **0% Implemented** | Project case studies are not recognized as engineering publications. |
| `SoftwareSourceCode` | `codeRepository`, `programmingLanguage`, `runtimePlatform` | ❌ **0% Implemented** | GitHub repository linkages are unstructured text only. |
| `BreadcrumbList` | Hierarchical item list linking subpages to root | ❌ **0% Implemented** | Search result breadcrumb rich snippets cannot render. |

### E. AI Search & Generative Engine Optimization (GEO) (P1 — High Impact)
- **`llms.txt`**: Missing. AI agents and LLM web retrievers (Perplexity, ChatGPT Search, Claude Search) do not have a curated markdown manifest of Vedant Singh's background, projects, and architecture decisions.
- **Entity Association**: The name "Vedant Singh" is shared by multiple individuals online. Without robust `sameAs` links to verified GitHub (`https://github.com/vineetvedant`) and LinkedIn (`https://www.linkedin.com/in/vedant-singh-2550b2202`) paired with explicit education (`SRM Institute of Science and Technology`) and employer history (`Wipro`, `CRIS`, `Altair`, `Tata Motors`), AI search models risk conflating or hallucinating credentials.

### F. Accessibility & Recruiter Conversion UX (P1 — High Impact)
- **Primary CTAs**:
  - Résumé folder (`https://drive.google.com/drive/folders/14rNZ_D5y9wB7CdtefBWi-kn0mF7DUnfV`): Functional and accessible.
  - Direct contact (`mailto:singhvineetvedant@gmail.com`): Functional and accessible.
  - GitHub (`https://github.com/vineetvedant`): Functional and accessible.
  - LinkedIn (`https://www.linkedin.com/in/vedant-singh-2550b2202`): Functional and accessible.
- **Conversion Tracking**: Zero event telemetry on outbound clicks (résumé downloads, LinkedIn profile visits, case study reads). Adding lightweight, privacy-respecting custom telemetry attributes allows tracking recruiter engagement without external tracking scripts.

---

## 3. Prioritized Defect Backlog

| ID | Priority | Category | Specific Issue | Remediation |
|---|---|---|---|---|
| **DEF-01** | **P0** | Crawlability | Missing canonical tags across all HTML pages | Inject canonical tags specifying `https://www.sshconnect.space/...` |
| **DEF-02** | **P0** | Crawlability | `robots.txt` points to redirected apex domain | Update Sitemap URL to `https://www.sshconnect.space/sitemap.xml` |
| **DEF-03** | **P0** | Indexing | `sitemap.xml` uses apex domain and omits 4 project case studies | Rebuild `sitemap.xml` with canonical URLs and all 4 case study pages |
| **DEF-04** | **P0** | Entity SEO | Zero JSON-LD Structured Data on homepage | Implement comprehensive `@graph` with `Person`, `WebSite`, `WebPage`, `ItemList` |
| **DEF-05** | **P0** | Entity SEO | Zero JSON-LD Structured Data on case studies | Implement `TechArticle`, `SoftwareSourceCode`, and `BreadcrumbList` on all 4 case studies |
| **DEF-06** | **P1** | Metadata | Homepage `<title>` lacks high-intent keywords | Refine to: `Vedant Singh — Software Engineer \| Python Backend & Generative AI` |
| **DEF-07** | **P1** | Social Graph | Missing Open Graph and Twitter Card tags across case studies | Inject complete Open Graph & Twitter Cards with fallback images |
| **DEF-08** | **P1** | AI Search | No `llms.txt` or machine-readable entity file | Generate `/llms.txt` and `/llms-full.txt` summarizing verified credentials |
| **DEF-09** | **P2** | Performance | Preconnect and font loading optimizations | Ensure `dns-prefetch` and `preconnect` headers exist for external fonts |
| **DEF-10** | **P2** | Recruiter UX | Lack of telemetry data attributes on recruitment CTAs | Add `data-track` conversion hooks for recruiter interactions |

---

## 4. Verification Baseline
- Local Build Command: `node build.js` (Exits with code 0).
- Static assembly folder: `dist/`.
- Ready for implementation of P0 and P1 fixes.
