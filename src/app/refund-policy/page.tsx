import type { Metadata } from "next";

import {
  LegalH2,
  LegalP,
  LegalPageShell,
  LegalSection,
} from "@/components/legal/legal-page-shell";
import { publicConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Refund Policy — ${publicConfig.appName}`,
  description:
    "Refund policy for ByePanda digitally delivered printable kids learning worksheets and activity packages.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPageShell title="Refund Policy" updated="18/10/2026">
      <LegalP>
        This Refund Policy governs any inquiries or claims regarding cancellations,
        reimbursements, or download assistance arising from the purchase of digitally
        delivered educational merchandise from ByePanda ({publicConfig.appUrl}). By
        authorizing payment, you acknowledge that you have reviewed and accepted the
        terms specified below regarding digital product delivery.
      </LegalP>

      <LegalSection>
        <LegalH2>1. Nature of digital printable goods</LegalH2>
        <LegalP>
          Unlike physical merchandise that can be returned in its original condition,
          the Digital Goods sold on ByePanda consist of instant-access digital files,
          printable PDF packages, worksheets, and interactive activity materials.
          Once payment is confirmed, digital access is immediately provisioned and
          files are made available for instant download and emailed directly to your
          inbox. Because digital files cannot be physically returned or un-downloaded,
          the economic value of the transaction is fully realized upon delivery.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>2. Standard policy: all sales are final</LegalH2>
        <LegalP>
          Due to the instant and permanent nature of digital downloads, ALL SALES ARE
          FINAL once digital access has been granted or download links have been
          provided. We do not offer refunds, exchanges, or store credit for reasons
          such as: change of mind; accidental duplicate purchases after receiving files;
          personal preference regarding activity styles; or general buyer&apos;s remorse.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>3. Download assistance and file corruption guarantee</LegalH2>
        <LegalP>
          We want your child to have a great learning experience. If you encounter any
          technical difficulty accessing your files—such as an interrupted download,
          a corrupted PDF file, a missing download email, or a link that did not open—our
          team will promptly assist you. Please email us at{" "}
          <a
            href="mailto:support@byepanda.com"
            className="font-medium text-[var(--landing-orange)] hover:underline"
          >
            support@byepanda.com
          </a>{" "}
          with your Order ID or Payment ID, and we will manually send you fresh, direct
          download links or email your files directly within 24 hours.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>4. Pre-delivery payment anomalies</LegalH2>
        <LegalP>
          If your payment was successfully debited but our systems experienced an
          unforeseen failure that prevented delivery of your download link and confirmation
          within a reasonable time frame, and our support team is unable to fulfill
          your order after notification, we will issue a full refund to your original
          payment method.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>5. Chargebacks and fair resolution</LegalH2>
        <LegalP>
          If you experience any issue with your purchase, please contact our support team
          first at{" "}
          <a
            href="mailto:support@byepanda.com"
            className="font-medium text-[var(--landing-orange)] hover:underline"
          >
            support@byepanda.com
          </a>{" "}
          before initiating a dispute or chargeback with your bank or payment provider.
          We are committed to resolving customer issues quickly and ensuring you receive
          all your purchased learning materials.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>6. Contact us</LegalH2>
        <LegalP>
          For any questions concerning this Policy or for help with your order, contact us at:{" "}
          <a
            href="mailto:support@byepanda.com"
            className="font-medium text-[var(--landing-orange)] hover:underline"
          >
            support@byepanda.com
          </a>{" "}
          or through our{" "}
          <a href="/contact" className="font-medium text-[var(--landing-orange)] hover:underline">
            contact form
          </a>
          .
        </LegalP>
      </LegalSection>
    </LegalPageShell>
  );
}
