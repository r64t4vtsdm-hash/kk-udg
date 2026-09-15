import { Redis } from "@upstash/redis";

export type Player = {
  name: string;
  number: string;
  position: string;
  sub: string;
  photoUrl: string;
};

export type Fixture = {
  date: string;
  opponent: string;
};

export type NewsItem = {
  title: string;
  date: string;
  excerpt: string;
  text: string;
  photoUrl: string;
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

export type Homepage = {
  heroTagline: string;
  heroPhotoUrl: string;
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  aboutPhotoUrl: string;
};

export type SiteContent = {
  homepage: Homepage;
  players: Player[];
  fixtures: { firstLeg: Fixture[]; secondLeg: Fixture[] };
  news: NewsItem[];
  partners: Partner[];
  staff: StaffMember[];
  contact: Contact;
  support: Support;
};

export const defaultContent: SiteContent = {
  homepage: {
    heroTagline:
      "Košarkaški klub Univerziteta Donja Gorica. Ista energija i disciplina koju ekipa nosi na parket, prenesena i na predavanja — i obrnuto.",
    heroPhotoUrl: "",
    aboutTitle: "Univerzitetski klub, takmičarski duh",
    aboutText1:
      "Košarkaški klub UDG okuplja igrače Univerziteta Donja Gorica koji sezonu igraju s istom ozbiljnošću kao i ispite — trening do treninga, korak po korak do bolje pozicije na tabeli.",
    aboutText2:
      "U maju 2026. dio ekipe je nosio dres Crne Gore na međunarodnom studentskom turniru Sias Intercontinental Basketball Tour u Kini, gdje se klub predstavio pred internacionalnom konkurencijom. Sad je fokus na novoj sezoni: dvadeset utakmica protiv deset ekipa iz cijele Crne Gore, u jesenjem i proljećnom dijelu prvenstva.",
    aboutPhotoUrl: "",
  },
  players: Array.from({ length: 10 }, () => ({
    name: "Ime Prezime",
    number: "#0",
    position: "Pozicija",
    sub: "Godište · visina",
    photoUrl: "",
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
        "Ovo je kratak uvodni tekst vijesti koji se vidi na početnoj strani — izmijenite ili obrišite ga iz admin panela i dodajte prave vijesti kluba.",
      text:
        "Ovo je pun tekst vijesti koji se vidi kad neko klikne \"Pročitaj više\". Ovdje možete napisati cijelu priču, koliko god dugačku želite.",
      photoUrl: "",
    },
  ],
  partners: [],
  staff: [],
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
  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    return null;
  }
  return new Redis({ url, token });
}

export async function getContent(): Promise<SiteContent> {
  const redis = getRedis();
  if (!redis) return defaultContent;
  try {
    const stored = await redis.get<Partial<SiteContent>>(CONTENT_KEY);
    if (!stored) return defaultContent;
    return {
      homepage: { ...defaultContent.homepage, ...stored.homepage },
      players: stored.players ?? defaultContent.players,
      fixtures: stored.fixtures ?? defaultContent.fixtures,
      news: stored.news ?? defaultContent.news,
      partners: stored.partners ?? defaultContent.partners,
      staff: stored.staff ?? defaultContent.staff,
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
