"use client";

import { useRef, useState, type ChangeEvent } from "react";

export default function ImageField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChosen(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Greška pri otpremanju fotografije");
      }
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška pri otpremanju fotografije");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="admin-image-field">
      <label htmlFor={id}>{label}</label>
      <div className="admin-image-row">
        <div className="admin-image-preview">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" />
          ) : (
            <span className="admin-image-placeholder">Bez fotografije</span>
          )}
        </div>
        <div className="admin-image-actions">
          <input
            ref={fileInputRef}
            id={id}
            type="file"
            accept="image/*"
            onChange={handleFileChosen}
            disabled={uploading}
            style={{ display: "none" }}
          />
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? "Otpremam..." : "Izaberi fotografiju"}
          </button>
          {value && (
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={() => onChange("")}
              disabled={uploading}
            >
              Ukloni
            </button>
          )}
          {error && <span className="admin-status err">{error}</span>}
        </div>
      </div>
    </div>
  );
}
