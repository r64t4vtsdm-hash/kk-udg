import Link from "next/link";
import AdminBar from "@/components/admin/AdminBar";
import { SECTIONS } from "@/lib/sections";
import "@/components/admin/admin.css";

export default function AdminDashboard() {
  return (
    <div className="admin-shell">
      <AdminBar />
      <div className="admin-wrap">
        <h1 className="admin-title">Uređivanje sadržaja</h1>
        <p className="admin-sub">
          Izaberite šta želite da izmijenite. Promjene se odmah pojavljuju na sajtu čim
          kliknete "Sačuvaj izmjene".
        </p>
        <div className="admin-grid">
          <Link href="/admin/fixtures" className="admin-card">
            <b>Raspored</b>
            <span>Datumi i protivnici, jesenji i proljećni dio</span>
          </Link>
          {SECTIONS.map((s) => (
            <Link href={`/admin/${s.slug}`} className="admin-card" key={s.slug}>
              <b>{s.label}</b>
              <span>{s.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
