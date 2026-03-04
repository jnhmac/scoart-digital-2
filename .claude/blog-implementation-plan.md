# Blog System Implementation Plan - Scoart Digital

> **Purpose**: Complete implementation guide for the blog system. Use this file to resume work across sessions.
> **Status**: PENDING APPROVAL - Not yet implemented
> **Created**: February 11, 2026
> **Project**: Scoart Digital (Next.js 14, static export, Netlify)

---

## Context

Scoart Digital needs a blog to establish thought leadership, drive organic traffic (SEO + GEO), and support lead generation for its 4 service areas: E-commerce Solutions, Marketplace Optimization, Custom Development, and Digital Marketing. The site is Next.js 14 with static export, deployed on Netlify, using a neo-brutalist design (shadow-brutal, border-2, accent-500 orange). No blog or MDX setup exists currently. Content will be managed as MDX files in the repo, published 1-2 times/month, with the content-creator skill generating articles.

---

## 1. Blog Categories (6 Sections)

| Category | Slug | Maps to Service | Content Focus |
|----------|------|-----------------|---------------|
| **E-commerce** | `ecommerce` | E-commerce Solutions | Shopify/WooCommerce guides, payment setup, US tax compliance, store optimization |
| **Marketplace** | `marketplace` | Marketplace Optimization | Amazon strategies, multi-platform selling, listing optimization, sponsored ads |
| **Development** | `development` | Custom Development | HubSpot implementation, CRM workflows, API integrations, tech tutorials |
| **Marketing** | `marketing` | Digital Marketing | SEO, GEO, PPC, ABM, email marketing, AI search visibility |
| **AI & Automation** | `ai-automation` | Cross-service | AI tools for business, marketing automation, ChatGPT/Perplexity optimization, GEO deep dives |
| **Industry Insights** | `industry-insights` | Cross-service | US market trends, e-commerce statistics, platform updates, tool comparisons, curated news |

**Tags** (cross-cutting, for filtering):
- `how-to`, `case-study`, `guide`, `news`, `tools`, `strategy`, `video`, `podcast`

---

## 2. Content Types & Media

| Type | Format | Frequency | Notes |
|------|--------|-----------|-------|
| **How-to Guides** | Long-form MDX (1500-3000 words) | 1/month | Primary SEO driver. Step-by-step with code/screenshots |
| **Industry Insights** | Medium MDX (800-1500 words) | 1/month | Trends, tool reviews, platform updates |
| **Case Studies** | Structured MDX template | Quarterly | Problem-solution-results format |
| **Video Embeds** | YouTube iframe in MDX | As available | Embed YouTube/Vimeo tutorials, no self-hosting |
| **Podcast References** | Link + summary cards | As available | Curate relevant industry podcasts with key takeaways |
| **News Roundups** | Curated links + commentary | Optional | Monthly roundup of industry developments |

---

## 3. Technical Implementation

### 3.1 MDX Setup

**Package**: `@next/mdx` + `gray-matter` for frontmatter parsing

**Why @next/mdx over alternatives:**
- Official Next.js package, best static export compatibility
- No build-time content layer needed (unlike Contentlayer which is unmaintained)
- Simple: MDX files in `content/blog/` directory, parsed at build time

**Content directory structure:**
```
content/
  blog/
    2026-02-15-shopify-us-market-guide.mdx
    2026-03-01-geo-optimization-ai-search.mdx
    ...
```

**MDX Frontmatter schema:**
```yaml
---
title: "How to Launch a Shopify Store for the US Market"
description: "Step-by-step guide to setting up a US-ready Shopify store with payments, tax, and shipping."
category: "ecommerce"
tags: ["how-to", "guide", "tools"]
author: "Scoart Digital"
date: "2026-02-15"
readTime: "8 min"
image: "/blog/shopify-us-guide/hero.jpg"  # optional hero image
video: "https://youtube.com/watch?v=..."  # optional video embed
featured: false
---
```

### 3.2 Image Storage

Blog images stored in `public/blog/` with per-post subfolders:

```
public/
  blog/
    shopify-us-guide/
      hero.jpg            # Hero/card image (1200x630 recommended for OG)
      screenshot-1.png    # In-article images
      diagram.png
    geo-optimization/
      hero.jpg
      comparison-chart.png
```

- Referenced in MDX as `/blog/shopify-us-guide/hero.jpg`
- Subfolder name matches the post slug
- Deployed as static assets by Netlify (zero cost)
- Content-creator skill outputs placeholder paths; drop in actual images before deploy

### 3.3 File Structure (New Files)

```
app/
  blog/
    page.js              # Blog listing page (all posts, category filter)
    [slug]/
      page.js            # Individual blog post page
    layout.js            # Blog metadata
components/
  blog/
    BlogCard.jsx         # Post card for listing grid
    BlogHero.jsx         # Blog listing hero section
    BlogPost.jsx         # Full post layout (article + sidebar)
    CategoryFilter.jsx   # Category pill filter bar
    NewsletterSignup.jsx # Email capture component
    TableOfContents.jsx  # Auto-generated TOC from headings
    RelatedPosts.jsx     # Related posts sidebar/footer
    ShareButtons.jsx     # Social share (LinkedIn, copy link)
    MediaEmbed.jsx       # YouTube/podcast embed component
content/
  blog/                  # MDX blog posts
lib/
  blog.js               # Blog utility functions (getAllPosts, getPostBySlug, getCategories)
```

### 3.4 Blog Listing Page (`/blog`)

**Layout:**
1. Hero section with "Insights & Resources" heading (matches site pattern)
2. Category filter pills (All, E-commerce, Marketplace, Development, Marketing, AI & Automation, Industry Insights)
3. Featured post (large card, top position) if any post has `featured: true`
4. Post grid (2-column on desktop, 1-column mobile)
5. Newsletter signup section at bottom

### 3.5 Blog Post Page (`/blog/[slug]`)

**Layout:**
1. Post header (title, date, category badge, read time, author)
2. Hero image (if provided)
3. Article body (MDX rendered with custom components)
4. Table of contents (sidebar on desktop, collapsible on mobile)
5. Related posts (2-3 posts from same category)
6. Newsletter signup CTA
7. Share buttons (LinkedIn, copy link)

### 3.6 Static Generation

```js
// lib/blog.js - core utility
// Reads all MDX files from content/blog/
// Parses frontmatter with gray-matter
// Returns sorted posts array
// generateStaticParams() in [slug]/page.js for static export
```

---

## 4. Design Approach

**Match existing neo-brutalist aesthetic. No new UI library (no shadcn/ui).**

Custom-build all blog components using existing design tokens:
- `border-2 border-dark-900 dark:border-dark-700` borders
- `shadow-brutal` / `shadow-brutal-sm` on cards
- `bg-accent-500` category badges
- `heading-xl`, `body-lg` typography classes
- Framer Motion scroll animations (whileInView, stagger)
- Dark mode support via semantic color system

**Blog Card design:**
```
┌─────────────────────────────┐
│  [Category Badge]           │
│                             │
│  Post Title (heading-md)    │
│  Description (body-base)    │
│                             │
│  Feb 15, 2026 · 8 min read  │
│  ─────────────────────────  │
│  Read More →                │
└─────────────────────────────┘
  (border-2, shadow-brutal on hover)
```

**Newsletter Signup:**
```
┌─────────────────────────────────────────┐
│  bg-dark-900, border-2 border-accent    │
│                                         │
│  "Stay Ahead of the Market"             │
│  "Get insights on US e-commerce..."     │
│                                         │
│  [email input] [Subscribe button]       │
│                                         │
│  "No spam. Unsubscribe anytime."        │
└─────────────────────────────────────────┘
```

Newsletter form: Netlify Forms for now (name="newsletter", fields: email only). Platform integration decided later.

### Key Design Files to Reference

- **Tailwind config**: `tailwind.config.js` — all design tokens (colors, shadows, typography)
- **Global styles**: `app/globals.css` — utility classes (heading-xl, body-lg, shadow-brutal, etc.)
- **ServicesGrid.jsx**: `components/ServicesGrid.jsx` — card pattern with border-2, shadow-brutal, hover effects
- **Footer.jsx**: `components/Footer.jsx` — semantic color usage pattern
- **About page**: `app/about/page.js` — section layout pattern with motion animations
- **Services page**: `app/services/page.js` — alternating grid layout, feature lists

---

## 5. Content-Creator Skill Workflow

**How content gets created:**

1. User runs: `@content-creator "How to optimize Shopify listings for US buyers" --category ecommerce --tags how-to,guide`
2. Content-creator skill:
   - Researches topic (web search, competitor analysis)
   - Generates SEO-optimized MDX with proper frontmatter
   - Includes GEO optimization (structured answers, statistics, expert formatting)
   - Saves to `content/blog/YYYY-MM-DD-slug.mdx`
3. User reviews, edits if needed
4. Build and deploy

**Content quality standards:**
- Every post includes statistics and data points (GEO citation-worthy)
- FAQ section at bottom (AI search snippet optimization)
- Internal links to relevant service pages
- Clear CTAs linking to `/contact`

---

## 6. Navigation & SEO Updates

**Header.jsx**: Add "Blog" to nav links array
**Footer.jsx**: Add "Blog" link under Company column
**Sitemap**: Add `/blog` and individual post URLs
**JSON-LD**: Add BlogPosting schema to each post page
**llms.txt**: Add blog section reference

---

## 7. Implementation Order

### Phase 1: Foundation (Core blog infrastructure)
1. Install `@next/mdx`, `gray-matter`, `remark-gfm` dependencies
2. Create `lib/blog.js` utility functions
3. Create `content/blog/` directory with 1 seed post
4. Build `app/blog/page.js` (listing page)
5. Build `app/blog/[slug]/page.js` (post page)
6. Build `app/blog/layout.js` (metadata)

### Phase 2: Components
7. Build `BlogCard.jsx` (post card)
8. Build `BlogHero.jsx` (listing hero)
9. Build `CategoryFilter.jsx` (category pills)
10. Build `BlogPost.jsx` (article layout)
11. Build `NewsletterSignup.jsx` (email capture via Netlify Forms)
12. Build `TableOfContents.jsx`
13. Build `RelatedPosts.jsx`
14. Build `MediaEmbed.jsx` (YouTube/podcast)

### Phase 3: Integration
15. Update Header.jsx (add Blog nav link)
16. Update Footer.jsx (add Blog link)
17. Update sitemap.xml
18. Add BlogPosting JSON-LD schema
19. Generate 2-3 seed blog posts using content-creator skill

### Phase 4: Deploy & Verify
20. Build and deploy
21. Verify all pages render correctly
22. Test dark mode, mobile, category filtering
23. Test newsletter form submission

---

## 8. Verification Checklist

- [ ] `npm run build` succeeds with all blog pages statically generated
- [ ] `/blog` shows listing with category filter working
- [ ] `/blog/[slug]` renders MDX content with proper styling
- [ ] Newsletter form captures email in Netlify Forms dashboard
- [ ] Dark mode works on all blog pages
- [ ] Mobile responsive layout verified
- [ ] Blog nav link appears in header/footer
- [ ] Lighthouse check on blog pages

---

## 9. Resume Instructions

**To continue this work in a new session:**

1. Read this file: `.claude/blog-implementation-plan.md`
2. Check which phases/steps are already completed (marked with ✅)
3. Continue from the next uncompleted step
4. Mark steps as completed as you go
5. After all phases complete, update Status at top to "COMPLETED"

**Key existing files to understand before implementing:**
- `tailwind.config.js` — design tokens
- `app/globals.css` — utility classes
- `components/ServicesGrid.jsx` — card component pattern
- `components/Header.jsx` — navigation structure
- `components/Footer.jsx` — footer link structure
- `app/layout.js` — root layout with JSON-LD
- `next.config.mjs` — Next.js config (needs MDX plugin)
- `public/llms.txt` — LLM training data (needs blog reference)
