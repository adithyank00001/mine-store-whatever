import type { StoreProductConfig } from "@/lib/store/product-content";

/**
 * Sample Original Product — built strictly following og_template_for_newproductPage.
 * Accessible at: /store/product/sample-product (and /store/original-template)
 * Kept published: false so it does not clutter the homepage catalog until published.
 */
export const sampleProduct: StoreProductConfig = {
  // ---------- Identity (must be unique) ----------
  slug: "1m-reels-bundle",
  contentId: "1m-reels-bundle",
  published: true,

  // ---------- Homepage card ----------
  catalogSubtitle: "1M+ Ready-To-Post HD Reels · 30+ Niches · Lifetime Access",
  badge: "Top selling",
  topSelling: true,

  // ---------- Delivery ----------
  download: {
    relativePrivatePath: "store/downloads/Reels-Bundle.pdf",
    fileName: "1M-Viral-Reels-Bundle.pdf",
    contentType: "application/pdf",
  },
  driveDownloadUrl: null,

  // ---------- Price (Razorpay charges this) ----------
  price: 99,
  compareAtPrice: 4999,
  currency: "INR",
  currencySymbol: "₹",

  // ---------- Top of page ----------
  brandName: "Verified Seller",
  eyebrow: "THE ULTIMATE SOCIAL MEDIA GROWTH CHEAT CODE",
  title: "ULTIMATE READY TO POST 1 MILLION+ VIRAL REELS BUNDLE",
  subtitleLead: "Everything you need to go viral and scale your audience.",
  subtitle:
    "1 Million+ Ready-To-Post HD Reels & Videos across trending niches with lifetime access.",
  rating: 4.8,
  reviewCount: 1000,
  socialProofTag: "🔥 50+ got Drive access yesterday!",
  highlights: [
    "1,000,000+ Reels videos",
    "Weekly updated video - FREE",
    "Content covering 30+ popular niches",
    "HD-quality video content",
    "Faceless content suitable for short-form platforms",
    "Ready-to-use digital content",
    "Instant Google Drive access",
    "Organized niche-based content collection",
    "Suitable for both beginners and experienced creators",
    {
      text: "100+ EXCLUSIVE BONUS INCLUDED (Worth ₹10,000+)",
      badge: "🎁 100+ Free Bonus",
      worth: "WORTH ₹10,000+",
    },
  ],

  // ---------- Images (first image is the main one) ----------
  images: [
    {
      src: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1793716669/14eab456-8f10-44c1-b5f3-3de2c2a44814.png",
      alt: "1 Million+ High-Retention Viral Reels Mega Bundle",
    },
    {
      src: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1793716683/ee82941e-4309-4d70-b218-a53f71dda644.png",
      alt: "Reels Bundle Categories and Content Breakdown",
    },
    {
      src: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1793716618/7c7b0eae-39d9-49a0-8742-1561971eaed4.png",
      alt: "Instant Google Drive Access and Bonuses Included",
    },
  ],

  // ---------- Options ----------
  options: [],
  defaultSelections: {},

  // ---------- Trust row under the buy button ----------
  trustItems: [
    {
      title: "Instant Google Drive Access",
      description: "Direct Drive link access generated on screen & emailed instantly",
    },
    {
      title: "Secure Razorpay Checkout",
      description: "UPI, Cards, NetBanking & Wallets accepted",
    },
    {
      title: "Lifetime Access & No Watermarks",
      description: "Ready-to-post HD reels you can use forever without any branding",
    },
  ],

  // ---------- About this product ----------
  aboutHeadline: "Built for founders, freelancers, and growth operators",
  description: [
    "The Ultimate All-in-One Digital Growth Kit is designed for founders, freelancers, and operators who need production-ready frameworks without the guesswork.",
    "Every template, workflow, and checklist in this package has been battle-tested to maximize efficiency, streamline customer acquisition, and scale daily operations effortlessly.",
  ],
  useCases: [
    {
      title: "Fast-Track Client Acquisition",
      description: "Deploy tested outreach sequences and outreach trackers to close high-value deals.",
    },
    {
      title: "Operational Efficiency",
      description: "Standardize your delivery pipeline with modular Notion and spreadsheet templates.",
    },
    {
      title: "Campaign Ready Assets",
      description: "Plug-and-play marketing assets and sales decks ready for rapid deployment.",
    },
  ],

  // ---------- What's included ----------
  includedHeadline: "What you will get",
  includedNote: "Explore a wide variety of topics, including:",
  included: [
    { label: "Luxury & Lifestyle" },
    { label: "Travel & Adventure" },
    { label: "Cars & Automotive" },
    { label: "AI Animals" },
    { label: "AI Stories" },
    { label: "Baby & Podcast Content" },
    { label: "Satisfying Videos" },
    { label: "DIY & Tools" },
    { label: "Art & Crafts" },
    { label: "Product & Life Hacks" },
    { label: "Space & Universe" },
    { label: "Animal Content" },
    { label: "Faceless Lifestyle" },
    { label: "Viral-Style Short Videos" },
    { label: "And many more niche categories" },
  ],
  bonusIncluded: [],

  // ---------- Reviews ----------
  reviews: [
    {
      name: "Arjun Verma",
      avatar: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1790439875/516376111_18118412191469225_9053000860615643889_n.jpg",
      quote: "Thought it would be trash for 99rs, but the clips are super clean with zero watermarks. Posted few videos started getting views. highly recommended.",
      rating: 5,
    },
    {
      name: "Vikram Patel",
      avatar: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1790439874/817624785_18287670310291560_7545176636510048760_n_1.jpg",
      quote: "Saves me hours every day for my fitness pages. The drive is organized perfectly. I just download, add a trending audio, and post. Best 99rs spent.",
      rating: 5,
    },
    {
      name: "Rohan Mehta",
      avatar: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1790439874/689904829_18214659865324120_515257737182865226_n_1.jpg",
      quote: "Great product! at first it Sounded like a scam for 99rs lol, but the Drive link popped up instantly after payment. The luxury folder is crazy good for theme pages.",
      rating: 5,
    },
  ],

  // ---------- How it works ----------
  howItWorks: [
    "Complete Secured Payment",
    "Instant Google Drive Access",
    "Launch & Start Scaling",
  ],

  // ---------- FAQ ----------
  faqs: [
    {
      question: "How do I get the reels?",
      answer:
        "Right after payment you receive your instant Google Drive link on screen. We also WhatsApp and email you the Drive link.",
    },
    {
      question: "Are these reels really copyright-free?",
      answer:
        "Yes. Every reel in the vault is copyright-free for you to use - post it on Instagram, YouTube Shorts, Facebook, Moj, Josh or client pages you manage. The only thing not allowed is reselling or sharing the vault itself.",
    },
    {
      question: "How often are new reels added?",
      answer:
        "Every week. New reels land in the same Google Drive folder, and you get every one of them free - no extra payment, ever.",
    },
    {
      question: "Is this a subscription?",
      answer:
        "No. ₹99 once - and the weekly new reels are included free, forever.",
    },
    {
      question: "Do I need any edits to upload?",
      answer: "No, you don’t need to edit anything — just open your Google Drive link, download the reels & post.",
    },
    {
      question: "In What Format Will I Receive the Product?",
      answer:
        "You will receive instant Google Drive link access, where you can stream or download the videos anytime. All videos are provided in MP4 format.",
    },
  ],

  // ---------- Final CTA ----------
  finalCta: {
    headline: "Take Action Now, Don't Regret Later.",
    body: "Next time the price will be higher — don't miss this opportunity.",
  },

  // ---------- Buttons ----------
  buyButtonLabel: "Get Instant Drive Access ₹99 ₹4,999",
  stickyBuyButtonLabel: "Get Instant Drive Access ₹99 ₹4,999",
  secondaryButtonLabel: "Add to cart",
  buyUrl: "#buy",
  footerNote: "Pay securely with Razorpay · Instant Google Drive access after payment",
};
