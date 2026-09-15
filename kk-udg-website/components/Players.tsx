import { players } from "@/data/players";

export default function Players() {
  return (
    <section id="igraci">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Ekipa</p>
          <h2>Igrači</h2>
          <p>
            Kartice su spremne za popunu — pošaljite imena, brojeve, pozicije i slike
            igrača pa ih odmah ubacujem umjesto placeholdera.
          </p>
        </div>
        <div className="players-grid">
          {players.map((p) => (
            <div className="player-card" key={p.n}>
              <div className="player-photo">
                <span className="ph-number">{String(p.n).padStart(2, "0")}</span>
                <span className="ph-tag">Slika uskoro</span>
              </div>
              <div className="player-body">
                <div className="player-name">{p.name}</div>
                <div className="player-meta">
                  <span className="player-num">{p.number}</span>
                  <span className="player-pos">{p.position}</span>
                </div>
                <div className="player-sub">{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="players-note">
          Redoslijed i broj kartica se lako mijenja — javite ako ekipa ima više ili
          manje od deset igrača.
        </p>
      </div>
    </section>
  );
}
