"use client";

import { useEffect, useState, useRef, useActionState } from "react";
//import { useFormState } from "react-dom";
import { createDashboardBanner } from "../actions/create-dashboard-banner";
import Image from "next/image";

const initialState = { success: false };

export default function UploadDashboardBanner() {
  //const [state, formAction] = useFormState(createDashboardBanner, initialState);
  const [state, formAction] = useActionState(
    createDashboardBanner,
    initialState,
  );

  const [preview, setPreview] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const prevSuccess = useRef(false);

  useEffect(() => {
    if (!prevSuccess.current && state.success) {
      alert("Imagen subida correctamente");
      queueMicrotask(() => {
        setPreview(null);
      });

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }

    prevSuccess.current = state.success;
  }, [state.success]);

  useEffect(() => {
  return () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };
}, [preview]);


  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  return (
    <form
      action={formAction}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 420,
      }}
    >
      <label
        style={{
          display: "inline-block",
          padding: "8px 14px",
          borderRadius: 8,
          background: "#1677ff",
          color: "#fff",
          cursor: "pointer",
          width: "fit-content",
        }}
      >
        Elegir imagen
        <input
          ref={inputRef}
          type="file"
          name="image"
          accept="image/*"
          hidden
          required
          onChange={handleFileChange}
        />
      </label>

      {/* preview */}
      {preview && (
        <div
          style={{
            //position: "relative",
            //height: 180,

            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          {/*
          <Image
            src={preview}
            alt="preview"
            fill
            style={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              display: "block",
            }}
          />
              */}
          <Image
            src={preview}
            alt="preview"
            width={420}
            height={180}
            style={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={!preview}
        style={{
          padding: "8px 14px",
          marginBottom: "14px",
          borderRadius: 8,
          border: "none",
          background: preview ? "#111" : "#9ca3af",
          color: "#fff",
          cursor: preview ? "pointer" : "not-allowed",
          width: "fit-content",
        }}
      >
        Subir al carrusel
      </button>
    </form>
  );
}
