"use client";
import { useState } from "react";
import { Download } from "lucide-react";
import AdPopup from "@/components/AdPopup";

interface PDFExportButtonProps {
  targetId: string;
  filename: string;
  title?: string;
}

export default function PDFExportButton({ targetId, filename }: PDFExportButtonProps) {
  const [phase, setPhase] = useState<"idle" | "ad" | "downloading">("idle");

  // Step 1 — user clicks → show the ad immediately
  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("ad");
  };

  // Step 2 — ad finishes (countdown ends or skip) → start PDF download
  const handleAdClose = async () => {
    setPhase("downloading");
    try {
      const { exportToPDF } = await import("@/lib/utils/pdf");
      await exportToPDF(targetId, filename);
    } catch (e) {
      console.error("PDF export failed", e);
    } finally {
      setPhase("idle");
    }
  };

  const label =
    phase === "ad" ? "Preparing…" :
    phase === "downloading" ? "Downloading…" :
    "Download PDF";

  return (
    <>
      <button
        onClick={handleClick}
        disabled={phase !== "idle"}
        className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
      >
        <Download className="w-4 h-4" />
        {label}
      </button>

      {phase === "ad" && <AdPopup onClose={handleAdClose} />}
    </>
  );
}
