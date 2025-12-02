"use client";
import p5 from "p5";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const GIF_01: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      let img: p5.Image | null = null;
      let ratioW: number = 10;
      let ratioH: number = 10;

      p.setup = async () => {
        img = await p.loadImage("/museums/david.jpg");

        p.createCanvas(500, 500);

        const scale = Math.min(p.width / img.width, p.height / img.height);
        img.resize(
          Math.floor(img.width * scale),
          Math.floor(img.height * scale)
        );

        ratioW = p.width / img.width;
        ratioH = p.height / img.height;
      };

      p.draw = () => {
        if (!img) return;
        img.loadPixels();
        for (let i = 0; i < img.width; i += 2) {
          for (let j = 0; j < img.height; j += 1) {
            const idx = 4 * (j * img.width + i);
            const r = img.pixels[idx];
            const g = img.pixels[idx + 1];
            const b = img.pixels[idx + 2];
            const brightness = (r + g + b) / 3;

            p.noFill();

            if (p.random() < 0.95) continue;

            if (brightness > 140 && brightness <= 180) {
              p.rect(
                i * ratioW,
                j * ratioH,
                p.map(brightness, 0, 128, 0, 30),
                p.map(brightness, 0, 128, 0, 30)
              );
            } else if (brightness > 120 && brightness <= 140) {
              p.circle(i * ratioW, j * ratioH, p.map(brightness, 0, 128, 4, 8));
            }
          }
        }
        p.noLoop();
      };
    };

    p5InstanceRef.current = new p5(sketch, sketchRef.current);

    return () => {
      p5InstanceRef.current?.remove();
      p5InstanceRef.current = null;
    };
  }, []);

  const handleSaveGif = async () => {
    if (p5InstanceRef.current) {
      setIsRecording(true);
      // Save 3 seconds of animation (adjust duration as needed)
      await p5InstanceRef.current.saveGif("rotating-square", 3);
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={sketchRef}
        className="rounded-lg overflow-hidden shadow-lg"
      ></div>

      <button
        onClick={handleSaveGif}
        disabled={isRecording}
        className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900 disabled:active:scale-100 shadow-md hover:shadow-lg"
      >
        {isRecording ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Recording GIF...
          </span>
        ) : (
          "Save as GIF"
        )}
      </button>
    </div>
  );
};

export default GIF_01;
