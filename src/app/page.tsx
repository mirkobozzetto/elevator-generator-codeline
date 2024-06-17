"use client";
import { FileChangeEvent, ImageState } from "@/types/types";
import { handleFileChange } from "@/utils/imagePreviewUtil";
import useSettings from "@/utils/useSettings";
import { useState } from "react";
import ImagePreview from "./components/ImagePreview";
import InputFile from "./components/InputFile";
import InputRange from "./components/InputRange";

export default function Home() {
  const [image, setImage] = useState<ImageState | undefined>(undefined);
  const [settings, updateSetting] = useSettings({
    padding: 16,
    shadow: 4,
    radius: 0,
  });

  const handleFileChangeWrapper = (e: FileChangeEvent) => {
    handleFileChange(e, setImage);
  };

  return (
    <main className="flex lg:flex-row flex-col justify-center items-center gap-8 m-auto max-w-4xl min-h-full">
      <div className="bg-indigo-100 shadow-xl w-96 card">
        <div className="card-body">
          <InputFile onChange={handleFileChangeWrapper} />

          <InputRange
            label="Padding"
            min={0}
            max={100}
            value={settings.padding}
            onChange={(e) => updateSetting("padding", Number(e.target.value))}
          />

          <InputRange
            label="Shadow"
            min={0}
            max={100}
            value={settings.shadow}
            onChange={(e) => updateSetting("shadow", Number(e.target.value))}
          />

          <InputRange
            label="Radius"
            min={0}
            max={360}
            value={settings.radius}
            onChange={(e) => updateSetting("radius", Number(e.target.value))}
          />
        </div>
      </div>
      <div className="ml-12 w-96 card">
        <ImagePreview image={image} />
      </div>
    </main>
  );
}
