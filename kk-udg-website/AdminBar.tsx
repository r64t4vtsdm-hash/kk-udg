"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminBar() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-bar">
      <Link href="/admin" className="brand-link">
        KK UDG — Admin
      </Link>
      <div className="actions">
        <Link href="/" className="brand-link" style={{ fontWeight: 500, fontSize: "0.85rem" }}>
          Otvori sajt ↗
        </Link>
        <button type="button" className="logout" onClick={handleLogout}>
          Odjava
        </button>
      </div>
    </div>
  );
}
