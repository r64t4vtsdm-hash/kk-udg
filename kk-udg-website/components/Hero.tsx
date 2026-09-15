import Image from "next/image";
import team from "@/public/images/team.jpg";

export default function Hero() {
  return (
    <>
      <div id="top" />
      <section className="hero" style={{ padding: 0 }}>
        <Image
          className="hero-photo"
          src={team}
          alt="Ekipa KK UDG na turniru u Kini, maj 2026."
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "50% 28%" }}
        />
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
          <p className="hero-tagline">
            Košarkaški klub Univerziteta Donja Gorica. Ista energija i disciplina koju
            ekipa nosi na parket, prenesena i na predavanja — i obrnuto.
          </p>
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
