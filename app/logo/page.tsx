"use client";

import { useState } from "react";
import Link from "next/link";
import HaloLogo from "@/components/HaloLogo";

export default function LogoPage() {
  const [isReady, setIsReady] = useState(false);

  const handleDownload = (canvas: HTMLCanvasElement) => {
    setIsReady(true);
    
    // Create a new canvas with exact 500x500 dimensions
    const downloadCanvas = document.createElement('canvas');
    downloadCanvas.width = 500;
    downloadCanvas.height = 500;
    const ctx = downloadCanvas.getContext('2d');
    
    if (ctx) {
      // Fill with transparent background
      ctx.clearRect(0, 0, 500, 500);
      
      // Draw the 3D canvas onto our download canvas
      ctx.drawImage(canvas, 0, 0, 500, 500);
      
      // Create download link
      const link = document.createElement('a');
      link.download = 'sanctuary-halo-logo-500x500.png';
      link.href = downloadCanvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleManualDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      handleDownload(canvas);
    }
  };

  return (
    <div className="min-h-screen bg-sanctuary flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold mb-4 text-ink" style={{ fontFamily: "var(--font-display)" }}>
          Sanctuary Halo Logo
        </h1>
        <p className="text-lg text-ink/70 mb-6">
          Download your golden halo logo as a 500x500 PNG with transparent background
        </p>
        
        <button
          onClick={handleManualDownload}
          className="rounded-full border border-gold/30 bg-white px-8 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gold/5 hover:border-gold/50"
          disabled={!isReady}
        >
          {isReady ? "Download Logo (500x500 PNG)" : "Preparing logo..."}
        </button>
      </div>

      <div className="border-2 border-gold/20 rounded-lg p-4 bg-white/50 backdrop-blur-sm">
        <HaloLogo onCanvasReady={handleDownload} />
      </div>

      <div className="mt-8 text-center text-sm text-ink/60 max-w-md">
        <p>
          The logo will automatically download once it&apos;s ready. You can also click the download button above.
          The image has a transparent background and is perfect for use as a logo or icon.
        </p>
      </div>

      <div className="mt-6">
        <Link
          href="/"
          className="text-gold hover:text-gold/80 text-sm font-medium"
        >
          ← Back to Sanctuary
        </Link>
      </div>
    </div>
  );
}
