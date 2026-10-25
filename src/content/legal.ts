export type LegalSection = { heading: string; body: string[]; list?: string[] };
export type LegalDoc = { slug: string; title: string; description: string; intro: string; sections: LegalSection[] };

const ENTITY = "[Registered business name: to confirm]";
const ADDRESS = "[Registered business address: to confirm]";
const LAW = "[Governing law and jurisdiction: to confirm]";
const EMAIL = "arbaz@docwindigital.com";
const contact = { heading: "Contact us", body: [`Questions about this page can be sent to ${EMAIL}. Postal address: ${ADDRESS}.`] };

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How DocWin Digital collects, uses and protects the information you submit through our website forms, and the choices and rights you have.",
    intro: `This policy explains what information DocWin Digital ("DocWin", "we", "us"), operated by ${ENTITY}, collects through this website, why we collect it and the choices you have.`,
    sections: [
      {
        heading: "Information we collect",
        body: ["We only collect the information you choose to give us through our forms, such as:"],
        list: [
          "Contact details: your name, work email address and, if you provide it, your phone number.",
          "Organization details: your practice or organization name, website, specialty or organization type and country.",
          "Your message and the service you are interested in.",
          "For downloads: your role and whether you agreed to receive marketing emails.",
        ],
      },
      { heading: "Please don't send health information", body: ["Our forms are not designed to receive patient or personal health information. Please don't include it in any message you send us. If we receive it by mistake, we will delete it."] },
      {
        heading: "How we use your information",
        body: ["We use the information you submit to:"],
        list: ["reply to your enquiry and arrange calls", "prepare a marketing audit you requested", "send a resource you asked for", "send marketing emails, only if you opted in, with an unsubscribe option in every email"],
      },
      { heading: "Sharing your information", body: ["We do not sell your personal information. We share it only with service providers who help us run this website and our business (such as hosting and email), and only as needed to provide those services, or where the law requires it."] },
      { heading: "How long we keep it", body: ["We keep enquiry information for as long as needed to respond and to manage any working relationship that follows. [Retention period: to confirm]"] },
      { heading: "Your rights", body: [`Depending on where you live, you may have the right to access, correct or delete your personal information, or to object to how we use it. To make a request, email ${EMAIL}. We will respond within the time required by the law that applies to you.`] },
      { heading: "Cookies", body: ["How this website uses cookies is explained in our Cookie Policy."] },
      { heading: "Changes to this policy", body: ["We may update this policy from time to time. The date at the top of this page shows when it was last changed."] },
      contact,
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description: "How the DocWin Digital website uses cookies: which cookies we set today, why we set them, and how to manage cookies in your browser.",
    intro: "This policy explains what cookies are and how this website uses them.",
    sections: [
      { heading: "What cookies are", body: ["Cookies are small text files a website stores in your browser. They help the site work and can remember information between visits."] },
      { heading: "Cookies we use today", body: ["Public pages of this website do not currently use advertising or analytics cookies. The only cookies we set are strictly necessary ones:"], list: ["Sign-in cookies for the website's content admin area. They are used only by authorized DocWin staff and keep them signed in securely."] },
      { heading: "Third-party services", body: ["Our hosting and security providers may set technical cookies needed to deliver the site reliably and protect it from abuse. [List of providers: to confirm]"] },
      { heading: "If we add analytics or marketing cookies", body: ["If we add analytics or marketing tools in the future, we will update this policy first and, where the law requires it, ask for your consent before setting those cookies."] },
      { heading: "Managing cookies", body: ["You can block or delete cookies in your browser settings. Blocking strictly necessary cookies may stop parts of the site from working."] },
      contact,
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    description: "The terms that apply when you use the DocWin Digital website, including acceptable use, intellectual property, free audits and third-party links.",
    intro: `These terms apply to your use of this website, operated by ${ENTITY}. By using the site you agree to them.`,
    sections: [
      { heading: "Using this website", body: ["You may use this website to learn about our services and to contact us. You agree not to misuse it, for example by trying to gain unauthorized access, disrupting its operation or submitting false or harmful information."] },
      { heading: "No client relationship", body: ["Contacting us, booking a call or requesting an audit does not create a client relationship. Any services we provide are governed by a separate written agreement."] },
      { heading: "Content and intellectual property", body: ["The text, design, graphics and other content on this website belong to DocWin Digital or are used with permission. You may not copy or republish them without our written consent, except for personal, non-commercial use."] },
      { heading: "Free audits and resources", body: ["Free marketing audits, guides and other resources are general recommendations based on the information available to us. They are not a guarantee of results."] },
      { heading: "Third-party links", body: ["This website may link to other websites. We are not responsible for their content or privacy practices."] },
      { heading: "Limitation of liability", body: ["[Limitation of liability wording: to be drafted and confirmed by legal counsel]"] },
      { heading: "Governing law", body: [`These terms are governed by ${LAW}.`] },
      { heading: "Changes to these terms", body: ["We may update these terms from time to time. The date at the top of this page shows when they were last changed."] },
      contact,
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    description: "Important limits on the information on the DocWin Digital website: it is not medical, legal or regulatory advice, and past results vary.",
    intro: "Please read this disclaimer before relying on any information on this website.",
    sections: [
      { heading: "General information only", body: ["The content on this website, including articles, guides and audit examples, is general information about healthcare marketing. It is not tailored advice for your organization."] },
      { heading: "Not medical advice", body: ["Nothing on this website is medical advice. It is not a substitute for advice from a qualified healthcare professional, and it should not be used to diagnose or treat any condition."] },
      { heading: "Not legal or regulatory advice", body: ["Medical review by our doctor panel covers clinical accuracy and responsible communication. It is not legal or regulatory advice. For questions about privacy laws, advertising rules or professional regulations, please consult your own legal or compliance advisor."] },
      { heading: "Results vary", body: ["Figures such as average patient increase, rankings and ratings describe results achieved for past clients. They are not a promise of future results. Outcomes depend on your market, competition, budget and many other factors."] },
      { heading: "Testimonials", body: ["Testimonials reflect the experiences of individual clients and may not be typical."] },
      { heading: "Third-party names and trademarks", body: ["Names such as Google, Meta, Facebook and Instagram are trademarks of their owners. Mentioning them does not imply endorsement or partnership."] },
      contact,
    ],
  },
];

export const legalBySlug = (slug: string) => legalDocs.find((d) => d.slug === slug)!;
