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
  home: boolean;
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
  udgLogoUrl: string;
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
      "Košarkaški klub UDG okuplja studente Univerziteta Donja Gorica koje, pored studija, povezuje i košarka. Klub je mjesto gdje se akademske obaveze i ozbiljan sportski rad ne isključuju, već postaju dio iste priče.",
    aboutText2:
      "Nakon međunarodnog iskustva u Kini, gdje je ekipa UDG-a osvojila SIAS Intercontinental Basketball Tour bez poraza, pred klubom je nova sezona i novi izazov. KK UDG će kroz dvadeset utakmica odmjeriti snage sa deset ekipa iz cijele Crne Gore, sa jasnim ciljem da iz utakmice u utakmicu raste kao tim i gradi svoje mjesto u crnogorskoj košarci.",
    aboutPhotoUrl: "",
    udgLogoUrl: "",
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
      { date: "10—11.10.2026.", opponent: "Sutjeska Elektroprivreda 2", home: false },
      { date: "17—18.10.2026.", opponent: "Pljevlja", home: true },
      { date: "24—25.10.2026.", opponent: "Balkanski Ris", home: false },
      { date: "31.10—01.11.2026.", opponent: "Lovćen 1947-2", home: true },
      { date: "07—08.11.2026.", opponent: "Zeta", home: false },
      { date: "14—15.11.2026.", opponent: "Piva Basket", home: true },
      { date: "21—22.11.2026.", opponent: "Budva", home: false },
      { date: "05—06.12.2026.", opponent: "Sutomore", home: true },
      { date: "12—13.12.2026.", opponent: "Rudar", home: false },
      { date: "26—27.12.2026.", opponent: "Ibar", home: true },
    ],
    secondLeg: [
      { date: "23—24.01.2027.", opponent: "Sutjeska Elektroprivreda 2", home: true },
      { date: "30—31.01.2027.", opponent: "Pljevlja", home: false },
      { date: "06—07.02.2027.", opponent: "Balkanski Ris", home: true },
      { date: "13—14.02.2027.", opponent: "Lovćen 1947-2", home: false },
      { date: "06—07.03.2027.", opponent: "Zeta", home: true },
      { date: "13—14.03.2027.", opponent: "Piva Basket", home: false },
      { date: "20—21.03.2027.", opponent: "Budva", home: true },
      { date: "27—28.03.2027.", opponent: "Sutomore", home: false },
      { date: "03—04.04.2027.", opponent: "Rudar", home: true },
      { date: "17—18.04.2027.", opponent: "Ibar", home: false },
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

function normalizeFixtures(
  stored: { firstLeg?: Partial<Fixture>[]; secondLeg?: Partial<Fixture>[] } | undefined,
  fallback: { firstLeg: Fixture[]; secondLeg: Fixture[] }
): { firstLeg: Fixture[]; secondLeg: Fixture[] } {
  if (!stored) return fallback;
  const fix = (list: Partial<Fixture>[] | undefined, fb: Fixture[]) =>
    list
      ? list.map((f) => ({ date: f.date ?? "", opponent: f.opponent ?? "", home: f.home ?? false }))
      : fb;
  return {
    firstLeg: fix(stored.firstLeg, fallback.firstLeg),
    secondLeg: fix(stored.secondLeg, fallback.secondLeg),
  };
}

function normalizeNews(stored: Partial<NewsItem>[] | undefined, fallback: NewsItem[]): NewsItem[] {
  if (!stored) return fallback;
  return stored.map((n) => ({
    title: n.title ?? "",
    date: n.date ?? "",
    excerpt: n.excerpt ?? "",
    text: n.text && n.text.trim() !== "" ? n.text : n.excerpt ?? "",
    photoUrl: n.photoUrl ?? "",
  }));
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
      fixtures: normalizeFixtures(stored.fixtures, defaultContent.fixtures),
      news: normalizeNews(stored.news, defaultContent.news),
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
