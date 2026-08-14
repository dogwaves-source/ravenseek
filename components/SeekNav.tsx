import Link from "next/link";
import { CompassMark } from "./seek-icons";
import { CONSIGN_URL } from "./links";

export type SeekNavLink = { href: string; label: string; external?: boolean; hideOnMobile?: boolean };

/** Top nav for the RavenSeek site. */
export function SeekNav({
  links,
  cta = { href: CONSIGN_URL, label: "Consign", external: true },
}: {
  links: SeekNavLink[];
  cta?: { href: string; label: string; external?: boolean };
}) {
  return (
    <nav className="sk-nav">
      <Link href="/" className="sk-brand" aria-label="RavenSeek home">
        <CompassMark size={30} />
        <span className="sk-brand-name">RavenSeek</span>
      </Link>

      <div className="sk-navlinks">
        {links.map((l) =>
          l.external ? (
            <a key={l.href} href={l.href} target="_blank" rel="noopener" className={l.hideOnMobile ? "sk-nav-hide" : undefined}>
              {l.label}
            </a>
          ) : (
            <Link key={l.href} href={l.href} className={l.hideOnMobile ? "sk-nav-hide" : undefined}>
              {l.label}
            </Link>
          )
        )}
      </div>

      {cta.external ? (
        <a href={cta.href} target="_blank" rel="noopener" className="sk-pill">{cta.label}</a>
      ) : (
        <Link href={cta.href} className="sk-pill">{cta.label}</Link>
      )}
    </nav>
  );
}
