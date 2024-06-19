import { ImageActionProps } from "@/types/types";
import { convertSVGToPNG, generateSVG } from "@/utils/imageUtils";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "react-toastify";

const ImageActions = ({ image, settings }: ImageActionProps) => {
  const [loading, setLoading] = useState(false);
  const [pngBlob, setPngBlob] = useState<Blob | null>(null);

  const handleGenerateImage = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const svg = await generateSVG(image, settings);
      const blob = await convertSVGToPNG(
        svg,
        image.width + settings.padding * 2
      );
      setPngBlob(blob);
      setLoading(false);
      return blob;
    } catch (error) {
      console.error("Error processing image:", error);
      setLoading(false);
      toast.error("Failed to process image.");
    }
  };

  const handleDownload = async () => {
    const blob = await handleGenerateImage();
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${image.name}.png`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = async () => {
    const blob = await handleGenerateImage();
    if (!blob) return;

    try {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      toast.success("Image copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy image to clipboard:", error);
      toast.error("Failed to copy image.");
    }
  };

  return (
    <div className="flex justify-center space-x-2 my-2 w-full">
      <button
        className={clsx(
          "btn w-[45%] text-xs",
          image ? "btn-primary" : "btn-ghost"
        )}
        onClick={handleDownload}
        disabled={!image || loading}
      >
        Download Image
        {loading && (
          <span className="ml-2 loading loading-spinner loading-xs"></span>
        )}
      </button>
      <button
        className={clsx(
          "btn w-[45%] text-xs",
          image ? "btn-primary" : "btn-ghost"
        )}
        onClick={handleCopyToClipboard}
        disabled={!image || loading}
      >
        Copy Image
        {loading && <span className="ml-2">Copying ...</span>}
      </button>
    </div>
  );
};

export default ImageActions;

// import { DownloadButtonProps } from "@/types/types";
// import { convertSVGToPNG, generateSVG } from "@/utils/imageUtils";
// import clsx from "clsx";
// import { useState } from "react";

// const DownloadButton = ({ image, settings }: DownloadButtonProps) => {
//   const [loading, setLoading] = useState(false);

//   const handleDownload = async () => {
//     if (!image) return;
//     setLoading(true);
//     try {
//       const svg = await generateSVG(image, settings);
//       const pngBlob = await convertSVGToPNG(
//         svg,
//         image.width + settings.padding * 2
//       );

//       if (!pngBlob || pngBlob.size === 0) {
//         throw new Error("Failed to generate PNG: Blob is empty.");
//       }

//       const url = URL.createObjectURL(pngBlob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `${image.name}.png`;
//       link.click();
//       URL.revokeObjectURL(url); // Clean up after download
//     } catch (error) {
//       console.error("Error generating SVG or converting to PNG:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       className={clsx("my-4 btn mx-1", image ? "btn-primary" : "btn-ghost")}
//       onClick={handleDownload}
//       disabled={!image || loading}
//     >
//       <span className="flex justify-center items-center">
//         Download Image
//         {loading && (
//           <span className="loading loading-sm loading-spinner"></span>
//         )}
//       </span>
//     </button>
//   );
// };

// export default DownloadButton;
