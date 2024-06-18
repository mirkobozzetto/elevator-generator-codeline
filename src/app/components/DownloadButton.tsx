import { DownloadButtonProps } from "@/types/types";
import { generateSVG } from "@/utils/imageUtils";

const DownloadButton = ({ image, settings }: DownloadButtonProps) => {
  const handleDownload = async () => {
    try {
      const svg = await generateSVG(image, settings);
      console.log("Generated SVG:", svg);

      const pngDataUrl = await generateSVG(
        svg,
        image.width + settings.padding * 2,
        image.height + settings.padding * 2
      );
      const pngData = await fetch(pngDataUrl).then((res) => res.arrayBuffer());
      const blob = new Blob([pngData], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${image.name}.png`;
      link.click();
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
