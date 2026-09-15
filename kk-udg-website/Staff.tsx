import type { StaffMember } from "@/lib/content";

export default function Staff({ staff }: { staff: StaffMember[] }) {
  return (
    <section id="strucni-stab">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Stručni štab</p>
          <h2>Trener i stručni tim</h2>
        </div>
        {staff.length === 0 ? (
          <p className="empty-note">Podaci o stručnom štabu biće uskoro dostupni.</p>
        ) : (
          <div className="people-grid">
            {staff.map((m, i) => (
              <div className="people-card" key={i}>
                <div className="people-photo">
                  {m.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photoUrl} alt={m.name} />
                  ) : (
                    <span className="ph-initial">{m.name.charAt(0) || "?"}</span>
                  )}
                </div>
                <div className="people-body">
                  <div className="people-name">{m.name}</div>
                  <div className="people-role">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
