export interface Person {
  slug: string;
  name: string;
  credential: string;
  role: string;
  photo: string;
  avatar: string;
  quote?: string;
  bio?: string;
}

export const photo = (slug: string) => `/images/team/${slug}.jpg`;
export const face = (slug: string) => `/images/team/faces/${slug}.jpg`;

const withImages = (p: Omit<Person, "photo" | "avatar">): Person => ({ ...p, photo: photo(p.slug), avatar: face(p.slug) });

export const founders: Person[] = [
  {
    slug: "wali-rahmani", name: "Dr. Wali Rahmani", credential: "MD (Medicine)", role: "Co-Founder & Chief Medical Officer",
    quote: "Having built my own practice from the ground up, I understand the frustration of working with marketers who don't understand healthcare. That's why we created DocWin Digital: to give doctors the marketing partner they deserve.",
  },
  {
    slug: "arbaz-fatmi", name: "Arbaz Fatmi", credential: "Healthcare Marketer & Health-Tech Founder", role: "Co-Founder & Chief Marketing Officer",
    bio: "Arbaz Fatmi is a healthcare marketer and health-tech founder. He co-founded DocWin Digital after years of seeing generic agencies fail healthcare clients, and he is also the founder of Himsure, India's first 360° sexual health platform.",
    quote: "After years of seeing generic agencies fail healthcare clients, I partnered with my childhood friend, Dr. Wali, to create what the industry was missing: healthcare marketing by healthcare insiders.",
  },
].map(withImages);

const reviewer = "Medical Review Panel";

export const panel: Person[] = [
  { slug: "nehan-fatima", name: "Dr. Nehan Fatima", credential: "MS Ophthalmology", role: reviewer },
  { slug: "yasir-niyazi", name: "Dr. Yasir Niyazi", credential: "MS Orthopedics", role: reviewer },
  { slug: "pooja-singh", name: "Dr. Pooja Singh", credential: "MD Paediatric", role: reviewer },
  { slug: "chesta-gupta", name: "Dr. Chesta Gupta", credential: "DNB Anesthesia", role: reviewer },
  { slug: "ankit-faujdar", name: "Dr. Ankit Faujdar", credential: "MBBS", role: reviewer },
  { slug: "eshan-rao", name: "Dr. Eshan Rao", credential: "MBBS, RMO", role: reviewer },
  { slug: "abu-obaida", name: "Dr. Abu Obaida", credential: "MBBS", role: reviewer },
].map(withImages);

export type Team = { founders: Person[]; panel: Person[] };
