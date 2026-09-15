# KK UDG — sajt kluba

Next.js + TypeScript projekat za sajt košarkaškog kluba UDG, sa admin panelom za
uređivanje sadržaja (igrači, štab, upravni odbor, raspored, vijesti, partneri,
kontakt, podrška).

## Potrebno podešavanje na Vercel-u

1. **Baza (Upstash Redis)** — Storage tab u projektu → dodaj Upstash Redis integraciju
   (besplatan plan je dovoljan). Automatski se dodaju `UPSTASH_REDIS_REST_URL` i
   `UPSTASH_REDIS_REST_TOKEN`.
2. **Lozinka za admin** — Settings → Environment Variables → dodaj `ADMIN_PASSWORD`
   sa lozinkom po izboru.
3. Redeploy nakon dodavanja oba.

## Admin panel

Otvori `/admin` na sajtu (npr. `kkudg.me/admin`) i uloguj se sa `ADMIN_PASSWORD`
lozinkom. Odatle se uređuju: igrači, stručni štab, upravni odbor, raspored, vijesti,
partneri, kontakt i tekst o podršci klubu.

## Pokretanje lokalno (nije obavezno)

```
npm install
npm run dev
```
