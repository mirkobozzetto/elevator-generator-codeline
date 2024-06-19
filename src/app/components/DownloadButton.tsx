import { DownloadButtonProps } from "@/types/types";
import { convertSVGToPNG, generateSVG } from "@/utils/imageUtils";
import clsx from "clsx";
import { useState } from "react";

const DownloadButton = ({ image, settings }: DownloadButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const svg = await generateSVG(image, settings);
      const pngBlob = await convertSVGToPNG(
        svg,
        image.width + settings.padding * 2
      );

      if (!pngBlob || pngBlob.size === 0) {
        throw new Error("Failed to generate PNG: Blob is empty.");
      }

      const url = URL.createObjectURL(pngBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${image.name}.png`;
      link.click();
      URL.revokeObjectURL(url); // Clean up after download
    } catch (error) {
      console.error("Error generating SVG or converting to PNG:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={clsx("mt-4 btn", image ? "btn-primary" : "btn-ghost")}
      onClick={handleDownload}
      disabled={!image || loading}
    >
      <span className="flex justify-center items-center">
        Download Image
        {loading && (
          <span className="ml-2 loading loading-sm loading-spinner"></span>
        )}
      </span>
    </button>
  );
};

export default DownloadButton;
