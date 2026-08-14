import { SeekNav } from "./SeekNav";
import { SeekFooter } from "./SeekFooter";
import { LeadForm, type SeekService } from "./LeadForm";
import { ROUTES } from "./links";

const NAV_LINKS = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.estate, label: "Estate", hideOnMobile: true },
  { href: ROUTES.buyouts, label: "Buyouts", hideOnMobile: true },
  { href: ROUTES.referrals, label: "Referrals", hideOnMobile: true },
];

/** Shared layout for the three lead-capture service pages. */
export function ServicePageShell({
  service,
  eyebrow,
  title,
  intro,
  points,
  formHeading,
}: {
  service: SeekService;
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  points: { heading: string; body: string }[];
  formHeading: string;
}) {
  return (
    <>
      <div className="seek-sheen" aria-hidden="true" />
      <SeekNav links={NAV_LINKS} />

      <main className="sk-section" style={{ maxWidth: 1080 }}>
        <div style={{ maxWidth: 640 }}>
          <p className="sk-kicker">{eyebrow}</p>
          <h1 className="sk-h2" style={{ fontSize: "clamp(2.2rem,6vw,3.6rem)" }}>{title}</h1>
          <div className="sk-rule" />
          <p className="sk-lede">{intro}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "clamp(2rem,5vw,4rem)", marginTop: "clamp(2.5rem,6vw,4rem)", alignItems: "start" }} className="sk-svc-grid">
          {/* What to expect */}
          <div>
            <p className="sk-kicker" style={{ marginBottom: "1.6rem" }}>What to expect</p>
            <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {points.map((p, i) => (
                <li key={i} style={{ display: "flex", gap: "1rem", marginBottom: "1.6rem" }}>
                  <span style={{ fontFamily: "var(--sk-serif)", fontSize: "1.1rem", color: "var(--sk-copper)", flexShrink: 0, width: 24, textAlign: "right" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 style={{ fontFamily: "var(--sk-serif)", fontSize: "1.25rem", color: "var(--sk-candle)", marginBottom: ".3rem" }}>{p.heading}</h3>
                    <p style={{ color: "var(--sk-muted)", fontSize: ".92rem", lineHeight: 1.65 }}>{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Lead form */}
          <div>
            <p className="sk-kicker" style={{ marginBottom: "1.4rem" }}>{formHeading}</p>
            <LeadForm service={service} />
          </div>
        </div>
      </main>

      <SeekFooter />
      <style>{`@media(max-width:820px){.sk-svc-grid{grid-template-columns:1fr !important}}`}</style>
    </>
  );
}
