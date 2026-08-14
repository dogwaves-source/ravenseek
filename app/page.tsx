import Link from "next/link";
import { SeekNav } from "@/components/SeekNav";
import { SeekFooter } from "@/components/SeekFooter";
import { SeekReveal } from "@/components/SeekReveal";
import { CompassLarge } from "@/components/seek-icons";
import { CONSIGN_URL, SHOP_URL, YOUTUBE_URL, ROUTES } from "@/components/links";

const NAV_LINKS = [
  { href: ROUTES.estate, label: "Estate", hideOnMobile: true },
  { href: ROUTES.buyouts, label: "Buyouts", hideOnMobile: true },
  { href: ROUTES.referrals, label: "Referrals", hideOnMobile: true },
  { href: CONSIGN_URL, label: "Consign", external: true },
];

const SERVICES = [
  {
    href: ROUTES.estate,
    external: false,
    title: "Estate Consultation",
    body: "An honest, experienced read on an estate or collection — what it is, what it's worth, and your best options. No pressure.",
  },
  {
    href: ROUTES.buyouts,
    external: false,
    title: "Buyouts",
    body: "Prefer it handled in one clean sale? I buy jewelry, sterling, collectibles, and whole estates outright — fair offers, paid promptly.",
  },
  {
    href: CONSIGN_URL,
    external: true,
    title: "Consignment",
    body: "Let your pieces find their next keeper. I photograph, list, and sell them across live shows and marketplaces — you keep the lion's share.",
  },
  {
    href: ROUTES.referrals,
    external: false,
    title: "Referrals",
    body: "Know someone with an estate or collection to sell? Send them my way — referrals are the backbone of this business, and always rewarded.",
  },
];

export default function HomePage() {
  return (
    <>
      <SeekReveal />
      <div className="seek-sheen" aria-hidden="true" />
      <SeekNav links={NAV_LINKS} />

      {/* ── Hero ── */}
      <header style={{ position: "relative", zIndex: 2, maxWidth: 1160, margin: "0 auto", padding: "clamp(3rem,8vw,6rem) clamp(1.4rem,6vw,4rem) clamp(2rem,5vw,3rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: "clamp(2rem,6vw,4rem)", alignItems: "center" }} className="sk-hero-grid">
          <div>
            <p style={{ fontSize: ".7rem", letterSpacing: ".4em", textTransform: "uppercase", color: "var(--sk-copper-lt)", marginBottom: "1.4rem" }}>
              Antique Treasure Hunter · Reseller · Estate Services
            </p>
            <h1 style={{ fontFamily: "var(--sk-serif)", fontSize: "clamp(3rem,9vw,6rem)", letterSpacing: ".06em", lineHeight: 1.02, color: "var(--sk-ivory)", marginBottom: "1.4rem" }}>
              Raven<span style={{ color: "var(--sk-candle)" }}>Seek</span>
            </h1>
            <p style={{ fontFamily: "var(--sk-serif)", fontStyle: "italic", fontSize: "clamp(1.2rem,2.8vw,1.7rem)", color: "var(--sk-muted)", maxWidth: "26ch", lineHeight: 1.4, marginBottom: "2.4rem" }}>
              A reseller before there was a word for it.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href={ROUTES.estate} className="sk-btn solid">Start an Inquiry</Link>
              <a href="#services" className="sk-btn">See Services</a>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <CompassLarge style={{ width: "min(78%, 340px)", height: "auto" }} />
          </div>
        </div>
      </header>

      {/* ── Bio / credibility ── */}
      <section className="sk-section sk-reveal" style={{ paddingTop: "clamp(2rem,5vw,3rem)" }}>
        <div style={{ maxWidth: 760 }}>
          <p className="sk-kicker">Who you&rsquo;re dealing with</p>
          <p style={{ fontFamily: "var(--sk-serif)", fontSize: "clamp(1.5rem,3.6vw,2.3rem)", lineHeight: 1.4, color: "var(--sk-ivory)" }}>
            Selling on eBay since <em style={{ fontStyle: "italic", color: "var(--sk-candle)" }}>1998</em> — back when
            &ldquo;reseller&rdquo; wasn&rsquo;t a title, let alone a trend.
          </p>
          <div className="sk-rule" />
          <p className="sk-lede">
            Decades of hands-on market experience have built a reputation that&rsquo;s rooted locally and sought
            worldwide. Specializing in antique and vintage jewelry and collectibles, RavenSeek brings a trained eye and
            a fair, proven track record to every estate, collection, and consignment.
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="sk-section" style={{ paddingTop: "clamp(2rem,4vw,3rem)" }}>
        <div className="sk-reveal">
          <p className="sk-kicker">How I can help</p>
          <h2 className="sk-h2" style={{ maxWidth: "18ch" }}>Four ways to turn what you have into <em>what it&rsquo;s worth.</em></h2>
        </div>

        <div className="sk-cards sk-reveal d1">
          {SERVICES.map((s, i) => {
            const inner = (
              <>
                <span className="sk-card-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="sk-card-title">{s.title}</h3>
                <p className="sk-card-body">{s.body}</p>
                <span className="sk-card-cta">{s.external ? "Visit" : "Learn more"} <span aria-hidden="true">→</span></span>
              </>
            );
            return s.external ? (
              <a key={s.title} href={s.href} target="_blank" rel="noopener" className="sk-card">{inner}</a>
            ) : (
              <Link key={s.title} href={s.href} className="sk-card">{inner}</Link>
            );
          })}
        </div>
      </section>

      {/* ── Ecosystem tie-ins ── */}
      <section className="sk-section sk-reveal" style={{ paddingTop: "clamp(1rem,3vw,2rem)" }}>
        <div className="sk-panel" style={{ padding: "clamp(2rem,5vw,3.2rem)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(1.5rem,4vw,3rem)" }}>
          <div style={{ gridColumn: "1 / -1", marginBottom: ".4rem" }}>
            <p className="sk-kicker" style={{ margin: 0 }}>See the work</p>
          </div>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener" style={{ display: "block" }}>
            <h3 style={{ fontFamily: "var(--sk-serif)", fontSize: "1.5rem", color: "var(--sk-candle)", marginBottom: ".5rem" }}>RavensChest · YouTube</h3>
            <p style={{ color: "var(--sk-muted)", fontSize: ".92rem", lineHeight: 1.65 }}>
              Follow the hunt — finds, live shows, and the stories behind the pieces.
            </p>
            <span className="sk-card-cta">Watch <span aria-hidden="true">→</span></span>
          </a>
          <a href={SHOP_URL} target="_blank" rel="noopener" style={{ display: "block" }}>
            <h3 style={{ fontFamily: "var(--sk-serif)", fontSize: "1.5rem", color: "var(--sk-candle)", marginBottom: ".5rem" }}>Ravens Jewels · Shop</h3>
            <p style={{ color: "var(--sk-muted)", fontSize: ".92rem", lineHeight: 1.65 }}>
              Browse the current collection of vintage and estate jewelry for sale.
            </p>
            <span className="sk-card-cta">Browse <span aria-hidden="true">→</span></span>
          </a>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="sk-section sk-reveal" style={{ textAlign: "center", paddingTop: "clamp(1rem,3vw,2rem)" }}>
        <h2 className="sk-h2" style={{ margin: "0 auto 1.6rem", maxWidth: "20ch" }}>Have something worth a <em>closer look?</em></h2>
        <p className="sk-lede" style={{ margin: "0 auto 2.4rem" }}>
          Send a few details and photos. I read every message personally, and I&rsquo;ll tell you honestly what you have and what your options are.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href={ROUTES.estate} className="sk-btn solid">Estate Consultation</Link>
          <Link href={ROUTES.buyouts} className="sk-btn">Request a Buyout</Link>
        </div>
      </section>

      <SeekFooter />

      <style>{`@media(max-width:820px){.sk-hero-grid{grid-template-columns:1fr !important}.sk-hero-grid > div:last-child{order:-1}}`}</style>
    </>
  );
}
