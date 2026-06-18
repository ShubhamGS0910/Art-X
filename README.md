# Jagdamb Sourcing Solutions — Website

A 13-page, production-ready static website for Jagdamb Sourcing Solutions
(industrial land, vendor sourcing, factory setup, project management, and
investor advisory). Plain HTML/CSS/JS — no build step, no server, no
database, no hosting cost.

## What's included

```
index.html                          Home
about.html                          About Us
services.html                       Services overview (hub)
services-land-sourcing.html         Service detail
services-vendor-sourcing.html       Service detail
services-factory-setup.html         Service detail
services-project-management.html   Service detail
services-investor-advisory.html     Service detail
industrial-land.html                Property marketplace with filters
vendors.html                        Vendor directory with filters
register-vendor.html                Vendor registration form
blog.html                           Blog listing stub + newsletter signup
contact.html                        Consultation booking + contact info
css/main.css                        All styling (design tokens at the top)
js/main.js                          Nav, scroll animation, counters, FAQ, forms
robots.txt, sitemap.xml             SEO basics
_build-scripts/                     Python scripts that generated the pages
                                     (kept so you can regenerate/extend pages later;
                                     not needed to host the site — safe to delete)
```

## Design concept

"Surveyed Ground" — deep navy + steel grey + muted gold, with a recurring
corner-bracket motif (like a surveyor's marked plot corner) and
coordinate/mono-spaced data styling, since this is a land-sourcing company.
Fonts: Big Shoulders (headlines), Inter (body), JetBrains Mono (data/labels),
all loaded free from Google Fonts.

## Before you go live — 3 things to configure

1. **Formspree form IDs.** Forms currently point to
   `https://formspree.io/f/YOUR_FORM_ID` in three files: `contact.html`,
   `register-vendor.html`, and `blog.html`. Go to
   [formspree.io](https://formspree.io), create a free account (50
   submissions/month free), create a form, and replace `YOUR_FORM_ID` in
   each file with your real endpoint. You can use one form ID for all three,
   or separate ones if you want them to land in different inboxes/sheets.

2. **WhatsApp number.** Open `js/main.js` and replace the placeholder phone
   number in the `waLink()` function:
   ```js
   const phone = '919999999999'; // replace with your real WhatsApp Business number
   ```
   Use the full number with country code, digits only, no `+` or spaces
   (e.g. a Mumbai number `98765 43210` becomes `919876543210`).

3. **Real contact details.** Search-and-replace these placeholders across
   all files: `info@jagdambsourcing.com`, `+91 99999 99999`, and the
   `www.jagdambsourcing.com` domain in canonical tags (update once you have
   a real domain, or just leave as relative if you're not using SEO meta
   yet).

Everything else — copy, property listings, vendor categories, FAQs — is
real placeholder content you can edit directly in the HTML, since there's
no CMS or database here (per the "100% free" requirement, this avoids any
backend hosting cost).

## How to host this for free

### Option A: GitHub Pages (recommended, what you asked for)

1. Create a new GitHub repository (public or private).
2. Upload all files in this folder to the repo root (drag-and-drop on
   GitHub web works fine, or use git):
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`. Save.
5. Wait 1-2 minutes. Your site will be live at:
   `https://YOUR_USERNAME.github.io/YOUR_REPO/`
6. Optional: add a custom domain under the same Pages settings if you buy
   one later — GitHub Pages supports this free too (you only pay for the
   domain itself, not hosting).

### Option B: Netlify or Vercel (also free, slightly easier)

Drag the whole folder onto [app.netlify.com/drop](https://app.netlify.com/drop)
or connect the GitHub repo on [vercel.com](https://vercel.com) — both
auto-deploy static sites at no cost and give you a free `*.netlify.app` or
`*.vercel.app` URL immediately.

## What's intentionally NOT included (and why)

The original brief specified React + Vite, Node/Express, PostgreSQL, JWT
auth, a full admin CRM, AI chatbot, and AI property/vendor matching engines.
Building and *hosting* that stack is not free — a database and backend
server need paid hosting (Railway, Render, Supabase, etc. all have free
tiers but with real limits, and they're not "host on GitHub" since GitHub
Pages only serves static files).

This build gives you the entire front-of-house experience — every page,
every section, every piece of copy from your spec — running on pages and
forms that cost nothing and need no server. When you're ready to add real
accounts, a vendor/property database, or AI matching, that's a distinct
second phase with its own hosting decision, and I'm happy to help scope
that whenever you want.

## Validation performed

- All 13 pages pass strict HTML5 validation (W3C-based validator, zero
  errors)
- All internal links verified to resolve to real files (zero broken links)
- CSS verified for balanced braces and that every custom property used is
  defined
- JS verified for syntax errors (main.js and the two inline filter scripts
  on `industrial-land.html` and `vendors.html`)
- Every page has a unique title, meta description, canonical tag, single
  H1, and lang attribute
