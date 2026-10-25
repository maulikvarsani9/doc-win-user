import {
  Search, MapPin, Bot, MousePointerClick, Megaphone, LayoutTemplate, Star, MessagesSquare, PenLine, Mail, Workflow,
  Palette, PenTool, Clapperboard, Compass, Handshake, Code2, Database, Target, LineChart, Stethoscope, Smile, Bone,
  HeartPulse, Sparkles, Venus, Baby, Eye, Footprints, Building2, Hospital, MapPinned, HandHeart, Microscope, Ribbon,
  Rocket, MonitorSmartphone, Cpu, FlaskConical, Brain, HeartHandshake, Sprout, Leaf, Pill, PawPrint, type LucideIcon,
} from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  "medical-seo": Search, "google-business-profile-listing-management": MapPin, "healthcare-ai-search-visibility": Bot, "google-ads-healthcare": MousePointerClick,
  "meta-ads-healthcare": Megaphone, "medical-website-design": LayoutTemplate, "healthcare-reputation-management": Star, "healthcare-social-media-marketing": MessagesSquare,
  "healthcare-content-marketing": PenLine, "healthcare-email-marketing": Mail, "healthcare-marketing-automation": Workflow, "healthcare-branding": Palette, "healthcare-graphic-design": PenTool,
  "healthcare-video-production": Clapperboard, "healthcare-marketing-strategy": Compass, "b2b-healthcare-marketing": Handshake, "healthcare-software-app-development": Code2,
  "data-management": Database,
};

export const categoryIcons: Record<string, LucideIcon> = {
  "search-visibility": Search, "paid-advertising": Target, "websites-reputation": LayoutTemplate, "content-engagement": MessagesSquare,
  "brand-creative": Palette, "strategy-growth": LineChart, "technology-data": Code2,
};

export const audienceIcons: Record<string, LucideIcon> = {
  "doctors-medical-practices": Stethoscope, "dental-practices": Smile, "orthopedic-practices": Bone, "cardiology-practices": HeartPulse,
  "dermatology-skin-clinics": Sparkles, "ob-gyn-womens-health": Venus, "pediatric-practices": Baby, "ophthalmology-eye-care": Eye,
  "physical-therapy-physiotherapy": Footprints, "medical-clinics-multispecialty-groups": Building2, hospitals: Hospital,
  "multi-location-healthcare-groups": MapPinned, "senior-care": HandHeart, "diagnostic-labs-imaging-centers": Microscope, "oncology-cancer-care": Ribbon,
  "healthtech-startups": Rocket, "digital-health": MonitorSmartphone, "medical-device-medtech": Cpu, "pharma-biotech": FlaskConical, "mental-behavioral-health": Brain,
  "addiction-treatment-rehab": HeartHandshake, "fertility-ivf-clinics": Sprout, "holistic-health": Leaf, "consumer-health-wellness-nutraceuticals": Pill, veterinary: PawPrint,
};

export const groupIcons: Record<string, LucideIcon> = {
  "medical-dental-practices": Stethoscope, "clinics-hospitals-care": Hospital, "technology-b2b": Cpu, "specialized-consumer": Leaf,
};

export function IconTile({ icon: Icon, tone = "brand", size = "md" }: { icon: LucideIcon; tone?: "brand" | "light" | "signal"; size?: "sm" | "md" }) {
  const tones = { brand: "bg-brand-50 text-brand-600", light: "bg-white/10 text-signal-400", signal: "bg-signal-100 text-signal-700" };
  return (
    <span className={`grid shrink-0 place-items-center rounded-xl ${tones[tone]} ${size === "sm" ? "size-9" : "size-11"}`}>
      <Icon aria-hidden className={size === "sm" ? "size-4" : "size-5"} strokeWidth={1.9} />
    </span>
  );
}
