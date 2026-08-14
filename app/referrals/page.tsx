import type { Metadata } from "next";
import { ServicePageShell } from "@/components/ServicePageShell";

export const metadata: Metadata = {
  title: "Referrals",
  description: "Know someone with an estate or collection to sell? Point them my way. Referrals from friends, attorneys, and fellow dealers are always welcome — and appreciated.",
};

export default function ReferralsPage() {
  return (
    <ServicePageShell
      service="referral"
      eyebrow="Referrals"
      title={<>Know someone sitting on <em>treasure?</em></>}
      intro="Much of my best work comes by word of mouth — an attorney settling an estate, a friend helping a parent downsize, a fellow dealer with a lot outside their lane. If you know someone who could use an experienced, trustworthy hand, send them my way. I'll take good care of them, and I never forget a good turn."
      points={[
        { heading: "Make the introduction", body: "Tell me who they are and what they have — or ask me to reach out to you first. Whatever's easiest." },
        { heading: "I handle it with care", body: "Your name stays attached to a good experience. I treat every referral the way I'd want mine treated." },
        { heading: "Good turns come back", body: "Referrals are the backbone of this business, and I make it worth your while to send them my way." },
      ]}
      formHeading="Send a referral"
    />
  );
}
