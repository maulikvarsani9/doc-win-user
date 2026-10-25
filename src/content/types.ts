export type PageStatus = "ready-for-review" | "draft" | "hold-proof" | "planned";

export interface KeywordTarget {
  primaryKeyword?: string;
  supportingKeywords?: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  blurb: string;
  quiet?: boolean;
}

export interface Service extends KeywordTarget {
  slug: string;
  name: string;
  category: string;
  description: string;
  benefit: string;
  linkLabel: string;
  status: PageStatus;
  reviewNote?: string;
}

export interface AudienceGroup {
  id: string;
  name: string;
  blurb: string;
}

export interface Audience extends KeywordTarget {
  slug: string;
  name: string;
  shortName: string;
  group: string;
  description: string;
  linkLabel: string;
  status: PageStatus;
  reviewNote?: string;
}

export interface PlannedPage extends KeywordTarget {
  path: string;
  title: string;
  type: string;
  intro: string;
  status: PageStatus;
  reviewNote?: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface BlogTeaser {
  slug: string;
  title: string;
  topic: string;
  author: string;
  excerpt?: string;
}

export interface Point {
  title: string;
  body: string;
}

export interface ServicePage {
  short: string;
  h1: string;
  intro: string;
  seoTitle: string;
  metaDescription: string;
  panel: { title: string; rows: [string, string][] };
  problemsTitle: string;
  problemsIntro: string;
  problems: Point[];
  included: { title: string; items: string[] }[];
  notIncluded?: string;
  approach: Point[];
  contextTitle: string;
  context: Point[];
  why: Point[];
  pairings: [string, string][];
  audiences: string[];
  faqs: Faq[];
  cta: { title: string; text: string };
}

export interface AudiencePage {
  h1: string;
  intro: string;
  seoTitle: string;
  metaDescription: string;
  understandingTitle: string;
  understandingLead: string;
  understanding: string[];
  prioritiesTitle: string;
  priorities: Point[];
  helpTitle: string;
  services: [string, string][];
  considerationsTitle?: string;
  considerations?: Point[];
  approach: Point[];
  related: string[];
  faqs: Faq[];
  cta: { title: string; text: string };
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  location: string;
  timeframe: string;
  services: string[];
  headline: string;
  summary: string;
  metrics: { value: string; label: string }[];
  challenge: string[];
  approach: Point[];
  results: string[];
  quote?: { text: string; name: string; role: string };
}
