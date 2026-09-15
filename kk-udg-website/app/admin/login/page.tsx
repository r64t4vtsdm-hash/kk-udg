"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/components/admin/admin.css";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Pogrešna lozinka.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Došlo je do greške. Probajte ponovo.");
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-shell">
      <div className="admin-login-card">
        <h1>KK UDG — Admin</h1>
        <p>Unesite lozinku da biste uređivali sadržaj sajta.</p>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <label htmlFor="password">Lozinka</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          <div className="admin-actions-row">
            <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
              {loading ? "Provjera..." : "Prijavi se"}
            </button>
            {error && <span className="admin-status err">{error}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
