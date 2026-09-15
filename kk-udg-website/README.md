# KK UDG — sajt kluba

Next.js + TypeScript projekat za sajt košarkaškog kluba UDG.

## Pokretanje lokalno (nije obavezno)

```
npm install
npm run dev
```

Sajt se otvara na http://localhost:3000

## Objavljivanje (Vercel)

1. Napravi novi repozitorijum na GitHub-u i otpremi ove fajlove.
2. Na [vercel.com](https://vercel.com) izaberi "Add New Project" i uvezi taj repozitorijum.
3. Vercel sam prepoznaje da je u pitanju Next.js projekat — samo klikni "Deploy".
4. Poveži domen kkudg.me u podešavanjima projekta (Settings → Domains), isto kao za sbcudg.me.

## Šta ažurirati

- `data/players.ts` — imena, brojevi, pozicije igrača
- `data/fixtures.ts` — raspored utakmica
- `components/Footer.tsx` — kontakt podaci i društvene mreže
