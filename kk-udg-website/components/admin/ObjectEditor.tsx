"use client";

import { useState } from "react";
import type { FieldDef } from "@/lib/sections";
import ImageField from "./ImageField";

export default function ObjectEditor({
  section,
  fields,
  initialData,
}: {
  section: string;
  fields: FieldDef[];
  initialData: Record<string, string>;
}) {
  const [data, setData] = useState<Record<string, string>>(initialData);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function updateField(key: string, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setStatus("saving");
    setErrorMsg("");
    try {
      const res = await fetch(`/api/admin/content/${section}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const resData = await res.json().catch(() => ({}));
        throw new Error(resData.error || "Greška pri čuvanju");
      }
      setStatus("ok");
    } catch (err) {
      setStatus("err");
      setErrorMsg(err instanceof Error ? err.message : "Greška pri čuvanju");
    }
  }

  return (
    <div>
      <div className="admin-item">
        {fields.map((field) =>
          field.type === "image" ? (
            <ImageField
              key={field.key}
              id={`${section}-${field.key}`}
              label={field.label}
              value={data[field.key] ?? ""}
              onChange={(url) => updateField(field.key, url)}
            />
          ) : (
            <div className="admin-form-row" key={field.key}>
              <label htmlFor={`${section}-${field.key}`}>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  id={`${section}-${field.key}`}
                  value={data[field.key] ?? ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                />
              ) : (
                <input
                  id={`${section}-${field.key}`}
                  type="text"
                  value={data[field.key] ?? ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                />
              )}
            </div>
          )
        )}
      </div>
      <div className="admin-actions-row">
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
