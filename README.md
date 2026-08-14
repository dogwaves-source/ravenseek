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

| Name | What it's for | Example |
|------|----------------|---------|
| `RESEND_API_KEY` | Lets the site send you emails (from resend.com) | `re_xxx…` |
| `LEAD_FROM_EMAIL` | The "from" address on those emails — must be a sender on a domain you've verified in Resend | `RavenSeek <leads@ravenseek.com>` |
| `SEEK_LEAD_EMAIL` | Where leads are sent (optional — defaults to ravenschest33@gmail.com) | `ravenschest33@gmail.com` |

### Email setup, once (5 minutes)
1. Make a free account at [resend.com](https://resend.com).
2. Add & verify your domain `ravenseek.com` (Resend walks you through the DNS records).
3. Create an API key → paste it into Vercel as `RESEND_API_KEY`.
4. Set `LEAD_FROM_EMAIL` to something like `RavenSeek <leads@ravenseek.com>`.

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
