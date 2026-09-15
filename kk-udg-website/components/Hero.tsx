import Image from "next/image";
import team from "@/public/images/team.jpg";

export default function Hero({
  tagline,
  photoUrl,
}: {
  tagline: string;
  photoUrl: string;
}) {
  return (
    <>
      <div id="top" />
      <section className="hero" style={{ padding: 0 }}>
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="hero-photo"
            src={photoUrl}
            alt="Ekipa KK UDG na turniru u Kini, maj 2026."
          />
        ) : (
          <Image
            className="hero-photo"
            src={team}
            alt="Ekipa KK UDG na turniru u Kini, maj 2026."
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "50% 62%" }}
          />
        )}
        <div className="hero-scrim" />
        <div className="wrap hero-inner">
          <p className="eyebrow" style={{ color: "var(--accent)" }}>
            Sezona 2026/27
          </p>
          <h1>
            KK
            <br />
            <span>UDG</span>
          </h1>
          <p className="hero-slogan">Uspjeh traži kontinuitet.</p>
          <p className="hero-tagline">{tagline}</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#raspored">
              Raspored utakmica
            </a>
            <a className="btn btn-ghost" href="#oklubu">
              O klubu
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
