"use client";

import { useState } from "react";
import type { FieldDef } from "@/lib/sections";

type Item = Record<string, string>;

export default function ListEditor({
  section,
  fields,
  initialItems,
  emptyItemLabel,
}: {
  section: string;
  fields: FieldDef[];
  initialItems: Item[];
  emptyItemLabel?: string;
}) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function updateField(index: number, key: string, value: string) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  }

  function addItem() {
    const blank: Item = {};
    fields.forEach((f) => (blank[f.key] = ""));
    setItems((prev) => [...prev, blank]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setStatus("saving");
    setErrorMsg("");
    try {
      const res = await fetch(`/api/admin/content/${section}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items),
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
      {items.map((item, index) => (
        <div className="admin-item" key={index}>
          <button
            type="button"
            className="remove-btn"
            onClick={() => removeItem(index)}
            aria-label="Obriši"
          >
            Obriši
          </button>
          {fields.map((field) => (
            <div className="admin-form-row" key={field.key}>
              <label htmlFor={`${section}-${index}-${field.key}`}>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  id={`${section}-${index}-${field.key}`}
                  value={item[field.key] ?? ""}
                  onChange={(e) => updateField(index, field.key, e.target.value)}
                />
              ) : (
                <input
                  id={`${section}-${index}-${field.key}`}
                  type="text"
                  value={item[field.key] ?? ""}
                  onChange={(e) => updateField(index, field.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="admin-actions-row">
        <button type="button" className="admin-btn admin-btn-secondary" onClick={addItem}>
          + Dodaj {emptyItemLabel ?? "stavku"}
        </button>
        <button
          type="button"
          className="admin-btn admin-btn-primary"
          onClick={handleSave}
          disabled={status === "saving"}
        >
          {status === "saving" ? "Čuvam..." : "Sačuvaj izmjene"}
        </button>
        {status === "ok" && <span className="admin-status ok">Sačuvano!</span>}
        {status === "err" && <span className="admin-status err">{errorMsg}</span>}
      </div>
    </div>
  );
}
