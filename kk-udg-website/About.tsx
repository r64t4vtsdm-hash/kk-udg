import Image from "next/image";
import team from "@/public/images/team.jpg";

export default function About() {
  return (
    <section id="oklubu">
      <div className="wrap about-grid">
        <div className="about-copy">
          <p className="eyebrow">O klubu</p>
          <h2 style={{ marginTop: 8, marginBottom: 18, fontSize: "clamp(1.9rem, 4vw, 2.5rem)" }}>
            Univerzitetski klub, takmičarski duh
          </h2>
          <p>
            Košarkaški klub UDG okuplja igrače Univerziteta Donja Gorica koji sezonu
            igraju s istom ozbiljnošću kao i ispite — trening do treninga, korak po
            korak do bolje pozicije na tabeli.
          </p>
          <p>
            U maju 2026. dio ekipe je nosio dres Crne Gore na međunarodnom studentskom
            turniru <em>Sias Intercontinental Basketball Tour</em> u Kini, gdje se klub
            predstavio pred internacionalnom konkurencijom. Sad je fokus na novoj
            sezoni: dvadeset utakmica protiv deset ekipa iz cijele Crne Gore, u
            jesenjem i proljećnom dijelu prvenstva.
          </p>
        </div>
        <figure className="about-media">
          <Image
            src={team}
            alt="Ekipa KK UDG sa zastavom Crne Gore, turnir u Kini 2026."
            fill
            sizes="(max-width: 820px) 100vw, 45vw"
            style={{ objectFit: "cover", objectPosition: "50% 30%" }}
          />
          <figcaption>Kina, maj 2026. — nastup pod zastavom Crne Gore</figcaption>
        </figure>
      </div>
    </section>
  );
}
