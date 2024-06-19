import { DownloadButtonProps } from "@/types/types";
import { convertSVGToPNG, generateSVG } from "@/utils/imageUtils";

const DownloadButton = ({ image, settings }: DownloadButtonProps) => {
  const handleDownload = async () => {
    try {
      const svg = await generateSVG(image, settings);
      console.log("Generated SVG:", svg);

      const pngBlob = await convertSVGToPNG(
        svg,
        image.width + settings.padding * 2
      );
      console.log("Converted to PNG blob:", pngBlob);

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
    }
  };

  return (
    <button
      className="mt-4 btn btn-primary"
      onClick={handleDownload}
      disabled={!image}
    >
      Download Image
    </button>
  );
};

export default DownloadButton;
