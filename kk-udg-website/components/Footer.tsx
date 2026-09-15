import Image from "next/image";
import logo from "@/public/images/logo.jpg";

export default function Footer() {
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
          </div>
          <div className="footer-links">
            <a href="#top">Početna</a>
            <a href="#oklubu">O klubu</a>
            <a href="#igraci">Igrači</a>
            <a href="#raspored">Raspored</a>
          </div>
        </div>
        <p className="footer-note">
          Kontakt podaci i društvene mreže kluba biće dodati ovdje — pošaljite email,
          telefon ili Instagram/Facebook link kluba pa ih odmah dodajem.
        </p>
      </div>
    </footer>
  );
}
