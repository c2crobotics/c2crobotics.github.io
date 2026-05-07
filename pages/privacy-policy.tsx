import { motion, Variants } from 'framer-motion';
import { Shield, Eye, Users, Globe, AlertTriangle, Mail, Cookie, List } from 'lucide-react';
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
    {
      id: 'information-collection', title: 'Information Collection and Use', subsections: [
        {
          id: 'types-of-data', title: 'Types of Data Collected', subsections: [
            { id: 'personal-data', title: 'Personal Data' },
            { id: 'usage-data', title: 'Usage Data' },
            { id: 'tracking-cookies', title: 'Tracking & Cookies Data' }
          ]
        }
      ]
    },
    { id: 'use-of-data', title: 'Use of Data' },
    { id: 'transfer-of-data', title: 'Transfer of Data' },
    { id: 'data-retention', title: 'Data Retention' },
    { id: 'disclosure-of-data', title: 'Disclosure of Data' },
    { id: 'security-of-data', title: 'Security of Data' },
    { id: 'service-providers', title: 'Service Providers' },
    { id: 'analytics', title: 'Analytics' },
    { id: 'links-to-other-sites', title: 'Links to Other Sites' },
    { id: 'childrens-privacy', title: 'Children&rsquo;s Privacy' },
    { id: 'changes-to-policy', title: 'Changes to This Privacy Policy' },
    { id: 'contact-us', title: 'Contact Us' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-lienar-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <List className="w-4 h-4 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Table of Contents</h2>
      </div>
      <nav className="space-y-2">
        {sections.map((section, index) => (
          <div key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className="flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-lg px-3 py-2 transition-colors duration-200 text-left w-full"
            >
              <span className="text-sm font-medium text-blue-600">{index + 1}.</span>
              <span className="font-medium">{section.title}</span>
            </button>
            {section.subsections && (
              <div className="ml-6 space-y-1">
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subsection.id}>
                    <button
                      onClick={() => scrollToSection(subsection.id)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg px-3 py-1.5 transition-colors duration-200 text-left w-full text-sm"
                    >
                      <span className="text-xs text-blue-500">{index + 1}.{subIndex + 1}</span>
                      <span>{subsection.title}</span>
                    </button>
                    {subsection.subsections && (
                      <div className="ml-6 space-y-1">
                        {subsection.subsections.map((subSubsection, subSubIndex) => (
                          <button
                            key={subSubsection.id}
                            onClick={() => scrollToSection(subSubsection.id)}
                            className="flex items-center gap-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg px-3 py-1 transition-colors duration-200 text-left w-full text-sm"
                          >
                            <span className="text-xs text-blue-400">{index + 1}.{subIndex + 1}.{subSubIndex + 1}</span>
                            <span>{subSubsection.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default function PrivacyPolicy() {
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
            <h1 className="text-4xl font-bold text-white text-center">Privacy Policy</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            {/* Introduction */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Coast 2 Coast Robotics (C2C Robotics or C2C) (&ldquo;us&rdquo;, &ldquo;we&rdquo;, or &ldquo;our&rdquo;) operates the https://www.c2crobotics.com and www.coast2coastrobotics.com websites. These sites and/or its affiliate sites shall be deemed the &ldquo;Service&rdquo;.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from https://www.c2crobotics.com.
              </p>
            </div>

            {/* Table of Contents */}
            <TableOfContents />

            {/* Information Collection and Use */}
            <section id="information-collection" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                1. Information Collection and Use
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Data Collection Overview</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We collect several different types of information for various purposes to provide and improve our Service to you.
                </p>

                {/* Types of Data Collected - Subsection */}
                <div id="types-of-data" className="ml-4 mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    1.1 Types of Data Collected
                  </h3>
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                      Our data collection practices are designed to enhance your experience while respecting your privacy. Below are the main categories of data we collect:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold text-blue-900">Personal Data</h4>
                        </div>
                        <p className="text-blue-700 text-sm">Information that can identify you personally</p>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Eye className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold text-green-900">Usage Data</h4>
                        </div>
                        <p className="text-green-700 text-sm">How you interact with our services</p>
                      </div>

                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Cookie className="w-5 h-5 text-orange-600" />
                          <h4 className="font-semibold text-orange-900">Cookies</h4>
                        </div>
                        <p className="text-orange-700 text-sm">Tracking technologies and preferences</p>
                      </div>
                    </div>

                    {/* Personal Data Sub-subsection */}
                    <div id="personal-data" className="ml-4 mt-8">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        1.1.1 Personal Data
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (&ldquo;Personal Data&rdquo;). Personally identifiable information may include, but is not limited to:
                      </p>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <h5 className="font-semibold text-gray-900 mb-3">Personal Information We May Collect:</h5>
                        <ul className="space-y-2">
                          {[
                            "Email address",
                            "First name and last name",
                            "Phone number",
                            "Address, State, Province, ZIP/Postal code, City",
                            "Cookies and Usage Data"
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-700">
                              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Usage Data Sub-subsection */}
                    <div id="usage-data" className="ml-4 mt-8">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        1.1.2 Usage Data
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        We may also collect information on how the Service is accessed and used (&ldquo;Usage Data&rdquo;). This Usage Data may include information such as your computer&rsquo;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                      </p>
                    </div>

                    {/* Tracking & Cookies Data Sub-subsection */}
                    <div id="tracking-cookies" className="ml-4 mt-8">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        1.1.3 Tracking & Cookies Data
                      </h4>
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
                        </p>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                            <h5 className="font-semibold text-amber-900">Cookie Notice</h5>
                          </div>
                          <p className="text-amber-800 text-sm">
                            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h5 className="font-semibold text-gray-900">Examples of Cookies we use:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <h6 className="font-medium text-blue-900 mb-1">Session Cookies</h6>
                              <p className="text-blue-700 text-sm">We use Session Cookies to operate our Service</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                              <h6 className="font-medium text-green-900 mb-1">Preference Cookies</h6>
                              <p className="text-green-700 text-sm">We use Preference Cookies to remember your preferences and various settings</p>
                            </div>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                              <h6 className="font-medium text-red-900 mb-1">Security Cookies</h6>
                              <p className="text-red-700 text-sm">We use Security Cookies for security purposes</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Use of Data */}
            <section id="use-of-data" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                2. Use of Data
              </h2>
              <div className=" prose-gray max-w-none">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    C2C Robotics uses the collected data for various purposes:
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <ul className="space-y-3">
                      {[
                        "To provide and maintain the Service",
                        "To notify you about changes to our Service",
                        "To allow you to participate in interactive features of our Service when you choose to do so",
                        "To provide customer care and support",
                        "To provide analysis or valuable information so that we can improve the Service",
                        "To monitor the usage of the Service",
                        "To detect, prevent and address technical issues",
                        "To screen our orders for potential risk or fraud"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Transfer of Data */}
            <section id="transfer-of-data" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                3. Transfer of Data
              </h2>
              <div className=" prose-gray max-w-none">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">
                      Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    C2C Robotics will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section id="data-retention" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                4. Data Retention
              </h2>
              <div className="prose prose-gray max-w-none">
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                  </p>
                </div>
              </div>
            </section>

            {/* Disclosure of Data */}
            <section id="disclosure-of-data" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                5. Disclosure of Data
              </h2>
              <div className="prose-gray max-w-none">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Legal Requirements</h3>
                  <p className="text-gray-700 leading-relaxed">
                    C2C Robotics may disclose your Personal Data in the good faith belief that such action is necessary to:
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <ul className="space-y-2">
                      {[
                        "To comply with a legal obligation",
                        "To protect and defend the rights or property of C2C Robotics",
                        "To prevent or investigate possible wrongdoing in connection with the Service",
                        "To protect the personal safety of users of the Service or the public",
                        "To protect against legal liability"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-red-800">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Security of Data */}
            <section id="security-of-data" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                6. Security of Data
              </h2>
              <div className="prose prose-gray max-w-none">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                  </p>
                </div>
              </div>
            </section>

            {/* Service Providers */}
            <section id="service-providers" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                7. Service Providers
              </h2>
              <div className="prose-gray max-w-none">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    We may employ third party companies and individuals to facilitate our Service (&ldquo;Service Providers&rdquo;), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                  </p>
                </div>
              </div>
            </section>

            {/* Analytics */}
            <section id="analytics" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                8. Analytics
              </h2>
              <div className="prose-gray max-w-none">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    We may use third-party Service Providers to monitor and analyze the use of our Service.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-4 h-4 text-blue-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Google Analytics</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing information with Google Analytics about visits activity.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page:
                      <a href="https://policies.google.com/privacy?hl=en" className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                        https://policies.google.com/privacy?hl=en
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Links to Other Sites */}
            <section id="links-to-other-sites" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                9. Links to Other Sites
              </h2>
              <div className="prose prose-gray max-w-none">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party&rsquo;s site. We strongly advise you to review the Privacy Policy of every site you visit.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                  </p>
                </div>
              </div>
            </section>

            {/* Children's Privacy */}
            <section id="childrens-privacy" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                10. Children&rsquo;s Privacy
              </h2>
              <div className="prose prose-gray max-w-none">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
                  </p>
                </div>
              </div>
            </section>

            {/* Changes to This Privacy Policy */}
            <section id="changes-to-policy" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                11. Changes to This Privacy Policy
              </h2>
              <div className="prose prose-gray max-w-none">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Us */}
            <section id="contact-us" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                12. Contact Us
              </h2>
              <div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Questions about this Privacy Policy?</h3>
                      <p className="text-blue-700 text-sm">We&rsquo;re here to help protect your privacy</p>
                    </div>
                  </div>
                  <p className="text-blue-800 mt-3">
                    If you have any questions about this Privacy Policy, please contact us by email at{' '}
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