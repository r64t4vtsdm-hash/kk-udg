import Image from "next/image";
import logo from "@/public/images/logo.jpg";

export default function Header() {
  return (
    <header className="site">
      <div className="wrap nav-inner">
        <a className="brand" href="#top">
          <Image src={logo} alt="Grb KK UDG" width={38} height={38} />
          <span className="brand-text">KK UDG</span>
        </a>
        <nav className="links">
          <a href="#oklubu">O klubu</a>
          <a href="#igraci">Igrači</a>
          <a href="#raspored">Raspored</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
      </div>
    </header>
  );
}
