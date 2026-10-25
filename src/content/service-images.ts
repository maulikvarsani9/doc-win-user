const alts: Record<string, string> = {
  "medical-seo": "Laptop showing a Google search results page",
  "google-business-profile-listing-management": "Person checking a map listing on a smartphone",
  "healthcare-ai-search-visibility": "Person asking an AI chatbot a question on a smartphone",
  "google-ads-healthcare": "Campaign analytics dashboard on a laptop screen",
  "meta-ads-healthcare": "Person scrolling an Instagram feed on a phone at a café table",
  "medical-website-design": "Website design layouts displayed on a desktop monitor",
  "healthcare-reputation-management": "Five-star rating above a tablet",
  "healthcare-social-media-marketing": "Doctor in a white coat recording a video with a ring light",
  "healthcare-content-marketing": "Writer drafting an article with a laptop and notebook",
  "healthcare-email-marketing": "Email inbox open on a laptop",
  "healthcare-marketing-automation": "Marketer mapping an email workflow on a whiteboard",
  "healthcare-branding": "Color swatch book and brand palette samples on a designer's desk",
  "healthcare-graphic-design": "Designer working on a drawing tablet with color swatches",
  "healthcare-video-production": "Camera crew filming an interview in an office",
  "healthcare-marketing-strategy": "Team planning a marketing strategy with sticky notes on a whiteboard",
  "b2b-healthcare-marketing": "Team reviewing marketing charts and reports around laptops",
  "healthcare-software-app-development": "Health app open on a smartphone",
  "data-management": "Data dashboard with charts on a laptop",
};

export const serviceHeroImage = (slug: string) => (alts[slug] ? { src: `/images/services/${slug}.jpg`, alt: alts[slug] } : null);
