import { DownloadButtonProps } from "@/types/types";
import { generateSVG } from "@/utils/imageUtils";

const DownloadButton = ({ image, settings }: DownloadButtonProps) => {
  const handleDownload = async () => {
    try {
      const svg = await generateSVG(image, settings);
      console.log("Generated SVG:", svg);

      // const blob = new Blob([pngBuffer], { type: "image/png" }); // creer un blob mais autrement
      //   const url = URL.createObjectURL(blob);
      //   const link = document.createElement("a");
      //   link.href = url;
      //   link.download = `${image.name}.png`;
      //   link.click();
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
