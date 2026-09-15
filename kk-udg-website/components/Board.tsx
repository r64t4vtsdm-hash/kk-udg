import type { BoardMember } from "@/lib/content";

export default function Board({ board }: { board: BoardMember[] }) {
  return (
    <section id="upravni-odbor">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Rukovodstvo</p>
          <h2>Upravni odbor</h2>
        </div>
        {board.length === 0 ? (
          <p className="empty-note">Sastav upravnog odbora biće uskoro objavljen.</p>
        ) : (
          <div className="board-list">
            {board.map((m, i) => (
              <div className="board-row" key={i}>
                <span className="board-name">{m.name}</span>
                <span className="board-role">{m.role}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
