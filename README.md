# RavenSeek.com

The treasure-hunting / estate-services site for the business — an "extended
business card" for **estate consultation, buyouts, consignment, and referrals**.
Its job is to bring in inquiries and referrals, not to sell.

Standalone Next.js site. No database — inquiries are emailed to you (and logged).
Affiliated with the RavensChest YouTube channel and the ravensjewels.com shop.

## Pages

- `/` — landing (bio, four service cards, YouTube + shop links)
- `/estate-consultation` — service page + inquiry form
- `/buyouts` — service page + inquiry form
- `/referrals` — service page + referral form
- Consignment → links out to `https://ravensjewels.com/consign`

## When someone submits a form

They fill it out → you get an **email** (and it's also written to the server
logs as a backup). No database to manage.

## Settings you provide on Vercel (Environment Variables)

Emails are sent through Gmail using an app password (the same setup used elsewhere).

| Name | What it's for | Example |
|------|----------------|---------|
| `GMAIL_USER` | The Gmail address that sends the notification | `ravenschest33@gmail.com` |
| `GMAIL_APP_PASSWORD` | A Google **app password** (not your normal password) | `abcd efgh ijkl mnop` |
| `SEEK_LEAD_EMAIL` | Where leads are sent (optional — defaults to ravenschest33@gmail.com) | `ravenschest33@gmail.com` |

### Email setup, once
1. If you don't already have one, create a Google **App Password**:
   Google Account → Security → 2-Step Verification → **App passwords** → generate one.
2. In Vercel → this project → **Settings → Environment Variables**, add `GMAIL_USER`
   (your Gmail address) and `GMAIL_APP_PASSWORD` (the app password).
3. Redeploy.

Until that's done, leads are still captured in the Vercel logs — you just won't
get the email.

## Deploy

1. Push this folder to a new GitHub repo.
2. On [vercel.com](https://vercel.com): **Add New → Project**, import the repo.
3. Add the environment variables above.
4. Add the domain `ravenseek.com` to this project (move it here if it's on another one).

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000
