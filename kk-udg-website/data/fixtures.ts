export type Fixture = {
  n: number;
  date: string;
  opponent: string;
};

export const firstLeg: Fixture[] = [
  { n: 1, date: "10—11.10.", opponent: "Sutjeska Nikšić" },
  { n: 2, date: "17—18.10.", opponent: "KK Pljevlja" },
  { n: 3, date: "24—25.10.", opponent: "OKK Balkanski Ris, Plav" },
  { n: 4, date: "31.10—01.11.", opponent: "KK Cetinje" },
  { n: 5, date: "07—08.11.", opponent: "KK Zeta, Golubovci" },
  { n: 6, date: "14—15.11.", opponent: "Piva Basket, Plužine" },
  { n: 7, date: "21—22.11.", opponent: "KK Budva" },
  { n: 8, date: "05—06.12.", opponent: "KK Sutomore" },
  { n: 9, date: "12—13.12.", opponent: "KK Pljevlja (1956)" },
  { n: 10, date: "26—27.12.", opponent: "KK Ibar, Rožaje" },
];

export const secondLeg: Fixture[] = [
  { n: 11, date: "23—24.01.", opponent: "Sutjeska Nikšić" },
  { n: 12, date: "30—31.01.", opponent: "KK Pljevlja" },
  { n: 13, date: "06—07.02.", opponent: "OKK Balkanski Ris, Plav" },
  { n: 14, date: "13—14.02.", opponent: "KK Cetinje" },
  { n: 15, date: "06—07.03.", opponent: "KK Zeta, Golubovci" },
  { n: 16, date: "13—14.03.", opponent: "Piva Basket, Plužine" },
  { n: 17, date: "20—21.03.", opponent: "KK Budva" },
  { n: 18, date: "27—28.03.", opponent: "KK Sutomore" },
  { n: 19, date: "03—04.04.", opponent: "KK Pljevlja (1956)" },
  { n: 20, date: "17—18.04.", opponent: "KK Ibar, Rožaje" },
];
