"use client";

import dynamic from "next/dynamic";

const Sketch = dynamic(() => import("@/components/sketches/gif_01"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-[500px] h-[400px] bg-gray-100 rounded">
      <p className="text-gray-500">Loading sketch...</p>
    </div>
  ),
});

export default function GIF_01() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-8">
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          Rotating Square
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          A simple p5.js animation featuring a rotating square. Click the button
          below to save it as a GIF.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
        <Sketch />
      </div>

      <p className="mt-12 text-sm text-slate-500">Made with p5.js</p>
    </main>
  );
}
