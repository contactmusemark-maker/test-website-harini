# Production-Ready Code Fixes

## CRITICAL FIXES (Apply Immediately)

### Fix #1: Update Sitemap Generation Script
**File:** `artifacts/glambyharini/scripts/generate-seo-pages.mjs`
**Issue:** Sitemap missing all service pages

**Find the writeSitemap() function and replace:**

```javascript
function writeSitemap() {
  const urls = [
    { loc: siteUrl, priority: "1.0" },
    ...pages.map((page) => ({ loc: absoluteUrl(`/${page.slug}`), priority: "0.9" })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) =>
      `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${url.priority === "1.0" ? "weekly" : "monthly"}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);
  console.log(`✅ Sitemap generated with ${urls.length} URLs`);
}
```

---

### Fix #2: Update 404 Page with SEO and Navigation
**File:** `artifacts/glambyharini/src/pages/not-found.tsx`
**Replace entire file with:**

```tsx
import { useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { navigateTo, type PortalRoute } from '@/lib/portal-route';
import SeoHead from '@/components/SeoHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { AlertCircle, Home, Search } from 'lucide-react';

export default function NotFound() {
  const { user } = useAuth();

  useEffect(() => {
    // Set HTTP status code to 404 for search engines
    if (typeof window !== 'undefined') {
      document.title = '404 - Page Not Found | Glam By Harini';
    }
  }, []);

  return (
    <div>
      <SeoHead path="/404" />
      <Navbar />
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#f3f3f3] to-[#fffaf6] px-4">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-100 rounded-full">
              <AlertCircle className="h-12 w-12 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-[#211d1b] mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-[#5f5651] mb-4">Page Not Found</h2>
          
          <p className="text-[#8b7d78] mb-8 leading-relaxed">
            We couldn't find the page you're looking for. It may have been moved or 
            the link might be broken. Let's get you back on track.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => navigateTo('/' as PortalRoute)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-sm uppercase tracking-[0.18em] text-white transition hover:bg-[#a56f63]"
            >
              <Home size={18} />
              Back to Home
            </button>
            
            <button
              onClick={() => navigateTo('/booking' as PortalRoute)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 px-6 py-3 font-mono text-sm uppercase tracking-[0.18em] text-[#211d1b] transition hover:border-primary hover:bg-primary/5"
            >
              <Search size={18} />
              Book Now
            </button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-[#d8b66d]/20">
            <p className="text-sm text-[#8b7d78] mb-4">Need help?</p>
            <a
              href="https://wa.me/917305306497"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm font-semibold"
            >
              Contact us on WhatsApp →
            </a>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
```

---

### Fix #3: Remove maximum-scale from Viewport Meta Tag
**File:** `artifacts/glambyharini/index.html`
**Find line:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
```

**Replace with:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

---

### Fix #4: Create .env.example File
**File:** Create `artifacts/glambyharini/.env.example`

```
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Analytics
VITE_GA4_ID=G-XXXXXXXXXX
```

---

### Fix #5: Create .env.example for Root
**File:** Create `.env.example`

```
# API Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://...

# Supabase Admin (Backend Only - Never expose in frontend)
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Deployment
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Also document in README.md** that .env files are required for deployment.

---

### Fix #6: Add DNS Prefetch to index.html
**File:** `artifacts/glambyharini/index.html`
**Add after existing `<link>` tags in `<head>`:**

```html
<!-- DNS Prefetch for External Resources -->
<link rel="dns-prefetch" href="https://images.pexels.com" />
<link rel="preconnect" href="https://cdn.jsdelivr.net" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Preload Critical Resources -->
<link rel="preload" as="font" href="https://fonts.googleapis.com/css2?family=...&display=swap" crossorigin />
```

---

### Fix #7: Fix Instagram Section Alt Text
**File:** `artifacts/glambyharini/src/components/InstagramSection.tsx`
**Find line 135:**

```tsx
<img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
```

**Replace with:**

```tsx
<img 
  src={src} 
  alt="Glam By Harini Instagram gallery" 
  className="h-full w-full object-cover" 
  loading="lazy" 
/>
```

---

### Fix #8: Add Language and Locale Meta Tags
**File:** `artifacts/glambyharini/index.html`
**Add to `<head>` section:**

```html
<!-- Language and Locale -->
<meta property="og:locale" content="en_IN" />
<meta property="og:locale:alternate" content="ta_IN" />
<html lang="en">

<!-- Twitter Creator -->
<meta name="twitter:creator" content="@glam_byharini" />
```

---

## HIGH PRIORITY FIXES (Apply in Next Sprint)

### Fix #9: Add OG Image Dimensions
**File:** `artifacts/glambyharini/src/components/SeoHead.tsx`
**In the metaTags object, update:**

```tsx
const metaTags: Record<string, string> = {
  'meta[property="og:type"]': "website",
  'meta[property="og:site_name"]': "Glam By Harini",
  'meta[property="og:title"]': title,
  'meta[property="og:description"]': description,
  'meta[property="og:url"]': canonical,
  'meta[property="og:image"]': image,
  'meta[property="og:image:alt"]': page ? `${page.serviceName} by Glam By Harini` : "Glam By Harini bridal makeup artist in Chennai",
  // ADD THESE LINES:
  'meta[property="og:image:width"]': "1200",
  'meta[property="og:image:height"]': "630",
  'meta[property="og:image:type"]': "image/webp",
  'meta[name="twitter:card"]': "summary_large_image",
  'meta[name="twitter:title"]': title,
  'meta[name="twitter:description"]': description,
  'meta[name="twitter:image"]': image,
  'meta[name="twitter:creator"]': "@glam_byharini",
};
```

---

### Fix #10: Sanitize dangerouslySetInnerHTML in Chart Component
**File:** `artifacts/glambyharini/src/components/ui/chart.tsx`
**Find the dangerouslySetInnerHTML usage and replace with safe alternative:**

```tsx
// BEFORE (Unsafe):
dangerouslySetInnerHTML={{
  __html: `...`
}}

// AFTER (Safe):
// Use a library like DOMPurify or avoid innerHTML entirely
import DOMPurify from 'dompurify';

dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(content)
}}
```

**Or better:** Replace with React components instead of dangerouslySetInnerHTML.

---

### Fix #11: Add Error Boundary to App
**File:** Create `artifacts/glambyharini/src/components/ErrorBoundary.tsx`

```tsx
import React, { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
              <p className="text-gray-600 mb-4">Please refresh the page and try again.</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

**Then wrap in App.tsx:**

```tsx
<ErrorBoundary>
  <Suspense fallback={<SectionFallback />}>
    <Services />
    {/* ... rest of components */}
  </Suspense>
</ErrorBoundary>
```

---

### Fix #12: Add Focus Visible Styles
**File:** `artifacts/glambyharini/src/index.css`
**Add to global styles:**

```css
/* Accessibility: Focus Visible for Keyboard Navigation */
:focus-visible {
  outline: 2px solid var(--primary-color, #d8b66d);
  outline-offset: 2px;
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid #d8b66d;
  outline-offset: 2px;
}
```

---

### Fix #13: Add Content Security Policy Headers
**If deploying to Netlify:** Create `artifacts/glambyharini/netlify.toml`

```toml
[[headers]]
for = "/*"
[headers.values]
  X-Content-Type-Options = "nosniff"
  X-Frame-Options = "DENY"
  X-XSS-Protection = "1; mode=block"
  Strict-Transport-Security = "max-age=31536000; includeSubDomains"
  Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; font-src 'self' https:; connect-src 'self' https:;"
```

**If deploying to Vercel:** Create `artifacts/glambyharini/vercel.json`

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}
```

---

### Fix #14: Add 404 Handling in Vite Config
**File:** `artifacts/glambyharini/vite.config.ts`
**Ensure this is set in server config:**

```ts
server: {
  port,
  strictPort: true,
  host,
  allowedHosts: true,
  fs: {
    strict: true,
  },
  // ADD FOR SPA 404 HANDLING:
  middlewareMode: false,
},
```

**And ensure index.html has proper fallback setup** (already configured with Wouter routing).

---

## DEPLOYMENT CONFIGURATION FILES

### Create: `artifacts/glambyharini/_headers` (For Netlify)

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Strict-Transport-Security: max-age=31536000; includeSubDomains

/index.html
  Cache-Control: no-cache, must-revalidate, max-age=0

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js /*.css
  Cache-Control: public, max-age=31536000, immutable
```

---

### Create: `artifacts/glambyharini/_redirects` (For Netlify SPA)

```
/* /index.html 200
```

---

## ENVIRONMENT VARIABLES TO DOCUMENT

Create a `DEPLOYMENT.md` file:

```markdown
# Deployment Guide

## Required Environment Variables

### Frontend (.env)
```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Backend (.env)
```
PORT=3000
NODE_ENV=production
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=your-database-url
```

## Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations run
- [ ] Supabase RLS policies verified
- [ ] SSL certificate configured
- [ ] Email notifications set up
- [ ] Backup strategy in place
- [ ] Monitoring configured
```

---

## VERIFICATION CHECKLIST

After applying fixes, verify:

- [ ] Run `pnpm run build` successfully
- [ ] Sitemap.xml contains 8 URLs (home + 7 services)
- [ ] Service pages accessible via direct URLs
- [ ] 404 page renders with navigation options
- [ ] Viewport meta tag updated (zoom enabled)
- [ ] .env.example files created
- [ ] DNS prefetch links added
- [ ] Security headers present in deployment
- [ ] All OG meta tags present
- [ ] No console errors or warnings
- [ ] Lighthouse score > 85 (Performance)
- [ ] All accessibility tests pass

---

## TESTING COMMANDS

```bash
# Build verification
pnpm run build

# TypeScript check
pnpm run typecheck

# SEO validation
npm install -g lighthouse
lighthouse https://glambyharini.in --view

# Security headers check
curl -I https://glambyharini.in | grep -i "x-content\|x-frame\|x-xss\|strict-transport"

# Sitemap validation
curl https://glambyharini.in/sitemap.xml | xmllint --format -

# DNS prefetch verification
curl -I https://glambyharini.in | grep -i "link"
```

---

## NEXT STEPS FOR PRODUCTION LAUNCH

1. Apply all CRITICAL fixes first (6 items)
2. Run full build and test
3. Deploy to staging environment
4. Apply HIGH PRIORITY fixes (8 items)
5. Run Lighthouse audit
6. Test on real devices (mobile, tablet, desktop)
7. Verify analytics tracking
8. Set up monitoring and alerts
9. Schedule post-launch review (1 week)
10. Begin monitoring 404s and errors

---

## PERFORMANCE OPTIMIZATION ROADMAP

**Week 1:** Critical/High fixes
**Week 2:** Performance optimization (image optimization, bundle analysis)
**Week 3:** Analytics setup and monitoring
**Week 4:** Content expansion (blog posts, city pages)
**Ongoing:** Monthly SEO audits, security updates, A/B testing
