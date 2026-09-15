export type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea";
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
    slug: "players",
    label: "Igrači",
    description: "Imena, brojevi, pozicije i osnovni podaci igrača.",
    kind: "list",
    fields: [
      { key: "name", label: "Ime i prezime" },
      { key: "number", label: "Broj dresa" },
      { key: "position", label: "Pozicija" },
      { key: "sub", label: "Godište · visina" },
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
      { key: "photoUrl", label: "Link do slike (opciono)" },
    ],
    emptyItemLabel: "Nova osoba",
  },
  {
    slug: "board",
    label: "Upravni odbor",
    description: "Članovi upravnog odbora kluba.",
    kind: "list",
    fields: [
      { key: "name", label: "Ime i prezime" },
      { key: "role", label: "Funkcija" },
    ],
    emptyItemLabel: "Novi član",
  },
  {
    slug: "news",
    label: "Vijesti",
    description: "Novosti i objave kluba.",
    kind: "list",
    fields: [
      { key: "title", label: "Naslov" },
      { key: "date", label: "Datum" },
      { key: "excerpt", label: "Tekst", type: "textarea" },
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
      { key: "logoUrl", label: "Link do loga (opciono)" },
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
