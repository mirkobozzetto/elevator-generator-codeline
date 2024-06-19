import { ImageActionProps } from "@/types/types";
import { convertSVGToPNG, generateSVG } from "@/utils/imageUtils";
import clsx from "clsx";
import { useState } from "react";

const ImageActions = ({ image, settings }: ImageActionProps) => {
  const [downloading, setDownloading] = useState(false);
  const [copying, setCopying] = useState(false);
  const [pngBlob, setPngBlob] = useState<Blob | null>(null);

  const handleGenerateImage = async () => {
    if (!image || (pngBlob && !downloading && !copying)) return pngBlob;
    try {
      const svg = await generateSVG(image, settings);
      const blob = await convertSVGToPNG(
        svg,
        image.width + settings.padding * 2
      );
      setPngBlob(blob);
      return blob;
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  const handleDownload = async () => {
    if (!image) return;
    setDownloading(true);
    const blob = await handleGenerateImage();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${image.name}.png`;
      link.click();
      URL.revokeObjectURL(url);
    }
    setDownloading(false);
  };

  const handleCopyToClipboard = async () => {
    if (!image) return;
    setCopying(true);
    const blob = await handleGenerateImage();
    if (blob) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
      } catch (error) {
        console.error("Failed to copy image to clipboard:", error);
      }
    }
    setCopying(false);
  };

  return (
    <div className="flex justify-center space-x-2 my-2 w-full">
      <button
        className={clsx(
          "btn w-[45%] text-xs",
          image ? "btn-primary" : "btn-ghost"
        )}
        onClick={handleDownload}
        disabled={!image || downloading}
      >
        Download Image
        {downloading && (
          <span className="ml-2 loading loading-spinner loading-xs"></span>
        )}
      </button>
      <button
        className={clsx(
          "btn w-[45%] text-xs",
          image ? "btn-primary" : "btn-ghost"
        )}
        onClick={handleCopyToClipboard}
        disabled={!image || copying}
      >
        {copying ? "Copying ..." : "Copy Image"}
        {copying && (
          <span className="ml-2 loading loading-spinner loading-xs"></span>
        )}
      </button>
    </div>
  );
};

export default ImageActions;
