"use client";
import { useRef, useEffect, useState } from "react";
import SignaturePad from "signature_pad";

interface SignatureCanvasProps {
  label: string;
  value?: string | null;
  onSave: (dataUrl: string) => void;
  color?: string;
}

export default function SignatureCanvas({ label, value, onSave, color = "bg-primary" }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const padRef = useRef<SignaturePad | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(ratio, ratio);

    padRef.current = new SignaturePad(canvas, {
      penColor: "#1C2833",
      backgroundColor: "rgb(255, 255, 255)",
    });

    // Si une signature existe deja, l'afficher
    if (value) {
      const img = new Image();
      img.onload = () => {
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
        }
      };
      img.src = value;
    }

    return () => {
      if (padRef.current) padRef.current.off();
    };
  }, [value]);

  function handleClear() {
    if (padRef.current) {
      padRef.current.clear();
      setSaved(false);
    }
  }

  function handleSave() {
    if (padRef.current && !padRef.current.isEmpty()) {
      const dataUrl = padRef.current.toDataURL("image/png");
      onSave(dataUrl);
      setSaved(true);
    }
  }

  return (
    <div className="mb-6">
      <div className={`${color} text-white font-bold text-sm px-4 py-2.5 rounded-t`}>
        {label}
      </div>
      <div className="border border-gray-200 border-t-0 rounded-b p-4 bg-white">
        <p className="text-xs text-gray-500 mb-3">Signez dans le cadre ci-dessous avec votre souris ou votre doigt :</p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden mb-3">
          <canvas
            ref={canvasRef}
            className="w-full cursor-crosshair"
            style={{ height: "160px", touchAction: "none" }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Effacer
            </button>
            <button
              type="button"
              onClick={handleSave}
              className={`px-4 py-1.5 text-sm text-white rounded transition-colors ${color} hover:opacity-80`}
            >
              Valider la signature
            </button>
          </div>
          {saved && (
            <span className="text-green-600 text-sm font-medium">Signature enregistree</span>
          )}
        </div>
      </div>
    </div>
  );
}
