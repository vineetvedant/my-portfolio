# Production Deployment, Edge Routing & Indexing Checklist
**Target Domain**: `https://www.sshconnect.space/`  
**Engineer**: Vedant Singh  
**Document**: 11-DEPLOYMENT-CHECKLIST.md  
**Status**: Ready for Production Release  

---

## 1. Pre-Deployment Engineering Gates

Before releasing to production, verify each gate item:

- [x] **Local Build Execution**: `node build.js` completes with exit code 0.
- [x] **Dist Output Assembly**: All 14 root assets and 4 project case studies verified in `dist/`.
- [x] **Design Preservation**: Visual identity, brutalist typography, time-loop hero reels, animations, and toast notifications fully intact.
- [x] **Canonical URLs**: Canonical links point explicitly to `https://www.sshconnect.space/...`.
- [x] **Robots Configuration**: `robots.txt` points to `https://www.sshconnect.space/sitemap.xml` and welcomes standard & AI crawlers.
- [x] **Sitemap Integrity**: `sitemap.xml` contains all 6 indexable endpoints with valid dates and priorities.
- [x] **JSON-LD Structured Data**: Validated on `index.html` (Person, WebSite, ProfilePage, ItemList) and all 4 case study pages (TechArticle, SoftwareSourceCode, BreadcrumbList).
- [x] **AI Manifests**: `/llms.txt` and `/llms-full.txt` present in root with permissive CORS headers.
- [x] **Social Metadata**: Open Graph and Twitter Card tags complete with fallback image assets.
- [x] **404 Handling**: `404.html` includes `<meta name="robots" content="noindex, follow" />`.
- [x] **Security Headers**: No secrets exposed; `_headers` and `vercel.json` configured with security headers and immutable asset caching.

---

## 2. Git & Version Control Sync Procedure

To synchronize changes to GitHub repository `vineetvedant/my-portfolio`:

```powershell
# 1. Run local build to assemble dist/
node build.js

# 2. Stage all modifications and SEO documentation
git add -A

# 3. Commit with semantic commit message
git commit -m "feat(seo): complete technical SEO, Schema.org structured data, llms.txt, and canonical sitemap overhaul"

# 4. Push to main branch
git push origin main

# 5. Sync gh-pages branch (for Cloudflare Pages / GitHub Pages build parity)
git push origin main:gh-pages --force
```

---

## 3. Post-Deployment Verification Commands

Once deployed to Vercel and Cloudflare Pages, run these verification checks:

### A. Verify Canonical Host & Sitemap Response
```powershell
# Check canonical homepage response
Invoke-WebRequest -Uri "https://www.sshconnect.space" -Method Head | Select-Object StatusCode

# Check sitemap.xml returns 200 and application/xml
Invoke-WebRequest -Uri "https://www.sshconnect.space/sitemap.xml" -Method Head | Select-Object StatusCode, Headers

# Check robots.txt returns 200
Invoke-WebRequest -Uri "https://www.sshconnect.space/robots.txt" -Method Head | Select-Object StatusCode

# Check llms.txt returns 200
Invoke-WebRequest -Uri "https://www.sshconnect.space/llms.txt" -Method Head | Select-Object StatusCode, Headers
```

### B. Verify Project Case Studies
```powershell
$projects = @(
  "gold-price-assistant.html",
  "smart-email-automation.html",
  "railway-accessibility.html",
  "predictive-analytics.html"
)

foreach ($p in $projects) {
  $url = "https://www.sshconnect.space/projects/$p"
  $res = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing
  Write-Host "$url : $($res.StatusCode)"
}
```

---

## 4. Search Engine Notification & Ping

Once live on production:
1. **Google Search Console**:
   - Open GSC -> Sitemaps -> Submit `https://www.sshconnect.space/sitemap.xml`.
   - Use URL Inspection on `https://www.sshconnect.space/` and click **Request Indexing**.
   - Inspect one project URL (e.g. `https://www.sshconnect.space/projects/gold-price-assistant.html`) and click **Request Indexing**.
2. **Bing Webmaster Tools**:
   - Resync sitemap from Google Search Console.
3. **LinkedIn & Twitter Cache Invalidation**:
   - Test `https://www.sshconnect.space/` in the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to clear the old metadata cache and verify the new high-resolution preview image.
