"use client";
import { useRef, useEffect, useState } from "react";
import SignaturePad from "signature_pad";
import { Check } from "lucide-react";

interface SignatureCanvasProps {
  label: string;
  value?: string | null;
  onSave: (dataUrl: string) => void;
  color?: string;
}

export default function SignatureCanvas({ label, value, onSave }: SignatureCanvasProps) {
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
      penColor: "#0a0a0a",
      backgroundColor: "rgb(255, 255, 255)",
    });

    if (value) {
      const img = new Image();
      img.onload = () => {
        if (ctx) ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
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
    <div className="rounded-md border border-border overflow-hidden">
      <div className="bg-primary text-primary-foreground font-medium text-sm px-4 py-2.5">
        {label}
      </div>
      <div className="p-4 bg-card">
        <p className="text-xs text-muted-foreground mb-3">Signez dans le cadre ci-dessous :</p>

        <div className="border-2 border-dashed border-border rounded-md overflow-hidden mb-3">
          <canvas
            ref={canvasRef}
            className="w-full cursor-crosshair"
            style={{ height: "140px", touchAction: "none" }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button type="button" onClick={handleClear}
              className="inline-flex items-center rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-muted transition-colors">
              Effacer
            </button>
            <button type="button" onClick={handleSave}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm hover:bg-primary/90 transition-colors">
              Valider
            </button>
          </div>
          {saved && (
            <span className="flex items-center gap-1 text-success text-sm font-medium">
              <Check className="h-4 w-4" />
              Enregistree
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
