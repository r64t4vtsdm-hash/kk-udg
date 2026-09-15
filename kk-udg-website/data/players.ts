export type Player = {
  n: number;
  name: string;
  number: string;
  position: string;
  sub: string;
};

// Placeholderi — zamijeniti kad stignu pravi podaci o igračima.
export const players: Player[] = Array.from({ length: 10 }, (_, i) => ({
  n: i + 1,
  name: "Ime Prezime",
  number: "#0",
  position: "Pozicija",
  sub: "Godište · visina",
}));
