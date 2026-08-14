import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ravenseek.com"),
  title: {
    default: "RavenSeek — Antique Treasure Hunter, Reseller & Estate Services",
    template: "%s · RavenSeek",
  },
  description:
    "A reseller before there was a word for it. Estate consultation, buyouts, consignment, and referrals for antique & vintage jewelry and collectibles.",
};

export const viewport: Viewport = {
  themeColor: "#0a0806",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <style>{`
          /* ── RavenSeek design tokens ── */
          .seek-site {
            --sk-bg:        #0a0806;
            --sk-ink:       #14100b;
            --sk-panel:     #1a150e;
            --sk-gold:      #c6a250;
            --sk-candle:    #ecd79c;
            --sk-copper:    #c07a4b;
            --sk-copper-lt: #e0a173;
            --sk-verdigris: #5b8f7f;
            --sk-ivory:     #f2ecdd;
            --sk-muted:     #a89a84;
            --sk-faint:     #6b6153;
            --sk-hairline:  rgba(198,162,80,.24);
            --sk-copline:   rgba(192,122,75,.30);
            --sk-serif:     var(--font-cormorant, 'Cormorant Garamond', Georgia, serif);
            --sk-sans:      var(--font-jost, 'Jost', system-ui, sans-serif);
          }

          /* ── Base ── */
          .seek-site { font-family: var(--sk-sans); font-weight: 300; color: var(--sk-ivory); background: var(--sk-bg); min-height: 100vh; }
          .seek-site ::selection { background: var(--sk-copper); color: var(--sk-bg); }
          .seek-site a { color: inherit; text-decoration: none; }
          .seek-site a:focus-visible { outline: 2px solid var(--sk-candle); outline-offset: 4px; border-radius: 2px; }
          .seek-site h1,.seek-site h2,.seek-site h3 { font-weight: 300; margin: 0; }
          .seek-site p { margin: 0; }

          /* ── Topographic hairline field (fixed backdrop) ── */
          .seek-topo {
            position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: .5;
            background-image:
              repeating-radial-gradient(circle at 18% 30%, transparent 0 38px, rgba(192,122,75,.045) 38px 39px, transparent 39px 78px),
              repeating-radial-gradient(circle at 82% 72%, transparent 0 46px, rgba(91,143,127,.05) 46px 47px, transparent 47px 96px);
          }
          /* ── Ambient sheen — copper + verdigris ── */
          .seek-sheen {
            position: fixed; inset: -20%; z-index: 0; pointer-events: none;
            background:
              radial-gradient(40% 32% at 20% 16%, rgba(192,122,75,.22), transparent 70%),
              radial-gradient(36% 30% at 80% 28%, rgba(91,143,127,.18), transparent 72%),
              radial-gradient(30% 26% at 55% 88%, rgba(198,162,80,.10), transparent 70%);
            animation: sk-drift 28s ease-in-out infinite alternate;
          }
          @keyframes sk-drift { from { transform: translate3d(-2%,-1%,0) scale(1); } to { transform: translate3d(2%,2%,0) scale(1.05); } }

          /* ── Nav ── */
          .sk-nav {
            position: sticky; top: 0; z-index: 50;
            display: flex; align-items: center; justify-content: space-between;
            gap: 1rem; padding: 1rem clamp(1.2rem, 4vw, 3rem);
            background: linear-gradient(rgba(10,8,6,.92), rgba(10,8,6,0));
            backdrop-filter: blur(4px);
          }
          .sk-brand { display: flex; align-items: center; gap: .6rem; }
          .sk-brand-name { font-family: var(--sk-serif); font-size: 1.15rem; letter-spacing: .18em; color: var(--sk-candle); }
          .sk-navlinks { display: flex; gap: clamp(.9rem,2.5vw,2rem); font-size: .68rem; letter-spacing: .26em; text-transform: uppercase; align-items: center; }
          .sk-navlinks a { position: relative; padding: .3rem 0; color: var(--sk-muted); transition: color .3s; }
          .sk-navlinks a:hover { color: var(--sk-ivory); }
          .sk-navlinks a::after {
            content: ""; position: absolute; left: 0; bottom: 0; width: 100%; height: 1px;
            background: var(--sk-copper); transform: scaleX(0); transform-origin: right;
            transition: transform .5s cubic-bezier(.22,1,.36,1);
          }
          .sk-navlinks a:hover::after { transform: scaleX(1); transform-origin: left; }
          .sk-pill {
            font-size: .66rem; letter-spacing: .26em; text-transform: uppercase;
            padding: .5rem 1.1rem; border: 1px solid var(--sk-copline);
            color: var(--sk-copper-lt); transition: background .3s, color .3s, border-color .3s; white-space: nowrap;
          }
          .sk-pill:hover { background: var(--sk-copper); color: var(--sk-bg); border-color: var(--sk-copper); }
          @media (max-width: 720px) { .sk-nav-hide { display: none; } }

          /* ── Buttons ── */
          .sk-btn {
            display: inline-block; padding: .85rem 2rem;
            font-family: var(--sk-sans); font-size: .72rem; letter-spacing: .3em; text-indent: .3em;
            text-transform: uppercase; border: 1px solid var(--sk-copline); color: var(--sk-ivory);
            position: relative; overflow: hidden; transition: color .4s, border-color .4s; cursor: pointer; background: transparent;
          }
          .sk-btn::before {
            content: ""; position: absolute; inset: 0; background: var(--sk-copper);
            transform: translateX(-101%); transition: transform .5s cubic-bezier(.22,1,.36,1); z-index: -1;
          }
          .sk-btn:hover { color: var(--sk-bg); border-color: var(--sk-copper); }
          .sk-btn:hover::before { transform: translateX(0); }
          .sk-btn.solid { background: var(--sk-copper); color: var(--sk-bg); border-color: var(--sk-copper); }
          .sk-btn.solid::before { background: var(--sk-copper-lt); }

          /* ── Sections ── */
          .sk-section { position: relative; z-index: 2; padding: clamp(4rem,10vw,7.5rem) clamp(1.4rem,6vw,4rem); max-width: 1160px; margin: 0 auto; }
          .sk-kicker { font-size: .66rem; letter-spacing: .46em; text-transform: uppercase; color: var(--sk-copper-lt); margin-bottom: 1.2rem; }
          .sk-h2 { font-family: var(--sk-serif); font-size: clamp(2rem,5vw,3.4rem); line-height: 1.15; letter-spacing: .02em; margin-bottom: 1.4rem; }
          .sk-h2 em { font-style: italic; color: var(--sk-candle); }
          .sk-lede { max-width: 58ch; color: var(--sk-muted); font-size: 1.05rem; line-height: 1.75; }
          .sk-rule { width: 60px; height: 1px; background: var(--sk-copper); margin: 2rem 0; opacity: .7; }

          /* ── Service cards ── */
          .sk-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--sk-hairline); border: 1px solid var(--sk-hairline); margin-top: 3rem; }
          @media (max-width: 760px) { .sk-cards { grid-template-columns: 1fr; } }
          .sk-card {
            display: block; background: var(--sk-bg); padding: clamp(1.8rem,4vw,2.8rem); position: relative; overflow: hidden;
            transition: background .5s; color: inherit;
          }
          .sk-card:hover { background: var(--sk-ink); }
          .sk-card::after {
            content: ""; position: absolute; top: 0; left: -70%; width: 40%; height: 100%;
            background: linear-gradient(100deg, transparent, rgba(224,161,115,.08), transparent);
            transform: skewX(-18deg); transition: left .8s ease; pointer-events: none;
          }
          .sk-card:hover::after { left: 130%; }
          .sk-card-num { font-family: var(--sk-serif); font-size: .9rem; color: var(--sk-copper); letter-spacing: .1em; }
          .sk-card-title { font-family: var(--sk-serif); font-size: 1.7rem; color: var(--sk-candle); margin: .7rem 0 .8rem; }
          .sk-card-body { color: var(--sk-muted); font-size: .95rem; line-height: 1.7; }
          .sk-card-cta { display: inline-flex; align-items: center; gap: .5rem; margin-top: 1.4rem; font-size: .68rem; letter-spacing: .26em; text-transform: uppercase; color: var(--sk-copper-lt); }
          .sk-card-cta span { transition: transform .3s; }
          .sk-card:hover .sk-card-cta span { transform: translateX(5px); }

          /* ── Panels / forms ── */
          .sk-panel { background: linear-gradient(160deg, rgba(26,21,14,.9), rgba(10,8,6,.5)); border: 1px solid var(--sk-hairline); }
          .sk-input {
            width: 100%; box-sizing: border-box; background: rgba(255,255,255,.035);
            border: 1px solid var(--sk-hairline); color: var(--sk-ivory);
            font-family: var(--sk-sans); font-size: .9rem; padding: .7rem 1rem; outline: none;
            transition: border-color .25s, background .25s;
          }
          .sk-input:focus { border-color: var(--sk-copline); background: rgba(255,255,255,.06); }
          .sk-input::placeholder { color: var(--sk-muted); opacity: .55; }
          .sk-input option { background: #14100b; color: var(--sk-ivory); }
          .sk-label { display: block; font-size: .66rem; letter-spacing: .28em; text-transform: uppercase; color: var(--sk-copper-lt); margin-bottom: .45rem; }
          .sk-req { color: var(--sk-muted); }

          /* ── Scroll reveal ── */
          .sk-reveal { opacity: 0; transform: translateY(28px); transition: opacity 1s cubic-bezier(.22,1,.36,1), transform 1s cubic-bezier(.22,1,.36,1); }
          .sk-reveal.in { opacity: 1; transform: none; }
          .sk-reveal.d1 { transition-delay: .1s; } .sk-reveal.d2 { transition-delay: .2s; } .sk-reveal.d3 { transition-delay: .3s; }

          /* ── Footer ── */
          .sk-foot { position: relative; z-index: 2; border-top: 1px solid var(--sk-hairline); padding: 2.6rem clamp(1.2rem,4vw,3rem); }
          .sk-foot-links { display: flex; justify-content: center; flex-wrap: wrap; gap: 1.6rem; margin-bottom: 1.3rem; font-size: .66rem; letter-spacing: .28em; text-transform: uppercase; color: var(--sk-muted); }
          .sk-foot-links a:hover { color: var(--sk-copper-lt); }

          /* ── Reduced motion ── */
          @media (prefers-reduced-motion: reduce) {
            .seek-sheen { animation: none !important; }
            .sk-reveal { opacity: 1; transform: none; transition: none; }
            .sk-card::after { display: none; }
          }
        `}</style>
        <div className="seek-site">
          <div className="seek-topo" aria-hidden="true" />
          {children}
        </div>
      </body>
    </html>
  );
}
