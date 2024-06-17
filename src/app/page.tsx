"use client";

import { FileChangeEvent } from "@/types/types";
import { useState } from "react";

export default function Home() {
  const [settings, setSettings] = useState();
  const [image, setImage] = useState();

  const handleFileChange = (e: FileChangeEvent) => {
    const file = e.target.files?.[0];
    console.log(e.target.files?.[0]);
  };

  return (
    <main className="flex lg:flex-row flex-col justify-center items-center gap-8 m-auto max-w-4xl min-h-full">
      <div className="bg-indigo-100 shadow-xl w-96 card">
        <div className="card-body">
          <label className="form-control w-full max-w-xs">
            <span className="label-text"> </span>
            <input
              type="file"
              className="w-full max-w-xs file-input file-input-primary file-input-sm"
              onChange={handleFileChange}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <span className="mb-1 label-text">Padding</span>
            <input
              type="range"
              min={0}
              max="100"
              value="0"
              className="range range-primary range-sm"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <span className="mb-1 label-text">Shadow</span>
            <input
              type="range"
              min={0}
              max="100"
              value="0"
              className="range range-primary range-sm"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <span className="mb-1 label-text">Radius</span>
            <input
              type="range"
              min={0}
              max="360"
              value="0"
              className="range range-primary range-sm"
            />
          </label>
        </div>
      </div>
      <div className="ml-12 w-96 card">preview</div>
    </main>
  );
}
