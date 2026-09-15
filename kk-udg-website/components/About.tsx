import Image from "next/image";
import team from "@/public/images/team.jpg";

export default function About({
  title,
  text1,
  text2,
  photoUrl,
}: {
  title: string;
  text1: string;
  text2: string;
  photoUrl: string;
}) {
  return (
    <section id="oklubu">
      <div className="wrap about-grid">
        <div className="about-copy">
          <p className="eyebrow">O klubu</p>
          <h2 style={{ marginTop: 8, marginBottom: 18, fontSize: "clamp(1.9rem, 4vw, 2.5rem)" }}>
            {title}
          </h2>
          <p>{text1}</p>
          <p>{text2}</p>
        </div>
        <figure className="about-media">
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoUrl} alt="Ekipa KK UDG sa zastavom Crne Gore, turnir u Kini 2026." />
          ) : (
            <Image
              src={team}
              alt="Ekipa KK UDG sa zastavom Crne Gore, turnir u Kini 2026."
              fill
              sizes="(max-width: 820px) 100vw, 45vw"
              style={{ objectFit: "cover", objectPosition: "50% 30%" }}
            />
          )}
          <figcaption>Kina, maj 2026. — nastup pod zastavom Crne Gore</figcaption>
        </figure>
      </div>
    </section>
  );
}
