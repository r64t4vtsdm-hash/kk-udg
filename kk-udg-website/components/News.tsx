import Link from "next/link";
import type { NewsItem } from "@/lib/content";

export default function News({ news }: { news: NewsItem[] }) {
  return (
    <section id="vijesti">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Vijesti</p>
          <h2>Novosti kluba</h2>
        </div>
        {news.length === 0 ? (
          <p className="empty-note">Trenutno nema objavljenih vijesti.</p>
        ) : (
          <div className="news-grid">
            {news.map((item, i) => (
              <Link href={`/vijesti/${i}`} className="news-card" key={i}>
                <div className="news-photo">
                  {item.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.photoUrl} alt={item.title} />
                  ) : (
                    <span className="ph-tag">Slika uskoro</span>
                  )}
                </div>
                <div className="news-body">
                  {item.date && <span className="news-date">{item.date}</span>}
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-excerpt">{item.excerpt}</p>
                  <span className="news-more">Pročitaj više →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
