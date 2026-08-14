import type { Metadata } from "next";
import { ServicePageShell } from "@/components/ServicePageShell";

export const metadata: Metadata = {
  title: "Estate Consultation",
  description: "Not sure what you've got, or what to do with it? A straight, experienced read on an estate or collection — what it is, what it's worth, and your best options.",
};

export default function EstateConsultationPage() {
  return (
    <ServicePageShell
      service="estate-consultation"
      eyebrow="Estate Consultation"
      title={<>Know what you have <em>before</em> you decide.</>}
      intro="Inheriting or clearing an estate is overwhelming — especially when you don't know whether you're looking at costume jewelry or something genuinely valuable. I bring nearly three decades of market experience to help you understand what's in front of you and what your real options are. No pressure, no obligation."
      points={[
        { heading: "Tell me what you're facing", body: "Send a few details and photos. I'll tell you quickly whether it's worth a closer look." },
        { heading: "An honest, experienced read", body: "What the pieces are, what the market is actually paying, and what's worth holding, selling, or passing on." },
        { heading: "Clear options — your call", body: "Outright buyout, consignment, referral to the right specialist, or simply peace of mind. You decide what happens next." },
      ]}
      formHeading="Request a consultation"
    />
  );
}
