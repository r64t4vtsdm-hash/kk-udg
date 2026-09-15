import type { Fixture } from "@/lib/content";

function FixtureCard({ f, n }: { f: Fixture; n: number }) {
  return (
    <div className="fixture">
      <span className="num">{String(n).padStart(2, "0")}</span>
      <div className="date">{f.date}</div>
      <div className="opp">{f.opponent}</div>
    </div>
  );
}

export default function Schedule({
  firstLeg,
  secondLeg,
}: {
  firstLeg: Fixture[];
  secondLeg: Fixture[];
}) {
  return (
    <section id="raspored" className="schedule-band">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Raspored</p>
          <h2>Utakmice sezone 2026/27</h2>
          <p>
            Svaka ekipa se igra dvaput, jednom u jesenjem i jednom u proljećnom dijelu
            sezone.
          </p>
        </div>

        <div className="leg">
          <div className="leg-title">
            <h3>Jesenji dio</h3>
            <span>oktobar — januar</span>
          </div>
          <div className="fixtures">
            {firstLeg.map((f, i) => (
              <FixtureCard f={f} n={i + 1} key={i} />
            ))}
          </div>
        </div>

        <div className="leg">
          <div className="leg-title">
            <h3>Proljećni dio — revanš</h3>
            <span>januar — april</span>
          </div>
          <div className="fixtures">
            {secondLeg.map((f, i) => (
              <FixtureCard f={f} n={firstLeg.length + i + 1} key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
