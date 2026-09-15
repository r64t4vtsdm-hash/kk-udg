"use client";

import { useState } from "react";
import type { Fixture } from "@/lib/content";

function LegList({
  legLabel,
  items,
  onChange,
}: {
  legLabel: string;
  items: Fixture[];
  onChange: (items: Fixture[]) => void;
}) {
  function update(index: number, key: keyof Fixture, value: string | boolean) {
    onChange(items.map((it, i) => (i === index ? { ...it, [key]: value } : it)));
  }
  function add() {
    onChange([...items, { date: "", opponent: "", home: true }]);
  }
  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: "1.1rem", marginBottom: 14 }}>{legLabel}</h3>
      {items.map((item, index) => (
        <div className="admin-item" key={index}>
          <button type="button" className="remove-btn" onClick={() => remove(index)}>
            Obriši
          </button>
          <div className="admin-form-row">
            <label>Datum</label>
            <input
              type="text"
              value={item.date}
              onChange={(e) => update(index, "date", e.target.value)}
            />
          </div>
          <div className="admin-form-row">
            <label>Protivnik</label>
            <input
              type="text"
              value={item.opponent}
              onChange={(e) => update(index, "opponent", e.target.value)}
            />
          </div>
          <div className="admin-form-row">
            <label>Domaćin / gost</label>
            <div className="admin-home-toggle">
              <button
                type="button"
                className={`admin-toggle-btn ${item.home ? "active" : ""}`}
                onClick={() => update(index, "home", true)}
              >
                Domaćin
              </button>
              <button
                type="button"
                className={`admin-toggle-btn ${!item.home ? "active" : ""}`}
                onClick={() => update(index, "home", false)}
              >
                Gost
              </button>
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="admin-btn admin-btn-secondary" onClick={add}>
        + Dodaj utakmicu
      </button>
    </div>
  );
}

export default function FixturesEditor({
  initialFirstLeg,
  initialSecondLeg,
}: {
  initialFirstLeg: Fixture[];
  initialSecondLeg: Fixture[];
}) {
  const [firstLeg, setFirstLeg] = useState<Fixture[]>(initialFirstLeg);
  const [secondLeg, setSecondLeg] = useState<Fixture[]>(initialSecondLeg);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSave() {
    setStatus("saving");
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/content/fixtures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstLeg, secondLeg }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Greška pri čuvanju");
      }
      setStatus("ok");
    } catch (err) {
      setStatus("err");
      setErrorMsg(err instanceof Error ? err.message : "Greška pri čuvanju");
    }
  }

  return (
    <div>
      <LegList legLabel="Prvi krug" items={firstLeg} onChange={setFirstLeg} />
      <LegList legLabel="Drugi krug" items={secondLeg} onChange={setSecondLeg} />
      <div className="admin-actions-row">
        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={handleSave}
          disabled={status === "saving"}
        >
          {status === "saving" ? "Čuvam..." : "Sačuvaj raspored"}
        </button>
        {status === "ok" && <span className="admin-status ok">Sačuvano!</span>}
        {status === "err" && <span className="admin-status err">{errorMsg}</span>}
      </div>
    </div>
  );
}
