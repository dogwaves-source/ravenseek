import Link from "next/link";
import { CONSIGN_URL, SHOP_URL, YOUTUBE_URL, ROUTES } from "./links";

export function SeekFooter() {
  return (
    <footer className="sk-foot">
      <div className="sk-foot-links">
        <Link href={ROUTES.home}>Home</Link>
        <Link href={ROUTES.estate}>Estate Consultation</Link>
        <Link href={ROUTES.buyouts}>Buyouts</Link>
        <a href={CONSIGN_URL} target="_blank" rel="noopener">Consignment</a>
        <Link href={ROUTES.referrals}>Referrals</Link>
        <a href={YOUTUBE_URL} target="_blank" rel="noopener">RavensChest · YouTube</a>
        <a href={SHOP_URL} target="_blank" rel="noopener">Ravens Jewels · Shop</a>
      </div>
      <p style={{ textAlign: "center", color: "var(--sk-faint)", fontSize: ".64rem", letterSpacing: ".24em", textTransform: "uppercase" }}>
        © {new Date().getFullYear()} RavenSeek · Antique &amp; Estate Treasure Hunting
      </p>
    </footer>
  );
}
