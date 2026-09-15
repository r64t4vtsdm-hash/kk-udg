import type { Support as SupportType } from "@/lib/content";

export default function Support({ support }: { support: SupportType }) {
  return (
    <section id="podrska" className="schedule-band">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Podrška</p>
          <h2>{support.heading}</h2>
          <p>{support.text}</p>
        </div>
        {support.bank && (
          <div className="support-box">
            <p style={{ whiteSpace: "pre-line" }}>{support.bank}</p>
          </div>
        )}
      </div>
    </section>
  );
}
