import { motion, Variants } from 'framer-motion';
import { Scale, AlertTriangle, Mail, List } from 'lucide-react';
import React from 'react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
}

const TableOfContents = () => {
  const sections = [
    { id: 'online-store-terms', title: 'Online Store Terms' },
    { id: 'general-conditions', title: 'General Conditions' },
    { id: 'accuracy-completeness-timeliness', title: 'Accuracy, Completeness and Timeliness of Information' },
    { id: 'modifications-service-prices', title: 'Modifications to the Service and Prices' },
    { id: 'products-services', title: 'Products or Services' },
    { id: 'billing-account-information', title: 'Accuracy of Billing and Account Information' },
    { id: 'optional-tools', title: 'Optional Tools' },
    { id: 'third-party-links', title: 'Third-Party Links' },
    { id: 'user-comments-feedback', title: 'User Comments, Feedback and Other Submissions' },
    { id: 'personal-information', title: 'Personal Information' },
    { id: 'errors-inaccuracies-omissions', title: 'Errors, Inaccuracies and Omissions' },
    { id: 'prohibited-uses', title: 'Prohibited Uses' },
    { id: 'disclaimer-warranties-limitation', title: 'Disclaimer of Warranties; Limitation of Liability' },
    { id: 'indemnification', title: 'Indemnification' },
    { id: 'severability', title: 'Severability' },
    { id: 'termination', title: 'Termination' },
    { id: 'entire-agreement', title: 'Entire Agreement' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'changes-to-terms', title: 'Changes to Terms of Service' },
    { id: 'contact-information', title: 'Contact Information' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <List className="w-4 h-4 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Table of Contents</h2>
      </div>
      <nav className="space-y-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-lg px-3 py-2 transition-colors duration-200 text-left w-full"
          >
            <span className="text-sm font-medium text-blue-600">{index + 1}.</span>
            <span className="font-medium">{section.title}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default function TermsOfService() {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-[#1a1a1f] border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-white text-center">Terms of Service</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            {/* Introduction */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                This website is operated by Coast 2 Coast Robotics. Throughout the site, the terms &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to Coast 2 Coast Robotics and our affiliates. Our offerings, including all information, tools and services, are available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By visiting our site and/or purchasing something from us, you engage in our &ldquo;Service&rdquo; and agree to be bound by the following terms and conditions (&ldquo;Terms of Service&rdquo;, &ldquo;Terms&rdquo;), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-amber-900">Important Notice</span>
                </div>
                <p className="text-amber-800 text-sm">
                  Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
                </p>
              </div>
            </div>

            {/* Table of Contents */}
            <TableOfContents />

            {/* Section 1 - Online Store Terms */}
            <section id="online-store-terms" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                1. Online Store Terms
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Age Requirements and Usage</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Prohibited Activities</h4>
                  <ul className="space-y-2 text-red-800 text-sm">
                    <li>• You may not use our products for any illegal or unauthorized purpose</li>
                    <li>• You may not violate any laws in your jurisdiction (including but not limited to copyright laws)</li>
                    <li>• You must not transmit any worms or viruses or any code of a destructive nature</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Important:</strong> A breach or violation of any of the Terms will result in an immediate termination of your Services.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 - General Conditions */}
            <section id="general-conditions" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                2. General Conditions
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Service Rights and Data Handling</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to refuse service to anyone for any reason at any time.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Data Transmission</h4>
                  <p className="text-blue-800 text-sm mb-2">
                    You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.
                  </p>
                  <p className="text-blue-800 text-sm">
                    <strong>Security Note:</strong> Credit card information is always encrypted during transfer over networks.
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us. The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
                </p>
              </div>
            </section>

            {/* Section 3 - Accuracy, Completeness and Timeliness of Information */}
            <section id="accuracy-completeness-timeliness" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                3. Accuracy, Completeness and Timeliness of Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Information Disclaimer</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-900 mb-2">Historical Information</h4>
                  <p className="text-amber-800 text-sm">
                    This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 - Modifications to the Service and Prices */}
            <section id="modifications-service-prices" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                4. Modifications to the Service and Prices
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Service and Price Changes</h3>
                </div>
                <p className="text-gray-700">
                  Prices for our products are subject to change without notice.
                </p>
                <p className="text-gray-700">
                  We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                </p>
                <p className="text-gray-700">
                  We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
                </p>
              </div>
            </section>

            {/* Section 5 - Products or Services */}
            <section id="products-services" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                5. Products or Services
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Product Availability and Quality</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor&rsquo;s display of any color will be accurate.
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Our Rights and Limitations</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction</li>
                    <li>• We may exercise this right on a case-by-case basis</li>
                    <li>• We reserve the right to limit the quantities of any products or services that we offer</li>
                    <li>• All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us</li>
                    <li>• We reserve the right to discontinue any product at any time</li>
                    <li>• Any offer for any product or service made on this site is void where prohibited</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm">
                    <strong>No Warranty:</strong> We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 - Accuracy of Billing and Account Information */}
            <section id="billing-account-information" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                6. Accuracy of Billing and Account Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Order Processing and Account Requirements</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm mb-2">
                    You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
                  </p>
                  <p className="text-blue-800 text-sm">
                    For more detail, please review our Returns Policy.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7 - Optional Tools */}
            <section id="optional-tools" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                7. Optional Tools
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Third-Party Tools</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm mb-2">
                    You acknowledge and agree that we provide access to such tools &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.
                  </p>
                  <p className="text-blue-800 text-sm">
                    Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.
                </p>
              </div>
            </section>

            {/* Section 8 - Third-Party Links */}
            <section id="third-party-links" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                8. Third-Party Links
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">External Website Disclaimer</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Certain content, products and services available via our Service may include materials from third-parties.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm mb-2">
                    We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party&rsquo;s policies and practices and make sure you understand them before you engage in any transaction.
                  </p>
                  <p className="text-red-800 text-sm">
                    Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9 - User Comments, Feedback and Other Submissions */}
            <section id="user-comments-feedback" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                9. User Comments, Feedback and Other Submissions
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Content Submissions</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, &lsquo;comments&rsquo;), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Content Moderation</h4>
                  <p className="text-yellow-800 text-sm">
                    We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party&rsquo;s intellectual property or these Terms of Service.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Your Comment Responsibilities</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right</li>
                    <li>• You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website</li>
                    <li>• You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments</li>
                    <li>• You are solely responsible for any comments you make and their accuracy</li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We take no responsibility and assume no liability for any comments posted by you or any third-party.
                </p>
              </div>
            </section>

            {/* Section 10 - Personal Information */}
            <section id="personal-information" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                10. Personal Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Privacy Policy Reference</h3>
                </div>
                <p className="text-gray-900 text-sm">
                  Your submission of personal information through the store is governed by our Privacy Policy. To view our Privacy Policy.
                </p>
              </div>
            </section>

            {/* Section 11 - Errors, Inaccuracies and Omissions */}
            <section id="errors-inaccuracies-omissions" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                11. Errors, Inaccuracies and Omissions
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Information Accuracy</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 12 - Prohibited Uses */}
            <section id="prohibited-uses" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                12. Prohibited Uses
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Prohibited Activities</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <ul className="space-y-2 text-red-800 text-sm">
                    <li>(a) for any unlawful purpose;</li>
                    <li>(b) to solicit others to perform or participate in any unlawful acts;</li>
                    <li>(c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances;</li>
                    <li>(d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others;</li>
                    <li>(e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability;</li>
                    <li>(f) to submit false or misleading information;</li>
                    <li>(g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet;</li>
                    <li>(h) to collect or track the personal information of others;</li>
                    <li>(i) to spam, phish, pharm, pretext, spider, crawl, or scrape;</li>
                    <li>(j) for any obscene or immoral purpose;</li>
                    <li>(k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet.</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Enforcement:</strong> We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 13 - Disclaimer of Warranties; Limitation of Liability */}
            <section id="disclaimer-warranties-limitation" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                13. Disclaimer of Warranties; Limitation of Liability
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Service Disclaimers</h3>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <ul className="space-y-3 text-red-800 text-sm">
                    <li>• We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.</li>
                    <li>• We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.</li>
                    <li>• You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Service Provision</h4>
                  <p className="text-gray-700 text-sm">
                    You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided &lsquo;as is&rsquo; and &lsquo;as available&rsquo; for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Liability Limitation</h4>
                  <p className="text-yellow-800 text-sm">
                    In no case shall Coast 2 Coast Robotics, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 14 - Indemnification */}
            <section id="indemnification" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                14. Indemnification
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">User Indemnification</h3>
                </div>
                <p className="text-gray-900 text-sm">
                  You agree to indemnify, defend and hold harmless Coast 2 Coast Robotics and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys&rsquo; fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.
                </p>
              </div>
            </section>

            {/* Section 15 - Severability */}
            <section id="severability" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                15. Severability
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Legal Severability</h3>
                </div>
                <p className="text-gray-900 text-sm">
                  In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.
                </p>
              </div>
            </section>

            {/* Section 16 - Termination */}
            <section id="termination" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                16. Termination
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Agreement Termination</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Termination Conditions</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.
                  </p>
                  <p className="text-gray-700 text-sm">
                    If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 17 - Entire Agreement */}
            <section id="entire-agreement" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                17. Entire Agreement
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Complete Agreement</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.
                </p>
                <p className="text-gray-900 text-sm">
                  These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).
                </p>
                <p className="text-gray-900 text-sm">
                  Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.
                </p>
              </div>
            </section>

            {/* Section 18 - Governing Law */}
            <section id="governing-law" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                18. Governing Law
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Legal Jurisdiction</h3>
                </div>
                <p className="text-gray-900 text-sm">
                  These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of United States and New York State.
                </p>
              </div>
            </section>

            {/* Section 19 - Changes to Terms of Service */}
            <section id="changes-to-terms" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                19. Changes to Terms of Service
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Terms Updates</h3>
                </div>
                <p className="text-gray-900 text-sm mb-2">
                  You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website.
                </p>
                <p className="text-gray-900 text-sm">
                  It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.
                </p>
              </div>
            </section>

            {/* Section 20 - Contact Information */}
            <section id="contact-information" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                20. Contact Information
              </h2>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Questions about the Terms of Service?</h3>
                      <p className="text-blue-700 text-sm">We&rsquo;re here to help clarify any concerns</p>
                    </div>
                  </div>
                  <p className="text-blue-800 mt-3">
                    Questions about the Terms of Service should be sent to us at{' '}
                    <a href="mailto:info@c2crobotics.com" className="font-semibold hover:underline">
                      info@c2crobotics.com
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </motion.main>
  )
}