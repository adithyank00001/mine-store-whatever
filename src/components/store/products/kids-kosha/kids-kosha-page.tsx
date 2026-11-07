"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import "./kids-kosha.css";
import { useProductCheckout } from "@/lib/store/hooks/use-product-checkout";
import type { StoreProductConfig } from "@/lib/store/product-content";

export function KidsKoshaPage({ product }: { product: StoreProductConfig }) {
  const { handleBuy, startingCheckout, payError } = useProductCheckout(product);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    if (payError) {
      toast.error(payError);
    }
  }, [payError]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [activeModal]);

  const onBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    void handleBuy();
  };

  return (
    <div style={{ minHeight: "100vh", width: "100%", maxWidth: "100vw", overflowX: "hidden", background: "#ffffff", margin: 0, padding: 0 }}>
      <div className="ss">

  <div className="top">Offer Valid Only For Today <s>₹1,999/-</s> <b>₹199/- Only</b></div>

  <section className="hero">
    <div className="w">
      <div>
        <h1>15,000+ printable worksheets that make learning <span>screen-free and fun</span></h1>
        <p className="lead">Tracing, counting, mazes, colouring and cut-and-glue pages for ages 2 to 7. Print at home and hand your child a new activity every day.</p>
        <ul className="chips"><li>Age 2 to 7</li><li>Print on A4 paper</li><li>Use for lifetime</li><li>Free new updates</li></ul>
        <div className="pricebox">
          <a className="btn" href="#buy" onClick={onBuyClick}>Buy now for ₹199<small></small></a>
          <div className="price"><s>₹1,999</s><b>₹199</b><small>One-time payment</small></div>
        </div>
        <p className="micro"><b>✓ Instant download</b> · 100% secure payment · Pay by UPI, card or netbanking</p>
      </div>
      <div className="box"><img decoding="async" src="/wp-content/uploads/2026/10/Kids-Learning-Worksheets-Hero.webp" alt="15,000+ printable kids worksheets bundle" width="600" height="600" fetchPriority="high" /></div>
    </div>
  </section>

  <section style={{ padding: "30px 0 6px" }}>
    <div className="w">
      <div className="ticket">
        <div><div className="faces"><i>👩</i><i>👨</i><i>👩‍🦱</i><i>🧑</i></div><b>35,000+</b><span>parents have bought it</span></div>
        <div><span className="st">★★★★★ 4.9</span><b>4,000+</b><span>parent reviews</span></div>
      </div>
    </div>
  </section>

  
  <section className="car">
    <div className="w">
      <h2 className="h2">Flip through real worksheet pages</h2>
      <p className="sub">Every page is clear, colourful and easy for small hands.</p>
      <p className="swipe">Swipe to see more ›</p>
    </div>
    <div className="track" tabIndex={0} aria-label="Sample worksheet pages">
        <figure><img decoding="async" loading="lazy" width="300" height="400" src="/wp-content/uploads/2026/09/Untitled-design-2026-09-30T002235.157.webp" alt="Alphabet tracing worksheet" /><figcaption>Alphabet Tracing</figcaption></figure>
        <figure><img decoding="async" loading="lazy" width="300" height="400" src="/wp-content/uploads/2026/09/Untitled-design-2026-09-30T002320.702.webp" alt="Count and write worksheet" /><figcaption>Count and Write</figcaption></figure>
        <figure><img decoding="async" loading="lazy" width="300" height="400" src="/wp-content/uploads/2026/09/Untitled-design-2026-09-30T002340.207.webp" alt="Maze game worksheet" /><figcaption>Maze Game</figcaption></figure>
        <figure><img decoding="async" loading="lazy" width="300" height="400" src="/wp-content/uploads/2026/09/Untitled-design-2026-09-30T002503.512.webp" alt="Learn numbers worksheet" /><figcaption>Learn Numbers</figcaption></figure>
        <figure><img decoding="async" loading="lazy" width="300" height="400" src="/wp-content/uploads/2026/09/Untitled-design-2026-09-30T002525.878.webp" alt="Picture addition worksheet" /><figcaption>Picture Addition</figcaption></figure>
        <figure><img decoding="async" loading="lazy" width="300" height="400" src="/wp-content/uploads/2026/09/Untitled-design-2026-09-30T002540.931.webp" alt="Pattern worksheet" /><figcaption>What Comes Next?</figcaption></figure>
    </div>
    <div className="w center" style={{ marginTop: "14px" }}><a className="btn" href="#buy" onClick={onBuyClick}>Buy now for ₹199<small></small></a></div>
  </section>

  
  <section className="sec">
    <div className="w">
      <h2 className="h2">Worksheets your child will enjoy</h2>
      <p className="sub">A few of the many types inside. You get thousands more like these.</p>
      <div className="gal">
        <figure><img decoding="async" loading="lazy" width="300" height="400" src="/wp-content/uploads/2026/09/Untitled-design-2026-10-01T005608.441.webp" alt="Alphabet tracing worksheet" /><figcaption>Alphabet Tracing</figcaption></figure>
        <figure><img decoding="async" loading="lazy" width="300" height="400" src="/wp-content/uploads/2026/09/Untitled-design-2026-10-01T005615.312.webp" alt="Count and write worksheet" /><figcaption>Count and Write</figcaption></figure>
        <figure><img decoding="async" loading="lazy" width="300" height="400" src="/wp-content/uploads/2026/09/Untitled-design-2026-10-01T005629.325.webp" alt="Maze game worksheet" /><figcaption>Maze Game</figcaption></figure>
        <figure><img decoding="async" loading="lazy" width="300" height="400" src="/wp-content/uploads/2026/09/Untitled-design-2026-10-01T005638.833.webp" alt="Learn numbers worksheet" /><figcaption>Learn Numbers</figcaption></figure>
        <figure><img decoding="async" loading="lazy" width="300" height="400" src="/wp-content/uploads/2026/09/Untitled-design-2026-10-01T005657.005.webp" alt="Picture addition worksheet" /><figcaption>Picture Addition</figcaption></figure>
        <figure><img decoding="async" loading="lazy" width="300" height="400" src="/wp-content/uploads/2026/09/Untitled-design-2026-10-01T005646.749.webp" alt="Pattern worksheet" /><figcaption>What Comes Next?</figcaption></figure>
      </div>
      <p className="more">+ 15,000 more worksheets, all for ₹199</p>
      <div className="center" style={{ marginTop: "14px" }}><a className="btn" href="#buy" onClick={onBuyClick}>Yes, I want all worksheets<small></small></a></div>
    </div>
  </section>

  <section className="sec" style={{ background: "#fff", paddingTop: 0 }}>
    <div className="w">
      <h2 className="h2">How it works: 3 easy steps</h2>
      <p className="sub">You can start in 10 minutes.</p>
      <div className="steps">
        <div><span>1</span><h3>Pay ₹199</h3><p>Pay by UPI, card or netbanking. It takes 1 minute.</p></div>
        <div><span>2</span><h3>Download the PDF files</h3><p>After payment, the download page opens right away.</p></div>
        <div><span>3</span><h3>Print and start</h3><p>Print on A4 paper at home or at a print shop.</p></div>
      </div>
    </div>
  </section>

  <section className="sec inside">
    <div className="w">
      <h2 className="h2">What you get inside</h2>
      <p className="sub">You pay once and get all these worksheets.</p>
      <div className="l">
        <ul className="list">
          <li><b>3,000+</b> colouring and drawing worksheets</li>
          <li><b>1,300+</b> English alphabet and number worksheets</li>
          <li><b>1,000+</b> cut and paste worksheets</li>
          <li><b>300+</b> number and counting worksheets</li>
          <li><b>300+</b> word search worksheets</li>
          <li><b>40+</b> skills with a progress tracker, and handwriting practice sheets</li>
          <li className="free">Free bonus:Ebooks</li>
          <li className="free">Free bonus: all new updates in future</li>
          <li className="total">All this for just <b>₹199</b>. That is only 1.3 paise per worksheet.</li>
        </ul>
      </div>
    </div>
  </section>

  
  <section className="sec">
    <div className="w">
      <h2 className="h2">One bundle for every class</h2>
      <p className="sub">Nursery, LKG, UKG or Class 1? You do not need to buy separately. Pick the pages that match your child's level.</p>
      <div className="plan">
        <div><b>Playgroup</b><p>Age 2 to 3<br />Colouring, drawing, shapes</p></div>
        <div><b>Nursery</b><p>Age 3 to 4<br />Alphabet tracing, numbers, pencil practice</p></div>
        <div><b>LKG</b><p>Age 4 to 5<br />Writing letters, counting, mazes, cut and paste</p></div>
        <div><b>UKG</b><p>Age 5 to 6<br />Number writing, picture addition, patterns</p></div>
        <div><b>Class 1</b><p>Age 6 to 7<br />Word search, handwriting, practice sheets</p></div>
      </div>
      <p className="more">Buy once and use for all your children, as they grow</p>
      <div className="center" style={{ marginTop: "14px" }}><a className="btn" href="#buy" onClick={onBuyClick}>Get all classes for ₹199<small></small></a></div>
    </div>
  </section>

  <section className="sec">
    <div className="w">
      <h2 className="h2">A simple week plan for your child</h2>
      <p className="sub">Just 15 minutes a day, Monday to Friday. A new skill every day.</p>
      <div className="plan">
        <div><b>Mon</b><p>Write A to Z</p></div>
        <div><b>Tue</b><p>Counting</p></div>
        <div><b>Wed</b><p>Maze game</p></div>
        <div><b>Thu</b><p>Colouring</p></div>
        <div><b>Fri</b><p>Cut and paste</p></div>
      </div>
      <div className="fun"><b>🎉 Sat and Sun are Funday!</b><p>No worksheets. Just play, relax and show family what your child made this week.</p></div>
    </div>
  </section>

  <section className="sec" style={{ background: "var(--lav)" }}>
    <div className="w">
      <h2 className="h2">Why parents love it</h2>
      <p className="sub">Less mobile time, more learning.</p>
      <div className="ben">
        <div><span>📵</span><h3>No screen time</h3><p>Replace cartoons with activities that keep your child busy and thinking.</p></div>
        <div><span>✏️</span><h3>School ready</h3><p>Letters, numbers, shapes and pencil practice for nursery to class 1.</p></div>
        <div><span>🧒</span><h3>Independent</h3><p>Easy pages your child can do alone. It builds focus and confidence.</p></div>
        <div><span>🖨️</span><h3>Print anytime</h3><p>Print as many copies as you want, for all your children.</p></div>
      </div>
    </div>
  </section>

  
  <section className="sec proof">
    <div className="w">
      <h2 className="h2">What parents say</h2>
      <p className="sub">Parents share how worksheets helped their children.</p>
      <div className="chat">
        <figure><div className="stars" aria-label="5 out of 5">★★★★★</div><blockquote>My son used to ask for the mobile every evening after dinner. Now he asks for his maze sheet. I print 2 pages daily and this is now the most peaceful time of our day.</blockquote><figcaption><b>Priya S.</b>, Pune · Mom of a 4 year old</figcaption></figure>
        <figure><div className="stars" aria-label="5 out of 5">★★★★★</div><blockquote>We have twins, so we print 2 copies of every page. In 3 weeks, they have not repeated a single worksheet. Very good for ₹199.</blockquote><figcaption><b>Rohit &amp; Anjali M.</b>, Bengaluru · Parents of twins</figcaption></figure>
        <figure><div className="stars" aria-label="5 out of 5">★★★★★</div><blockquote>Her pencil grip became better in just 2 weeks with the writing practice pages. I did not expect so much for this price.</blockquote><figcaption><b>Sneha K.</b>, Jaipur · Mom of a 3 year old</figcaption></figure>
        <figure><div className="stars" aria-label="5 out of 5">★★★★★</div><blockquote>School is starting soon and I wanted my son to be ready. Alphabet, numbers and cut and paste are all in one download. Worth much more than ₹199.</blockquote><figcaption><b>Farah A.</b>, Hyderabad · Mom of a 5 year old</figcaption></figure>
        <figure><div className="stars" aria-label="5 out of 5">★★★★★</div><blockquote>I sent the PDF files from my phone to a print shop and got a full set in 1 hour. The quality is good and it looks fine in black and white too.</blockquote><figcaption><b>Deepak V.</b>, Lucknow · Dad of a 6 year old</figcaption></figure>
        <figure><div className="stars" aria-label="5 out of 5">★★★★★</div><blockquote>I also use the word search and counting sheets with my tuition students. This is the best value worksheet pack I have bought.</blockquote><figcaption><b>Meera R.</b>, Chennai · Teacher and mom of two</figcaption></figure>
      </div>
      <div className="center"><a className="btn" href="#buy" onClick={onBuyClick}>Yes, I want it for ₹199<small></small></a></div>
    </div>
  </section>

  <section className="sec" id="buy">
    <div className="w">
      <div className="offer">
        <h2>Get all 15,000+ worksheets</h2>
        <p style={{ color: "var(--mute)" }}>Plus free ebooks and new updates.</p>
        <p className="micro"><b>★★★★★ 4.9</b> Loved by 35,000+ parents · 4,000+ reviews</p>
        <div className="price"><s>₹1,999</s><b>₹199</b><small>Pay once · use for lifetime</small></div>
        <p className="per">That is only 1.3 paise per worksheet</p>
        <a className="btn" href="#buy" style={{ width: "100%" }} onClick={onBuyClick}>Buy now for ₹199<small></small></a>
        <div className="pay" style={{ marginTop: "18px", justifyContent: "center" }}>
          <img
            src="/wp-content/uploads/payment-methods.webp"
            alt="Accepted payment methods: UPI, Google Pay, PhonePe, Paytm, Visa, Mastercard, RuPay, Netbanking"
            width={458}
            height={29}
            loading="lazy"
            decoding="async"
            style={{ maxWidth: "380px", width: "100%", height: "auto", margin: "0 auto", display: "block" }}
          />
        </div>
        <p className="guar">🛡️ Instant download · Free help if any file does not open</p>
        <p className="digital">📥 <b>Printable PDF files</b>, delivered instantly. This is a digital product, so no physical book is shipped.</p>
      </div>
    </div>
  </section>

  <section className="sec faq" style={{ paddingTop: "20px" }}>
    <div className="w">
      <h2 className="h2" style={{ marginBottom: "24px" }}>Questions parents ask</h2>
      <div className="l">
        <details><summary>Which ages is it for?</summary><p>For children aged 2 to 7. It is good for playgroup, nursery, LKG, UKG and class 1.</p></details>
        <details><summary>I need worksheets only for Nursery (or LKG). Do I have to buy separately?</summary><p>No. There is one bundle for all levels, from playgroup to class 1, and there are no separate class-wise packs. You pay ₹199 once and use the pages that match your child's class. When your child moves to the next class, you already have the next level.</p></details>
        <details><summary>Will I get a physical workbook at my home address?</summary><p>No. This is a 100% digital, printable product. You will get PDF files to download, and you print the worksheets yourself at home or at a print shop. No physical workbook, book or printed copy will be delivered to your address.</p></details>
        <details><summary>How will I get the files?</summary><p>After payment, the download page opens right away. Save that page so you can download again anytime. Nothing is sent by post.</p></details>
        <details><summary>Can I open the files on my phone?</summary><p>Yes. The files are PDFs and open on any phone, tablet or computer. For printing, use a computer or send the PDF to a print shop.</p></details>
        <details><summary>What do I need for printing?</summary><p>A home printer or a nearby print shop, with normal A4 paper. All pages also look good in black and white.</p></details>
        <details><summary>How can I pay?</summary><p>You can pay by UPI (Google Pay, PhonePe, Paytm), debit card, credit card or netbanking. All payments are 100% safe and secure. We never see or store your card or UPI details.</p></details>
        <details><summary>What if a file does not open or I face a problem?</summary><p>WhatsApp us at <a href="https://wa.me/918891993882" target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink)", fontWeight: 700, textDecoration: "underline" }}>8891993882</a>. We will fix the problem or send the files again. As this is a digital product, we do not offer refunds once the files are downloaded.</p></details>
        <details><summary>How can I contact you?</summary><p>WhatsApp us at <a href="https://wa.me/918891993882" target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink)", fontWeight: 700, textDecoration: "underline" }}>8891993882</a>. We reply Monday to Saturday, 10am to 7pm IST.</p></details>
      </div>
    </div>
  </section>

  <section className="final">
    <div className="w">
      <h2>Start today. Give your child a good daily habit.</h2>
      <p>15,000+ worksheets for just ₹199. Download and print in minutes.</p>
      <a className="btn" href="#buy" onClick={onBuyClick}>Buy now for ₹199<small></small></a>
      <p className="micro">Instant download · 100% secure payment</p>
    </div>
  </section>

  <div className="stick">
    <div className="stick-urgency">
      <span>Offer Ends Today. </span>
      <span className="hurry">HURRY UP!</span>
    </div>
    <div className="stick-row">
      <span><b>₹199</b> <s style={{ color: "#9a95ad", fontSize: "13px" }}>₹1,999</s></span>
      <a className="btn" href="#buy" onClick={onBuyClick}>Buy now</a>
    </div>
  </div>
</div>


        
		

        
	
	


<div id="modal-about-us" className={`policy-modal ${activeModal === "modal-about-us" ? "active" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}>
  <div className="policy-modal-card">
    <button type="button" className="policy-modal-close" onClick={() => setActiveModal(null)} aria-label="Close modal">&times;</button>
    <div className="kids-kosha-about">
  <h2>Welcome to Kids Kosha</h2>
  <p>We create engaging, high-quality printable worksheets and digital products designed to help young minds learn, play, and grow. Our goal is to give parents a reliable, affordable alternative to endless screen time, right at their fingertips.</p>

  <h3>Our Story</h3>
  <p>Kids Kosha was born from a familiar struggle faced by parents across India: finding a productive, screen-free way to keep children engaged. Expensive physical activity books are finished in a flash, they take days to deliver, and handing over a smartphone is always the easiest—but not the best—option.</p>
  <p>We wanted to build a true <em>Kosha</em> (a treasure trove) where parents could instantly find exactly what their child needs to learn today, print it out at home, and watch them thrive.</p>

  <h3>What We Offer</h3>
  <p>We provide comprehensive digital activity bundles and printable worksheets covering the crucial early learning years. From tracing letters and numbers to coloring, mazes, patterns, and early math, our digital downloads allow you to print exactly what you need, right when you need it, for children aged 2 to 7. Print a single page or an entire workbook, as many times as you like.</p>

  <h3>Our Mission</h3>
  <p>To make quality early education accessible, affordable, and joyful for every family, transforming passive screen time into active, hands-on learning.</p>

  <h3>Why Choose Kids Kosha?</h3>
  <ul>
    <li><strong>Treasure Trove of Choices:</strong> Thousands of thoughtfully designed activities catering to every stage of early development.</li>
    <li><strong>Screen-Free Focus:</strong> Printed on paper to keep little hands busy and minds active, safely away from digital distractions.</li>
    <li><strong>Instant Access:</strong> Download immediately after your purchase via automated delivery—yours to keep and print forever.</li>
    <li><strong>Incredibly Affordable:</strong> Endless learning material for less than the cost of a single traditional activity book.</li>
  </ul>

  <p>Thank you for choosing Kids Kosha. We are proud to be a part of your child's learning journey.</p>

  <div className="kids-kosha-footer">
    <p><em>Kids Kosha is proudly owned and operated by Rubirails Retail.</em></p>
  </div>
</div>
  </div>
</div>

<div id="modal-contact-us" className={`policy-modal ${activeModal === "modal-contact-us" ? "active" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}>
  <div className="policy-modal-card">
    <button type="button" className="policy-modal-close" onClick={() => setActiveModal(null)} aria-label="Close modal">&times;</button>
    <div className="kids-kosha-contact">
  <h2>Get in Touch</h2>
  <p>Have a question about your order, your digital download, or our printable worksheets? We are happy to help. Email is the fastest way to reach us, and our team aims to reply within one working day.</p>

  <div className="contact-details-box">
    <h3>Contact &amp; Business Details</h3>
    <ul>
      <li><strong>Store Name:</strong> Kids Kosha</li>
      <li><strong>Email:</strong> <a href="mailto:support@kidskosha.in" style={{ color: "#2980b9", textDecoration: "none" }}>support@kidskosha.in</a></li>
      <li><strong>Support Hours:</strong> Monday to Saturday, 10:00 AM to 7:00 PM IST</li>
    </ul>
    
    <div style={{ marginTop: "25px", paddingTop: "15px", borderTop: "1px dashed #cccccc" }}>
      <ul>
        <li><strong>Registered Entity:</strong> Rubirails Retail</li>
       
        <li><strong>GSTIN:</strong> 29EHDPR9680B1ZV</li>
      </ul>
    </div>
  </div>

  <div className="help-section">
    <h3>Order and Download Help</h3>
    <p>If you paid but did not reach your download page or receive your WhatsApp confirmation, please email us with your <strong>Razorpay payment ID</strong> (you will find this in your payment confirmation SMS or email) or the phone number used during checkout. We will verify the transaction and send your download link right away.</p>
  </div>
</div>
  </div>
</div>

<div id="modal-terms" className={`policy-modal ${activeModal === "modal-terms" ? "active" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}>
  <div className="policy-modal-card">
    <button type="button" className="policy-modal-close" onClick={() => setActiveModal(null)} aria-label="Close modal">&times;</button>
    <div className="kids-kosha-policy">
  <h2>Terms &amp; Conditions</h2>
  
  <p>Welcome to Kids Kosha. These Terms and Conditions outline the rules and regulations for the use of the Kids Kosha website, located at kidskosha.in.</p>
  <p>By accessing this website and purchasing our digital products, we assume you accept these terms and conditions in full. Do not continue to use Kids Kosha if you do not agree to take all of the terms and conditions stated on this page.</p>

  <h3>1. Definitions</h3>
  <ul>
    <li><strong>“Website”</strong> refers to kidskosha.in.</li>
    <li><strong>“Products”</strong> refers to the printable worksheets, digital activity bundles, PDFs, and related downloadable materials offered for sale on the Website.</li>
    <li><strong>“User”, “You”, and “Your”</strong> refers to the individual accessing the Website and accepting the Company’s terms and conditions.</li>
    <li><strong>“The Company”, “Ourselves”, “We”, “Our”, and “Us”</strong> refers to Kids Kosha, owned and operated by Rubirails Retail.</li>
  </ul>

  <h3>2. Intellectual Property Rights</h3>
  <p>Unless otherwise stated, Rubirails Retail and/or its licensors own the intellectual property rights for all material, worksheets, illustrations, and compilations on this Website. All intellectual property rights are reserved.</p>
  <p>When you purchase a digital product from Kids Kosha, you are granted a non-exclusive, non-transferable, single-user license to download and print the digital content for personal, non-commercial home or classroom use only.</p>
  <p>You must not:</p>
  <ul>
    <li>Republish material from Kids Kosha.</li>
    <li>Sell, rent, or sub-license material from Kids Kosha.</li>
    <li>Reproduce, duplicate, copy, or translate material from Kids Kosha for commercial purposes.</li>
    <li>Redistribute content from Kids Kosha (including sharing PDF files on public forums, social media, or with unauthorized third parties).</li>
  </ul>

  <h3>3. Purchases and Payments</h3>
  <p>All prices listed on the Website are in Indian Rupees (INR) unless otherwise specified. We reserve the right to change prices at any time without prior notice. However, once you have successfully completed a purchase, you will not be subjected to any additional fees for that specific transaction.</p>
  <p>We use secure, authorized third-party payment gateways (such as Razorpay). You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.</p>

  <h3>4. Delivery of Digital Goods</h3>
  <p>Because our products are entirely digital, delivery is instantaneous. Upon successful payment, download links are immediately presented on your screen. The digital files are also instantly generated and sent to the email address and WhatsApp number provided during checkout. It is your responsibility to ensure your contact details are entered correctly.</p>

  <h3>5. Refund &amp; Cancellation Policy</h3>
  <p>Because our products are instantly delivered digital downloads, order processing is automated and orders cannot be cancelled once the transaction is complete. We do not offer refunds once the files have been downloaded or accessed, except in specific cases of non-delivery, corrupt files, or duplicate payments reported within 7 days of purchase.</p>
  <p>By completing your purchase, you acknowledge and agree to these terms. For complete details on exceptions, missing files, and resolution procedures, please review our dedicated Cancellation and Refund Policy.</p>

  <h3>6. User Conduct and Restrictions</h3>
  <p>You agree not to use the Website in any way that is harmful, illegal, or inappropriate. You are prohibited from using the site or its content:</p>
  <ul>
    <li>For any unlawful purpose.</li>
    <li>To solicit others to perform or participate in any unlawful acts.</li>
    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others.</li>
    <li>To submit false or misleading information.</li>
    <li>To upload or transmit viruses or any other type of malicious code.</li>
  </ul>

  <h3>7. Limitation of Liability</h3>
  <p>In no event shall Rubirails Retail, nor its directors, employees, or partners, be liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website or the digital products provided. The content provided in our digital products is for general educational and recreational purposes and should not be taken as certified professional pediatric or special education advice.</p>

  <h3>8. Governing Law &amp; Jurisdiction</h3>
  <p>These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Bengaluru, Karnataka for the resolution of any disputes.</p>

  <h3>9. Changes to Terms and Conditions</h3>
  <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Website after those revisions become effective, you agree to be bound by the revised terms.</p>

  <h3>10. Contact Information</h3>
  <p>If you have any questions or concerns regarding these Terms and Conditions, please contact us at:</p>
  <ul>
    <li><strong>Email:</strong> <a href="mailto:support@kidskosha.in">support@kidskosha.in</a></li>
    <li><strong>Entity:</strong> Rubirails Retail</li>
  </ul>
</div>
  </div>
</div>

<div id="modal-digital-delivery" className={`policy-modal ${activeModal === "modal-digital-delivery" ? "active" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}>
  <div className="policy-modal-card">
    <button type="button" className="policy-modal-close" onClick={() => setActiveModal(null)} aria-label="Close modal">&times;</button>
    <div className="kids-kosha-policy">
  <h2>Digital Delivery Policy</h2>
 
  
  <p>At Kids Kosha, we specialize in high-quality digital products. Because all of our offerings—including our printable worksheet bundles and activity packs—are entirely digital, our delivery process is designed for maximum speed, convenience, and instant access.</p>

  <h3>1. No Physical Shipping</h3>
  <p>Please note that <strong>we do not ship any physical goods</strong>. You will not receive any physical workbooks, printed papers, or other physical items via postal mail or courier services. All products offered on this website are intangible digital files (typically in PDF format) intended for you to print at home.</p>
  <p>Consequently, our shipping and handling fees are always ₹0, there are no delivery waiting times, and no tracking numbers are required.</p>

  <h3>2. Instant Delivery Process</h3>
  <p>Our delivery system is fully automated to ensure your child can begin learning and playing immediately after purchase. Upon successful payment, you will receive your files through three instantaneous methods:</p>
  <ul>
    <li><strong>Immediate On-Screen Download:</strong> You will be automatically redirected to a "Thank You" confirmation page containing a secure download link for your purchased files.</li>
    <li><strong>Email Delivery:</strong> An automated email containing your order summary and permanent download links will be sent to the email address provided during checkout.</li>
    <li><strong>WhatsApp Delivery:</strong> We will instantly send your download links directly to the WhatsApp number you provide, allowing you to easily access or forward the printables from your mobile device.</li>
  </ul>

  <h3>3. Troubleshooting & Technical Support</h3>
  <p>In the rare event that you do not see your download email, please check your Spam, Junk, or Promotions folders. If you still cannot locate your files, or if you entered incorrect contact details during checkout, please contact us immediately.</p>
  <p>If you experience any technical difficulties, such as corrupted files or broken links, our support team will manually verify your purchase and send you a fresh copy. If we cannot resolve your technical issue within 7 days of purchase, you are entitled to a full refund as outlined in our Cancellation and Refund Policy.</p>
  <p>For support, please contact us at <a href="mailto:support@kidskosha.in">support@kidskosha.in</a>.</p>

  <h3>4. Access & Security</h3>
  <p>We provide lifetime access to your purchased digital files. We recommend saving your files to a secure location (like a private cloud folder, Google Drive, or your device’s documents folder) to ensure you have them available whenever you need them. While we take every precaution to keep our servers stable and your links active, we highly encourage you to create your own local backups of your purchased materials.</p>
</div>
  </div>
</div>

<div id="modal-refund" className={`policy-modal ${activeModal === "modal-refund" ? "active" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}>
  <div className="policy-modal-card">
    <button type="button" className="policy-modal-close" onClick={() => setActiveModal(null)} aria-label="Close modal">&times;</button>
    <div className="kids-kosha-policy">
  <h2>Cancellation and Refund Policy</h2>
  <p>Thank you for shopping with Kids Kosha. This policy explains how cancellations and refunds work for our digital products.</p>

  <h3>Digital Products: No Refund After Download</h3>
  <p>Our printable worksheet bundles are digital products. The files are delivered instantly after successful payment and cannot be returned. Because of this, we do not offer refunds once the files have been downloaded or accessed, except in the cases listed below.</p>

  <h3>When We Will Help or Refund</h3>
  <p>Please email us in any of these cases:</p>
  <ul>
    
    <li><b>Corrupt or unopenable file:</b> a file does not open or is damaged, and we are unable to fix it or send a working copy.</li>
    <li><b>Duplicate payment:</b> you were charged more than once for the same order.</li>
  </ul>
  <p>We will first try to solve the problem by fixing the file or sending your files again. If for any technical reason we are unable to deliver a working product, you will receive a full refund for the affected order.</p>

  <h3>How to Contact Us</h3>
  <p>Email <a href="mailto:support@kidskosha.in">support@kidskosha.in</a> within 7 days of purchase with your registered email or mobile number and your order number or payment ID (you can find it in your payment confirmation). We reply Monday to Saturday, 10am to 7pm IST.</p>

  <h3>How Refunds Are Processed</h3>
  <p>Once a refund is approved and initiated by us, the amount is credited to your original payment method (UPI, card or net banking). This usually takes 5 to 7 working days, depending on your bank.</p>

  <h3>Order Cancellation</h3>
  <p>Because our products are delivered instantly after successful payment, orders cannot be cancelled once the transaction is complete. Please check the product details on our website before you buy.</p>

  <h3>Contact Us</h3>
  <p>For any questions about this policy, write to us at <a href="mailto:support@kidskosha.in">support@kidskosha.in</a>.</p>
</div>
  </div>
</div>

<div id="modal-disclaimer" className={`policy-modal ${activeModal === "modal-disclaimer" ? "active" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}>
  <div className="policy-modal-card">
    <button type="button" className="policy-modal-close" onClick={() => setActiveModal(null)} aria-label="Close modal">&times;</button>
    <div className="kids-kosha-policy">
  <h2>Legal Disclaimer</h2>
 
  
  <p>The information, printable worksheets, and digital products provided by Kids Kosha (accessible at kidskosha.in), owned and operated by Rubirails Retail, are strictly for general educational and recreational purposes. By accessing our website or purchasing our products, you explicitly acknowledge and agree to the following legally binding disclaimers.</p>

  <h3>1. AI-Assisted Content Generation</h3>
  <p>To provide vast, affordable, and varied collections of early learning activities efficiently, some of our worksheets, illustrations, and digital literature may be curated, formatted, or generated with the assistance of Artificial Intelligence (AI) technologies.</p>
  <ul>
    <li>While we make diligent efforts to oversee, review, and format this content to ensure it is child-friendly and educational, AI systems can occasionally produce minor errors, formatting quirks, or visual inconsistencies.</li>
    <li>Kids Kosha does not claim that these materials are perfectly flawless or certified by formal educational boards.</li>
    <li>By purchasing these materials, you accept that they may contain minor discrepancies, and Kids Kosha bears no liability for any misunderstandings or errors that arise from AI-assisted content.</li>
  </ul>

  <h3>2. No Professional Educational or Medical Advice</h3>
  <p>The content found within our digital worksheets—including references to early learning, motor skill development, and cognitive exercises—does not constitute professional pediatric, psychological, special education, or certified academic advice.</p>
  <p>Any activities provided are for supplemental home use. You must never disregard professional medical or educational advice, nor delay in seeking it, based on your child's interaction with our materials.</p>

  <h3>3. No Guaranteed Results</h3>
  <p>While our printable worksheets are designed to encourage learning and reduce screen time, Kids Kosha makes absolutely no representations, warranties, or guarantees that completing these activities will yield specific academic results, guaranteed admissions, or ensure your child hits specific developmental milestones.</p>

  <h3>4. Disclaimer of Warranties (“As-Is” Clause)</h3>
  <p>All products and services delivered by Kids Kosha are provided on an “AS IS” and “AS AVAILABLE” basis, without warranties of any kind, either express or implied. We expressly disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that our digital PDF files will be perfectly error-free or that they will meet specific regional academic standards.</p>

  <h3>5. Limitation of Liability</h3>
  <p>To the fullest extent permitted by applicable Indian law, under no circumstances shall Kids Kosha, Rubirails Retail, its owners, employees, affiliates, or licensors be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from:</p>
  <ul>
    <li>Your use of, or inability to use, our website or digital products.</li>
    <li>Any errors, omissions, or inaccuracies in the content.</li>
    <li>Any consequences resulting from your personal application of the educational materials provided.</li>
  </ul>

  <h3>6. Indemnification</h3>
  <p>By using our website and purchasing our products, you agree to indemnify, defend, and hold harmless Kids Kosha and Rubirails Retail from and against any and all claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys’ fees) arising out of your use of our products, your violation of these Terms, or your misinterpretation of the provided digital content.</p>

  <h3>7. Contact Us</h3>
  <p>If you have any questions regarding this legal disclaimer, please contact us at:</p>
  <ul>
    <li><strong>Email:</strong> <a href="mailto:support@kidskosha.in">support@kidskosha.in</a></li>
    <li><strong>Entity:</strong> Rubirails Retail</li>
    
  </ul>
</div>
  </div>
</div>




    </div>
  );
}
