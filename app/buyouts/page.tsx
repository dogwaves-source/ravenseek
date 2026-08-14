import type { Metadata } from "next";
import { ServicePageShell } from "@/components/ServicePageShell";

export const metadata: Metadata = {
  title: "Buyouts",
  description: "Prefer a clean, one-time sale? I buy antique and vintage jewelry, sterling, collectibles, and full estates outright — fair offers, paid promptly.",
};

export default function BuyoutsPage() {
  return (
    <ServicePageShell
      service="buyout"
      eyebrow="Buyouts"
      title={<>A fair offer, and it&rsquo;s <em>done.</em></>}
      intro="Sometimes you just want it handled — one sale, one payment, no waiting. I purchase antique and vintage jewelry, sterling silver, coins, watches, collectibles, and entire estates outright. Because I know these markets locally and worldwide, I can make a fair offer fast and pay promptly."
      points={[
        { heading: "Show me what you have", body: "A description and photos are enough to get started — a few pieces or a whole estate." },
        { heading: "A fair, no-obligation offer", body: "I price against real, current market demand — not a lowball. You're free to say no." },
        { heading: "Paid promptly", body: "Accept the offer and you're paid without the wait, fees, or uncertainty of selling it yourself." },
      ]}
      formHeading="Request a buyout offer"
    />
  );
}
