"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import HaloLogo from "@/components/HaloLogo";

export default function LogoPage() {
  const [isReady, setIsReady] = useState(false);
  const [isRecordingGif, setIsRecordingGif] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleDownload = (canvas: HTMLCanvasElement) => {
    setIsReady(true);
    canvasRef.current = canvas;
    
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

  const handleGifDownload = async () => {
    if (!canvasRef.current) return;
    
    setIsRecordingGif(true);
    
    try {
      // Dynamically import gif.js to avoid SSR issues
      const GIF = (await import('gif.js')).default;
      
      const gif = new GIF({
        workers: 2,
        quality: 10,
        width: 500,
        height: 500,
        transparent: 0x000000
      });

      const canvas = canvasRef.current;
      const totalFrames = 60; // 2 seconds at 30fps
      const frameDelay = 1000 / 30; // 30fps

      // Capture frames over 2 seconds
      for (let i = 0; i < totalFrames; i++) {
        await new Promise(resolve => setTimeout(resolve, frameDelay));
        
        // Create a frame canvas
        const frameCanvas = document.createElement('canvas');
        frameCanvas.width = 500;
        frameCanvas.height = 500;
        const frameCtx = frameCanvas.getContext('2d');
        
        if (frameCtx) {
          frameCtx.clearRect(0, 0, 500, 500);
          frameCtx.drawImage(canvas, 0, 0, 500, 500);
          gif.addFrame(frameCanvas, { delay: frameDelay });
        }
      }

      gif.on('finished', (blob: Blob) => {
        const link = document.createElement('a');
        link.download = 'sanctuary-halo-logo-animated.gif';
        link.href = URL.createObjectURL(blob);
        link.click();
        setIsRecordingGif(false);
      });

      gif.render();
    } catch (error) {
      console.error('Error creating GIF:', error);
      setIsRecordingGif(false);
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
          Download your golden halo logo as a static PNG or animated GIF (500x500, transparent background)
        </p>
        
        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={handleManualDownload}
            className="rounded-full border border-gold/30 bg-white px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gold/5 hover:border-gold/50"
            disabled={!isReady}
          >
            {isReady ? "Download PNG (500x500)" : "Preparing logo..."}
          </button>
          
          <button
            onClick={handleGifDownload}
            className="rounded-full border border-gold/30 bg-white px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gold/5 hover:border-gold/50"
            disabled={!isReady || isRecordingGif}
          >
            {isRecordingGif ? "Creating GIF..." : "Download GIF (Animated)"}
          </button>
        </div>
      </div>

      <div className="border-2 border-gold/20 rounded-lg p-4 bg-white/50 backdrop-blur-sm">
        <HaloLogo onCanvasReady={handleDownload} />
      </div>

      <div className="mt-8 text-center text-sm text-ink/60 max-w-md">
        <p>
          The PNG will automatically download once ready. For the animated GIF, click the GIF button to record 2 seconds of rotation.
          Both formats have transparent backgrounds and are perfect for social media, websites, and branding.
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
