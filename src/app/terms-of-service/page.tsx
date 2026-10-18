import type { Metadata } from "next";

import {
  LegalH2,
  LegalP,
  LegalPageShell,
  LegalSection,
} from "@/components/legal/legal-page-shell";
import { publicConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Terms of Service — ${publicConfig.appName}`,
  description:
    "Terms governing purchase and use of ByePanda digitally delivered printable kids learning worksheets and educational activity bundles.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPageShell title="Terms of Service" updated="18/10/2026">
      <LegalP>
        These Terms of Service (the &quot;Terms&quot;) form a binding agreement
        between you (&quot;Purchaser,&quot; &quot;you,&quot; or
        &quot;User&quot;) and ByePanda (&quot;we,&quot; &quot;us,&quot; or
        &quot;Operator&quot;) concerning access to the ByePanda digital
        storefront ({publicConfig.appUrl}) and the acquisition of electronically
        delivered educational merchandise, including printable kids learning
        worksheets, activity workbooks, phonics sheets, numbers, handwriting
        guides, brain puzzles, flashcards, and associated downloadable PDF files
        (collectively, &quot;Digital Goods&quot; or &quot;Learning Bundles&quot;).
        Completion of checkout, initiation of payment, or continued browsing after
        notice of these Terms constitutes assent. If you do not agree, discontinue
        use immediately and do not consummate any purchase.
      </LegalP>

      <LegalSection>
        <LegalH2>1. Nature of the offering</LegalH2>
        <LegalP>
          Digital Goods are downloadable educational and printable resources
          supplied via electronic transmission (including direct file downloads,
          interactive PDF download links, or email delivery). Upon successful
          payment confirmation, the Purchaser receives instant access or
          download pathways constituting full performance of the Operator&apos;s
          delivery obligation. Because the essence of the purchase is the immediate
          conveyance of reproducible digital content, the transaction is, by its
          nature, non-returnable once digital access or download files have been
          provisioned.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>2. License grant and use restrictions</LegalH2>
        <LegalP>
          Subject to timely payment and compliance with these Terms, ByePanda grants
          you a limited, non-exclusive, non-transferable, revocable license to
          download, save, and print unlimited copies of the purchased Digital
          Goods solely for your own personal, household, home-schooling, or single-classroom
          educational use with children. You shall not resell, sublicense, rent,
          publicly redistribute, or commercially republish the digital files, artwork,
          or learning sheets as a competing commercial product or on third-party
          marketplaces without prior written consent.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>3. Payments; Razorpay; taxes</LegalH2>
        <LegalP>
          Prices displayed on our product pages are denominated in Indian Rupees (INR)
          or as otherwise stated and are payable through our authorized payment
          processors (including Razorpay). By authorizing payment, you also accept
          the payment processor&apos;s applicable user terms. We do not store full
          credit or debit card details on our servers. Applicable taxes or banking
          fees imposed by intermediaries are handled in compliance with processor rules
          and applicable law.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>4. Delivery; risk of loss</LegalH2>
        <LegalP>
          Digital delivery is deemed complete when access instructions, download
          buttons, or download PDF packages are made available on your screen
          confirmation page (/store/success) or sent to the email address provided
          during checkout. From that moment, the Purchaser assumes responsibility
          for saving and backing up local copies of the acquired files. Any subsequent
          loss of local device files or loss of email inbox access does not invalidate
          the completed delivery.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>5. Intellectual property</LegalH2>
        <LegalP>
          All graphic illustrations, worksheet designs, mascots, layouts, brand
          names, and printable content provided through ByePanda are the proprietary
          intellectual property of ByePanda and its licensors, protected under applicable
          copyright and intellectual property laws. All rights not expressly granted
          under Section 2 are reserved.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>6. Disclaimers and child safety</LegalH2>
        <LegalP>
          Our printable worksheets and activity bundles are designed as supplementary
          learning and entertainment materials for children. While created to be
          engaging and developmentally supportive for early childhood age groups (Ages 2–8),
          they do not constitute accredited schooling curriculum or medical/developmental
          diagnoses. Parental or adult supervision is recommended during all physical
          craft and scissor activities.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>7. Limitation of liability</LegalH2>
        <LegalP>
          To the maximum extent permitted by applicable law, ByePanda&apos;s aggregate
          liability arising out of any purchase shall not exceed the amount
          actually paid for the specific Digital Good giving rise to the claim.
          In no event shall the Operator be liable for indirect, incidental, or
          consequential damages.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>8. Refunds cross-reference</LegalH2>
        <LegalP>
          All matters concerning cancellations, refunds, and download access
          clarifications are governed exclusively by our Refund Policy, which is
          incorporated herein by reference.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>9. Contact and notices</LegalH2>
        <LegalP>
          Notices and inquiries regarding these Terms may be directed to{" "}
          <a
            href="mailto:byepanda.store@gmail.com"
            className="font-medium text-[var(--landing-orange)] hover:underline"
          >
            byepanda.store@gmail.com
          </a>{" "}
          or submitted through{" "}
          <a href="/contact" className="font-medium text-[var(--landing-orange)] hover:underline">
            our contact page
          </a>
          . We may update these Terms from time to time by publishing an updated
          revision with the &quot;Last Updated&quot; date reflected above.
        </LegalP>
      </LegalSection>
    </LegalPageShell>
  );
}
