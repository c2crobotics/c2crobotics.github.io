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
    { id: 'waiver-and-media-release', title: 'Waiver and Media Release' },
    { id: 'safety-contract', title: 'Safety Contract', subsections: [
        {
          id: 'safety-guidelines', title: 'Safety Guidelines', subsections: [
            { id: 'attitude', title: 'Attitude' },
            { id: 'clothing-ppe', title: 'Clothing and Protective Equipment' },
            { id: 'working-with-parts-tools-machines', title: 'Working with Parts, Tools and Machines' },
            { id: 'health', title: 'Health' }
          ]
        }
      ]
    },
    { id: 'code-of-conduct-good-standing', title: 'Code of Conduct and Member-In-Good-Standing Agreement'},
    { id: 'illness-in-person-waiver', title: 'Illness and In-Person Waiver' },
    { id: 'confidentiality-agreement', title: 'Confidentiality Agreement' },
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

export default function Waiver() {
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
            <h1 className="text-4xl font-bold text-white text-center">Waiver and On-Boarding Documents</h1>
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
                This page informs you of our on-boarding processes and all relevant waivers as applied to participants of the Coast 2 Coast Robotics (C2C Robotics or C2C) programs, teams, offerings, facilities, and/or the same. These shall extend to all affiliates and subsidiaries.
                By visiting the Coast 2 Coast Robotics (&ldquo;us&rdquo;, &ldquo;we&rdquo;, or &ldquo;our&rdquo;) websites, facilities, and the  sites and/or its affiliate sites shall be deemed the &ldquo;Service&rdquo;.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Last Update: January 1, 2022
              </p>
            </div>

            {/* Table of Contents */}
            <TableOfContents />

            {/* Information Collection and Use */}
            <section id="waiver-and-media-release" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                1. Waiver and Media Release
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  This is a Consent, Release of Rights, Hold Harmless and Authorization Agreement (&ldquo;Agreement&rdquo;) between Coast 2 Coast Robotics officers, directors, employees and agents (referred to as &ldquo;C2C Robotics&rdquo;), and Participant (referred to as &ldquo;I&rdquo;, &ldquo;Me&rdquo;, &ldquo;My&rdquo; and &ldquo;Participant&rdquo;). Technical courses, competition team participation, and any other approved events (referred to as &ldquo;event&rdquo; and &ldquo;events&rdquo;) focused on, but not limited to, designing and building of prototypes, robots, and various other mechanisms. Attendance at these events is voluntary and I understand that I may be exposed to potentially hazardous tools and machinery.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  I recognize that there may be risks associated with attending and/or participating in events, without limitation,  travel to and from the event, risks inherent in the construction and/or operation of robots and/or mechanisms, as well as in working with electrical connections. These risks include the risk of injury (including without limitation, serious bodily harm and even death) and property damage. Being fully cognizant of the risks in participating these events, I hereby fully and willingly assume those risks. I HEREBY WAIVE ANY CLAIMS OR CAUSES OF ACTION which I may now have or hereafter arises against C2C Robotics arising out of or connected to My participation in any events, and I will indemnify and hold harmless C2C Robotics against any and all claims against any such entity or person resulting from the same.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  I HEREBY grant C2C Robotics, their agents and partners the absolute right and permission to use MY photographic portraits, pictures, digital images, videotapes, and other media forms, or in which I may be included in whole or part, or reproductions thereof in color or otherwise for any lawful purpose whatsoever, including but not limited to use in physical or digital publications. I agree that C2C Robotics has complete ownership of such media, including the entire copyright, and may use them for any purpose, in any medium now known or later developed, including the Internet, consistent with its missions. I hereby waive any right that I may have to inspect and/or approve the finished product or the copy that may be used in connection therewith, wherein My likeness appears, or the use to which it may be applied now or in the future, whether that use is known to me or unknown, and I waive any right to royalties or other compensation.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  I HEREBY RELEASE, discharge, and agree to indemnify and hold harmless C2C Robotics and each of their respective successors, assigns, affiliates, licensees and agents from any and all claims, demands, liabilities, damages, costs and expenses, attorneys' fees, other professional fees and expenses, including, without limitation, any claims for compensation, defamation, or invasion of privacy, or other infringements or violations of personal or property rights of any sort whatsoever that I may now or hereafter arise against C2C Robotics arising in connection with my participation in any events.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  In the event I should sustain any injuries or illness while attending and/or participating in an event, I hereby authorize C2C Robotics to administer, or cause to be administered, such first aid or other treatment and such medications as I may possess as reasonably suggested under the circumstances, including, without limitation, treatment by a physician or hospital of C2C Robotics’ choice.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  This Release shall be binding upon My heirs, personal representatives, and Me. THIS RELEASE SHALL BE GOVERNED BY AND CONSTRUED UNDER THE LAWS OF THE STATE OF NEW YORK, WHICH SHALL BE THE VENUE FOR ANY LEGAL ACTION. This Agreement constitutes the entire agreement among the parties hereto with respect to the subject matter hereof and supersedes any and all previous agreements among the parties, whether written or oral, with respect to such subject matter.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  <strong>I UNDERSTAND THAT THIS INVOLVES A RELEASE OF LEGAL RIGHTS.</strong>
                </p>
              </div>
            </section>

            {/* Safety Contract */}
            <section id="safety-contract" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                2. Safety Contract
              </h2>
              <div className=" prose-gray max-w-none">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>MUST BE REVIEWED WITH BOTH THE PARTICIPANT/STUDENT AND PARENT/GUARDIAN!</strong>
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Participation in all C2C Robotics offerings is voluntary, and the participant/student may work with potentially hazardous tools and machinery. Safety is the priority for everyone. To ensure a safe environment, a list of general rules has been developed, but can be expanded at any time. The technical courses and competition teams focus on designing and building robots, prototypes, and various other machines and mechanisms. This Safety Contract supplements the content of the Waiver and Media Release.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Disregard for these rules and/or repeated violations is grounds for immediate dismissal from the technical courses and teams and may also affect future attempts to join. This contract is valid in perpetuity.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Below is the list of rules that must be followed (the Adult can refer to the coach, mentors, parent volunteers, etc.):
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Attitude</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <ul className="space-y-3">
                      {[
                        "Horseplay will not be tolerated. This is evidence of a poor safety attitude.",
                        "The safe way is always the best way.",
                        "Your safety is everyone's responsibility.",
                        "Others' safety is everyone's responsibility.",
                        "Mistakes cause accidents.",
                        "Keep your mind on your work.",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Clothing and Protective Equipment</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <ul className="space-y-3">
                      {[
                        "Do not wear jewelry or loose clothes while working with machines.",
                        "Do wear protective glasses/goggles when operating machinery and tools.",
                        "Long hair should be tied back or worn under a cap to avoid getting it caught in the tools and machinery.",
                        "You should wear hard close-toed shoes or boots with rubber soles.",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Working with Parts, Tools and Machines</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <ul className="space-y-3">
                      {[
                        "Do NOT put any parts, tools, or materials into any orifice.",
                        "Always secure your work with a clamp or vise.",
                        "Do NOT use any equipment you are not familiar with. Ask for help.",
                        "Use the right tool for a job to ensure safety.",
                        "Take your time when working with tools.",
                        "Plan your work; measure twice and cut once.",
                        "Use only tools that are sharp and in good condition.",
                        "Return all tools to their proper places when you are finished using them.",
                        "Stand to one side when using power tools.",
                        "Use a vacuum to clean up your mess when finished.",
                        "If a machine or power tool does not sound right, feel right, or if you can see that something is wrong, turn it off and tell the Adult-In-Charge immediately.",
                        "Leave space for the person working on a machine or power tool.",
                        "One person per machine or tool unless otherwise needed.",
                        "If you must leave a machine or power tool, turn it off and wait until it stops.",
                        "Pull the plug, not the cord, when you unplug a power tool.",
                        "Sharp or pointed tools must be carried with the point down.",
                        "When you approach a machine, be sure it is off and not coasting.",
                        "Never talk to a person while he/she is operating a machine.",
                        "Wait until the rotating blades or wheels stop before contacting any debris.",
                        "Make all adjustments with the power off and the blade stopped.",
                        "Machines should be allowed to reach full speed before starting to cut.",
                        "Never distract the machine operator.",
                        "Never place your hand or fingers in line with moving parts.",
                        "When operating any machine, give it your full attention.",
                        "The cord must be disconnected from the power source before changing bits, belts, or blades.",
                        "Damaging the cord of electrical hand-held tools may cause an electrical shock. Report to the Adult-In-Charge if any case arises.",
                        "Never set a hand-held power tool down while it is running or coasting.",
                        "Check blades, belts, and bits are installed properly before using.",
                        "Do not overreach, keep your balance.",
                        "Use only properly insulated or grounded tools.",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Health</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <ul className="space-y-3">
                      {[
                        "Lift with your legs, not your back. Get help to lift or move long or heavy objects or materials.",
                        "If you do not feel well, tell an Adult.",
                        "If there is an accident, even a minor one, it should be reported immediately to the Adult.",
                        "If you have certain conditions that need to be explained, please notify the Adult.",
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

            {/* Code of Conduct and Member-In-Good-Standing */}
            <section id="code-of-conduct-good-standing" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                3. Code of Conduct and Member-In-Good-Standing  
              </h2>
              <div className=" prose-gray max-w-none">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    This Code of Conduct is always applicable, including for behavior outside of C2C-sanctioned events where inappropriate actions are related to an event or participating individuals. If a violation is observed or reported, an ethics hearing may be convened. Repeated or egregious violations of the expectations in this Code may result in consequences up to the probation, demotion, or termination from the organization after review by the head coach and administration.
                  </p>
                </div>

                <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Guidelines for Behavior</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    We expect the following behavior and ethical standards of every Student member and family members:
                  </p>
                </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <ul className="space-y-3">
                      {[
                        "Act with integrity, honesty, and reliability.",
                        "Exhibit maturity and class when dealing with difficult and stressful situations.",
                        "Respect individual differences.",
                        "Behave in a respectful, courteous, cooperative, and professional manner within C2C and with event volunteers and fellow competitors.",
                        "Bullying, harassment, use of profane or insulting language, any actual or threatened violence, or any form of harm shall not be tolerated.",
                        "Subversive actions within the organization or towards other members of the immediate or larger community shall be met with immediate termination.",
                        "Exhibit Gracious Professionalism® (Dr. Woodie Flowers) at all times. This is an ethos in FIRST Robotics, “Gracious Professionalism is a way of doing things that encourages high-quality work, emphasizes the value of others, and respects individuals and the community. With Gracious Professionalism, fierce competition and mutual gain are not separate notions. (www.firstinspires.org)",
                        "Practice Coopertition® - Coopertition is displaying unqualified kindness and respect in the face of fierce competition. Coopertition is founded on the concept and a philosophy that teams can and should help and cooperate with each other even as they compete. (www.firstinspires.org).",
                        "Ensure the safety of all participants (minors and adults) in C2C activities.",
                        "Report any unsafe behavior to C2C leadership or event/activity leadership.",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Guidelines for Disciplinary Action</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Violations of the Code of Conduct are taken very seriously. The first step in any disciplinary actions shall be determined by consensus of coaches and administration present at the time of the violation.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <ul className="space-y-3">
                      {[
                        "First Violation: a coach shall warn the Student and notify the parent/guardian of the violation.",
                        "Second Violation: a coach shall call the parent/guardian to collect their child early.",
                        "Third Violation: a coach shall call the parent/guardian to collect their child early and administration shall be notified. The Student shall not be allowed to participate in team activities for one week and may be removed from the team after a review. The Student’s parent/guardian shall be notified of the violation and of the suspension from team activities or removal from the team. If the Student’s violation merits removal from the team, fees shall not be returned.",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">The Member-In-Good-Standing Provisions</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    These provisions include:
                  </p>
                </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <ul className="space-y-3">
                      {[
                        "Student shall come to meetings with a good attitude.",
                        "Students shall be respectful of others and behave in a way that does not endanger the health and safety of themselves or others.",
                        "Student shall maintain a minimum GPA of 90% in school.",
                        "Student shall maintain an amicable working environment, in-person and in cyberspace.",
                        "Student shall maintain clear and open communication with the coach and their team members, particularly regarding schedules.",
                        "Student shall remain active in the C2C communication channels as their schedule allows.",
                        "Student shall be accountable – if you need to do something, deliver on time, working, and under-cost, cost being time, effort, and resources.",
                        "Student shall be respectful of the facilities, tools, equipment, and all items being used by the team.",
                        "Damage or disrespect of the aforementioned items shall result in a monetary compensated to C2C for the full value of the damaged item.",
                        "Student shall not participate in stealing, intentional damage of property, or malicious use of technology including but not limited to computer hacking or unauthorized modification, alteration or change of information in any team documents or software.",
                        "Student is expected to be respectful during all team and sub-team meetings. Respectful behavior means students are not talking, working on projects, or using their phones or other electronic devices unless the activities of the meeting necessitate device use.",
                        "Student is expected to read and understand all rules of competition and know their team’s robot and competition strategy.",
                        "Student is expected to ask for help. If you do not know what is going on or are unsure how to accomplish a task assigned to you, ask an adult or experienced team member to help.",
                        "Student shall maintain a 90% or higher on announced/unannounced exams/quizzes.",
                        "Student shall volunteer for a minimum of 50 hours during the season.",
                        "Student shall report all absences and days off in the team’s communication channels and alert the head coach of their expected absence.",
                        "Student shall aid in the design, assembly, programming, documentation, and other team objectives, regardless of team role.",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                </div>






              </div>
            </section>

            {/* Illness and In-Person Waiver */}
            <section id="illness-in-person-waiver" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                4. Illness and In-Person Waiver
              </h2>
              <div className="prose prose-gray max-w-none">
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    IN-PERSON ATTENDANCE LIABILITY WAIVER AND RELEASE OF CLAIMS
                  </p>
                </div>
              </div>
            </section>

            {/* Confidentiality Agreement */}
            <section id="confidentiality-agreement" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                5. Confidentiality Agreement
              </h2>
              <div className="prose-gray max-w-none">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">PROTECTION OF CONFIDENTIAL AND PROPRIETARY INFORMATION</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You, the Student, Parent, and relatives, as a member of C2C you will have access to certain confidential information and you may, during your tenure, develop certain processes, information or inventions that will be the property of C2C. To protect C2C’s interests, as a condition of tenure, you understand that C2C is engaged in a continuous program of research, development, production and/or marketing in connection with its current and projected business and that it is critical for C2C to preserve and protect its proprietary information, works and related intellectual property rights. “Inventions” means inventions, improvements, designs, original works of authorship, formulas, processes, compositions of matter, computer software programs, databases, mask works, confidential information and trade secrets.
                  </p>
                </div>
              </div>

              <div className="prose-gray max-w-none">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Proprietary Information.</h3>
                  <p className="text-gray-700 leading-relaxed">
                    I understand that my tenure with C2C creates a relationship of confidence and trust with respect to any information or materials of a confidential or secret nature that may be made, created or discovered by me or that may be disclosed to me by C2C or a third party in relation to the business of C2C or to the business of any parent, subsidiary, affiliate, customer or supplier of C2C, or any other party with whom C2C agrees to hold such information or materials in confidence (the “Proprietary Information”). Without limitation as to the forms that Proprietary Information may take, I acknowledge that Proprietary Information may be contained in tangible material such as writings, drawings, samples, electronic media, or computer programs, or may be in the nature of unwritten knowledge or know-how. Proprietary Information includes, but is not limited to, marketing plans, product plans, designs, data, prototypes, specimens, test protocols, laboratory notebooks, business strategies, financial information, forecasts, personnel information, contract information, customer and supplier lists, and the non-public names and addresses of C2C’s customers and suppliers.
                  </p>
                </div>
              </div>

              <div className="prose-gray max-w-none">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Confidentiality.</h3>
                  <p className="text-gray-700 leading-relaxed">
                    At all times, both during my tenure and after its termination, I will keep and hold all Proprietary Information in strict confidence and trust. I will not use or disclose any Proprietary Information without the prior written consent of C2C in each instance, except as may be necessary to perform my duties as an employee of C2C for the benefit of C2C. Upon termination of my tenure with C2C, I will promptly deliver to C2C all documents and materials of any nature pertaining to my work with C2C, and I will not take with me or retain in any form any documents or materials or copies containing any Proprietary Information. Nothing in this or otherwise in this Agreement shall limit or restrict in any way my immunity from liability for disclosing C2C’s trade secrets as specifically permitted by 18 U.S. Code Section 1833, the pertinent provisions of which are attached hereto as Exhibit A.
                  </p>
                </div>
              </div>

              <div className="prose-gray max-w-none">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Physical Property.</h3>
                  <p className="text-gray-700 leading-relaxed">
                    All documents, supplies, equipment and other physical property furnished to me by C2C or produced by me or others in connection with my employment will be and remain the sole property of C2C. I will return to C2C all such items when requested by C2C, excepting only my personal copies of records relating to my employment or compensation and any personal property I bring with me to C2C and designate as such. Even if C2C does not so request, I will upon termination of my employment return to C2C all Company property, and I will not take with me or retain any such items.
                  </p>
                </div>
              </div>


              <div className="prose-gray max-w-none">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Successors and Assigns; Assignment.</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Except as otherwise provided in this Agreement, this Agreement, and the rights and obligations of the parties hereunder, will bind and benefit the parties and their respective successors, assigns, heirs, executors, administrators, and legal representatives. C2C may assign any of its rights and obligations under this Agreement. I understand that I will not be entitled to assign or delegate this Agreement or any of my rights or obligations hereunder, whether voluntarily or by operation of law, except with the prior written consent of C2C.
                  </p>
                </div>
              </div>


              <div className="prose-gray max-w-none">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Entire Agreement</h3>
                  <p className="text-gray-700 leading-relaxed">
                    This Agreement and the documents referred to herein constitute the entire agreement and understanding of the parties with respect to the subject matter of this Agreement, and supersede all prior understandings and agreements, whether oral or written, between the parties hereto with respect to such subject matter.
                  </p>
                </div>
              </div>

              <div className="prose-gray max-w-none">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Amendment and Waiver</h3>
                  <p className="text-gray-700 leading-relaxed">
                    This Agreement may be amended only by a written agreement executed by each of the parties to this Agreement. No amendment or waiver of, or modification of any obligation under, this Agreement will be enforceable unless specifically set forth in a writing signed by the party against which enforcement is sought. A waiver by either party of any of the terms and conditions of this Agreement in any instance will not be deemed or construed to be a waiver of such term or condition with respect to any other instance.
                  </p>
                </div>
              </div>
            </section>

            {/* Acknowledgement */}
            <section id="acknowledgement" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                6. Acknowledgement
              </h2>
              <div className="prose prose-gray max-w-none">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    I certify and acknowledge that I have carefully read all of the provisions of this Agreement and that I understand and will fully and faithfully comply with this Agreement.
                  </p>
                </div>
              </div>

              
              <div className="prose-gray max-w-none">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Effective Date of Agreement</h3>
                  <p className="text-gray-700 leading-relaxed">
                    This Agreement is and will be effective on and after the first day of my tenure with C2C, which is the date noted on the first registration form completed by the Participant or Participant's Parent/Guardian (the “Effective Date”).
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    On-Boarding Documents shall refer to the prior listed sections: (1) Waiver and Media Release, (2) Safety Contract, (3) Illness and In-Person Waiver, (4) Code of Conduct and Member-In-Good-Standing, and (5) Confidentiality Agreement and any future guidance that may arise.
                  </p>
                </div>
              </div>

            </section>

            {/* Changes to This Privacy Policy */}
            <section id="changes-to-policy" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                6. Changes to This Privacy Policy
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
                7. Contact Us
              </h2>
              <div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Questions about these policies and waivers?</h3>
                      <p className="text-blue-700 text-sm">We&rsquo;re here to help protect you.</p>
                    </div>
                  </div>
                  <p className="text-blue-800 mt-3">
                    If you have any questions about these policies and waivers, please contact us by email at{' '}
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