import type { Player } from "@/lib/content";

export default function Players({ players }: { players: Player[] }) {
  return (
    <section id="igraci">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Ekipa</p>
          <h2>Igrači</h2>
          <p>Sastav ekipe za sezonu 2026/27.</p>
        </div>
        <div className="players-grid">
          {players.map((p, n) => (
            <div className="player-card" key={n}>
              <div className="player-photo">
                <span className="ph-number">{String(n + 1).padStart(2, "0")}</span>
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
      </div>
    </section>
  );
}
