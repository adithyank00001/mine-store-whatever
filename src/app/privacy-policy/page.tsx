import type { Metadata } from "next";

import {
  LegalH2,
  LegalH3,
  LegalP,
  LegalPageShell,
  LegalSection,
} from "@/components/legal/legal-page-shell";
import { publicConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Privacy Policy — ${publicConfig.appName}`,
  description:
    "Privacy policy governing customer data, order fulfillment, and communications on the ByePanda kids digital store.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="Privacy Policy" updated="18/10/2026">
      <LegalP>
        This Privacy Policy describes how ByePanda (&quot;we,&quot; &quot;us,&quot;
        or &quot;Operator&quot;) collects, uses, and safeguards information when you
        visit our website at byepanda.com or purchase digitally delivered printable
        learning worksheets and activity bundles. By accessing our storefront or
        placing an order, you agree to the information practices described in this
        Policy.
      </LegalP>

      <LegalSection>
        <LegalH2>1. Information we collect</LegalH2>
        <LegalH3>1.1 Order and customer contact data</LegalH3>
        <LegalP>
          When you purchase a learning bundle on our site, our checkout interface
          and payment gateway collect information necessary to fulfill your order and
          email your digital files. This may include your full name, email address,
          phone number, and billing details. Sensitive payment credentials (such as
          full credit or debit card numbers, CVVs, or UPI PINs) are processed directly
          by our secure payment partner (Razorpay) and are never stored on our servers.
        </LegalP>
        <LegalH3>1.2 Technical usage and analytics</LegalH3>
        <LegalP>
          Like most modern websites, we may automatically collect standard diagnostic
          and analytical data, including IP address, browser type, device information,
          referring URLs, pages visited, and interaction timestamps. This data is used
          to maintain site performance, prevent fraud, and optimize the shopping experience.
        </LegalP>
        <LegalH3>1.3 Customer support correspondence</LegalH3>
        <LegalP>
          If you contact our support team via email (
          <a
            href="mailto:byepanda.store@gmail.com"
            className="font-medium text-[var(--landing-orange)] hover:underline"
          >
            byepanda.store@gmail.com
          </a>
          ), WhatsApp, or through our contact form, we collect your message and contact
          details solely to respond to your inquiry and assist with your order.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>2. How we use your information</LegalH2>
        <LegalP>
          We use the information we collect strictly for the following purposes:
        </LegalP>
        <ul className="list-disc pl-6 space-y-2 text-[17px] text-[#3D4F63]">
          <li>To process transactions and deliver your digital printable files and receipts;</li>
          <li>To provide customer support and respond to download or file access questions;</li>
          <li>To detect and prevent fraudulent transactions or security breaches;</li>
          <li>To comply with applicable legal, accounting, and tax obligations;</li>
          <li>To evaluate and improve our product offerings and site performance.</li>
        </ul>
      </LegalSection>

      <LegalSection>
        <LegalH2>3. Information sharing and third parties</LegalH2>
        <LegalP>
          We do not sell, rent, or trade your personal information to third parties.
          We share necessary data only with trusted service providers who help us operate
          our storefront, such as:
        </LegalP>
        <ul className="list-disc pl-6 space-y-2 text-[17px] text-[#3D4F63]">
          <li><strong>Payment Processors:</strong> Razorpay, for secure payment processing and verification;</li>
          <li><strong>Email Delivery:</strong> Resend, to automatically send your order confirmation and PDF package;</li>
          <li><strong>Hosting & Database:</strong> Secure cloud providers that host our website and store order records;</li>
          <li><strong>Analytics & Ads:</strong> Meta Pixel & Conversions API to measure the effectiveness of our advertising campaigns.</li>
        </ul>
      </LegalSection>

      <LegalSection>
        <LegalH2>4. Children&apos;s privacy</LegalH2>
        <LegalP>
          While our products are printable educational materials designed for children
          aged 2 to 8, our website and purchasing system are intended exclusively for
          parents, guardians, and educators aged 18 and older. We do not knowingly collect
          personal information directly from children under 13.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>5. Data security</LegalH2>
        <LegalP>
          We implement industry-standard technical and organizational security measures
          to protect your personal information against unauthorized access, alteration,
          or disclosure. All transactions are encrypted via HTTPS / SSL technology.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>6. Your rights and contact information</LegalH2>
        <LegalP>
          You have the right to request access to, correction of, or deletion of your
          personal information stored in our order records, subject to legal record-keeping
          requirements. To make a request or if you have any questions regarding this
          Privacy Policy, please contact us at:{" "}
          <a
            href="mailto:byepanda.store@gmail.com"
            className="font-medium text-[var(--landing-orange)] hover:underline"
          >
            byepanda.store@gmail.com
          </a>{" "}
          or via our{" "}
          <a href="/contact" className="font-medium text-[var(--landing-orange)] hover:underline">
            contact page
          </a>
          .
        </LegalP>
      </LegalSection>
    </LegalPageShell>
  );
}
