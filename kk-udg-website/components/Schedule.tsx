import { firstLeg, secondLeg, type Fixture } from "@/data/fixtures";

function FixtureCard({ f }: { f: Fixture }) {
  return (
    <div className="fixture">
      <span className="num">{String(f.n).padStart(2, "0")}</span>
      <div className="date">{f.date}</div>
      <div className="opp">{f.opponent}</div>
    </div>
  );
}

export default function Schedule() {
  return (
    <section id="raspored" className="schedule-band">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Raspored</p>
          <h2>Utakmice sezone 2026/27</h2>
          <p>
            Dvadeset kola, deset protivnika — svaka ekipa se igra dvaput, jednom u
            jesenjem i jednom u proljećnom dijelu sezone.
          </p>
        </div>

        <div className="leg">
          <div className="leg-title">
            <h3>Jesenji dio</h3>
            <span>oktobar — januar</span>
          </div>
          <div className="fixtures">
            {firstLeg.map((f) => (
              <FixtureCard f={f} key={f.n} />
            ))}
          </div>
        </div>

        <div className="leg">
          <div className="leg-title">
            <h3>Proljećni dio — revanš</h3>
            <span>januar — april</span>
          </div>
          <div className="fixtures">
            {secondLeg.map((f) => (
              <FixtureCard f={f} key={f.n} />
            ))}
          </div>
        </div>

        <p className="schedule-note">
          Raspored je prenijet sa zvaničnog rasporeda kluba — provjerite tačne datume i
          domaćina/gosta prije objave, jer su parovi kola prepisani sa slike i mogući
          su sitni previdi.
        </p>
      </div>
    </section>
  );
}
