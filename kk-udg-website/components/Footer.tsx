import Image from "next/image";
import logo from "@/public/images/logo.jpg";
import type { Contact } from "@/lib/content";

export default function Footer({
  contact,
  udgLogoUrl,
}: {
  contact: Contact;
  udgLogoUrl?: string;
}) {
  const hasContact = contact.email || contact.phone || contact.instagram || contact.facebook;

  return (
    <footer className="site" id="kontakt">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image src={logo} alt="Grb KK UDG" width={44} height={44} />
            <div>
              <b>KK UDG</b>
              <span>Košarkaški klub Univerziteta Donja Gorica</span>
            </div>
            {udgLogoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="footer-udg-logo" src={udgLogoUrl} alt="Univerzitet Donja Gorica" />
            )}
          </div>
          <div className="footer-links">
            <a href="/">Početna</a>
            <a href="/#oklubu">O klubu</a>
            <a href="/#igraci">Igrači</a>
            <a href="/#raspored">Raspored</a>
            <a href="/#vijesti">Vijesti</a>
          </div>
        </div>

        {hasContact ? (
          <div className="footer-contact">
            {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
            {contact.phone && <a href={`tel:${contact.phone}`}>{contact.phone}</a>}
            {contact.instagram && (
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            )}
            {contact.facebook && (
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            )}
          </div>
        ) : (
          <p className="footer-note">
            Kontakt podaci i društvene mreže kluba biće dodati ovdje uskoro.
          </p>
        )}
      </div>
    </footer>
  );
}
