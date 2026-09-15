import type { Partner } from "@/lib/content";

export default function Partners({ partners }: { partners: Partner[] }) {
  return (
    <section id="partneri">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Partneri</p>
          <h2>Partneri i sponzori</h2>
        </div>
        {partners.length === 0 ? (
          <p className="empty-note">Ovdje će uskoro biti partneri i sponzori kluba.</p>
        ) : (
          <div className="partners-grid">
            {partners.map((p, i) => {
              const content = p.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.logoUrl} alt={p.name} />
              ) : (
                <span className="partner-name">{p.name}</span>
              );
              return (
                <div className="partner-card" key={i}>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
