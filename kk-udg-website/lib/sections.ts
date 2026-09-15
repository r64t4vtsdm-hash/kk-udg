export type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "image";
};

export type SectionConfig = {
  slug: string;
  label: string;
  description: string;
  kind: "list" | "object";
  fields: FieldDef[];
  emptyItemLabel?: string;
};

export const SECTIONS: SectionConfig[] = [
  {
    slug: "homepage",
    label: "Početna strana",
    description: "Tekst i fotografije na naslovnoj strani i u sekciji \"O klubu\".",
    kind: "object",
    fields: [
      { key: "heroTagline", label: "Tekst ispod naslova KK UDG", type: "textarea" },
      { key: "heroPhotoUrl", label: "Naslovna fotografija (opciono)", type: "image" },
      { key: "aboutTitle", label: "Naslov sekcije \"O klubu\"" },
      { key: "aboutText1", label: "O klubu — prvi pasus", type: "textarea" },
      { key: "aboutText2", label: "O klubu — drugi pasus", type: "textarea" },
      { key: "aboutPhotoUrl", label: "Fotografija u sekciji \"O klubu\" (opciono)", type: "image" },
      { key: "udgLogoUrl", label: "Logo Univerziteta UDG (opciono, prikazuje se u podnožju)", type: "image" },
    ],
  },
  {
    slug: "players",
    label: "Igrači",
    description: "Imena, brojevi, pozicije i osnovni podaci igrača.",
    kind: "list",
    fields: [
      { key: "name", label: "Ime i prezime" },
      { key: "number", label: "Broj dresa" },
      { key: "position", label: "Pozicija" },
      { key: "sub", label: "Godište · visina" },
      { key: "photoUrl", label: "Fotografija igrača (opciono)", type: "image" },
    ],
    emptyItemLabel: "Novi igrač",
  },
  {
    slug: "staff",
    label: "Stručni štab",
    description: "Trener, pomoćni treneri, fizioterapeut i ostalo osoblje.",
    kind: "list",
    fields: [
      { key: "name", label: "Ime i prezime" },
      { key: "role", label: "Uloga" },
      { key: "photoUrl", label: "Fotografija (opciono)", type: "image" },
    ],
    emptyItemLabel: "Nova osoba",
  },
  {
    slug: "news",
    label: "Vijesti",
    description: "Novosti i objave kluba — svaka vijest se otvara na svojoj strani.",
    kind: "list",
    fields: [
      { key: "title", label: "Naslov" },
      { key: "date", label: "Datum" },
      { key: "photoUrl", label: "Fotografija (opciono)", type: "image" },
      { key: "excerpt", label: "Kratak uvodni tekst (prikazuje se na početnoj)", type: "textarea" },
      { key: "text", label: "Pun tekst vijesti (prikazuje se kad se otvori vijest)", type: "textarea" },
    ],
    emptyItemLabel: "Nova vijest",
  },
  {
    slug: "partners",
    label: "Partneri",
    description: "Sponzori i partneri kluba.",
    kind: "list",
    fields: [
      { key: "name", label: "Naziv partnera" },
      { key: "url", label: "Link (opciono)" },
      { key: "logoUrl", label: "Logo partnera (opciono)", type: "image" },
    ],
    emptyItemLabel: "Novi partner",
  },
  {
    slug: "contact",
    label: "Kontakt",
    description: "Email, telefon i društvene mreže kluba.",
    kind: "object",
    fields: [
      { key: "email", label: "Email" },
      { key: "phone", label: "Telefon" },
      { key: "instagram", label: "Instagram link" },
      { key: "facebook", label: "Facebook link" },
    ],
  },
  {
    slug: "support",
    label: "Kako nas možete podržati",
    description: "Tekst o sponzorstvima, donacijama i podršci klubu.",
    kind: "object",
    fields: [
      { key: "heading", label: "Naslov" },
      { key: "text", label: "Tekst", type: "textarea" },
      { key: "bank", label: "Podaci za uplatu / sponzorstvo (opciono)", type: "textarea" },
    ],
  },
];

export function getSectionConfig(slug: string): SectionConfig | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}
