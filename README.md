# LeadCom 2026 landing page

Next.js (App Router, TypeScript) landing page for LeadCom 2026, 14 November 2026, The Westin Chennai Velachery.
Styled only with the Toastmasters brand palette (Loyal Blue, True Maroon, Cool Gray, Fair Gray, white) and the brand typefaces' free alternates (Montserrat for Gotham, Source Sans 3 for Myriad Pro).

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
```

Requires Node.js 20 or newer.

## What to edit

All copy, dates and links live in `lib/event.ts`.

| Setting | Where |
| --- | --- |
| Registration link (Google Form, Microsoft Forms, Luma) | `registerUrl` in `lib/event.ts`, or env var `NEXT_PUBLIC_REGISTER_URL` |
| Contact email | `contactEmail`, or env var `NEXT_PUBLIC_CONTACT_EMAIL` |
| Public URL (for link previews) | `siteUrl`, or env var `NEXT_PUBLIC_SITE_URL` |
| Programme | `programme` array |
| Benefits | `benefits` array |

Until a registration link or contact email is set, the page shows "Registration details will be shared shortly" instead of a button. Set one before you share the page.

Other files: `public/leadcom-2026.ics` (Add to calendar), `app/opengraph-image.tsx` (the preview image on WhatsApp and LinkedIn), `public/pattern-*.svg` (cool gray pattern).

## Put it on GitHub

1. Sign in at github.com, click **+ > New repository**. Name it `leadcom-2026`. Choose Private (or Public), and do not add a README, .gitignore or licence.
2. In a terminal, from this folder:

```bash
git init
git add .
git commit -m "LeadCom 2026 landing page"
git branch -M main
git remote add origin https://github.com/<your-username-or-org>/leadcom-2026.git
git push -u origin main
```

## Deploy on Vercel as a separate project

1. Go to vercel.com/new and choose **Import Git Repository**. If GitHub is not connected, authorise Vercel and grant access to the `leadcom-2026` repo.
2. Select the repo. Vercel detects Next.js, so leave the defaults (build `next build`, output default).
3. Under **Environment Variables**, optionally add `NEXT_PUBLIC_REGISTER_URL`, `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_SITE_URL` (`https://leadcom.district229.org`).
4. Click **Deploy**. You get a `*.vercel.app` URL to check the page.

## Add the subdomain `leadcom.district229.org`

1. In Vercel, open the project, then **Settings > Domains > Add**. Enter `leadcom.district229.org` and save.
2. Vercel shows the DNS record to create. Add it where district229.org's DNS is managed:
   - **DNS at your registrar or host (GoDaddy, Namecheap, Cloudflare and so on):** add a `CNAME` record, name `leadcom`, value as shown by Vercel (usually `cname.vercel-dns.com` or a project-specific `*.vercel-dns-*.com` value). On Cloudflare, set the record to "DNS only" while Vercel verifies it.
   - **Domain already on Vercel nameservers:** nothing to add, Vercel creates the record when you add the domain.
3. Wait a few minutes. The domain shows a green "Valid Configuration" tick and Vercel issues the HTTPS certificate automatically.
4. Redeploy once if you set `NEXT_PUBLIC_SITE_URL`, so link previews use the final address.

Adding a subdomain does not affect the main site at district229.org.

## Brand compliance checklist

- Use the official Toastmasters logo from the brand portal, not a recreated one, with clear space equal to the wordmark height and at least 72 px wide. Swap it in at the `.brand` link in `app/page.tsx`.
- If a company or sponsor logo is added, never place it beside the Toastmasters logo; use opposite corners or a separate sponsor section.
- Confirm with brand@toastmasters.org that the "LeadCom" event name and this page are acceptable for a District event outside the annual conference.
