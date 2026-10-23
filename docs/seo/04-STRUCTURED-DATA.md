# Schema.org Structured Data Architecture & Entity Graph
**Target URL**: `https://www.sshconnect.space/`  
**Entity**: Vedant Singh  
**Document**: 04-STRUCTURED-DATA.md  
**Format**: JSON-LD (JavaScript Object Notation for Linked Data)  

---

## 1. Entity Disambiguation Strategy

Search engines face an entity disambiguation challenge with common names like "Vedant Singh". Without linked data, search algorithms cannot conclusively tie the software engineering portfolio at `sshconnect.space` to the GitHub profile `@vineetvedant`, the LinkedIn profile, the SRM Institute degree, or enterprise experience at Wipro.

We solve this using **Schema.org Linked Data (@graph architecture)**:
1. Establish a single, persistent entity URI: `https://www.sshconnect.space/#person`.
2. Connect verified external profiles using `sameAs` array:
   - GitHub: `https://github.com/vineetvedant`
   - LinkedIn: `https://www.linkedin.com/in/vedant-singh-2550b2202`
   - Resume Folder: `https://drive.google.com/drive/folders/14rNZ_D5y9wB7CdtefBWi-kn0mF7DUnfV`
3. Anchor verified credentials:
   - Current Employer: `Wipro` (`worksFor`)
   - Alma Mater: `SRM Institute of Science and Technology` (`alumniOf`)
   - Primary Specializations: `knowsAbout`
4. Connect every case study page (`projects/*.html`) back to the parent `Person` entity as author and publisher.

---

## 2. Homepage Entity Graph (`index.html`)

Implemented via `<script type="application/ld+json">`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.sshconnect.space/#person",
      "name": "Vedant Singh",
      "givenName": "Vedant",
      "familyName": "Singh",
      "url": "https://www.sshconnect.space/",
      "jobTitle": "Software Engineer",
      "email": "mailto:singhvineetvedant@gmail.com",
      "nationality": "Indian",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Delhi",
        "addressCountry": "IN"
      },
      "worksFor": {
        "@type": "Organization",
        "name": "Wipro"
      },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "SRM Institute of Science and Technology"
      },
      "knowsAbout": [
        "Python",
        "Generative AI",
        "Retrieval-Augmented Generation (RAG)",
        "FastAPI",
        "Cloud Computing",
        "High-Performance Computing",
        "Docker",
        "Computer Vision",
        "Automation Engineering",
        "RESTful APIs"
      ],
      "sameAs": [
        "https://github.com/vineetvedant",
        "https://www.linkedin.com/in/vedant-singh-2550b2202",
        "https://drive.google.com/drive/folders/14rNZ_D5y9wB7CdtefBWi-kn0mF7DUnfV"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.sshconnect.space/#website",
      "url": "https://www.sshconnect.space/",
      "name": "Vedant Singh — Software Engineer Portfolio",
      "description": "Official software engineering portfolio, production deployments, and technical case studies for Vedant Singh.",
      "publisher": {
        "@id": "https://www.sshconnect.space/#person"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "ProfilePage",
      "@id": "https://www.sshconnect.space/#webpage",
      "url": "https://www.sshconnect.space/",
      "name": "Vedant Singh — Software Engineer | Python Backend & Generative AI",
      "isPartOf": {
        "@id": "https://www.sshconnect.space/#website"
      },
      "about": {
        "@id": "https://www.sshconnect.space/#person"
      },
      "mainEntity": {
        "@id": "https://www.sshconnect.space/#person"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "ItemList",
      "@id": "https://www.sshconnect.space/#projects",
      "name": "Featured Software Engineering Case Studies",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "SoftwareSourceCode",
            "name": "Gold Price Conversational AI Assistant",
            "description": "Dual-API RAG system combining ChromaDB vector retrieval, Ollama DeepSeek R1 reasoning, and idempotent purchase settlement.",
            "url": "https://www.sshconnect.space/projects/gold-price-assistant.html",
            "codeRepository": "https://github.com/vineetvedant/Gold-Price-Conversational-AI-Assistant",
            "programmingLanguage": "Python",
            "author": { "@id": "https://www.sshconnect.space/#person" }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "SoftwareSourceCode",
            "name": "Smart Email Automation with Mistral-7B",
            "description": "Automated outreach pipeline integrating Tesseract OCR document parsing, Mistral-7B text refinement, and rate-limited Windows COM Outlook dispatching.",
            "url": "https://www.sshconnect.space/projects/smart-email-automation.html",
            "codeRepository": "https://github.com/vineetvedant/smart_emai_cold_mail",
            "programmingLanguage": "Python",
            "author": { "@id": "https://www.sshconnect.space/#person" }
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "SoftwareSourceCode",
            "name": "Accessible Railway Ticketing System",
            "description": "Inclusive ticketing interface prototype developed for CRIS converting UTS booking data into Grade-1 Braille Unicode for visually impaired passengers.",
            "url": "https://www.sshconnect.space/projects/railway-accessibility.html",
            "codeRepository": "https://github.com/vineetvedant/Empowering-Accessibility-A-GUI-Based-Ticket-Reservation-System-for-the-Visually-Impaired-with-Real-",
            "programmingLanguage": "Python",
            "author": { "@id": "https://www.sshconnect.space/#person" }
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "SoftwareSourceCode",
            "name": "Data Visualisation & Predictive Analytics Dashboard",
            "description": "Interactive Streamlit intelligence dashboard featuring 6 dynamic Plotly visual representations and an embedded Scikit-learn Random Forest Regressor.",
            "url": "https://www.sshconnect.space/projects/predictive-analytics.html",
            "codeRepository": "https://github.com/vineetvedant/Data_Visualisation",
            "programmingLanguage": "Python",
            "author": { "@id": "https://www.sshconnect.space/#person" }
          }
        }
      ]
    }
  ]
}
```

---

## 3. Project Case Study Schemas (`TechArticle` & `SoftwareSourceCode`)

Every case study page implements three linked entities:
1. `TechArticle`: Explains the engineering implementation, architecture, dependencies, and author attribution.
2. `SoftwareSourceCode`: Connects the case study to the exact open-source GitHub repository URL and programming language.
3. `BreadcrumbList`: Enables search engines to render navigational breadcrumbs in SERPs: `Home > Featured Work > [Case Study Name]`.

### Case Study Schema Matrix

| Page URL | Schema Types | Key Dependencies / Code Repository |
|---|---|---|
| `/projects/gold-price-assistant.html` | `TechArticle`, `SoftwareSourceCode`, `BreadcrumbList` | Python, FastAPI, ChromaDB, Ollama (`deepseek-r1:1.5b`), ONNX Runtime |
| `/projects/smart-email-automation.html` | `TechArticle`, `SoftwareSourceCode`, `BreadcrumbList` | Python, PyWin32 COM, PyTesseract OCR, Mistral-7B, OpenRouter |
| `/projects/railway-accessibility.html` | `TechArticle`, `SoftwareSourceCode`, `BreadcrumbList` | Python, Tkinter, Grade-1 Braille Unicode Engine (CRIS) |
| `/projects/predictive-analytics.html` | `TechArticle`, `SoftwareSourceCode`, `BreadcrumbList` | Python, Streamlit, Plotly Express, Scikit-learn Random Forest |

---

## 4. Validation & Schema.org Compliance

All generated JSON-LD blocks have been validated against Schema.org and Google Search Central structured data specifications:
- Zero syntax errors (valid RFC 8259 JSON).
- Standard property types (no fabricated or unsupported properties).
- Self-contained entity graph (`@graph`) preventing nested reference fragmentation.
- Deterministic `@id` URIs allowing cross-document reference.
