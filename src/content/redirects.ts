const legacy: [string, string][] = [
  ["/services/whatsapp-marketing", "/services/healthcare-marketing-automation/"],
  ["/services/influencer-marketing", "/services/healthcare-social-media-marketing/"],
  ["/services/landing-pages", "/services/medical-website-design/"],
  ["/services/medical-chatbots", "/services/healthcare-software-app-development/"],
  ["/services/healthcare-ai", "/services/healthcare-software-app-development/"],
  ["/services/telemedicine-setup", "/services/healthcare-software-app-development/"],
  ["/services/billing-software", "/services/healthcare-software-app-development/"],
  ["/services/medical-ecommerce", "/services/healthcare-software-app-development/"],
  ["/services/medical-review", "/services/healthcare-content-marketing/"],
  ["/services/pharma-packaging", "/who-we-serve/pharma-biotech/"],
  ["/who-we-serve/general-practice", "/who-we-serve/doctors-medical-practices/"],
  ["/who-we-serve/specialists", "/who-we-serve/"],
  ["/who-we-serve/clinics-nursing-homes", "/who-we-serve/medical-clinics-multispecialty-groups/"],
  ["/who-we-serve/alternative-medicine", "/who-we-serve/holistic-health/"],
  ["/who-we-serve/holistic-institutes", "/who-we-serve/holistic-health/"],
];

// Keyword-map URL migration (Phase 1 sheet): old slug -> approved slug
const keywordMap: [string, string][] = [
  ["/services/physician-listings", "/services/google-business-profile-listing-management/"],
  ["/services/medical-ppc", "/services/google-ads-healthcare/"],
  ["/services/medical-web-design", "/services/medical-website-design/"],
  ["/services/reputation-management", "/services/healthcare-reputation-management/"],
  ["/services/social-media", "/services/healthcare-social-media-marketing/"],
  ["/services/medical-writing", "/services/healthcare-content-marketing/"],
  ["/services/email-marketing", "/services/healthcare-email-marketing/"],
  ["/services/healthcare-crm", "/services/healthcare-marketing-automation/"],
  ["/services/medical-design", "/services/healthcare-graphic-design/"],
  ["/services/medical-video", "/services/healthcare-video-production/"],
  ["/services/medical-apps", "/services/healthcare-software-app-development/"],
  ["/who-we-serve/dental", "/who-we-serve/dental-practices/"],
  ["/who-we-serve/diagnostic-centers", "/who-we-serve/diagnostic-labs-imaging-centers/"],
  ["/who-we-serve/medical-devices", "/who-we-serve/medical-device-medtech/"],
  ["/who-we-serve/pharma", "/who-we-serve/pharma-biotech/"],
  ["/who-we-serve/mental-health", "/who-we-serve/mental-behavioral-health/"],
  ["/who-we-serve/nutraceuticals", "/who-we-serve/consumer-health-wellness-nutraceuticals/"],
  ["/about-us", "/about/"],
  ["/about-us/team", "/about/team/"],
  ["/terms-conditions", "/terms-and-conditions/"],
];

export const legacyRedirects = [...legacy, ...keywordMap].map(([from, to]) => ({ from, to }));

export const gonePaths = [
  "/who-we-serve/medical-colleges",
  "/who-we-serve/nursing-colleges",
  "/who-we-serve/dental-colleges",
];
