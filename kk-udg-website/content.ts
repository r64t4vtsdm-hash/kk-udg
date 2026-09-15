import { Redis } from "@upstash/redis";

export type Player = {
  name: string;
  number: string;
  position: string;
  sub: string;
};

export type Fixture = {
  date: string;
  opponent: string;
};

export type NewsItem = {
  title: string;
  date: string;
  excerpt: string;
};

export type Partner = {
  name: string;
  url: string;
  logoUrl: string;
};

export type StaffMember = {
  name: string;
  role: string;
  photoUrl: string;
};

export type BoardMember = {
  name: string;
  role: string;
};

export type Contact = {
  email: string;
  phone: string;
  instagram: string;
  facebook: string;
};

export type Support = {
  heading: string;
  text: string;
  bank: string;
};

export type SiteContent = {
  players: Player[];
  fixtures: { firstLeg: Fixture[]; secondLeg: Fixture[] };
  news: NewsItem[];
  partners: Partner[];
  staff: StaffMember[];
  board: BoardMember[];
  contact: Contact;
  support: Support;
};

export const defaultContent: SiteContent = {
  players: Array.from({ length: 10 }, () => ({
    name: "Ime Prezime",
    number: "#0",
    position: "Pozicija",
    sub: "Godište · visina",
  })),
  fixtures: {
    firstLeg: [
      { date: "10—11.10.", opponent: "Sutjeska Nikšić" },
      { date: "17—18.10.", opponent: "KK Pljevlja" },
      { date: "24—25.10.", opponent: "OKK Balkanski Ris, Plav" },
      { date: "31.10—01.11.", opponent: "KK Cetinje" },
      { date: "07—08.11.", opponent: "KK Zeta, Golubovci" },
      { date: "14—15.11.", opponent: "Piva Basket, Plužine" },
      { date: "21—22.11.", opponent: "KK Budva" },
      { date: "05—06.12.", opponent: "KK Sutomore" },
      { date: "12—13.12.", opponent: "KK Pljevlja (1956)" },
      { date: "26—27.12.", opponent: "KK Ibar, Rožaje" },
    ],
    secondLeg: [
      { date: "23—24.01.", opponent: "Sutjeska Nikšić" },
      { date: "30—31.01.", opponent: "KK Pljevlja" },
      { date: "06—07.02.", opponent: "OKK Balkanski Ris, Plav" },
      { date: "13—14.02.", opponent: "KK Cetinje" },
      { date: "06—07.03.", opponent: "KK Zeta, Golubovci" },
      { date: "13—14.03.", opponent: "Piva Basket, Plužine" },
      { date: "20—21.03.", opponent: "KK Budva" },
      { date: "27—28.03.", opponent: "KK Sutomore" },
      { date: "03—04.04.", opponent: "KK Pljevlja (1956)" },
      { date: "17—18.04.", opponent: "KK Ibar, Rožaje" },
    ],
  },
  news: [
    {
      title: "Naslov vijesti",
      date: "",
      excerpt:
        "Ovo je primjer vijesti — izmijenite ili obrišite ga iz admin panela i dodajte prave vijesti kluba.",
    },
  ],
  partners: [],
  staff: [],
  board: [],
  contact: { email: "", phone: "", instagram: "", facebook: "" },
  support: {
    heading: "Podržite klub",
    text:
      "KK UDG prima podršku kroz sponzorstva, donacije i partnerstva. Ako želite da podržite klub, javite nam se preko kontakt podataka ispod.",
    bank: "",
  },
};

const CONTENT_KEY = "kkudg:content";

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return Redis.fromEnv();
}

export async function getContent(): Promise<SiteContent> {
  const redis = getRedis();
  if (!redis) return defaultContent;
  try {
    const stored = await redis.get<Partial<SiteContent>>(CONTENT_KEY);
    if (!stored) return defaultContent;
    return {
      players: stored.players ?? defaultContent.players,
      fixtures: stored.fixtures ?? defaultContent.fixtures,
      news: stored.news ?? defaultContent.news,
      partners: stored.partners ?? defaultContent.partners,
      staff: stored.staff ?? defaultContent.staff,
      board: stored.board ?? defaultContent.board,
      contact: { ...defaultContent.contact, ...stored.contact },
      support: { ...defaultContent.support, ...stored.support },
    };
  } catch {
    return defaultContent;
  }
}

export async function updateSection<K extends keyof SiteContent>(
  section: K,
  value: SiteContent[K]
): Promise<void> {
  const redis = getRedis();
  if (!redis) {
    throw new Error(
      "Baza (Upstash Redis) nije povezana — dodajte je u Vercel projektu pa probajte ponovo."
    );
  }
  const current = await getContent();
  const next: SiteContent = { ...current };
  next[section] = value;
  await redis.set(CONTENT_KEY, next);
}
